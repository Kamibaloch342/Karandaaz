"""Clean the DFLT Phase II tehsil export (dflt2_tehsils_raw.csv) into one row per tehsil.

Input columns (no header): province, district, tehsil, registrations, verified, gps_points, lat, lon.
Output: dflt2_tehsils.csv with province, district (as used for mapping), tehsil, registrations, verified, settlement.
"""
import csv
import os
from collections import OrderedDict

DATA = os.path.join(os.path.dirname(__file__), "..", "data")

PROVINCE = {"Baluchistan": "Balochistan", "Kpk": "Khyber Pakhtunkhwa", "Punjab": "Punjab", "Sindh": "Sindh", "Islamabad": "Islamabad"}
# spelling variants of the same district or tehsil
DISTRICT_FIX = {"Muzafargarh": "Muzaffargarh", "Nankhana Sahib": "Nankana Sahib", "Toba Tek sing": "Toba Tek Singh",
                "Laaki Marwat": "Lakki Marwat", "Jehlum": "Jhelum", "Khairpur mirus": "Khairpur", "Faizgunj": "Khairpur",
                "Kazi Ahmed": "Shaheed Benazirabad", "Kotri": "Jamshoro", "Mehar": "Dadu", "Mehrab pur": "Naushahro Feroze",
                "Mehrabpur": "Naushahro Feroze", "naushahro feroze": "Naushahro Feroze", "Panoaqil": "Sukkur", "Rohri": "Sukkur",
                "Sukkur city": "Sukkur", "Bin qasim": "Karachi", "Civil line": "Karachi", "Garden": "Karachi", "Gulshan": "Karachi",
                "Manghopir": "Karachi", "Orangi": "Karachi", "Orangi Town": "Karachi", "Shah Faisal Colony": "Karachi",
                "Shahkot": "Nankana Sahib", "Jampur": "Rajanpur"}
TEHSIL_FIX = {"Fateh Jhang": "Fateh Jang", "Pindi Gheb": "Pindi Gheb", "Phindi Gheb": "Pindi Gheb", "Kot Chutta": "Kot Chhutta",
              "18-hazari": "18 Hazari", "Kahror Pacca": "Kahror Pakka", "Kharor Pacca": "Kahror Pakka", "Shujabad": "Shujaabad",
              "Renala": "Renala Khurd", "Kallar Sayaddan": "Kallar Syedan", "Kallarsaydan": "Kallar Syedan",
              "Orangi Town": "Orangi", "Mehrab pur": "Mehrabpur", "D I Khan": "Dera Ismail Khan", "arambagh": "Aram Bagh",
              "Faizgunj": "Faiz Ganj", "Khairpur mirus": "Khairpur Mirs", "Sukkur city": "Sukkur City", "Bin qasim": "Bin Qasim",
              "naushahro feroze": "Naushahro Feroze"}

# Each training tehsil is matched to its Census 2023 tehsil (urban population as defined by the Pakistan Bureau of
# Statistics). Reflecting the 50:50 urban-rural design of DFLT Phase II, the tehsils are then split into two equal
# halves by urban share: the more urban half is classified as urban, the other half as rural.
CENSUS_DISTRICT = {"Hub": "LASBELA", "Kot Addu": "MUZAFFARGARH", "Taunsa": "DERA GHAZI KHAN", "Jhelum": "GUJRAT",
                   "Kohistan": "UPPER KOHISTAN", "Swat": None, "Karachi": None}
CENSUS_TEHSIL = {"Chamkani": "CHAM KANI", "Pishtakhara": "PISHTA KHARA", "Town 3": "PESHAWAR", "Khar": "KHAR BAJAUR",
                 "Allai": "AI", "Gagra(Sawari)": "GAGRA", "Khadukhail": "KHADO KHEL", "Thakh E Nasrti": "TAKHT-E-NASRATI",
                 "Laaki Marwat": "LAKKI MARWAT", "Serai Naurang": "SARAI NAURANG", "Bankand": "BANKAND RANOLIA",
                 "Bala Kot": "BALAKOT", "Quetta City": "QUETTA", "Buleda": "BULAIDA", "Jhatpat": "JHAT PAT",
                 "Multan": "MULTAN SADDAR", "Gulshan": "GULSHAN-E-IQBAL", "Shah Faisal Colony": "SHAH FAISAL",
                 "Khairpur Mirs": "KHAIRPUR", "Sarai Alamghir": "SARAI ALAMGIR", "Kallar Syedan": "KAR SAYADDAN",
                 "Kahror Pakka": "KAHROR PACCA", "Shujaabad": "SHUJABAD", "Panoaqil": "PANO AQIL", "18 Hazari": "18-HAZARI",
                 "Shahkot": "SHAH KOT", "Samarbagh": "SAMARBAGH"}
KARACHI = {"KARACHI CENTRAL", "KARACHI EAST", "KARACHI SOUTH", "KARACHI WEST", "KEAMARI", "KORANGI", "MALIR"}


def census_lookup():
    rows = list(csv.DictReader(open(os.path.join(DATA, "census2023_tehsils.csv"))))
    return [r for r in rows if r["admin_unit"] != "DE-EXCLUDED_AREA"]


def match(census, district, tehsil):
    name = CENSUS_TEHSIL.get(tehsil, tehsil).upper()
    cd = CENSUS_DISTRICT.get(district, district.upper())
    pool = [r for r in census if (r["district"] in KARACHI if district == "Karachi" else (cd is None or r["district"] == cd))]
    hits = [r for r in pool if r["tehsil"] == name]
    if len(hits) == 1:
        return hits[0]["district"], hits[0]["tehsil"], float(hits[0]["urban_pct"])
    if district == "Karachi" and tehsil == "Malir":   # no census tehsil of this name: use Malir district as a whole
        m = [r for r in census if r["district"] == "MALIR"]
        pop = sum(int(r["population"]) for r in m); urb = sum(int(r["urban_population"]) for r in m)
        return "MALIR", "MALIR (district)", round(100 * urb / pop, 2)
    raise KeyError(f"no unique census match for {district} / {tehsil}: {len(hits)} hits")


def main():
    rows = list(csv.reader(open(os.path.join(DATA, "dflt2_tehsils_raw.csv"), encoding="utf-8-sig")))
    agg = OrderedDict()
    for r in rows:
        if len(r) < 5 or r[0] == "Terminated" or r[0] == "province":
            continue
        prov = PROVINCE[r[0].strip()]
        dist_raw, teh_raw = r[1].strip(), r[2].strip()
        dist = DISTRICT_FIX.get(dist_raw, dist_raw)
        teh = TEHSIL_FIX.get(teh_raw, teh_raw)
        key = (prov, dist, teh)
        a = agg.setdefault(key, [0, 0])
        a[0] += int(r[3]); a[1] += int(r[4] or 0)
    census = census_lookup()
    out = os.path.join(DATA, "dflt2_tehsils.csv")
    with open(out, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["province", "district", "tehsil", "registrations", "census_district", "census_tehsil", "urban_pct", "settlement"])
        recs = []
        for (p, dname, t), (reg, ver) in agg.items():
            cd, ct, u = match(census, dname, t)
            recs.append([p, dname, t, reg, cd, ct, u])
        # 50:50 split: the half of the tehsils with the higher Census 2023 urban share is shown as urban
        order = sorted(range(len(recs)), key=lambda i: (-recs[i][6], -recs[i][3]))
        urban_idx = set(order[: len(recs) // 2])
        cut = recs[order[len(recs) // 2 - 1]][6]
        for i, rec in enumerate(recs):
            w.writerow(rec + ["urban" if i in urban_idx else "rural"])
        print("median split: urban if urban share >=", cut, "%")
    print("wrote", out, len(agg), "tehsils")


if __name__ == "__main__":
    main()
