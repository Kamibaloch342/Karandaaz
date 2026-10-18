# Component 1: Diagnostic, Curriculum Design and Capacity Building

Draft of section 3.1 of SDPI's technical proposal for Karandaaz RFP-194.

| File | Contents |
|---|---|
| `Component 1 - Diagnostic, Curriculum Design and Capacity Building.docx` | Section 3.1(a)–(h); 3.1(g) ToT is a placeholder |
| `Annex B - Rural and Urban Characteristics of Districts.docx` | Census 2023 urban/rural classification of every district in the four provinces |
| `figures/` | Implementation model, FGD sampling frame, district urban/rural map |
| `data/` | District and provincial Census 2023 data, province notes, research notes, province boundaries (Natural Earth) |
| `scripts/` | Builders for the figures and documents |

Rebuild:

```bash
cd Component_1/scripts
python3 make_figures.py
python3 make_district_map.py
node build_component1.js
node build_annexB.js
# Figure 3 (DFLT Phase II tehsil map), once the venue registry is exported:
python3 make_phase2_map.py tehsils.csv ../data/pakistan_provinces.geojson
node build_component1.js   # picks up figures/fig_dflt2_tehsil_map.png automatically
```

`tehsils.csv` needs the columns `province,district,tehsil,settlement,lat,lon` (settlement = urban or rural).
