# Rural/urban profile of Pakistan's provinces: notes for the SDPI–Karandaaz annex

Prepared 18 Oct 2026. Companion files in this folder:
- `districts.csv` covers 136 Census-2023 districts plus ICT.
- `provinces.csv` holds the provincial and national totals.
- `districts_post_census_derived.csv` covers 9 districts created after the census. Their figures are derived from tehsil rows, so do not add them to the parent district.

## How the figures were produced (read before citing)

- **Basis.** Every district number comes from the PBS 7th Population & Housing Census 2023 (the "Digital Census"):
  - Table 1 gives area, population and urban population.
  - Table 12 gives the literacy rate for people aged 10 and over, by sex.
- **Where the data came from.** pbs.gov.pk could not be reached from this environment. The tables were taken from the PakPC2023 R package (v0.2.0, M. Yaseen with PBS contributors, GitHub myaseen208/PakPC2023). That package re-publishes the PBS tehsil-level tables. Tehsil, taluka and sub-division rows were summed to district level.
- **Checks against published figures.** The results were compared with independently published PBS figures:
  - Provincial and national populations match PBS exactly.
  - Literacy matches the published figures: Pakistan 60.65%, Punjab 66.25%, Sindh 57.54%, KP 51.09%, Balochistan 42.01%.
  - The Jhang (3,065,639; literacy 59.45%) and Karachi East (3,921,742) totals match PBS and Wikipedia.
  - The urban shares for Thatta (17.88%) and Sanghar (27.32%) also match.
- **One district was patched.** The package's Table 1 leaves out Tando Muhammad Khan taluka. That district's population, urban count and area use the PBS district totals instead: 726,119 people, 162,142 urban, 1,423 km².
- **Sindh and national urban share.** Summing the district Table-1 rows gives Sindh 53.97% urban, which is the figure widely reported for Census 2023. The PBS national/provincial household summary gives 29,925,076 urban for Sindh (53.73%) and 38.82% urban for Pakistan. Cite **38.82%** as the official national headline.
- **Literacy rates** are people aged 10 and over who are literate, divided by all people aged 10 and over.
- **Tehsils column.** This counts the sub-district units in the census tables: tehsils, talukas, sub-divisions and sub-tehsils. It is not always the current official count of tehsils.
- **Classification rule (annex).** Urban share ≥ 50% = Predominantly urban; 25–49.9% = Mixed / peri-urban; < 25% = Predominantly rural.
- **District counts by class (census districts):**

| Province | Predominantly rural | Mixed / peri-urban | Predominantly urban |
|---|---|---|---|
| Punjab | 14 | 19 | 3 (Lahore, Rawalpindi, Gujranwala) |
| Sindh | 10 | 13 | 7 (Hyderabad and 6 Karachi districts) |
| KP | 33 | 2 (Peshawar, Swat) | 0 |
| Balochistan | 19 | 13 | 2 (Quetta, Gwadar) |
| ICT | — | 1 | — |

- **Districts created after the census** are not separate census districts:
  - Punjab: Murree, Talagang, Wazirabad, Kot Addu, Taunsa.
  - Balochistan: Hub, Usta Muhammad.
  - KP: Upper and Lower South Waziristan.
  - Their figures in the derived file are sums of PBS tehsil rows. The tehsil make-up for Taunsa and for Upper/Lower South Waziristan is uncertain.
  - Other proposed or later districts (for example Central Dir in KP, and further Punjab re-organisations notified in 2024–25) are not covered.

## Cross-cutting (national) evidence on women, phones and finance

- **Individual mobile ownership by sex and area (PSLM/HIES 2018-19, people aged 10+).**
  - Men 64%, women 26% nationally.
  - Urban: men 72%, women 38%.
  - Rural: men 60%, women 19%. Rural women are about half as likely as urban women to own a phone. [PBS, PSLM/HIES 2018-19 Key Findings]
- **Mobile internet use (GSMA, 2024 data).** The gender gap in mobile internet use fell from 38% (2023) to 25% (2024), and 45% of women used mobile internet. About 35% of women who use mobile internet do so on someone else's phone, against about 6% of men. [GSMA Mobile Gender Gap Report 2025, as reported by Dawn and ProPakistani]
- **Ownership (GSMA, 2025 data).** In 2025, 68% of women owned a mobile phone against 93% of men, still the widest ownership gap among the countries GSMA surveyed. The ownership gap was 27% in 2025, down from 37%. 28% of women internet users rely only on borrowed phones. [GSMA Mobile Gender Gap Report 2026, as reported by Dawn, Arab News and Dunya News. Verify against the GSMA report.]
- **Financial inclusion (SBP).**
  - In 2023, 47% of adult women had at least one account against 81% of men, a 34% gender gap.
  - NFIS 2024-28 targets 75% overall inclusion and a 25% gender gap by 2028.
  - SBP's first progress report puts the gap at about 29% in 2025. [SBP NFIS 2024-28; SBP Banking on Equality Policy 2026; The News]
- **Women's work (LFS 2020-21).** Female labour force participation is far higher in rural areas (about 28%) than urban areas (about 10%), but rural work is mostly unpaid family farm or livestock work. National refined female participation was 21.4%. [PBS Labour Force Survey 2020-21, as analysed by Khalil & Warner 2025]
- **Provincial MICS pooled.** Across the four provincial MICS rounds (2017-20), about 35% of women aged 15–49 own a mobile phone against 84% of men. Women are 48.5 percentage points less likely to own one. [World Bank, Women's Economic Empowerment in Pakistan toolkit, 2024]

## Punjab (127.69 m; 40.71% urban; literacy 66.25%, female 60.19%)

- **Literacy gap.** 59% of people live in rural areas. Female literacy is 74.0% in urban areas but 50.5% in rural areas, a 23.5-point gap. [PBS Census 2023, Table 12]
- **North–south divide.** Female literacy is lowest in the south-west districts: Rajanpur 28.2%, Dera Ghazi Khan 37.2%, Muzaffargarh 39.7% and Rahim Yar Khan 40.2%. It reaches 77–78% in Rawalpindi, Gujrat and Lahore. The southern districts are mostly riverine/agricultural, under 27% urban and flood-prone, so training there needs low-literacy, voice/visual content. [PBS Census 2023, Tables 1 & 12]
- **Rural districts and peri-urban belts.** 14 of 36 census districts are predominantly rural, making up 30% of the population. Another 19 are "mixed", typically a district town surrounded by canal-colony villages. Peri-urban belts around Lahore, Faisalabad, Gujranwala, Sialkot and Multan give reasonable phone and agent coverage. [PBS Census 2023, Table 1]
- **Access.** Individual mobile ownership in Punjab is 50% and household internet access 69% (PSLM/HIES 2024-25, people aged 10+). Rural women lag well behind, as the national 2018-19 rural female figure of 19% shows. [PBS HIES/PSLM 2024-25 as reported by APP/FAFEN; PBS PSLM 2018-19]
- **Data gap.** A Punjab-specific figure for women's phone ownership from MICS 2017-18 could not be retrieved here; see the MICS Punjab report, table SR.9.3W. No figure was invented.

## Sindh (55.70 m; 53.97% urban; literacy 57.54%, female 50.21%)

- **Karachi dominates the urban share.** The 7 Karachi districts hold 20.38 m people, 62.8% of Sindh's urban population. Excluding Karachi Division, Sindh is only 31.7% urban. [PBS Census 2023, Table 1]
- **Largest rural/urban gap for women.** Female literacy is 67.8% in urban areas but 27.5% in rural areas, the widest gap of any province. District-level female literacy is lowest in the coastal and desert districts: Sujawal 19.7%, Thatta 20.1%, Tharparkar 23.5% and Tando Muhammad Khan 25.0%. [PBS Census 2023, Table 12]
- **Phone ownership.** 33.1% of women aged 15–49 own a mobile phone against 81.4% of men. 95% of urban households have a mobile phone against 83% of rural households. [Sindh Bureau of Statistics & UNICEF, Sindh MICS 2018-19 survey findings report and ICT snapshot]
- **Access.** Individual mobile ownership is 50% and household internet access 67%, the lowest of the four provinces. [PBS HIES/PSLM 2024-25 as reported by APP/FAFEN]
- **Rural characteristics.** Rural Sindh has irrigated agriculture (sugarcane, cotton, rice, bananas, mangoes), riverine katcha areas and the Thar desert. Many of these districts were badly hit by the 2022 floods. Women are mostly in unpaid farm or livestock work with limited mobility. [District types from the Census 2023 characteristics column; women's work from LFS 2020-21. The flood reference is general context: cite the Government of Pakistan Post-Disaster Needs Assessment 2022 if used.]

## Khyber Pakhtunkhwa incl. merged districts (40.86 m; 15.01% urban; literacy 51.09%, female 37.15%)

- **Most rural province.** 33 of 35 census districts are predominantly rural. 12 districts recorded no urban population at all:
  - Bajaur, Mohmand, Orakzai, South Waziristan
  - Batagram, Buner, Shangla, Torghar
  - Upper, Lower and Kolai-Palas Kohistan
  - Upper Chitral

  Only Peshawar (40.1%) and Swat (29.6%) are mixed. [PBS Census 2023, Table 1]
- **Literacy gaps.** Female literacy is 55.4% in urban areas and 33.8% in rural areas. The lowest-literacy districts are in the Kohistan belt and the merged districts:
  - Upper Kohistan 10.3%, Lower Kohistan 10.3%
  - Bajaur 12.3%, Torghar 12.5%, Kolai-Palas 13.1%
  - Orakzai 15.0%, Mohmand 15.1%

  The best are Abbottabad (68.4%), Haripur (65.6%) and Upper Chitral (62.1%). [PBS Census 2023, Table 12]
- **Phone ownership.** 34.6% of women aged 15–49 own a mobile phone against 87.1% of men, one of the widest gaps. [Khyber Pakhtunkhwa Bureau of Statistics & UNICEF, KP MICS 2019 survey findings report]
- **Household access is relatively high.** KP has the highest individual mobile ownership (51%) and household internet access (77%) of the four provinces. Households are connected, but women's personal ownership is low, so shared or borrowed handsets are the norm. [PBS HIES/PSLM 2024-25 as reported by APP/FAFEN; GSMA 2025/2026 on borrowed-phone use]
- **Conditions in mountainous and merged districts.** Settlements are scattered, connectivity is patchy, few bank branches or agents are present, and norms restrict women's mobility. Remittance-receiving households in valleys such as Dir and Swat are a natural entry point for digital payments. [Census 2023 for density and urban share; the description draws on these sources and should be treated as qualitative context]

## Balochistan (14.89 m; 30.96% urban; literacy 42.01%, female 32.80%)

- **Sparse and remote.** Balochistan covers 44% of Pakistan's area but has 6% of its population. Density is 42.9 people per km² and falls to about 6 in Chagai and Awaran. 19 of 34 districts are predominantly rural. Only Quetta (60.3%) and Gwadar (52.1%) are predominantly urban, and Sherani has no urban population. Distance to services and agents is the main barrier. [PBS Census 2023, Table 1]
- **Lowest literacy.** Female literacy is 46.5% in urban areas and 26.6% in rural areas. The lowest districts are Dera Bugti (11.9%), Sherani (15.0%), Washuk (15.8%), Nasirabad (21.2%) and Jhal Magsi (22.1%). The best are Quetta (47.0%), Nushki (44.2%) and Kech (43.5%). [PBS Census 2023, Table 12]
- **Phone ownership.** 30.1% of women aged 15–49 own a mobile phone, the lowest MICS figure among the provinces. [Balochistan Bureau of Statistics & UNICEF, Balochistan MICS 2019-20 survey findings report]
- **Access.** Individual mobile ownership is the lowest of the provinces at 42%. Household internet access is 69%. [PBS HIES/PSLM 2024-25 as reported by APP/FAFEN]
- **Distinct district types:**
  - canal-irrigated rice belt in the east (Nasirabad, Jaffarabad, Sohbatpur, Usta Muhammad), flood-prone
  - highland orchard districts around Quetta (Pishin, Mastung, Ziarat, Killa Saifullah)
  - Makran coast and date belt (Gwadar, Kech, Panjgur), with cross-border trade
  - vast desert and mining districts (Chagai, Washuk, Kharan)
  - the Hub industrial zone next to Karachi, 69% urban (derived)

  [Census 2023]

## Islamabad Capital Territory (2.36 m; 46.91% urban; literacy 83.97%, female 79.13%)

- **Mixed classification.** ICT is classified as mixed: 53% of its population is enumerated in rural union councils on the city fringe. Even rural female literacy is 80.2%. [PBS Census 2023, Tables 1 & 12]

## Sources (full list)

1. **Pakistan Bureau of Statistics.** *7th Population and Housing Census 2023 – Detailed Results* (Table 1: area, population by sex, sex ratio, density, urban proportion, household size, growth rate; Table 12: literacy, enrolment and out-of-school population by sex and rural/urban). Islamabad: PBS, 2024.
   - https://www.pbs.gov.pk/result-excel/
   - Provincial Table 1 PDFs, e.g. https://www.pbs.gov.pk/sites/default/files/population/2023/tables/table_1_balochistan_province.pdf and https://www.pbs.gov.pk/sites/default/files/population/2023/tables/table_1_sindh_province.pdf
2. **PBS.** *Release of National and Provincial Census Reports of Population and Housing Census 2023.* https://www.pbs.gov.pk/release-of-national-and-provincial-census-reports-of-population-and-housing-census-2023-2/
3. **Yaseen, M., Arfan Dilber, M. & Asghar, Z.** *PakPC2023: Pakistan Population Census 2023* (R package v0.2.0; data from PBS). https://github.com/myaseen208/PakPC2023 (data/TABLE_01.RData, data/TABLE_12.RData, data/PakPC2023Pak.RData)
4. **PBS.** *Pakistan Social & Living Standards Measurement Survey / HIES 2018-19 – Key Findings.* https://www.pbs.gov.pk/wp-content/uploads/2020/07/Hieskey.pdf
5. **PBS.** *Household Integrated Economic Survey / PSLM 2024-25.*
   - Report: https://www.pbs.gov.pk/wp-content/uploads/2020/07/PSLM_Report_2024-25-Social-1.pdf
   - As reported by APP, "Pakistan records significant gains in digital connectivity, internet use": https://www.app.com.pk/?p=1140479
   - FAFEN, "PSLM: Mobile & Internet Access Rises, Computer Ownership Stays Flat": https://fafen.org/pslm-mobile-internet-access-rises-computer-ownership-stays-flat/
6. **GSMA.** *The Mobile Gender Gap Report 2025.* London: GSMA, 2025.
   - PTA mirror: https://www.pta.gov.pk/assets/media/2025-05-20-The-Mobile-Gender-Gap-Report-2025.pdf
   - Coverage: Dawn, "8m women come online in 2024 as digital gender divide narrows", https://www.dawn.com/news/1911146
7. **GSMA.** *The Mobile Gender Gap Report 2026* (2025 data), as reported by:
   - Dawn, "Pakistan leads global progress in 'bridging mobile gender gap'", https://www.dawn.com/news/2012291
   - Arab News, https://www.arabnews.pk/node/2649428/pakistan
   - MoITT, *Pakistan Mobile Gender Gap Data* (GSMA Consumer Survey 2025), https://moitt.gov.pk/SiteImage/Publications/Pakistan%20Mobile%20Gender%20Gap%20Data_June.pdf
8. **Sindh Bureau of Statistics & UNICEF.** *Sindh Multiple Indicator Cluster Survey 2018-19: Survey Findings Report.* 2021.
   - Report: https://mics.unicef.org/sites/mics/files/2024-08/Pakistan%202018-19%20MICS%20(Sindh)_English.pdf
   - ICT snapshot: https://sbos.sindh.gov.pk/files/SBOS/MICS/MICS%202018-19/Snapshots/F02.MICS-Statistical-Snapshot-Mass-media-communications-internet_022021.pdf
9. **Bureau of Statistics KP & UNICEF.** *Khyber Pakhtunkhwa Multiple Indicator Cluster Survey 2019: Survey Findings Report.* 2022. https://mics.unicef.org/sites/mics/files/Pakistan%202019%20MICS%20(Khyber%20Pakhtunkhwa)%20[2022-08-02]_English.pdf
10. **Balochistan Bureau of Statistics & UNICEF.** *Balochistan Multiple Indicator Cluster Survey 2019-20: Survey Findings Report.* 2022. https://mics.unicef.org/sites/mics/files/English%20[2022-12-06].pdf
11. **Bureau of Statistics Punjab & UNICEF.** *Punjab MICS 2017-18.* https://www.unicef.org/pakistan/reports/multiple-indicator-cluster-survey-2017-18-punjab (the women's phone ownership figure was not retrieved)
12. **State Bank of Pakistan.**
    - *National Financial Inclusion Strategy 2024-28.* https://www.sbp.org.pk/nfis/nfis2024-28.pdf
    - *Banking on Equality Policy 2026.* https://www.sbp.org.pk/assets/documents/circulars/BoE_2026_Policy_Document.pdf
    - Progress coverage in The News, "SBP report shows financial inclusion rises to 69pc": https://www.thenews.pk/print/1418507-sbp-report-shows-financial-inclusion-rises-to-69pc
13. **PBS.** *Labour Force Survey 2020-21.* https://www.pbs.gov.pk/content/labour-force-survey. Rural/urban female participation as analysed in Khalil & Warner, "Invisible Labor, Visible Barriers" (2025): https://arxiv.org/abs/2508.16664
14. **World Bank.** *Women's Economic Empowerment in Pakistan: An evidence-guided toolkit for more inclusive policies.* 2024. https://thedocs.worldbank.org/en/doc/e02bd4872b983fc0b4a1809489231e35-0310012024/original/Womens-Economic-Empowerment-in-Pakistan.pdf
15. **Secondary references for district boundaries** (Wikipedia district articles, via search):
    - Hub District, Usta Muhammad District, Talagang District, Murree District, Kot Addu District, Taunsa District, Lower and Upper South Waziristan Districts, Tando Muhammad Khan District
    - Zameen News, "Bifurcation of South Waziristan approved" (2022): https://www.zameen.com/news/bifurcation-south-waziristan-approved.html

**Further reading (not used for figures):**
- Balochistan Commission on the Status of Women, *Balochistan Gender Parity Report 2024* (2025): https://bcsw.balochistan.gov.pk/wp-content/uploads/2025/06/Balochistan-Gender-Parity-Report-2024-Final-March-2025-1.pdf
- Karandaaz, "Pakistan's Gender Gap in Financial Inclusion": https://karandaaz.com.pk/?p=7392
- *Not used:* PDHS 2017-18 indicators on women's mobility and decision-making, because province × residence values could not be retrieved here. Add them from https://dhsprogram.com (report FR354) if needed.

**Verification note.** pbs.gov.pk, gsma.com, mics.unicef.org and sbp.org.pk could not be opened directly from this environment. Figures in items 5–14 are as stated in the cited documents' indexed text or in named press reports. Spot-check them against the original PDFs before final submission.
