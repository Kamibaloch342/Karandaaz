"""Build data/census2023_tehsils.csv (urban share of every tehsil) from PBS Census 2023 Table 1.

Source: Pakistan Bureau of Statistics, 7th Population and Housing Census 2023, Table 1, as published in the
PakPC2023 R package (github.com/myaseen208/PakPC2023, data/TABLE_01.RData).
Usage: python3 build_census_tehsils.py path/to/TABLE_01.RData
"""
import os
import sys
import pandas as pd
import pyreadr

df = pyreadr.read_r(sys.argv[1])["TABLE_01"].reset_index(drop=True)
units = []
for _, r in df.iterrows():
    if r.REGION == "OVERALL":
        if pd.isna(r.ALL_SEXES) and units:      # a tehsil name split over two rows in the source
            units[-1]["tehsil"] += " " + r.TEHSIL
            continue
        units.append(dict(province=r.PROVINCE, division=r.DIVISION, district=r.DISTRICT, tehsil=r.TEHSIL,
                          admin_unit=r.ADMIN_UNIT, population=int(r.ALL_SEXES), urban_population=0))
    elif r.REGION == "URBAN" and not pd.isna(r.ALL_SEXES):
        units[-1]["urban_population"] = int(r.ALL_SEXES)
t = pd.DataFrame(units)
t["urban_pct"] = (100 * t.urban_population / t.population).round(2)
out = os.path.join(os.path.dirname(__file__), "..", "data", "census2023_tehsils.csv")
t.to_csv(out, index=False)
print("wrote", out, len(t), "units; population", t.population.sum(), "; urban", round(100 * t.urban_population.sum() / t.population.sum(), 2), "%")
