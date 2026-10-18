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

# Urban classification. A tehsil is urban if it is (a) a town or city tehsil of a metropolitan area
# (Karachi, Lahore, Peshawar, Quetta, Islamabad, or a tehsil named "City"), or (b) the headquarters tehsil
# of a district that is at least 25% urban in Census 2023 (Annex B). All other tehsils are rural.
METRO = {"Lahore City", "Lahore Cantt", "Model Town", "Shalimar", "Quetta City", "Islamabad", "Faisalabad City",
         "Gujranwala City", "Multan City", "Sukkur City", "Chamkani", "Pishtakhara", "Shah Alam", "Town 3", "Peshawar"}
HQ = {"Hub": "Hub", "Lower Chitral": "Chitral", "Jamshoro": "Kotri", "Khairpur": "Khairpur Mirs", "Sukkur": "Sukkur City",
      "Bajaur": "Khar", "Upper Dir": "Dir", "Upper Chitral": "Mastuj", "Lower Kohistan": "Pattan", "Kohistan": "Dassu",
      "Orakzai": "Central", "Mohmand": "Prang Ghar", "Kurram": "Upper Kurram", "Khyber": "Jamrud"}
CENSUS_NAME = {"Islamabad": "Islamabad (ICT)", "Kohistan": "Upper Kohistan"}


def census_urban():
    u = {}
    for f in ("districts.csv", "districts_post_census_derived.csv"):
        for r in csv.DictReader(open(os.path.join(DATA, f))):
            u[r["district"]] = float(r["urban_pct"])
    return u


def settlement(district, tehsil, urban):
    if district == "Karachi" or tehsil in METRO:
        return "urban"
    is_hq = tehsil == district or HQ.get(district) == tehsil
    share = urban.get(CENSUS_NAME.get(district, district))
    return "urban" if is_hq and share is not None and share >= 25 else "rural"


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
    urban = census_urban()
    out = os.path.join(DATA, "dflt2_tehsils.csv")
    with open(out, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["province", "district", "tehsil", "registrations", "verified", "settlement"])
        for (p, dname, t), (reg, ver) in agg.items():
            w.writerow([p, dname, t, reg, ver, settlement(dname, t, urban)])
    print("wrote", out, len(agg), "tehsils")


if __name__ == "__main__":
    main()
