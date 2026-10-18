// Builds "Annex B - Rural and Urban Characteristics of Districts.docx" from data/districts.csv,
// data/provinces.csv and data/province_notes.json.
const fs = require("fs");
const path = require("path");
const L = require("./lib");
const { d, P, H1, H2, H3, bullet, caption, source, table, styles, numbering, footer, page, save } = L;
const { Paragraph, TextRun, AlignmentType } = d;
const DATA = f => path.join(__dirname, "..", "data", f);

function parseCSV(text) {
  const rows = []; let row = [], field = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { field += '"'; i++; } else if (c === '"') q = false; else field += c; }
    else if (c === '"') q = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") { if (c === "\r" && text[i + 1] === "\n") i++; row.push(field); rows.push(row); row = []; field = ""; }
    else field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const [h, ...rest] = rows.filter(r => r.some(x => x.trim()));
  return rest.map(r => Object.fromEntries(h.map((k, i) => [k.trim(), (r[i] || "").trim()])));
}

const num = v => (v === "" || v == null || isNaN(+v)) ? "–" : (+v).toLocaleString("en-US");
const pct = v => (v === "" || v == null || isNaN(+v)) ? "–" : (+v).toFixed(1);
const districts = parseCSV(fs.readFileSync(DATA("districts.csv"), "utf8"));
const provinces = parseCSV(fs.readFileSync(DATA("provinces.csv"), "utf8"));
const derived = parseCSV(fs.readFileSync(DATA("districts_post_census_derived.csv"), "utf8"));
const notes = JSON.parse(fs.readFileSync(DATA("province_notes.json"), "utf8"));

const ORDER = ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan"];
const children = [
  H1("Annex B: Rural and Urban Characteristics of Districts"),
  P(notes.intro),
  H3("Classification rule"),
  table(["Classification", "Urban share of district population (Census 2023)", "Implication for delivery"], [
    ["Predominantly urban", "50% or more", "Denser agent networks, better connectivity, higher smartphone access; larger share expected on the Digital Capability Track"],
    ["Mixed / peri-urban", "25% to 49.9%", "Urban centre with a large rural hinterland; both tracks in similar measure"],
    ["Predominantly rural", "Below 25%", "Longer travel to agents, weaker coverage, more shared handsets; physical delivery and peer educators weighted higher"],
  ], [2200, 2700, 4126], { zebra: true }),
  P("Tehsils within a district are classified separately at inception, since most districts contain both an urban headquarters tehsil and rural tehsils."),
  H2("B.1 Provincial overview"),
  caption("Table B.1: Provincial population, urbanisation and literacy (Census 2023)"),
  table(["Province", "Population 2023", "Urban %", "Rural %", "Literacy %", "Female literacy %"],
    ORDER.map(p => provinces.find(r => r.province === p)).filter(Boolean).map(r =>
      [r.province, num(r.population_2023), pct(r.urban_pct), pct(r.rural_pct), pct(r.literacy_pct), pct(r.female_literacy_pct)]),
    [2526, 1500, 1200, 1200, 1300, 1300], { zebra: true, align: [AlignmentType.LEFT, 1, 1, 1, 1, 1].map((a, i) => i ? AlignmentType.CENTER : a) }),
  source(notes.province_source),
];

ORDER.forEach((prov, k) => {
  const rows = districts.filter(r => r.province === prov).sort((a, b) => a.division.localeCompare(b.division) || a.district.localeCompare(b.district));
  children.push(H2(`B.${k + 2} ${prov}`));
  (notes.provinces[prov] || []).forEach(b => children.push(bullet(b)));
  const count = c => rows.filter(r => r.classification === c).length;
  children.push(P(`Of the ${rows.length} districts listed, ${count("Predominantly urban")} are predominantly urban, ${count("Mixed / peri-urban")} mixed or peri-urban and ${count("Predominantly rural")} predominantly rural.`));
  children.push(caption(`Table B.${k + 2}: Districts of ${prov}`));
  children.push(table(["District", "Division", "Population 2023", "Urban %", "Literacy %", "Classification", "Characteristics"],
    rows.map(r => [r.district, r.division, num(r.population_2023), pct(r.urban_pct), pct(r.literacy_pct), r.classification, r.characteristics]),
    [1300, 1100, 1100, 700, 850, 1500, 2476], { zebra: true, align: [0, 0, AlignmentType.CENTER, AlignmentType.CENTER, AlignmentType.CENTER, 0, 0] }));
  const der = derived.filter(r => r.province === prov);
  if (der.length) {
    children.push(caption(`Table B.${k + 2}a: Districts of ${prov} notified after the census (derived from tehsil rows)`));
    children.push(table(["District", "Division", "Population 2023", "Urban %", "Literacy %", "Classification", "Characteristics"],
      der.map(r => [r.district, r.division, num(r.population_2023), pct(r.urban_pct), pct(r.literacy_pct), r.classification, r.characteristics]),
      [1300, 1100, 1100, 700, 850, 1500, 2476], { zebra: true, align: [0, 0, AlignmentType.CENTER, AlignmentType.CENTER, AlignmentType.CENTER, 0, 0] }));
    children.push(source(notes.post_census_note));
  }
});
children.push(H2("Sources"));
notes.sources.forEach(s => children.push(bullet(s)));

const doc = new d.Document({ creator: "SDPI", title: "Annex B: Rural and Urban Characteristics of Districts", styles, numbering,
  sections: [{ properties: { page }, footers: { default: footer() }, children }] });
save(doc, path.join(__dirname, "..", "Annex B - Rural and Urban Characteristics of Districts.docx"));
