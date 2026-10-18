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
  9: fn("Based on Table 1: 97% of registered women own a phone or have access to one in the household, while 4.2% have made a wallet transaction."),
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
  PR("BISP has transitioned its cash transfers to SIM-based wallets registered in the name of each beneficiary woman. While the transition has given every beneficiary an account in her own name, the use of these accounts remains limited. Of the 254,648 women registered by SDPI under DFLT Phase II, 77% owned a mobile phone and 29% reported a mobile money account; at the start of training, however, only 4.2% had ever carried out a wallet transaction, 1.6% held a bank account and 1.2% were able to withdraw cash from an ATM.^1^ The majority of beneficiaries continue to depend on retail agents or male relatives to withdraw their payments, which exposes them to deductions and to fraud. The Digital and Financial Capability Training is accordingly designed around the practical capability of the beneficiary to receive, protect and withdraw her payment herself, and to lodge a complaint when required."),
  PR("The program will train 1,000,000 BISP beneficiaries across the three phases defined in the RFP, of 250,000, 400,000 and 350,000 beneficiaries respectively.^2^ Within each phase, the training will be delivered in two sub-phases: a readiness sub-phase followed, one month later, by a capability sub-phase (Figure 1). In the readiness sub-phase, every beneficiary will attend a one-day classroom session, at a venue arranged with the BISP tehsil office, in a cohort of 30 women under one trainer. She will be registered on the DFLT App and trained on the care of her SIM, the recognition of the 8171 payment message, the checking of her balance and the protection of her PIN. Over the following four weeks, the learning of the cohort will be reinforced through a sequence of IVR calls, SMS, WhatsApp messages and short videos, robocalls and follow-up calls, delivered through the channel suited to each beneficiary's phone. In the capability sub-phase, the same cohort will return to the classroom for a second one-day session devoted to the practice of transactions through simulation, role play and group activity, followed by a further four weeks of digital reinforcement. Beneficiaries found at the readiness session to be already transacting independently will receive the capability content through the digital channels alone. The readiness sub-phase will therefore be delivered entirely in person, while the capability sub-phase will follow a 70:30 physical-to-digital composition in each province, consistent with the indicative mix of the RFP.^3^ A cohort that attends its readiness session at the beginning of one month will complete its capability session in the following month and its reinforcement in the month after, ahead of the next BISP payment."),
  figure(FIG("fig_beneficiary_journey.png"), 600),
  caption("Figure 1: Structure of the training within each phase"),

  // 3.1(a)
  H2("3.1(a) Rapid Baseline Assessment"),
  PR("A rapid baseline assessment will be conducted to evaluate the digital and financial capabilities of the beneficiaries, their transaction behaviours, the gender-related constraints of mobility, trust and household dynamics, their access to devices and the conditions of digital connectivity, in order to inform the blended modality mix.^4^ SDPI has already assessed BISP beneficiaries on these variables in three successive programs: the monitoring and evaluation of the DFLT National Pilot (2023–24),^5^ the impact evaluation of DFLT Phase I conducted as a randomised controlled trial (2024–25),^6^ and the national roll-out of DFLT Phase II (2025–26).^7^ The assessment under this program will therefore not replicate a quantitative survey but will build on this evidence. Table 1 presents the national snapshot of the beneficiary population drawn from these assessments; the corresponding provincial snapshots are available from the same sources and will be presented with the inception report.^8^"),
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
  PR("For Karandaaz and BISP to see where the beneficiaries stand on a scale of 1 to 10, the assessment will place them on a Capability Ladder of ten steps, each of which is a task that the beneficiary performs without assistance (Table 2). The position of a beneficiary on the ladder is the highest step she can complete. On the evidence of Table 1, the typical beneficiary stands today between the first and the third step: she has access to a phone, but she has not yet made a transaction on her own.^9^ The same ladder will be applied at registration, at the end of each sub-phase and at the endline, so that the progress of the beneficiaries is reported throughout the program on a single scale."),
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
  PR("Since a large quantitative profile of the beneficiaries already exists, the baseline will be qualitative and will be carried out through focus group discussions at the provincial level, confined to the variables set out above. All four provinces will be covered through eight zones: North, Central and South Punjab; North and South Khyber Pakhtunkhwa; Upper and Lower Sindh; and Quetta in Balochistan. In each zone one district will be selected, and within each district two tehsils, one urban and one rural, giving sixteen tehsils in total (Figure 2). In each tehsil, focus group discussions will be held with the beneficiary women and with the men of beneficiary households, following the three-stage cluster design that SDPI applied in the impact evaluation of DFLT Phase I.^10^ The discussion guides will be adapted from the instruments of that evaluation and will cover each of the assessment variables. The findings, together with the provincial snapshot, will be presented at the inception meeting in Month 1."),
  figure(FIG("fig_fgd_sampling_frame.png"), 580),
  caption("Figure 2: Sampling frame of the rapid baseline assessment"),

  // 3.1(b)
  H2("3.1(b) Segmenting Beneficiaries into Actionable Groups"),
  PR("The beneficiaries will be segmented into actionable groups that determine, for each woman, the session she attends, the digital channel through which she is reached and the follow-up she receives. The segmentation is built into the mobilisation and registration process so that it requires no separate exercise in the field. BISP will be requested to provide the tehsil-wise beneficiary data, in which the women already trained under DFLT Phase I and Phase II are marked in its PCMS. Before mobilisation, the SDPI DFLT App, which served for the registration and verification of every beneficiary in DFLT Phase II,^11^ will check each record and set aside the women already trained under DFLT and those who are not active BISP beneficiaries. The eligible women will then be mobilised by the trainers in coordination with the BISP tehsil office, and on the day of the readiness session each woman will be registered through a short survey on the App that records her socio-economic profile and the segmentation variables. The resulting beneficiary snapshot, standardised across the program by section and variable (Table 3), will be available on the SDPI dashboard for each province, district and tehsil as registration proceeds."),
  caption("Table 3: Beneficiary snapshot recorded at registration"),
  table(["Section", "Variables"], [
    ["Identity and eligibility", "CNIC, district, tehsil, union council, urban or rural, BISP status, DFLT I or II status"],
    ["Socio-economic profile", "Age, marital status, education, household size and type, occupation or home enterprise"],
    ["Device and connectivity", "Smartphone or USSD phone, ownership or access, BISP SIM in use, WhatsApp, network"],
    ["Wallet and transactions", "Assigned wallet, PIN set, last withdrawal and who assisted, any deduction faced"],
    ["Agency and preferences", "Who keeps the SIM and decides on the payment, ability to visit the agent alone, language"],
  ], [2400, 6626], { zebra: true }),
  PR("The registration data will be filtered into segments on three layers. The first is geography: each tehsil is classified as urban or rural, since the access to agents, the connectivity, the mobility of women and the household norms differ systematically between the two. DFLT Phase II was designed on a 50:50 urban–rural basis^12^ and was delivered in 147 tehsils across 81 districts, shown in Figure 3 by their urban and rural classification.^13^ The second layer is the device: the beneficiaries are grouped according to whether they use a smartphone or a USSD phone and, in either case, whether they own the handset or have access to one within the household. This layer determines the digital channel, since a smartphone user can receive videos and messages on WhatsApp while a USSD phone user can be reached only by voice and SMS. The third layer is capability. At the close of the readiness session, the trainer will identify the women who already transact independently, such as a beneficiary who runs a business from her home and sends and receives payments herself. The trainer's judgement will not be relied on alone; it will be verified against a capability matrix in the App that considers the ownership of a phone, education, prior transactions and the task check of the readiness session. The beneficiaries who satisfy the matrix will receive the capability content through the digital channels, while remaining free to attend the classroom session if they prefer."),
  figure(FIG("fig_dflt2_tehsil_map.png"), 470),
  caption("Figure 3: DFLT Phase II training tehsils by urban and rural segmentation"),
  source("Source: SDPI DFLT Phase II database (254,648 registrations); Pakistan Bureau of Statistics, Census 2023. Tehsils are shown within their district."),
  PR("The 70:30 physical-to-digital composition will be maintained for each province in its totality rather than for each district. An urban district such as Lahore^14^ may carry a composition closer to 60:40, while a remote rural district may be served almost entirely in person; it is at the provincial level that the two will balance to the composition proposed."),

  // 3.1(c)
  H2("3.1(c) Task-Based, Action-Oriented Curriculum"),
  PR("The curriculum will be task-based and action-oriented, focused on the high-impact behaviours identified in the RFP, namely receiving payments, PIN use, safe cash-out, fraud awareness and grievance redressal,^15^ and extending to the uses of the account beyond cash-out. Each module is defined by a task that the beneficiary performs in the session rather than by a concept she is told, and the module is complete only when she has performed it. The readiness session covers the receipt and protection of the payment and the capability session its withdrawal and use (Table 4)."),
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
  P("**Role play sessions.** The trainer takes the part of a retail agent and tells the beneficiary that her payment has arrived and that she must pay a fee of one thousand rupees to receive it. The session is paused at this point and the cohort decides together how the beneficiary should respond and what, if anything, she is required to pay. The answer is reached by the women themselves, which makes it more readily retained than an instruction."),
  P("**Group activities.** In the capability session the cohort of 30 is divided into five groups, which rotate through a role play, a scenario and a situation drawn from daily life. The small groups give the less confident women the room to practise and allow the beneficiaries to learn from one another."),
  P("**Worksheets.** A group worksheet presents the full journey of a payment, from the arrival of the 8171 message to the counting of the cash, as a sequence of picture cards to be placed in order, and a pictorial right-and-wrong worksheet asks the beneficiaries to mark the correct and incorrect actions in everyday situations, such as telling the agent one's PIN. Neither requires the beneficiary to read."),
  PR("**Transaction simulation.** Each district is served by the bank wallet assigned to it under BISP's arrangement with its partner banks.^16^ Every trainer will be equipped with a tablet carrying a simulator of the USSD menus and application screens of the wallet used in her district, on which each group completes a withdrawal, a transfer and a bill payment that look and proceed like a real transaction without any money being moved. Beneficiaries who have their own phones will also practise the balance check on their handsets."),

  // 3.1(d)
  H2("3.1(d) Localisation across Languages, Literacy Levels and Geographies"),
  P("All content will be localised in five languages, Urdu, Sindhi, Pashto, Brahvi and Marwari, and the trainers will be recruited from the areas they serve so that each session is conducted in the language of the cohort. Since fewer than one in five beneficiaries can read and write, every task will be taught through pictures, icons, numerals, audio and demonstration, with text confined to the numbers and codes that the beneficiary must recognise. The content will be adapted to each geography in its examples, in the wallet interface of the district and in the settings of its illustrations, and all localised material will be pre-tested with beneficiaries before it is submitted for approval."),

  // 3.1(e)
  H2("3.1(e) Blended Content Package"),
  PR("A full blended content package will be developed for the physical and digital channels. For the classroom, facilitator and trainer guides will be prepared for the readiness and capability sessions, together with a 20-page pictorial handbook for the beneficiaries, derived from the 72-page pictorial handbook that SDPI developed and printed for DFLT Phase II,^17^ job aids including a card of the checks to be made at the agent, printed flyers on the warning signs of fraud and the channels of complaint, demonstration toolkits and the simulation tablets. All content, physical and digital, will be submitted to Karandaaz and BISP for approval before deployment."),
  PR("The digital content will be assigned to each beneficiary according to her device. A beneficiary with a smartphone, whether her own or accessed within the household, will have her WhatsApp number verified at registration, and where she has no account the trainer will assist in opening one. She will receive three short videos and four WhatsApp messages in each four-week period of reinforcement, and no IVR calls, since delivery over WhatsApp costs considerably less than voice. A beneficiary with a USSD phone will receive four IVR calls and three SMS in each period, and no videos. Robocall reminders and follow-up calls will reach every beneficiary. The videos will build on the twelve animated DFLT videos that SDPI developed with BISP for DFLT Phase I,^18^ and e-guide versions of the handbook will be distributed through WhatsApp. Each IVR call will take the form of a short drama in the language of the beneficiary, which teaches a single rule and tests it with a keypad response, as in the following example:"),
  quote("Agent: \"Baji, tell me your PIN and I will do it for you.\" Naila: \"No, brother. I will enter my PIN myself.\" Narrator: \"Your PIN is the key to your money. Do not share it with anyone. If someone asks for your PIN, press 1 to share it, or press 2 to refuse.\""),

  // 3.1(f)
  H2("3.1(f) Gender-Intentional Content"),
  PR("Gender-intentional content will run through every material and channel rather than form a separate module. The materials of DFLT Phase II were led throughout by women characters, and the handbook's characters, Naila and Shumaila and Akbari and Asghari, around whom the role-play sessions were built,^19^ were well received by the beneficiaries. The same characters will carry the content of this program across the handbook, the videos, the IVR dramas and the flyers, and through their story the beneficiaries will be addressed on their right to receive and control their own payment, on keeping the SIM and the PIN under their own control where a phone is shared, on the fraud directed specifically at women, and on the negotiation of decisions about the payment within the household."),

  // 3.1(g)
  H2("3.1(g) Training of Trainers"),
  new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: "[Section to follow]", italics: true, color: "7F7F7F" })] }),

  // 3.1(h)
  H2("3.1(h) Peer Educator Model"),
  P("To support last-mile learning and the building of confidence, each trainer will engage one female peer educator in the community she serves, who may be a member of the trainer's own household, a woman of the community or the literate daughter of a beneficiary. The peer educator will assist in mobilisation, help the beneficiaries to set up WhatsApp and to practise the balance check, carry the digital content to the women who have no phone, and follow up with those who miss a session. In addition, each trainer will hold one community session a month at a payment point in her tehsil during the BISP payment window, where she will support the beneficiaries at the moment of withdrawal and reinforce the practices taught in the classroom."),
];

const doc = new d.Document({
  creator: "SDPI", title: "Component 1: Diagnostic, Curriculum Design and Capacity Building",
  styles, numbering, footnotes,
  sections: [{ properties: { page }, footers: { default: footer() }, children }],
});
save(doc, path.join(__dirname, "..", "Component 1 - Diagnostic, Curriculum Design and Capacity Building.docx"));
