// Builds "Component 1 - Diagnostic, Curriculum Design and Capacity Building.docx"
const path = require("path");
const L = require("./lib");
const { d, P, H1, H2, H3, bullet, caption, source, table, figure, styles, numbering, footer, page, save } = L;
const { Paragraph, TextRun, AlignmentType, FootnoteReferenceRun } = d;
const FIG = f => path.join(__dirname, "..", "figures", f);
const C = AlignmentType.CENTER, LEFT = AlignmentType.LEFT;

// Footnote text: plain strings, with {url} segments rendered as clickable links.
const fn = t => ({ children: [new Paragraph({ children: t.split(/(\{[^}]+\})/).filter(Boolean).map(seg => seg.startsWith("{")
  ? new d.ExternalHyperlink({ link: seg.slice(1, -1), children: [new TextRun({ text: seg.slice(1, -1), size: 16, style: "Hyperlink", color: "0563C1", underline: {} })] })
  : new TextRun({ text: seg, size: 16 })) })] });
const footnotes = {
  1: fn("SDPI, DFLT Phase II database. Phone ownership (77.0%) and mobile money accounts (29.0%) are from the registration records of 254,648 women. Wallet transactions (4.2%), bank accounts (1.6%) and ATM use (1.2%) are from counts recorded by trainers at the start of Day 1 in 6,306 training sessions covering 187,296 registered women. Records of terminated trainers and sessions with inconsistent counts are excluded."),
  2: fn("Karandaaz Pakistan, RFP No. 194, Section 4, Sub-section 5 (Project Timeline and Deliverables): D5 Phase 1, approximately 250,000; D7 Phase 2, approximately 400,000; D9 Phase 3, approximately 350,000 beneficiaries."),
  3: fn("Karandaaz Pakistan, RFP No. 194, Section 4, Sub-section 3A (Blended Training Deployment Strategy): indicative share of approximately 65–70% physical and 30–35% digital delivery."),
  4: fn("Karandaaz Pakistan, RFP No. 194, Section 4, Sub-section 3 (Scope of Services), Component 1: Diagnostic, Curriculum Design and Capacity Building."),
  5: fn("SDPI conducted the monitoring and evaluation of the national DFLT pilot for GIZ from 14 December 2023 to 31 March 2024, covering 7,000 beneficiaries."),
  6: fn("SDPI, Impact Evaluation of the Digital and Financial Literacy Training (DFLT) Phase I, August 2026: randomised controlled trial with difference-in-differences estimation; baseline of 5,370 and endline of 4,827 women in 8 districts and 16 tehsils."),
  7: fn("SDPI, DFLT Phase II Progress Review, August 2026: 259,717 women trained against a target of 250,000, each verified against her CNIC and NSER record (data as of 4 August 2026)."),
  8: fn("Phase I figures are from the baseline survey of the DFLT Phase I impact evaluation (footnote 6). Phase II figures are from the registration records and Day-1 session counts described in footnote 1. The questionnaires of the DFLT National Pilot, DFLT Phase I and DFLT Phase II are attached in Annex A."),
  9: fn("Based on Table 1: fewer than one in five women can read and write, and 4.2% have made a wallet transaction."),
  10: fn("The DFLT Phase I impact evaluation used a three-stage cluster design: four provinces, two districts per province and two tehsils per district, balanced between urban and rural areas (footnote 6)."),
  11: fn("In DFLT Phase II the DFLT App recorded 17,797 training sessions with GPS coordinates and photographs, matched a CNIC photograph of each graduate to her registration, and confirmed her status against BISP's NSER (SDPI, DFLT Phase II Progress Review, August 2026)."),
  12: fn("SDPI, DFLT Phase II Proposal, 2025, Size and Scope: target of 50% rural and 50% urban locations. For Figure 3, each tehsil is matched to its urban population share in the Pakistan Bureau of Statistics Census 2023 ({https://www.pbs.gov.pk/}) and the tehsils are divided into two equal halves: the 73 tehsils with an urban share of 22.8% or more are shown as urban and the remaining 74 as rural."),
  13: fn("Counted from the SDPI DFLT Phase II registration database after harmonising tehsil and district names. The DFLT Phase II Progress Review (August 2026) reports 158 tehsils in 100 districts as recorded in the field system."),
  14: fn("Lahore district is recorded as 100% urban in the Pakistan Bureau of Statistics Census 2023 (Annex B)."),
  15: fn("Karandaaz Pakistan, RFP No. 194, Section 4, Sub-section 3, Component 1: \"Develop a task-based, action-oriented curriculum focused on high-impact behaviours (e.g., receiving payments, PIN use, safe cash-out, fraud awareness, grievance redressal).\""),
  16: fn("BISP assigns a partner bank to each district for wallet-based payments; banks currently operating include the Bank of Punjab, Bank Alfalah, Mobilink Microfinance Bank and Telenor Microfinance Bank (SDPI consultations with BISP, October 2026)."),
  17: fn("SDPI developed and printed the DFLT handbook for DFLT Phase II and, with the approval of GIZ, handed over 110,000 copies to BISP for the national roll-out (SDPI, DFLT Phase II Proposal, amended July 2026)."),
  18: fn("In DFLT Phase I, 12 animated videos were shared over six weeks through WhatsApp with 1,748 beneficiaries in 16 tehsils (footnote 6); in DFLT Phase II, SDPI's animated videos reached 131,000 beneficiaries through the WhatsApp Business API. The videos are available at {https://drive.google.com/drive/folders/14YuNgn4AHUPPUru1nSN6D8wzhhsuMiLw}"),
  19: fn("SDPI, DFLT Phase II Proposal, 2025, Rollout of training to Beneficiaries: role-play sessions based on the handbook characters Naila and Shumaila and Akbari and Asghari."),
};
// Text with footnote markers: "sentence.^3^" places footnote 3 at that point.
const R = text => text.split(/(\^\d+\^)/).filter(Boolean).flatMap(seg => /^\^\d+\^$/.test(seg) ? [new FootnoteReferenceRun(+seg.slice(1, -1))] : L.runs(seg));
const PR = text => P(R(text));
const bulletR = text => new Paragraph({ children: R(text), numbering: { reference: "bullets", level: 0 }, spacing: { after: 60, line: 264 } });
const quote = t => new Paragraph({ children: [new TextRun({ text: t, italics: true, size: 20 })], indent: { left: 567, right: 567 },
  spacing: { before: 60, after: 100, line: 264 }, alignment: AlignmentType.JUSTIFIED });

const children = [
  H1("3.1 Component 1: Diagnostic, Curriculum Design and Capacity Building"),
  P("This component covers the rapid baseline assessment, the segmentation of beneficiaries, the curriculum and content package, the Training of Trainers and the peer educator model. This section describes how SDPI will deliver each of these and the evidence on which the design is based."),

  H3("Context"),
  PR("BISP now disburses its payments to SIM-based wallets registered in the beneficiary's own name. Access to an account has not yet become use of the account. Of the 254,648 women registered by SDPI in DFLT Phase II, 77% owned a mobile phone and 29% reported a mobile money account. Among the 187,296 women for whom trainers recorded skills at the start of the first session, 4.2% had made a wallet transaction, 1.6% had a bank account and 1.2% could withdraw cash from an ATM.^1^ Most beneficiaries still rely on retail agents or relatives to withdraw their payments. The training is therefore designed to enable each beneficiary to receive, protect and withdraw her payment herself, and to use the complaint mechanism when required."),

  H3("Overview of the training model"),
  PR("The programme will train 1,000,000 beneficiaries in the three phases set out in the RFP: 250,000, 400,000 and 350,000.^2^ Each phase will be delivered in two sub-phases (Figure 1)."),
  P("**Readiness.** Each beneficiary will attend one in-person session in a cohort of 30 led by one trainer. She will be registered on the DFLT App and trained to keep her SIM active, recognise the 8171 payment message, check her balance and protect her PIN. Over the following four weeks she will receive digital reinforcement through IVR calls, SMS, WhatsApp messages, short videos, robocalls and a follow-up call."),
  P("**Capability.** One month after the readiness session, the same cohort will return for a second in-person session on withdrawing and using the payment, delivered through transaction simulations, role plays and group activities, and followed by four further weeks of digital reinforcement. Beneficiaries assessed at the readiness session as already able to transact will receive the capability content through digital channels only."),
  PR("All beneficiaries will therefore attend the readiness sub-phase in person. In the capability sub-phase, about 70% will attend in person and about 30% will be served digitally, in line with the indicative split in the RFP.^3^"),
  figure(FIG("fig_beneficiary_journey.png"), 600),
  caption("Figure 1: Training model"),

  // 3.1(a)
  H2("3.1(a) Rapid Baseline Assessment"),
  PR("SDPI will conduct a rapid baseline assessment of beneficiaries' digital and financial capabilities, transaction behaviours, gender-related constraints (mobility, trust and household dynamics), device access and digital connectivity, as required under Component 1 of the RFP.^4^ The findings will inform the curriculum and the blended modality mix for each province and will be reported in the Inception Report."),
  H3("Existing evidence"),
  PR("SDPI has assessed BISP beneficiaries in three earlier programmes: the monitoring and evaluation of the DFLT National Pilot (2023–24),^5^ the DFLT Phase I impact evaluation (2024–25)^6^ and the DFLT Phase II national roll-out (2025–26).^7^ Table 1 summarises the national findings. Provincial figures are available from the same sources.^8^"),
  caption("Table 1: Baseline snapshot of BISP beneficiary women"),
  table(["Indicator", "DFLT Phase I baseline (n = 5,370)", "DFLT Phase II registration (n = 254,648)", "DFLT Phase II Day-1 count (n = 187,296)"], [
    { band: "Device access" },
    ["Owns a mobile phone", "41.9%", "77.0%", "–"],
    ["No phone of her own, but access to a household phone", "–", "20.4%", "–"],
    ["Has WhatsApp on her own number", "–", "41.4%", "–"],
    { band: "Financial access and transaction behaviour" },
    ["Has a mobile wallet or mobile money account", "12.6%", "29.0%", "18.1%"],
    ["Has made a wallet transaction", "–", "–", "4.2%"],
    ["Has a bank account", "–", "–", "1.6%"],
    ["Can withdraw cash from an ATM", "–", "–", "1.2%"],
    { band: "Literacy, numeracy and agency" },
    ["Can read and write", "–", "–", "18.0%"],
    ["Can do simple calculations", "64.3%", "–", "43.8%"],
    ["Can use the phone calculator", "13.0%", "–", "10.0%"],
    ["Would refuse a caller asking for her PIN", "36.3%", "–", "–"],
    ["Takes household financial decisions herself", "15.0%", "–", "–"],
  ], [3926, 1700, 1700, 1700], { align: [LEFT, C, C, C] }),
  source("Source: SDPI, DFLT Phase I Impact Evaluation; SDPI, DFLT Phase II database."),
  H3("Capability scale"),
  PR("To report where beneficiaries stand on a scale of 1 to 10, SDPI will use a ten-step Capability Ladder (Table 2). Each step is a task the beneficiary can perform without assistance; her position on the ladder is the highest step she can complete. On the evidence in Table 1, most beneficiaries currently stand at step 2 or 3.^9^ The ladder will be applied at registration, at the end of each sub-phase and at endline, so that progress is reported on one scale."),
  caption("Table 2: Capability Ladder"),
  table(["Step", "The beneficiary can, without assistance…"], [
    { band: "Readiness" },
    ["1", "Keep her BISP SIM active in a working handset"],
    ["2", "Recognise a genuine BISP payment message from 8171"],
    ["3", "Protect her PIN and refuse anyone who asks for it"],
    ["4", "Check her balance"],
    { band: "Safe cash-out" },
    ["5", "State her full entitlement and refuse an agent deduction"],
    ["6", "Withdraw her full payment, entering her own PIN"],
    ["7", "Report a problem through the BISP helpline or tehsil office"],
    { band: "Active use" },
    ["8", "Send money or pay a bill from her wallet"],
    ["9", "Keep part of her payment in the wallet as savings"],
    ["10", "Use two or more services regularly and assist other women"],
  ], [900, 8126], { align: [C, LEFT] }),
  H3("Methodology"),
  PR("Given the quantitative evidence already available, the baseline will be qualitative. Focus group discussions (FGDs) will be held in all four provinces, organised in eight zones: North, Central and South Punjab; North and South Khyber Pakhtunkhwa; Upper and Lower Sindh; and Quetta in Balochistan. One district will be selected in each zone and two tehsils in each district, one urban and one rural, giving 16 tehsils (Figure 2). In each tehsil, FGDs will be held with beneficiary women and with men of beneficiary households. The design follows the cluster sampling used in the DFLT Phase I impact evaluation.^10^ Discussion guides will cover the variables listed above. The findings will be presented at the inception meeting in Month 1."),
  figure(FIG("fig_fgd_sampling_frame.png"), 580),
  caption("Figure 2: Sampling frame of the rapid baseline assessment"),

  // 3.1(b)
  H2("3.1(b) Segmenting Beneficiaries into Actionable Groups"),
  P("SDPI will segment beneficiaries into groups that determine the session each woman attends, the digital channel through which she is reached and the follow-up she receives. Segmentation will be carried out through the registration process and will not require a separate exercise."),
  H3("Beneficiary data and eligibility"),
  PR("BISP will share tehsil-wise beneficiary data, with women trained under DFLT Phase I and II marked in its PCMS. The DFLT App, which SDPI used for registration and verification in DFLT Phase II,^11^ will check each record before mobilisation. Women already trained under DFLT and women who are not active BISP beneficiaries will not be enrolled."),
  H3("Mobilisation and registration"),
  P("Trainers will mobilise eligible women with the support of BISP tehsil office staff. At the readiness session, each woman will be registered on the DFLT App through a short survey covering the variables in Table 3. The resulting profile will be reported on SDPI's dashboard by section and variable for each province, district and tehsil."),
  caption("Table 3: Beneficiary profile recorded at registration"),
  table(["Section", "Variables"], [
    ["Identity and eligibility", "CNIC, district, tehsil, union council, urban or rural, BISP status, DFLT I or II status"],
    ["Socio-economic profile", "Age, marital status, education, household size and type, occupation or home enterprise"],
    ["Device and connectivity", "Smartphone or USSD phone, ownership or access, BISP SIM in use, WhatsApp, network"],
    ["Wallet and transactions", "Assigned wallet, PIN set, last withdrawal and who assisted, any deduction faced"],
    ["Agency and preferences", "Who keeps the SIM and decides on the payment, ability to visit the agent alone, language"],
  ], [2400, 6626], { zebra: true }),
  H3("Segmentation layers"),
  P("Beneficiaries will be segmented on three layers:"),
  bulletR("**Geography.** Each tehsil will be classified as urban or rural. Agent access, connectivity, mobility and household norms differ between the two. DFLT Phase II was designed on a 50:50 urban–rural basis^12^ and was delivered in 147 tehsils across 81 districts (Figure 3).^13^"),
  bullet("**Device.** Beneficiaries will be grouped by the phone they use, smartphone or USSD phone, and by whether they own it or have access to a household handset. This determines the digital channel through which each beneficiary is reached."),
  bullet("**Capability.** At the end of the readiness session, the trainer will record whether a beneficiary already performs transactions independently, for example a woman who runs a home-based business and sends and receives payments herself. The trainer's assessment will be checked against a matrix in the App covering phone ownership, education, prior transactions and the readiness task check. Beneficiaries who meet the matrix will receive the capability content digitally; they may attend the in-person session if they wish."),
  figure(FIG("fig_dflt2_tehsil_map.png"), 470),
  caption("Figure 3: DFLT Phase II training tehsils by urban and rural segmentation"),
  source("Source: SDPI DFLT Phase II database (254,648 registrations); Pakistan Bureau of Statistics, Census 2023. Tehsils are shown within their district."),
  PR("The 70:30 split applies to each province as a whole. Within a province, the digital share will be higher in urban districts such as Lahore^14^ and lower in remote rural tehsils."),

  // 3.1(c)
  H2("3.1(c) Task-Based, Action-Oriented Curriculum"),
  PR("SDPI will develop a task-based curriculum focused on the high-impact behaviours identified in the RFP: receiving payments, PIN use, safe cash-out, fraud awareness and grievance redressal,^15^ followed by the use of the account beyond cash-out. Each module is defined by a task that the beneficiary performs during the session (Table 4). The readiness session covers receiving and protecting the payment; the capability session covers withdrawing and using it."),
  caption("Table 4: Curriculum outline"),
  table(["Session", "Module", "On completion, the beneficiary can…"], [
    ["Readiness", "My SIM, my account", "Keep her BISP SIM active and not hand it over"],
    ["", "Receiving my payment", "Recognise the 8171 message and check her balance"],
    ["", "My PIN, my secret", "Refuse PIN and OTP requests and identify scam calls"],
    ["", "My rights at the agent", "Insist on her full payment and know how to complain"],
    ["Capability", "Safe cash-out", "Withdraw her full payment with her own PIN and count the cash"],
    ["", "Beyond cash-out", "Send money, pay a bill and keep savings in the wallet"],
    ["", "Staying safe", "Respond to fraud situations and lodge a complaint"],
    ["", "My money, my decision", "Plan the use of her payment within the household"],
  ], [1500, 2500, 5026], { align: [LEFT] }),
  H3("Training methods"),
  P("The curriculum will be delivered through four methods:"),
  bullet("**Role play.** The trainer takes the role of a retail agent and asks the beneficiary for a fee of PKR 1,000 to release her payment. The session pauses and the cohort decides how the beneficiary should respond and what, if anything, she is required to pay."),
  bullet("**Group activities.** In the capability session, the cohort of 30 is divided into five groups, which rotate through a role play, a scenario exercise and a discussion of a situation drawn from daily life."),
  bullet("**Worksheets.** A group worksheet presents the steps of a payment, from receiving the 8171 message to collecting the full amount, as a sequence to be placed in order. A pictorial right-and-wrong worksheet asks beneficiaries to mark correct and incorrect actions, such as telling an agent her PIN."),
  bulletR("**Transaction simulation.** Each district is served by the bank wallet assigned to it under BISP's arrangements with its partner banks.^16^ Each trainer will carry a tablet with a simulator of the USSD menus and application screens of the wallet used in her district. Beneficiaries will complete practice withdrawals, transfers and bill payments in which no money is transferred. Beneficiaries with their own phones will also practise on their handsets."),

  // 3.1(d)
  H2("3.1(d) Localisation across Languages, Literacy Levels and Geographies"),
  P("Content will be produced in Urdu, Sindhi, Pashto, Brahvi and Marwari. Trainers will be recruited from the areas they serve and will deliver sessions in the language of the cohort. All materials will be designed for beneficiaries who cannot read, using pictures, icons, numerals, audio and demonstration. Examples, wallet interfaces and illustrations will be adapted to each district. Localised materials will be pre-tested with beneficiaries before submission for approval."),

  // 3.1(e)
  H2("3.1(e) Blended Content Package"),
  P("SDPI will develop the content package specified in the RFP for both physical and digital channels. All content will be submitted to Karandaaz and BISP for approval before use."),
  H3("Physical content"),
  PR("Facilitator and trainer guides will be prepared for the readiness and capability sessions. Each beneficiary will receive a 20-page pictorial handbook, derived from the 72-page handbook developed and printed by SDPI for DFLT Phase II,^17^ together with job aids and printed flyers on fraud warning signs and complaint channels. Sessions will use demonstration toolkits and the simulation tablets."),
  H3("Digital content"),
  PR("Digital content will be assigned according to the beneficiary's device. For beneficiaries with a smartphone, whether owned or accessed through the household, the trainer will verify the WhatsApp number at registration and help set up an account where needed. These beneficiaries will receive three short videos and four WhatsApp messages in each four-week period; IVR calls will not be used for this group, as WhatsApp delivery costs less. Beneficiaries with a USSD phone will receive four IVR calls and three SMS in each period. Robocall reminders and follow-up calls will be made to all beneficiaries. The videos will build on the 12 animated videos developed by SDPI with BISP for DFLT Phase I,^18^ and e-guide versions of the handbook will be distributed through WhatsApp."),
  P("Each IVR call will be a short dramatised message in the beneficiary's language that teaches one rule and tests it with a keypad response. An example:"),
  quote("Agent: \"Baji, tell me your PIN and I will do it for you.\" Naila: \"No, brother. I will enter my PIN myself.\" Narrator: \"Your PIN is the key to your money. Do not share it with anyone. If someone asks for your PIN, press 1 to share it, or press 2 to refuse.\""),

  // 3.1(f)
  H2("3.1(f) Gender-Intentional Content"),
  PR("Gender-intentional content will be integrated across all materials and channels rather than treated as a separate module. The DFLT Phase II materials used women as the lead characters, and the handbook characters Naila and Shumaila and Akbari and Asghari were used in the role-play sessions^19^ and were well received by beneficiaries. The same characters will be used in the handbook, videos, IVR messages and flyers to address women's right to receive and control their payment, control of the SIM and PIN when a phone is shared, fraud directed at women, and household decisions on the use of the payment."),

  // 3.1(g)
  H2("3.1(g) Training of Trainers"),
  new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: "[Section to follow]", italics: true, color: "7F7F7F" })] }),

  // 3.1(h)
  H2("3.1(h) Peer Educator Model"),
  P("Each trainer will engage one female peer educator from the trainer's household or the local community, or the literate daughter of a beneficiary, to support learning after the sessions. The peer educator will assist with mobilisation, help beneficiaries set up WhatsApp and practise balance checks, share digital content with beneficiaries who have no phone, and follow up with those who miss a session. In addition, each trainer will hold one community session a month at a payment point in her tehsil during the BISP payment window, to support beneficiaries at the point of withdrawal."),
];

const doc = new d.Document({
  creator: "SDPI", title: "Component 1: Diagnostic, Curriculum Design and Capacity Building",
  styles, numbering, footnotes,
  sections: [{ properties: { page }, footers: { default: footer() }, children }],
});
save(doc, path.join(__dirname, "..", "Component 1 - Diagnostic, Curriculum Design and Capacity Building.docx"));
