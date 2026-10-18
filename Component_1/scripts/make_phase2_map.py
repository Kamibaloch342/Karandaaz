"""Map of DFLT Phase II training tehsils by settlement type (Figure 3 of Component 1).

Input: a CSV exported from the DFLT App venue registry with columns
    province, district, tehsil, settlement, lat, lon
where settlement is "urban" or "rural" (one row per tehsil; use the venue centroid).
Boundaries: a lon/lat GeoJSON of provinces (Natural Earth admin-1).

Usage: python3 make_phase2_map.py tehsils.csv provinces.geojson [out.png]
"""
import csv
import json
import os
import sys
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D

plt.rcParams.update({"font.family": "Carlito", "font.size": 10})
FILL = {"Punjab": "#EAF1F8", "Sindh": "#F3F7EC", "Khyber Pakhtunkhwa": "#FBF3EA", "Balochistan": "#F4F0F8"}


def rings(geom):
    polys = [geom["coordinates"]] if geom["type"] == "Polygon" else geom["coordinates"]
    for poly in polys:
        yield poly[0]


def main(csv_path, geo_path, out):
    fig, ax = plt.subplots(figsize=(8, 8.4))
    for f in json.load(open(geo_path))["features"]:
        name = f["properties"]["name"]
        for r in rings(f["geometry"]):
            xs, ys = zip(*r)
            ax.fill(xs, ys, color=FILL.get(name, "#F7F7F7"), zorder=0)
            ax.plot(xs, ys, color="#8C8C8C", lw=0.7, zorder=1)
    rows = list(csv.DictReader(open(csv_path, encoding="utf-8-sig")))
    counts = {"urban": 0, "rural": 0}
    for r in rows:
        s = r["settlement"].strip().lower()
        counts[s] = counts.get(s, 0) + 1
        ax.scatter(float(r["lon"]), float(r["lat"]), s=34, zorder=3, edgecolor="#404040", linewidth=0.5,
                   color="#D62728" if s == "urban" else "#F2C500")
    districts = len({(r["province"], r["district"]) for r in rows})
    ax.legend(handles=[
        Line2D([], [], marker="o", ls="", markersize=8, markerfacecolor="#D62728", markeredgecolor="#404040", label=f"Urban tehsil ({counts['urban']})"),
        Line2D([], [], marker="o", ls="", markersize=8, markerfacecolor="#F2C500", markeredgecolor="#404040", label=f"Rural tehsil ({counts['rural']})")],
        loc="lower right", frameon=True, title=f"{len(rows)} tehsils in {districts} districts")
    ax.set_xlim(60.5, 78); ax.set_ylim(23.5, 37.2); ax.set_aspect(1.1); ax.axis("off")
    ax.text(60.6, 23.6, "Source: SDPI DFLT Phase II venue registry. Boundaries: Natural Earth.", fontsize=8, color="#7F7F7F")
    fig.savefig(out, dpi=220, bbox_inches="tight")
    print("wrote", out)


if __name__ == "__main__":
    out = sys.argv[3] if len(sys.argv) > 3 else os.path.join(os.path.dirname(__file__), "..", "figures", "fig_dflt2_tehsil_map.png")
    main(sys.argv[1], sys.argv[2], out)
