"""Map of DFLT Phase II training tehsils by urban and rural classification (Component 1, Figure 3).

Tehsils are placed within their district (the export carries no venue coordinates); several tehsils in one
district are spread around the district centre. Base map: @svg-maps/pakistan.districts (public domain).
"""
import csv
import json
import math
import os
from collections import defaultdict
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import PathPatch
from matplotlib.lines import Line2D
from svgpath2mpl import parse_path

HERE = os.path.dirname(__file__)
DATA = os.path.join(HERE, "..", "data")
plt.rcParams.update({"font.family": "Carlito", "font.size": 10})

# district in the export -> district on the 2017 base map
TO_MAP = {"Rahim Yar Khan": "Rahimyar Khan", "Sheikhupura": "Shaikhupura", "Nankana Sahib": "Nankana Sahab",
          "Kot Addu": "Muzaffargarh", "Taunsa": "Dera Ghazi Khan", "Hub": "Lasbela", "Harnai": "Haranai",
          "Jaffarabad": "Jafarabad", "Batagram": "Battagram", "Lower Chitral": "Chitral", "Upper Chitral": "Chitral",
          "Lower Kohistan": "Kohistan", "Shaheed Benazirabad": "Nawabshah", "Naushahro Feroze": "Naushahro Firoze"}
URBAN, RURAL = "#D62728", "#F7C600"


def centroid(path):
    best, cx, cy = 0, 0, 0
    for poly in path.to_polygons():
        a = sx = sy = 0
        for (x0, y0), (x1, y1) in zip(poly, list(poly[1:]) + [poly[0]]):
            c = x0 * y1 - x1 * y0
            a += c; sx += (x0 + x1) * c; sy += (y0 + y1) * c
        if abs(a) > best and a:
            best, cx, cy = abs(a), sx / (3 * a), sy / (3 * a)
    return cx, cy


def main(out):
    svg = json.load(open(os.path.join(DATA, "pakistan_districts_svg.json")))
    rows = list(csv.DictReader(open(os.path.join(DATA, "dflt2_tehsils.csv"))))
    by_district = defaultdict(list)
    for r in rows:
        by_district[TO_MAP.get(r["district"], r["district"])].append(r)
    fig, ax = plt.subplots(figsize=(7.6, 7.6))
    centres = {}
    for loc in svg["locations"]:
        p = parse_path(loc["path"])
        trained = loc["name"] in by_district
        ax.add_patch(PathPatch(p, facecolor="#DCE6F0" if trained else "#F4F4F4", edgecolor="#BFBFBF", lw=0.4))
        centres[loc["name"]] = centroid(p)
    missing = [d for d in by_district if d not in centres]
    for d, items in by_district.items():
        if d not in centres:
            continue
        cx, cy = centres[d]
        n = len(items)
        rad = 0 if n == 1 else (9 if n <= 4 else 15)
        for i, r in enumerate(sorted(items, key=lambda x: x["settlement"])):
            ang = 2 * math.pi * i / max(n, 1)
            ax.scatter(cx + rad * math.cos(ang), cy + rad * math.sin(ang), s=26, zorder=3, linewidths=0.5,
                       edgecolors="#404040", color=URBAN if r["settlement"] == "urban" else RURAL)
    x0, y0, w, h = map(float, svg["viewBox"].split())
    ax.set_xlim(x0, x0 + w); ax.set_ylim(y0 + h, y0); ax.set_aspect("equal"); ax.axis("off")
    nu = sum(r["settlement"] == "urban" for r in rows); nr = len(rows) - nu
    nd = len({(r["province"], r["district"]) for r in rows})
    ax.legend(handles=[Line2D([], [], marker="o", ls="", markersize=7, markerfacecolor=URBAN, markeredgecolor="#404040", label=f"Urban tehsil ({nu})"),
                       Line2D([], [], marker="o", ls="", markersize=7, markerfacecolor=RURAL, markeredgecolor="#404040", label=f"Rural tehsil ({nr})"),
                       Line2D([], [], marker="s", ls="", markersize=9, markerfacecolor="#DCE6F0", markeredgecolor="#BFBFBF", label="District with DFLT Phase II training")],
              loc="lower right", frameon=False, fontsize=9, title=f"{len(rows)} tehsils in {nd} districts", title_fontsize=9.5)
    fig.savefig(out, dpi=220, bbox_inches="tight")
    print("wrote", out, "| not on base map:", missing)


if __name__ == "__main__":
    main(os.path.join(HERE, "..", "figures", "fig_dflt2_tehsil_map.png"))
