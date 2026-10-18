// Builds "Component 1 - Diagnostic, Curriculum Design and Capacity Building.docx"
const path = require("path");
const L = require("./lib");
const { d, P, H1, H2, bullet, caption, source, table, figure, styles, numbering, footer, page, save } = L;
const { Paragraph, TextRun, AlignmentType, FootnoteReferenceRun } = d;
const FIG = f => path.join(__dirname, "..", "figures", f);
const C = AlignmentType.CENTER, LEFT = AlignmentType.LEFT;

// Footnote text: plain strings, with {url} segments rendered as clickable links.
const fn = t => ({ children: [new Paragraph({ children: t.split(/(\{[^}]+\})/).filter(Boolean).map(seg => seg.startsWith("{")
  ? new d.ExternalHyperlink({ link: seg.slice(1, -1), children: [new TextRun({ text: seg.slice(1, -1), size: 16, style: "Hyperlink", color: "0563C1", underline: {} })] })
  : new TextRun({ text: seg, size: 16 })) })] });
const footnotes = {
  1: fn("SDPI, DFLT Phase II database: counts recorded by trainers at the start of Day 1 in 6,306 training sessions, covering 187,296 registered women. Sessions with inconsistent counts and records of terminated trainers are excluded."),
  4: fn("SDPI, DFLT Phase II Progress Review, August 2026: 259,717 women trained against a target of 250,000, each verified against her CNIC and NSER record (data as of 4 August 2026)."),
  2: fn("SDPI conducted the monitoring and evaluation of the national DFLT pilot for GIZ from 14 December 2023 to 31 March 2024, covering 7,000 beneficiaries; its evidence informed the design of DFLT Phase I."),
  3: fn("SDPI, Impact Evaluation of the Digital and Financial Literacy Training (DFLT) Phase I, August 2026: a randomised controlled trial with difference-in-differences estimation, with a baseline of 5,370 and an endline of 4,827 women across 8 districts and 16 tehsils."),
  5: fn("Karandaaz Pakistan, RFP No. 194, Section 4, Sub-section 5 (Project Timeline and Deliverables): D5 Phase 1, approximately 250,000; D7 Phase 2, approximately 400,000; D9 Phase 3, approximately 350,000 beneficiaries."),
  6: fn("Karandaaz Pakistan, RFP No. 194, Section 4, Sub-section 3A (Blended Training Deployment Strategy), which indicates approximately 65–70% physical and 30–35% digital delivery."),
  7: fn("Karandaaz Pakistan, RFP No. 194, Section 4, Sub-section 3 (Scope of Services), Component 1: Diagnostic, Curriculum Design and Capacity Building."),
  8: fn("Phase I figures are from the baseline survey of the DFLT Phase I impact evaluation (footnote 3). Phase II figures are the Day-1 counts described in footnote 1. The questionnaires of the DFLT National Pilot, DFLT Phase I and DFLT Phase II are attached in Annex A."),
  9: fn("SDPI estimate based on Table 1: fewer than one in five women can read and write, and only 4.2% have ever made a wallet transaction."),
  10: fn("The DFLT Phase I impact evaluation used a three-stage cluster design: four provinces, two districts per province and two tehsils per district, balanced between urban and rural areas (footnote 3)."),
  11: fn("In DFLT Phase II, SDPI's DFLT App recorded 17,797 training sessions with GPS and photographs, verified every graduate through a CNIC photograph matched to her registration, and confirmed her status against BISP's NSER (SDPI, DFLT Phase II Progress Review, August 2026)."),
  12: fn("The DFLT Phase II proposal set a target of 50% rural and 50% urban locations (SDPI, DFLT Phase II Proposal, 2025, Size and Scope). For Figure 3, each tehsil is matched to its urban population share in the Pakistan Bureau of Statistics Census 2023 ({https://www.pbs.gov.pk/}) and the tehsils are divided into two equal halves: the 73 tehsils with an urban share of 22.8% or more are shown as urban and the remaining 74 as rural."),
  13: fn("Counted from the SDPI DFLT Phase II registration database after harmonising tehsil and district names. The DFLT Phase II Progress Review (August 2026) reports 158 tehsils in 100 districts, as recorded in the field system."),
  14: fn("Lahore district is recorded as 100% urban in the Pakistan Bureau of Statistics Census 2023 (Annex B)."),
  15: fn("Karandaaz Pakistan, RFP No. 194, Section 4, Sub-section 3, Component 1: \"Develop a task-based, action-oriented curriculum focused on high-impact behaviours (e.g., receiving payments, PIN use, safe cash-out, fraud awareness, grievance redressal).\""),
  16: fn("BISP assigns a partner bank to each district for wallet-based payments; banks currently operating include the Bank of Punjab, Bank Alfalah, Mobilink Microfinance Bank and Telenor Microfinance Bank (SDPI consultations with BISP, October 2026)."),
  17: fn("SDPI developed and printed the DFLT handbook for DFLT Phase II and, with the approval of GIZ, handed over 110,000 copies to BISP for the national roll-out (SDPI, DFLT Phase II Proposal, amended July 2026)."),
  18: fn("In DFLT Phase I, a set of 12 animated videos was shared over six weeks through WhatsApp with 1,748 beneficiaries in 16 tehsils (footnote 3); in DFLT Phase II, SDPI's animated videos reached 131,000 beneficiaries through the official WhatsApp Business API. The videos are available at {https://drive.google.com/drive/folders/14YuNgn4AHUPPUru1nSN6D8wzhhsuMiLw}"),
  19: fn("SDPI, DFLT Phase II Proposal, 2025, Rollout of training to Beneficiaries: role-play sessions built around the handbook characters Naila and Shumaila and Akbari and Asghari."),
};
// Text with footnote markers: "sentence.^3^" places footnote 3 at that point.
const R = text => text.split(/(\^\d+\^)/).filter(Boolean).flatMap(seg => /^\^\d+\^$/.test(seg) ? [new FootnoteReferenceRun(+seg.slice(1, -1))] : L.runs(seg));
const PR = text => P(R(text));
const bulletR = text => new Paragraph({ children: R(text), numbering: { reference: "bullets", level: 0 }, spacing: { after: 60, line: 264 } });
const bulletFn = (text, n) => new Paragraph({ children: [...L.runs(text), new FootnoteReferenceRun(n)], numbering: { reference: "bullets", level: 0 }, spacing: { after: 60, line: 264 } });
const quote = t => new Paragraph({ children: [new TextRun({ text: t, italics: true, size: 20 })], indent: { left: 567, right: 567 },
  spacing: { before: 60, after: 100, line: 264 }, alignment: AlignmentType.JUSTIFIED });

const children = [
  H1("3.1 Component 1: Diagnostic, Curriculum Design and Capacity Building"),
  PR("BISP's transition to SIM-based wallets has given beneficiaries access to their own accounts, but access has not yet translated into use. When SDPI assessed 187,296 women at the start of their DFLT Phase II sessions, only 18% had a digital wallet, just 4% had ever used one to make a transaction, and fewer than 2% had a bank account or could withdraw from an ATM.^1^ Most continue to depend on retail agents or relatives to withdraw their payments, which exposes them to deductions and fraud. SDPI therefore proposes a Digital and Financial Capability Training built around one practical, measurable outcome: **by her next BISP payment, every trained woman will be able to receive, protect and withdraw her full payment herself, and will know where to complain if something goes wrong.**"),
  PR("SDPI brings to this assignment the experience of every round of DFLT to date. We conducted the monitoring and evaluation of the DFLT National Pilot,^2^ designed DFLT Phase I and evaluated its impact through a randomised controlled trial,^3^ and implemented DFLT Phase II nationwide, training more than 250,000 BISP women.^4^ The approach proposed below builds directly on the systems, evidence and lessons from that work."),
  PR("**Proposed implementation model.** SDPI proposes to reach 1,000,000 beneficiaries over the three phases set out in the RFP (250,000, 400,000 and 350,000),^5^ delivering each phase in two sub-phases (Figure 1). In the **readiness sub-phase**, every beneficiary will attend an in-person session in a cohort of 30 led by one trainer, where she is registered and learns to keep her SIM active, recognise BISP's 8171 message, check her balance and protect her PIN. Over the following four weeks, SDPI will sustain her learning through IVR calls, WhatsApp messages, short instructional and animated videos, SMS nudges, robocalls and human follow-up calls. In the **capability sub-phase**, the same cohort will return a month later for a hands-on session built on transaction simulations, role plays and group activities, followed by a further four weeks of digital reinforcement. Women who are already able to transact independently will complete the capability content digitally. The readiness sub-phase will therefore be fully physical, while the capability sub-phase will follow a 70:30 physical-to-digital split in each province, in line with the indicative mix in the RFP.^6^"),
  figure(FIG("fig_beneficiary_journey.png"), 600),
  caption("Figure 1: SDPI's proposed implementation model"),

  // 3.1(a)
  H2("3.1(a) Rapid Baseline Assessment"),
  PR("SDPI will conduct a rapid baseline assessment to evaluate beneficiaries' digital and financial capabilities, transaction behaviours, gender-related constraints (mobility, trust and household dynamics), device access and digital connectivity.^7^ The findings will set the emphasis of the curriculum and confirm the blended modality mix for each province before roll-out begins."),
  PR("**Building on SDPI's existing evidence.** Rather than starting from zero, SDPI will build on the beneficiary assessments it has already carried out across the DFLT National Pilot (2023–24), the DFLT Phase I impact evaluation (2024–25) and the DFLT Phase II national roll-out (2025–26). Table 1 presents the national snapshot from these assessments; SDPI can also provide provincial snapshots.^8^"),
  caption("Table 1: Baseline snapshot of BISP beneficiary women from SDPI's assessments"),
  table(["Indicator", "DFLT Phase I baseline (n = 5,370)", "DFLT Phase II, Day 1 (n = 187,296)"], [
    ["Can read and write", "–", "18.0%"],
    ["Can do simple calculations", "64.3%", "43.8%"],
    ["Can use the phone calculator", "13.0%", "10.0%"],
    ["Owns a mobile phone", "41.9%", "–"],
    ["Has a digital wallet or mobile money account", "12.6%", "18.1%"],
    ["Has ever made a wallet transaction", "–", "4.2%"],
    ["Has a bank account", "–", "1.6%"],
    ["Can withdraw cash from an ATM", "–", "1.2%"],
    ["Would refuse a caller asking for her PIN", "36.3%", "–"],
    ["Takes household financial decisions herself", "15.0%", "–"],
  ], [5026, 2000, 2000], { zebra: true, align: [LEFT, C, C] }),
  source("Source: SDPI, DFLT Phase I Impact Evaluation and DFLT Phase II database."),
  PR("**Capability scale.** To show Karandaaz and BISP where beneficiaries stand on a scale of 1 to 10, SDPI proposes a ten-step Capability Ladder in which each step is a task the woman performs on her own (Table 2). On current evidence, the typical beneficiary stands at step 2 or 3.^9^ SDPI will apply the same ladder at registration, after each sub-phase and at endline, so that progress is reported on a single, consistent scale."),
  caption("Table 2: Proposed Capability Ladder"),
  table(["Step", "The beneficiary can, on her own…"], [
    { band: "Readiness" },
    ["1", "Keep her BISP SIM active in a working handset"],
    ["2", "Recognise a genuine BISP payment message from 8171"],
    ["3", "Protect her PIN and refuse anyone who asks for it"],
    ["4", "Check her balance"],
    { band: "Safe cash-out" },
    ["5", "Know her full entitlement and refuse an agent deduction"],
    ["6", "Withdraw her full payment, entering her own PIN"],
    ["7", "Report a problem through the BISP helpline or tehsil office"],
    { band: "Active use" },
    ["8", "Send money or pay a bill from her wallet"],
    ["9", "Keep part of her payment in the wallet as savings"],
    ["10", "Use two or more services regularly and help other women"],
  ], [900, 8126], { align: [C, LEFT] }),
  PR("**Proposed methodology.** As a large quantitative profile already exists, SDPI proposes a qualitative baseline conducted through focus group discussions (FGDs) at provincial level, focused on the variables specified in the RFP, and following the cluster design SDPI used in the DFLT Phase I impact evaluation.^10^ SDPI will cover all four provinces across eight zones: North, Central and South Punjab; North and South Khyber Pakhtunkhwa; Upper and Lower Sindh; and Quetta in Balochistan. One district will be selected in each zone and, within it, one urban and one rural tehsil (Figure 2). In each tehsil, SDPI will hold FGDs with beneficiary women and with men of beneficiary households. SDPI will present the findings to Karandaaz and BISP at the inception meeting in Month 1."),
  figure(FIG("fig_fgd_sampling_frame.png"), 580),
  caption("Figure 2: Proposed sampling frame of the rapid baseline assessment"),

  // 3.1(b)
  H2("3.1(b) Segmenting Beneficiaries into Actionable Groups"),
  P("SDPI will segment beneficiaries into actionable groups that determine which session each woman attends, which digital channel reaches her and how much follow-up she needs. We propose to build segmentation into mobilisation and registration, so that it adds no field time and is available from the first day of training."),
  PR("**Data and eligibility.** SDPI will request BISP to share tehsil-wise beneficiary data in which women already trained under DFLT Phase I and II are marked in its PCMS. Before mobilisation, SDPI's customised DFLT App, already proven in DFLT Phase II,^11^ will check each beneficiary and exclude those already trained under DFLT and those who are not active BISP beneficiaries."),
  P("**Mobilisation and registration.** SDPI trainers will mobilise eligible women with the support of BISP tehsil office staff. On the day of the readiness session, each woman will complete a short registration survey on the DFLT App that records her socio-economic profile and segmentation variables. These data will form a standardised beneficiary snapshot (Table 3), which SDPI will report on its live dashboard by section and variable for each province, district and tehsil."),
  caption("Table 3: Proposed standardised beneficiary snapshot"),
  table(["Section", "Variables"], [
    ["Identity and eligibility", "CNIC, district, tehsil, union council, urban or rural, BISP status, DFLT I or II status"],
    ["Socio-economic profile", "Age, marital status, education, household size and type, occupation or home enterprise"],
    ["Device and connectivity", "Smartphone or USSD phone, ownership or access, BISP SIM in use, WhatsApp, network"],
    ["Wallet and transactions", "Assigned wallet, PIN set, last withdrawal and who assisted, any deduction faced"],
    ["Agency and preferences", "Who keeps the SIM and decides on the payment, ability to visit the agent alone, language"],
  ], [2400, 6626], { zebra: true }),
  P("**Segmentation layers.** SDPI proposes to segment beneficiaries on three layers:"),
  bulletR("**Geography.** Each tehsil will be classified as urban or rural, as agent access, connectivity, mobility and household norms differ between the two. SDPI applied the same 50:50 urban–rural design in DFLT Phase II,^12^ which it delivered in 147 tehsils across 81 districts (Figure 3).^13^"),
  bullet("**Device.** Women will be grouped by whether they use a smartphone or a USSD phone and, in each case, whether they own it or have access to a household handset. This will determine the digital channel through which each woman is reached."),
  bullet("**Capability.** At the end of the readiness session, the trainer will identify women who are already capable of transacting, for example a woman running a business from home who already sends and receives money. SDPI will validate the trainer's judgement through a capability matrix on the App that considers phone ownership, education, prior transactions and the readiness task check. These women will follow the digital capability track, while remaining free to attend the physical session if they wish."),
  figure(FIG("fig_dflt2_tehsil_map.png"), 470),
  caption("Figure 3: DFLT Phase II training tehsils delivered by SDPI, by urban and rural segmentation"),
  source("Source: SDPI DFLT Phase II database (254,648 registrations); Pakistan Bureau of Statistics, Census 2023. Tehsils are shown within their district."),
  PR("SDPI will maintain the 70:30 composition for each province as a whole, allowing it to vary within the province: urban pockets such as Lahore^14^ are expected to carry a larger digital share, and remote rural tehsils a smaller one."),

  // 3.1(c)
  H2("3.1(c) Task-Based, Action-Oriented Curriculum"),
  PR("SDPI proposes a curriculum that teaches tasks rather than concepts. It will focus on the high-impact behaviours set out in the RFP (receiving payments, PIN use, safe cash-out, fraud awareness and grievance redressal)^15^ and then on using the account beyond cash-out. The readiness session will prepare the woman to receive and protect her payment; the capability session will enable her to withdraw and use it (Table 4). A module will be complete only when she performs the task herself."),
  caption("Table 4: Proposed curriculum outline"),
  table(["Session", "Module", "On completion, the beneficiary can…"], [
    ["Readiness", "My SIM, my account", "Keep her BISP SIM active and never hand it over"],
    ["", "Receiving my payment", "Recognise the 8171 message and check her balance"],
    ["", "My PIN, my secret", "Refuse PIN and OTP requests and identify scam calls"],
    ["", "My rights at the agent", "Insist on her full payment and know how to complain"],
    ["Capability", "Safe cash-out", "Withdraw her full payment with her own PIN and count the cash"],
    ["", "Beyond cash-out", "Send money, pay a bill and keep savings in the wallet"],
    ["", "Staying safe", "Handle fraud situations and lodge a complaint"],
    ["", "My money, my decision", "Plan the use of her payment within the household"],
  ], [1500, 2500, 5026], { align: [LEFT] }),
  P("SDPI will deliver the curriculum through four action-oriented methods:"),
  bullet("**Trainer-versus-beneficiary role play.** The trainer will act as a retail agent: \"Your payment has arrived; pay me one thousand rupees as my fee.\" The trainer then pauses, and the cohort decides whether, and how much, the beneficiary should pay."),
  bullet("**Group activities.** In the capability session, the cohort of 30 will be divided into five groups that rotate through a role play, a scenario and a life situation drawn from everyday experience."),
  bullet("**Worksheets.** In a group worksheet, beneficiaries will solve the payment journey as a puzzle, placing its steps in order from receiving the 8171 message to collecting the full amount. A pictorial right-and-wrong worksheet will ask them to mark correct and incorrect actions, such as telling the agent their PIN."),
  bulletR("**Transaction simulation.** Under BISP's district model, each district is served by an assigned bank wallet.^16^ SDPI will equip each trainer with a tablet carrying a simulator that reproduces the USSD button screens and app interface of that wallet, allowing every group to complete near-real withdrawals, transfers and bill payments without any money moving. Women with their own phones will also practise on their handsets."),

  // 3.1(d)
  H2("3.1(d) Localisation across Languages, Literacy Levels and Geographies"),
  P("SDPI will localise all content in five languages: Urdu, Sindhi, Pashto, Brahvi and Marwari. Trainers will be recruited locally so that sessions are conducted in the cohort's own language. Every task will be teachable without reading, through pictures, icons, numerals, audio and demonstration, and content will reflect each district's assigned wallet and local settings. SDPI will pre-test all localised material with beneficiaries before submitting it for approval."),

  // 3.1(e)
  H2("3.1(e) Blended Content Package"),
  P("SDPI will design a full blended content package covering both physical and digital channels, and will submit all content to Karandaaz and BISP for approval before deployment."),
  PR("**Physical content.** SDPI will develop facilitator and trainer guides for each session. Beneficiaries will receive a 20-page pictorial handbook, condensed from the 72-page pictorial handbook that SDPI developed and printed for DFLT Phase II,^17^ together with job aids and printed flyers on fraud warning signs and complaint channels. Sessions will use demonstration toolkits and the simulation tablets."),
  PR("**Digital content.** SDPI proposes to match digital reinforcement to the device each woman uses. Women with a smartphone, whether owned or accessed, will first be checked for a valid WhatsApp number, and the trainer will help open an account where needed. They will receive three short videos and four messages through WhatsApp in each four-week window, without IVR calls, since WhatsApp is the lower-cost channel. Women with a USSD phone will receive four IVR calls and three SMS in each window. Robocall reminders and human follow-up calls will reach all beneficiaries. The videos will build on the 12 animated DFLT videos that SDPI developed in collaboration with BISP for DFLT Phase I,^18^ and e-guide versions of the handbook will be shared through WhatsApp."),
  P("Each IVR call will be a short audio drama in the beneficiary's language that teaches one rule and tests it with a keypad question. For example:"),
  quote("Agent: \"Baji, tell me your PIN and I will do it for you.\" Naila: \"No, brother. I will enter my PIN myself.\" Narrator: \"Your PIN is the key to your money. Never share it with anyone. If someone asks for your PIN, press 1 to share it, or press 2 to refuse.\""),

  // 3.1(f)
  H2("3.1(f) Gender-Intentional Content"),
  PR("SDPI will build gender-intentional content into every material and channel rather than treating it as a separate module. In DFLT Phase II, all of SDPI's pictorial content was led by women characters, and the handbook's protagonists, Naila and Shumaila and Akbari and Asghari,^19^ became widely popular among BISP beneficiaries, who saw themselves in their story of learning and taking decisions. SDPI will carry these characters across the handbook, videos, IVR dramas and flyers, using them to address women's right to receive and control their own payment, keeping the SIM and PIN under their own control when a phone is shared, fraud that targets women, and navigating household decisions about the payment."),

  // 3.1(g)
  H2("3.1(g) Training of Trainers"),
  new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: "[Section to follow]", italics: true, color: "7F7F7F" })] }),

  // 3.1(h)
  H2("3.1(h) Peer Educator Model"),
  P("To support last-mile learning and confidence building, SDPI proposes that each trainer engages one female peer educator, who may belong to the trainer's household or the local community, or be the literate daughter of a beneficiary. The peer educator will support mobilisation, help women set up WhatsApp and practise their balance check, share digital content with women who do not have a phone, and follow up with those who miss a session. In addition, each trainer will hold a monthly community session at a payment checkpoint, coaching women at the point of withdrawal and reinforcing safe transaction practices."),
];

const doc = new d.Document({
  creator: "SDPI", title: "Component 1: Diagnostic, Curriculum Design and Capacity Building",
  styles, numbering, footnotes,
  sections: [{ properties: { page }, footers: { default: footer() }, children }],
});
save(doc, path.join(__dirname, "..", "Component 1 - Diagnostic, Curriculum Design and Capacity Building.docx"));
