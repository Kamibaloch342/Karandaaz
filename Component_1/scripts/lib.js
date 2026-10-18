// Shared helpers for building the Component 1 Word documents.
const fs = require("fs");
const path = require("path");
const d = require("docx");
const { Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType, AlignmentType,
  BorderStyle, ImageRun, HeadingLevel, FootnoteReferenceRun, VerticalAlign } = d;

const FONT = "Calibri";
const NAVY = "0F4761";
const CONTENT_W = 9026; // A4 with 1-inch margins

function runs(text, base = {}) {
  // **bold** segments inside a string
  return text.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map(s =>
    s.startsWith("**") ? new TextRun({ ...base, text: s.slice(2, -2), bold: true })
      : new TextRun({ ...base, text: s }));
}

function P(text, opts = {}) {
  const children = typeof text === "string" ? runs(text, opts.run || {}) : text;
  if (opts.fn) children.push(new FootnoteReferenceRun(opts.fn));
  return new Paragraph({ children, spacing: { before: 100, after: 120, line: 276 }, alignment: opts.align || AlignmentType.JUSTIFIED, ...(opts.p || {}) });
}
const H1 = t => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)], spacing: { before: 240, after: 160 } });
const H2 = t => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)], spacing: { before: 240, after: 120 } });
const H3 = t => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(t)], spacing: { before: 160, after: 80 } });
const bullet = (text, level = 0) => new Paragraph({ children: runs(text), numbering: { reference: "bullets", level }, spacing: { after: 60, line: 264 } });
const numbered = (text, ref = "numbers") => new Paragraph({ children: runs(text), numbering: { reference: ref, level: 0 }, spacing: { after: 60, line: 264 } });
const caption = t => new Paragraph({ children: [new TextRun({ text: t, bold: true, color: NAVY, size: 20 })], spacing: { before: 160, after: 80 }, keepNext: true });
const source = t => new Paragraph({ children: [new TextRun({ text: t, italics: true, size: 17, color: "595959" })], spacing: { before: 60, after: 160 } });

function cell(text, w, opts = {}) {
  const paras = (Array.isArray(text) ? text : [text]).map(t => new Paragraph({
    children: runs(String(t), { size: opts.size || 18, color: opts.color, bold: opts.bold }),
    spacing: { after: 20, line: 240 }, alignment: opts.align || AlignmentType.LEFT }));
  return new TableCell({ children: paras, width: { size: w, type: WidthType.DXA }, columnSpan: opts.span,
    shading: opts.fill ? { type: ShadingType.CLEAR, color: "auto", fill: opts.fill } : undefined,
    margins: { top: 50, bottom: 50, left: 90, right: 90 }, verticalAlign: VerticalAlign.CENTER });
}

function table(header, rows, widths, opts = {}) {
  const total = widths.reduce((a, b) => a + b, 0);
  const border = { style: BorderStyle.SINGLE, size: 4, color: "A6A6A6" };
  const trs = [new TableRow({ tableHeader: true, children: header.map((h, i) => cell(h, widths[i], { bold: true, color: "FFFFFF", fill: NAVY })) })];
  rows.forEach((r, ri) => {
    if (r.band) { // section band row
      trs.push(new TableRow({ children: [cell(r.band, total, { span: widths.length, bold: true, fill: "DCE6F0", color: NAVY })] }));
      return;
    }
    trs.push(new TableRow({ children: r.map((c, i) => cell(c, widths[i], { fill: opts.zebra && ri % 2 ? "F7F9FC" : undefined, align: opts.align && opts.align[i] })) }));
  });
  return new Table({ width: { size: total, type: WidthType.DXA }, columnWidths: widths, rows: trs,
    borders: { top: border, bottom: border, left: border, right: border, insideHorizontal: border, insideVertical: border } });
}

function pngSize(file) {
  const b = fs.readFileSync(file);
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
}
function figure(file, widthPx = 600) {
  const { w, h } = pngSize(file);
  return new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 40 },
    children: [new ImageRun({ type: "png", data: fs.readFileSync(file), transformation: { width: widthPx, height: Math.round(widthPx * h / w) } })] });
}

function placeholder(lines) {
  return table([""].slice(0, 0).concat(["Placeholder"]), lines.map(l => [l]), [CONTENT_W]);
}

const styles = {
  default: { document: { run: { font: FONT, size: 21 } } },
  paragraphStyles: [
    { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 30, bold: true, color: NAVY, font: FONT }, paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 0 } },
    { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 25, bold: true, color: "156082", font: FONT }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
    { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 22, bold: true, color: "0A2F40", font: FONT }, paragraph: { spacing: { before: 160, after: 80 }, outlineLevel: 2 } },
  ],
};
const numbering = { config: [
  { reference: "bullets", levels: [
    { level: 0, format: d.LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } },
    { level: 1, format: d.LevelFormat.BULLET, text: "–", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 1000, hanging: 270 } } } }] },
  { reference: "numbers", levels: [{ level: 0, format: d.LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 300 } } } }] },
  { reference: "numbers2", levels: [{ level: 0, format: d.LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 300 } } } }] },
] };

function footer() {
  return new d.Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "SDPI · Technical Proposal RFP-194 · Page ", size: 16, color: "7F7F7F" }),
      new TextRun({ children: [d.PageNumber.CURRENT], size: 16, color: "7F7F7F" })] })] });
}
const page = { size: { width: 11906, height: 16838 }, margin: { top: 1300, bottom: 1300, left: 1440, right: 1440 } };

async function save(doc, out) {
  const buf = await d.Packer.toBuffer(doc);
  fs.writeFileSync(out, buf);
  console.log("wrote", out);
}

module.exports = { d, P, H1, H2, H3, bullet, numbered, caption, source, table, figure, placeholder, styles, numbering, footer, page, save, CONTENT_W, runs, NAVY };
