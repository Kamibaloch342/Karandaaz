// Builds "Component 1 - Diagnostic, Curriculum Design and Capacity Building.docx"
const fs = require("fs");
const path = require("path");
const L = require("./lib");
const { d, P, H1, H2, H3, bullet, caption, source, table, figure, styles, numbering, footer, page, save } = L;
const { Paragraph, TextRun, AlignmentType } = d;
const FIG = f => path.join(__dirname, "..", "figures", f);
const C = AlignmentType.CENTER;

const fn = t => ({ children: [new Paragraph({ children: [new TextRun({ text: t, size: 16 })] })] });
const footnotes = {
  1: fn("The questionnaires of the DFLT National Pilot (2023–24), DFLT Phase I and DFLT Phase II are attached in Annex A."),
  2: fn("Phase I figures are from the baseline household survey; Phase II figures are from registration profiles and trainer-recorded cohort diagnostics, collected after BISP began issuing SIMs to beneficiaries. Provincial snapshots can be provided on request."),
  3: fn("District and tehsil classification follows the urban share recorded in the Pakistan Bureau of Statistics Census 2023 (Annex B)."),
  4: fn("The DFLT informational videos developed by SDPI in collaboration with BISP are available at https://drive.google.com/drive/folders/14YuNgn4AHUPPUru1nSN6D8wzhhsuMiLw"),
};

const placeholderFig = text => new Paragraph({ alignment: C, spacing: { before: 120, after: 40 },
  border: { top: { style: d.BorderStyle.DASHED, size: 6, color: "A6A6A6" }, bottom: { style: d.BorderStyle.DASHED, size: 6, color: "A6A6A6" } },
  children: [new TextRun({ text, italics: true, color: "7F7F7F" })] });

const children = [
  H1("3.1 Component 1: Diagnostic, Curriculum Design and Capacity Building"),
  P("This component establishes where BISP beneficiaries stand, groups them according to what they need, and builds the curriculum, content and trainer capacity through which the programme will be delivered. It draws on the evidence SDPI has generated across the DFLT National Pilot, DFLT Phase I and DFLT Phase II."),

  // 3.1(a)
  H2("3.1(a) Rapid Baseline Assessment"),
  P("A rapid baseline assessment will evaluate beneficiaries' digital and financial capabilities, transaction behaviours, gender-related constraints (mobility, trust and household dynamics), device access and digital connectivity, and will inform the blended modality mix before roll-out begins."),
  P("**Existing evidence.** SDPI holds baseline data on BISP women from three earlier rounds: the DFLT National Pilot (2023–24, 7,000 beneficiaries), the DFLT Phase I impact evaluation (2024–25, baseline of 5,370 women in 8 districts and 16 tehsils) and the DFLT Phase II national roll-out (2025–26, 254,648 registered women in 100 districts). Table 1 presents the national snapshot from these sources.", { fn: 1 }),
  caption("Table 1: Baseline snapshot of BISP beneficiary women"),
  table(["Indicator", "DFLT Phase I baseline (n = 5,370)", "DFLT Phase II (n = 254,648)"], [
    { band: "Device access and digital capability" },
    ["Owns a mobile phone", "41.9%", "77.0%"],
    ["WhatsApp on her own number", "–", "41.4%"],
    ["Can use the phone calculator", "13.0%", "11.5%"],
    { band: "Financial capability and transaction behaviour" },
    ["Has a mobile money account or wallet", "12.6%", "29.0%"],
    ["Has ever transacted on a wallet", "–", "4.0%"],
    ["Has a bank account", "–", "9.0%"],
    { band: "Fraud awareness" },
    ["Would end a call asking for her PIN and contact BISP", "36.3%", "–"],
    ["Recognises 8171 as BISP's official SMS code", "–", "80.0%"],
    { band: "Literacy and household dynamics" },
    ["Can read and write", "–", "19.8%"],
    ["Takes household financial decisions herself", "15.0%", "–"],
  ], [5026, 2000, 2000], { align: [AlignmentType.LEFT, C, C] }),
  source("Source: SDPI, DFLT Phase I Impact Evaluation; SDPI DFLT Phase II database."),
  P("The evidence points to **access without use**: most women can reach a phone and a growing share hold a wallet, but very few transact on their own.", { fn: 2 }),
  P("**Capability scale.** To show where beneficiaries stand on a scale of 1 to 10, SDPI will use a ten-step Capability Ladder in which each step is a task a woman can perform independently (Table 2). Existing evidence places the typical BISP beneficiary at step 2 or 3. The baseline will position each province, and its urban and rural tehsils, on the ladder, and the same scale will be used to track progress throughout the programme."),
  caption("Table 2: DFLT Capability Ladder"),
  table(["Level", "Step", "The beneficiary can independently…"], [
    ["Readiness", "1", "Keep her BISP SIM active in a working handset"],
    ["", "2", "Recognise a genuine BISP payment message (8171)"],
    ["", "3", "Protect her PIN and refuse anyone who asks for it"],
    ["", "4", "Check her balance through USSD or the app"],
    ["Safe cash-out", "5", "Know her full entitlement and refuse an agent deduction"],
    ["", "6", "Withdraw her full payment, entering her own PIN"],
    ["", "7", "Report a problem through the BISP helpline or tehsil office"],
    ["Active use", "8", "Send money or pay a bill from her wallet"],
    ["", "9", "Keep part of her payment in the wallet as savings"],
    ["", "10", "Use two or more services regularly and help other women"],
  ], [1700, 800, 6526], { align: [AlignmentType.LEFT, C] }),
  P("**Methodology.** As a large quantitative profile already exists, the baseline will be qualitative and conducted at provincial level through focus group discussions (FGDs). All four provinces will be covered through eight zones: North, Central and South Punjab; North and South Khyber Pakhtunkhwa; Upper and Lower Sindh; and Quetta in Balochistan. One district will be selected in each zone and two tehsils in each district, one urban and one rural (Figure 1). In each tehsil, FGDs will be held with beneficiary women and with men of beneficiary households, using guides adapted from the DFLT Phase I instruments."),
  figure(FIG("fig_fgd_sampling_frame.png"), 590),
  caption("Figure 1: Sampling frame for the rapid baseline assessment"),
  P("The FGDs will examine each assessment variable: how women use their phones, how they collect their payments and from whom they seek help, what deductions they face, who controls the SIM and the cash, and network and charging conditions. The findings, together with a provincial snapshot, will be presented at the inception meeting in Month 1."),

  // 3.1(b)
  H2("3.1(b) Segmenting Beneficiaries into Actionable Groups"),
  P("Segmentation determines which session each woman attends, which digital channel reaches her and how much in-person support she needs. It is built into the registration process (Figure 2)."),
  P("**From BISP data to registration.** BISP will provide tehsil-wise beneficiary lists in which women already trained under DFLT Phase I and II are flagged. SDPI's customised DFLT App will check each beneficiary before mobilisation: women already trained under DFLT, and women who are not active BISP beneficiaries, are not enrolled. Trainers, supported by BISP tehsil offices, will mobilise eligible women, who are registered on Day 1 of the readiness session through a short survey that records their socio-economic profile (Table 3). The App then assigns each woman to a segment."),
  figure(FIG("fig_segmentation_flow.png"), 590),
  caption("Figure 2: Segmentation process"),
  P("**Segmentation layers.** Beneficiaries are segmented on three layers:"),
  new Paragraph({ children: [...L.runs("**Geography:** urban or rural tehsil, as mobility, agent access, connectivity and household norms differ between the two. DFLT Phase II training covered 163 tehsils in 103 districts on a 50:50 urban–rural basis (Figure 3)."), new d.FootnoteReferenceRun(3)], numbering: { reference: "bullets", level: 0 }, spacing: { after: 60, line: 264 } }),
  bullet("**Device:** smartphone or USSD (feature) phone, and in each case whether she owns the handset or has access to a household phone."),
  bullet("**Capability:** the trainer's assessment at the end of the readiness session, validated against a capability matrix on the App (own phone, literacy, prior independent transactions and the readiness task check). Women who already transact independently, for example those running a home business, are placed on the Digital Capability Track."),
  placeholderFig("[Map: DFLT Phase II training tehsils, with yellow markers for rural and red markers for urban tehsils]"),
  caption("Figure 3: DFLT Phase II training locations by rural and urban segmentation"),
  caption("Table 3: Standardised beneficiary snapshot recorded at registration"),
  table(["Section", "Variables"], [
    ["Identity and eligibility", "CNIC, district, tehsil, union council, rural or urban, BISP active status, DFLT I or II status"],
    ["Socio-economic profile", "Age, marital status, education, household size and type, occupation or home enterprise, disability"],
    ["Device and connectivity", "Phone type, ownership or access, BISP SIM in a working handset, WhatsApp, network at home"],
    ["Wallet and transactions", "Assigned wallet, PIN set, last withdrawal and who assisted, any deduction faced"],
    ["Agency", "Who keeps the SIM and phone, who decides on the use of the payment, ability to visit the agent alone"],
    ["Preferences", "Language and preferred call time"],
  ], [2400, 6626], { zebra: true }),
  P("The snapshot is reported on SDPI's live dashboard by section and variable for each province, district and tehsil."),
  P("**From segments to delivery.** Each Karandaaz phase (250,000, 400,000 and 350,000 beneficiaries) is delivered in two sub-phases, readiness and capability (Figure 4). Every beneficiary attends the readiness session in person. She then receives four weeks of digital reinforcement before returning, a month after her first session, for the capability session. Women on the Digital Capability Track receive the capability content digitally instead. The resulting physical-to-digital composition in the capability sub-phase is 70:30 for each province as a whole (Table 4); urban districts may sit above this share and remote rural districts below it."),
  figure(FIG("fig_beneficiary_journey.png"), 590),
  caption("Figure 4: Beneficiary journey through the readiness and capability sub-phases"),
  caption("Table 4: Beneficiaries by phase and sub-phase"),
  table(["Phase", "Readiness (physical)", "Capability (physical, 70%)", "Capability (digital, 30%)"], [
    ["Phase 1", "250,000", "175,000", "75,000"],
    ["Phase 2", "400,000", "280,000", "120,000"],
    ["Phase 3", "350,000", "245,000", "105,000"],
    ["**Total**", "**1,000,000**", "**700,000**", "**300,000**"],
  ], [2426, 2200, 2200, 2200], { align: [AlignmentType.LEFT, C, C, C] }),

  // 3.1(c)
  H2("3.1(c) Task-Based, Action-Oriented Curriculum"),
  P("The curriculum focuses on the high-impact behaviours of receiving payments, PIN use, safe cash-out, fraud awareness and grievance redressal, followed by the use of the account beyond cash-out. Each module targets one behaviour and is completed only when the woman performs the task (Table 5)."),
  caption("Table 5: Curriculum outline"),
  table(["Sub-phase", "Module", "Target behaviour", "Method"], [
    ["Readiness", "My SIM, my account", "Keeps the BISP SIM active in a working handset and never hands it over", "Demonstration with dummy SIM"],
    ["", "Receiving my payment", "Recognises the 8171 message and checks her balance", "Practice on her own phone"],
    ["", "My PIN, my secret", "Refuses PIN and OTP requests and identifies scam calls", "Role play; right-and-wrong worksheet"],
    ["", "My rights at the agent", "Knows there is no deduction and how to complain", "Role play"],
    ["Capability", "Safe cash-out", "Withdraws her full payment with her own PIN and counts the cash", "Transaction simulation"],
    ["", "Beyond cash-out", "Sends money, pays a bill and keeps savings in the wallet", "Simulation; group worksheet"],
    ["", "Staying safe and getting help", "Handles fraud scenarios and lodges a complaint", "Scenario cards; group activity"],
    ["", "My money, my decision", "Plans the use of her payment within the household", "Group discussion"],
  ], [1300, 2100, 3526, 2100], { zebra: false }),
  P("The curriculum is delivered through four action-oriented methods:"),
  bullet("**Trainer-versus-beneficiary role play.** The trainer plays a retail agent who demands a fee of PKR 1,000 and then pauses; the cohort decides whether the beneficiary should pay. The women reach the correct answer themselves."),
  bullet("**Group activities.** In the capability session, the cohort of 30 is divided into five groups that rotate through a role play, a scenario, a life situation and a worksheet."),
  bullet("**Worksheets.** Groups arrange picture cards into the correct sequence of a payment, from receiving the 8171 message to counting the cash, and complete pictorial right-and-wrong sheets on everyday situations, such as telling the agent one's PIN."),
  bullet("**Transaction simulation.** Each trainer carries a tablet with an offline simulator that reproduces the USSD and app screens of the wallet assigned to that district under BISP's district bank model. Women complete near-real withdrawals, transfers and bill payments without any money moving; those with their own phone also practise on their handset."),

  // 3.1(d)
  H2("3.1(d) Localisation across Languages, Literacy Levels and Geographies"),
  P("All content will be produced in Urdu, Sindhi, Pashto, Brahvi and Marwari, with trainers recruited locally to facilitate in the cohort's own language. Every task can be learnt without reading, through pictures, icons, numerals, audio and demonstration. Content is adapted to each district's assigned wallet and local agent networks, and illustrations reflect local settings. All localised material will be pre-tested with beneficiaries before submission for approval."),

  // 3.1(e)
  H2("3.1(e) Blended Content Package"),
  P("SDPI will design a full blended content package covering both physical and digital channels (Table 6). All content will be approved by Karandaaz and BISP prior to deployment."),
  caption("Table 6: Blended content package"),
  table(["Channel", "Content"], [
    ["Physical", "Facilitator and trainer guides for the readiness and capability sessions; a 20-page pictorial participant handbook, building on the DFLT Phase II handbook printed by SDPI; job aids, including a counter card and a district USSD code card; printed flyers on fraud warning signs and complaint channels; demonstration toolkits (dummy SIMs, printed wallet screens, flow charts, worksheets); and simulation tablets"],
    ["Digital", "IVR scripts; SMS nudge sequences; short instructional and animated videos, building on the 12 DFLT videos developed by SDPI in collaboration with BISP; digital media awareness materials; and e-guide versions of the handbook and job aids shared through WhatsApp"],
  ], [1600, 7426], { zebra: false }),
  P("The digital content each woman receives depends on her device (Table 7). Women with a smartphone receive videos and messages through WhatsApp, which is lower in cost, while women with a USSD phone receive IVR calls and SMS. Robocalls and a human follow-up call reach all beneficiaries.", { fn: 4 }),
  caption("Table 7: Digital reinforcement by device"),
  table(["Device", "After readiness (4 weeks)", "After capability (4 weeks)", "Total"], [
    ["Smartphone (own or access)", "3 videos, 4 WhatsApp messages", "3 videos, 4 WhatsApp messages", "6 videos, 8 messages"],
    ["USSD phone (own or access)", "4 IVR calls, 3 SMS", "4 IVR calls, 3 SMS", "8 IVR calls, 6 SMS"],
  ], [2526, 2300, 2300, 1900], { align: [AlignmentType.LEFT, C, C, C] }),
  P("Each IVR call is a short audio drama in the beneficiary's language that teaches one rule and tests it with a keypad question, as in the example below."),
  caption("Sample IVR script: \"Your PIN, your secret\""),
  table(["Step", "Message"], [
    ["Introduction", "\"This is a message from BISP's training programme. If this phone belongs to someone else, please hand it to her.\""],
    ["Story", "Agent: \"Baji, tell me your PIN and I will do it for you.\" Naila: \"No brother, I will enter my PIN myself.\""],
    ["Rule", "\"Your PIN is the key to your money. Never tell it to anyone, not the agent, a caller or a relative.\""],
    ["Question", "\"If a caller asks for your PIN, press 1 to tell him or 2 to refuse and hang up.\" (Pressing 1 plays a correction.)"],
    ["Help", "\"To complain, call the BISP helpline or visit your BISP tehsil office. Press 5 to hear this message again.\""],
  ], [1600, 7426], { zebra: true }),

  // 3.1(f)
  H2("3.1(f) Gender-Intentional Content"),
  P("Gender is built into all content rather than added as a separate module. In DFLT Phase II, all pictorial content was led by women characters, and the handbook's protagonists, Naila and Shumaila and Akbari and Asghari, became widely popular among BISP beneficiaries, who saw themselves in their story of learning and taking decisions. These characters will carry the Phase III content across the handbook, videos, IVR dramas and flyers, covering women's right to receive and control their own payment, keeping the SIM and PIN under their own control when the phone is shared, fraud that targets women, and navigating household decisions about the payment."),

  // 3.1(g)
  H2("3.1(g) Training of Trainers"),
  new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: "[Section to follow]", italics: true, color: "7F7F7F" })] }),

  // 3.1(h)
  H2("3.1(h) Peer Educator Model"),
  P("To support last-mile learning and confidence building, each trainer will engage a female peer educator from the community, such as a literate daughter of a beneficiary or a trusted woman known to the trainer. The peer educator supports mobilisation, helps women set up WhatsApp and practise their balance check, shares digital content with women who do not have a phone, and follows up with those who miss a session. In addition, each trainer will hold a monthly community session at a payment touchpoint, coaching women at the point of withdrawal and reinforcing safe transaction practices."),
];

const doc = new d.Document({
  creator: "SDPI", title: "Component 1: Diagnostic, Curriculum Design and Capacity Building",
  styles, numbering, footnotes,
  sections: [{ properties: { page }, footers: { default: footer() }, children }],
});
save(doc, path.join(__dirname, "..", "Component 1 - Diagnostic, Curriculum Design and Capacity Building.docx"));
