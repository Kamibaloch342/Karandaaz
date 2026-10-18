"""District map of rural and urban classification (Census 2023) for Component 1.

Boundaries: @svg-maps/pakistan.districts (public domain, 2017-era districts). Where a 2017 district
has since been split, the Census 2023 figures of its successor districts are combined, weighted by
population.
"""
import csv
import json
import os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import PathPatch, Patch
from svgpath2mpl import parse_path

HERE = os.path.dirname(__file__)
DATA = os.path.join(HERE, "..", "data")
plt.rcParams.update({"font.family": "Carlito", "font.size": 10})

# 2017 map district -> Census 2023 district(s)
GROUPS = {
    "Karachi": ["Karachi Central", "Karachi East", "Karachi South", "Karachi West", "Keamari", "Korangi", "Malir"],
    "Thatta": ["Thatta", "Sujawal"], "Nawabshah": ["Shaheed Benazirabad"], "Qambar Shahdatkot": ["Kambar Shahdadkot"],
    "Naushahro Firoze": ["Naushahro Feroze"], "Rahimyar Khan": ["Rahim Yar Khan"], "Shaikhupura": ["Sheikhupura"],
    "Nankana Sahab": ["Nankana Sahib"], "Naseerabad": ["Nasirabad"], "Jafarabad": ["Jaffarabad", "Sohbatpur"],
    "Haranai": ["Harnai"], "Sheerani": ["Sherani"], "Chaghai": ["Chagai"], "Bolan": ["Kachhi"],
    "Killa Abdullah": ["Killa Abdullah", "Chaman"], "Kalat": ["Kalat", "Surab"], "Loralai": ["Loralai", "Duki"],
    "Kohistan": ["Upper Kohistan", "Lower Kohistan", "Kolai-Palas Kohistan"], "Chitral": ["Lower Chitral", "Upper Chitral"],
    "Battagram": ["Batagram"], "Mansehra": ["Mansehra", "Torghar"], "Dera Ismail Khan": ["Dera Ismail Khan"],
    "Tank Subdivision": ["Tank"], "Peshawar Subdivision": ["Peshawar"], "Lakki Subdivision": ["Lakki Marwat"],
    "Kohat Subdivision": ["Kohat"], "D I Khan Subdivision": ["Dera Ismail Khan"], "Bannu Subdivision": ["Bannu"],
}
COLORS = {"Predominantly urban": "#D62728", "Mixed / peri-urban": "#F39C3D", "Predominantly rural": "#F7D046"}


def classify(u):
    return "Predominantly urban" if u >= 50 else "Mixed / peri-urban" if u >= 25 else "Predominantly rural"


def main(out):
    census = {r["district"]: r for r in csv.DictReader(open(os.path.join(DATA, "districts.csv")))}
    svg = json.load(open(os.path.join(DATA, "pakistan_districts_svg.json")))
    fig, ax = plt.subplots(figsize=(7.4, 7.2))
    missing = []
    for loc in svg["locations"]:
        names = GROUPS.get(loc["name"], [loc["name"]])
        rows = [census[n] for n in names if n in census]
        if rows:
            pop = sum(float(r["population_2023"]) for r in rows)
            u = sum(float(r["population_2023"]) * float(r["urban_pct"]) for r in rows) / pop
            color = COLORS[classify(u)]
        else:
            color = "#E6E6E6"
            missing.append(loc["name"])
        ax.add_patch(PathPatch(parse_path(loc["path"]), facecolor=color, edgecolor="white", lw=0.5))
    x0, y0, w, h = map(float, svg["viewBox"].split())
    ax.set_xlim(x0, x0 + w); ax.set_ylim(y0 + h, y0); ax.set_aspect("equal"); ax.axis("off")
    ax.legend(handles=[Patch(color=COLORS[k], label=f"{k} ({lab})") for k, lab in
                       [("Predominantly urban", "≥ 50% urban"), ("Mixed / peri-urban", "25–49% urban"), ("Predominantly rural", "< 25% urban")]]
              + [Patch(color="#E6E6E6", label="Outside programme area")], loc="lower right", frameon=False, fontsize=9)
    fig.savefig(out, dpi=220, bbox_inches="tight")
    print("wrote", out, "| outside/unmatched:", ", ".join(missing))


if __name__ == "__main__":
    main(os.path.join(HERE, "..", "figures", "fig_district_rural_urban_map.png"))
