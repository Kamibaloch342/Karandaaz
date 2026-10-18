// Builds "Component 1 - Diagnostic, Curriculum Design and Capacity Building.docx"
const fs = require("fs");
const path = require("path");
const L = require("./lib");
const { d, P, H1, H2, H3, bullet, numbered, caption, source, table, figure, styles, numbering, footer, page, save, CONTENT_W } = L;
const { Paragraph, TextRun, AlignmentType } = d;
const FIG = f => path.join(__dirname, "..", "figures", f);

const fn = t => ({ children: [new Paragraph({ children: [new TextRun({ text: t, size: 16 })] })] });
const footnotes = {
  1: fn("The questionnaires and discussion guides used in the DFLT National Pilot (2023–24), the DFLT Phase I impact evaluation (baseline, endline, FGD and KII guides) and the DFLT Phase II registration, diagnostic and pre/post-test forms are attached in Annex A."),
  2: fn("The two sources differ in design: the Phase I figures come from a household survey of women trained in 2024, while the Phase II figures come from registration profiles and cohort show-of-hands recorded by trainers in 2025–26, after BISP began issuing SIMs to beneficiaries. They are read side by side, not as a trend."),
  3: fn("Provincial snapshots are available from the same sources and will be presented at the inception meeting. For example, phone ownership in the DFLT Phase II profiles ranges from 82% in Punjab to 64% in Balochistan, and WhatsApp on the woman's own number from 50% to 16%."),
  4: fn("Districts are classified using Pakistan Bureau of Statistics Census 2023 urban and rural population shares; the district-wise classification for all four provinces is given in Annex B."),
  5: fn("In SDPI's audio audits of DFLT Phase II sessions, Urdu was used in 57.7% of sessions, Punjabi in 24.5%, Saraiki in 19.9%, Pashto in 17.5% and Sindhi in 5.4% (more than one language may be used in a session)."),
  6: fn("The DFLT informational videos developed by SDPI in collaboration with BISP are available at https://drive.google.com/drive/folders/14YuNgn4AHUPPUru1nSN6D8wzhhsuMiLw"),
};

const W3 = [2000, 1700, 5326];
const children = [
  H1("3.1 Component 1: Diagnostic, Curriculum Design and Capacity Building"),
  P("Component 1 builds the evidence, content and trainer capacity on which the roll-out depends. It answers three questions in sequence: where BISP women stand today (3.1a), which groups they fall into and what each group needs (3.1b), and what they must be able to do after training and how they will learn it (3.1c to 3.1h). SDPI has evaluated, designed or implemented every round of DFLT since 2023, so the diagnostic validates and updates an existing profile of BISP women rather than starting from zero."),

  // ---------------- 3.1a
  H2("3.1(a) Rapid baseline assessment"),
  P("The baseline assesses beneficiaries on the five domains set out in the RFP: digital and financial capability, transaction behaviour, gender-related constraints (mobility, trust and household dynamics), device access and digital connectivity. Its purpose is to inform the training design and the blended modality mix before the first cohort is trained."),
  P("SDPI already holds quantitative baseline data on BISP women from three programmes (Table 1). The Phase III assessment is therefore a **rapid, qualitative assessment at provincial level**: it uses focus group discussions (FGDs) to explain what the existing data cannot, such as why women who hold a phone still depend on agents, how a shared handset is used within the household, what women fear at the counter, and how mobility and trust differ between urban and rural tehsils. The findings are presented at the **inception meeting in Month 1** and documented in the Inception Report (D1).", { fn: 1 }),
  caption("Table 1: SDPI's existing evidence on BISP beneficiaries"),
  table(["Programme", "Period", "Coverage and instruments", "Domains covered"], [
    ["DFLT National Pilot (M&E for GIZ)", "Dec 2023 – Mar 2024", "Pilot of 7,000 beneficiaries; M&E observation tools and beneficiary feedback", "Training quality, content relevance, delivery model"],
    ["DFLT Phase I impact evaluation (RCT)", "2024 – 2025", "Baseline of 5,370 and endline of 4,827 women in 8 districts and 16 tehsils; CAPI survey, FGD and KII guides", "Literacy and numeracy, phone ownership and use, accounts and mobile money, fraud responses, saving, household decision-making"],
    ["DFLT Phase II national roll-out", "Oct 2025 – Aug 2026", "254,648 registration profiles in 100 districts; cohort diagnostics for 130,040 women; 25,584 pre-tests and 22,748 post-tests on the DFLT App", "Device and WhatsApp access, wallet and bank account, literacy, household structure, knowledge scores"],
  ], [2050, 1350, 3076, 2550], { zebra: true }),

  H3("Diagnostic domains"),
  P("Table 2 sets out what the assessment will establish in each domain, what the existing data already tell us and what the FGDs will probe."),
  caption("Table 2: Diagnostic domains, existing evidence and FGD focus"),
  table(["Domain", "What will be established", "Existing evidence (DFLT I and II)", "FGD and KII focus"], [
    ["Digital capability", "Ability to operate the phone, read a payment SMS, dial a USSD code, use WhatsApp", "Phone ownership, WhatsApp on own number, calculator use", "Who operates the phone; which tasks she does alone"],
    ["Financial capability and transaction behaviour", "Receiving payment, balance check, cash-out practice, agent dependence, deductions, saving and transfers", "Wallet ownership against use, bank account, ATM use, fraud responses", "Step-by-step account of her last withdrawal; who went with her; what was deducted"],
    ["Gender-related constraints", "Mobility, trust, household dynamics", "Financial and domestic decision-making, market visits, household type", "Permission to travel to the agent; who keeps the SIM and the cash; trust in agents, calls and BISP"],
    ["Device access", "Own or shared handset, smartphone or USSD phone, BISP SIM in a working handset", "Registration profiles (own, shared, none)", "Rules for sharing the handset; where the BISP SIM is kept"],
    ["Digital connectivity", "Network coverage, data affordability, charging", "Not covered by earlier rounds", "Coverage at home and at the agent; data packages; electricity"],
  ], [1600, 2550, 2300, 2576], { zebra: true }),

  H3("Baseline snapshot"),
  P("Table 3 gives a national snapshot of BISP women from the two most recent rounds. The picture is one of **access without use**: most women can reach a phone and many report a wallet, but very few have transacted on their own.", { fn: 2 }),
  caption("Table 3: National snapshot of BISP beneficiary women"),
  table(["Indicator", "DFLT Phase I baseline (2024, n = 5,370)", "DFLT Phase II (2025–26, n = 254,648)"], [
    { band: "Device access and digital capability" },
    ["Owns a mobile phone", "41.9%", "77.0%"],
    ["WhatsApp on her own number", "–", "41.4%"],
    ["No phone of her own but access to a household phone", "–", "≈20%"],
    ["Can use the phone calculator", "13.0%", "11.5%"],
    { band: "Financial capability and transaction behaviour" },
    ["Has a mobile money account or wallet", "12.6%", "29.0%"],
    ["Has ever transacted on a wallet", "–", "4.0%"],
    ["Has a bank account", "–", "9.0%"],
    ["Can withdraw from an ATM", "–", "1.8%"],
    ["Can do basic calculations", "64.3%", "44.4%"],
    { band: "Safety and fraud awareness" },
    ["Would end a call asking for her PIN and contact BISP or the bank", "36.3%", "–"],
    ["Recognises 8171 as BISP's official SMS code (before training)", "–", "80.0%"],
    { band: "Literacy and gender-related constraints" },
    ["Can read and write", "–", "19.8%"],
    ["No formal schooling", "–", "63.9%"],
    ["Lives in a joint or extended household", "–", "37.9%"],
    ["Takes household financial decisions herself", "15.0%", "–"],
    ["Spouse is the main financial decision-maker", "76.0%", "–"],
  ], [5026, 2000, 2000], { align: [AlignmentType.LEFT, AlignmentType.CENTER, AlignmentType.CENTER] }),
  source("Sources: SDPI, DFLT Phase I Impact Evaluation (baseline survey); SDPI DFLT Phase II database, registration profiles (n = 254,648) and cohort show-of-hands (n = 130,040 women in 5,554 sessions). Provincial snapshots are available on request."),
  P("A provincial breakdown of the same indicators will be presented alongside the national snapshot at inception.", { fn: 3 }),

  H3("Where BISP women stand on a scale of 1 to 10"),
  P("To show Karandaaz and BISP where beneficiaries stand, SDPI will place them on a **ten-step Capability Ladder** in which each step is a task, ordered from basic to advanced (Table 4). A woman's position is the highest step she can perform on her own. The same ladder is used for the FGD scoring, the readiness and capability task checks and later reporting, so progress is shown on one scale throughout the programme."),
  caption("Table 4: DFLT Capability Ladder and current evidence"),
  table(["Step", "The woman can…", "Current evidence"], [
    ["1", "Keep the BISP SIM active in a working handset she can use", "97% own or can access a phone (DFLT II)"],
    ["2", "Recognise a genuine BISP payment message (8171)", "80% before training (DFLT II)"],
    ["3", "Protect her PIN and refuse anyone who asks for it", "36% give the safest response (DFLT I)"],
    ["4", "Check her balance herself through USSD or the app", "To be established"],
    ["5", "Know her full entitlement and refuse an agent deduction", "To be established"],
    ["6", "Withdraw her full payment herself, entering her own PIN", "4% have ever transacted on a wallet (DFLT II)"],
    ["7", "Report a problem through the BISP helpline or tehsil office", "To be established"],
    ["8", "Send money or pay a bill from her wallet", "Below 4% (DFLT II)"],
    ["9", "Keep part of her payment in the wallet as savings", "To be established"],
    ["10", "Use two or more services regularly and help other women", "To be established"],
  ], [700, 4826, 3500], { zebra: true, align: [AlignmentType.CENTER] }),
  P("On current evidence the typical BISP woman stands at **step 2 or 3**: she can reach a phone and recognise BISP messages, but fewer than one in twenty has transacted on her own. The FGDs will place each province, and urban and rural tehsils within it, on the ladder and fill the steps marked \"to be established\"."),

  H3("Assessment design"),
  P("The FGDs follow the three-stage cluster design SDPI used for the DFLT Phase I impact evaluation, with zones added so that every part of each province is represented (Figure 1):"),
  bullet("**Provinces and zones.** All four provinces are covered through eight zones: Punjab North, Central and South; Khyber Pakhtunkhwa North and South; Upper and Lower Sindh; and Quetta for Balochistan."),
  bullet("**Districts.** One district per zone, selected with BISP for a high concentration of beneficiaries already paid through wallets."),
  bullet("**Tehsils.** Two tehsils per district, one urban and one rural, classified on Census 2023 urban shares, giving 16 tehsils.", ),
  bullet("**Participants.** In each tehsil, two FGDs with 8–10 beneficiary women drawn at random from the BISP tehsil list (one with women below 45 and one with women aged 45 and above) and one FGD with men of beneficiary households, supported by two key informant interviews with BISP tehsil office staff and a retail agent. This gives 48 FGDs and 32 KIIs."),
  figure(FIG("fig_fgd_sampling_frame.png"), 600),
  caption("Figure 1: FGD sampling frame for the rapid baseline assessment"),
  P("FGDs are moderated by SDPI's female field researchers in the local language, using guides adapted from the DFLT Phase I instruments and a pictorial ladder card on which participants place themselves. Fieldwork runs over two weeks in Month 1, sessions are audio-recorded with consent, and the analysis is thematic by domain, province and settlement type. Because the assessment is a design diagnostic, it has no endline of its own; outcome measurement sits under Component 4."),

  // ---------------- 3.1b
  H2("3.1(b) Segmenting beneficiaries into actionable groups"),
  P("Segmentation turns the diagnostic into decisions: which session a woman attends, which channel reaches her and how much human contact she needs. SDPI will segment on **three layers that can be recorded in the field in minutes and audited later**: geography, device and capability (Figure 2)."),
  H3("From BISP list to segment"),
  numbered("**BISP data.** BISP shares tehsil-wise beneficiary lists. Women already trained under DFLT Phase I and II are flagged in BISP's system so that they are not enrolled again."),
  numbered("**Eligibility check.** SDPI's customised DFLT App checks each CNIC before mobilisation. A woman already trained under DFLT is excluded (she receives digital refreshers only), and a woman who is not an active BISP beneficiary is not invited."),
  numbered("**Mobilisation.** Trainers, with BISP tehsil office staff, invite eligible women from the list."),
  numbered("**Registration.** On Day 1 of the readiness session, a short registration survey on the DFLT App records her socio-economic profile and the segmentation variables (Table 5)."),
  numbered("**Segment assignment.** The App filters the record into a segment and assigns the channel package automatically."),
  figure(FIG("fig_segmentation_flow.png"), 600),
  caption("Figure 2: From BISP list to segment and channel package"),

  H3("Three segmentation layers"),
  P("**Layer 1: Geography.** Every tehsil is classified as urban or rural, because mobility, agent density, connectivity and household norms differ systematically between them. DFLT Phase II was planned on a 50:50 urban–rural split across 103 districts and 163 tehsils (Figure 3), and the same classification will guide Phase III.", { fn: 4 }),
  fs.existsSync(FIG("fig_dflt2_tehsil_map.png")) ? figure(FIG("fig_dflt2_tehsil_map.png"), 470) :
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120, after: 40 }, border: { top: { style: d.BorderStyle.DASHED, size: 6, color: "A6A6A6" }, bottom: { style: d.BorderStyle.DASHED, size: 6, color: "A6A6A6" } },
    children: [new TextRun({ text: "[Map to be inserted from the DFLT App venue registry: red markers for urban and yellow markers for rural tehsils]", italics: true, color: "7F7F7F" })] }),
  caption("Figure 3: DFLT Phase II training locations by settlement type (103 districts, 163 tehsils)"),
  P("**Layer 2: Device.** Women are grouped by the phone they can use: a smartphone or a USSD (feature) phone, and in each case whether she owns it or has access to a household handset; women with no phone form a separate group. A valid WhatsApp number is checked at registration, and the trainer can help open a WhatsApp account where the handset allows. In the DFLT Phase II profiles, 77% of women owned a phone, 41% had WhatsApp on their own number, about 20% relied on a household phone and about 3% had no access."),
  P("**Layer 3: Capability.** At the end of the readiness session the trainer records whether a woman already performs the capability tasks, for example a woman who runs a small business from home and already sends and receives money herself. The trainer's judgement is not used alone: it is validated by an objective **Capability Matrix** on the DFLT App (Table 6). A woman who meets the matrix is placed on the Digital Capability Track, but may still attend the physical capability session if she wishes."),
  caption("Table 5: Standardised beneficiary snapshot recorded at registration"),
  table(["Section", "Variables", "Used for"], [
    ["A. Identity and eligibility", "CNIC (verified through photo OCR), district, tehsil, union council, urban or rural, BISP active status, DFLT I or II flag", "Eligibility; geography layer"],
    ["B. Socio-economic profile", "Age, marital status, schooling, household size and type, occupation or home enterprise, disability", "Dosage; peer educator selection"],
    ["C. Device and connectivity", "Phone type, owned or shared, BISP SIM in a working handset, WhatsApp on her number, network at home", "Device layer; channel package"],
    ["D. Wallet and transactions", "District-assigned wallet, PIN set, last withdrawal (who, where, any deduction), other uses", "Capability Matrix; follow-up priority"],
    ["E. Agency", "Who keeps the SIM and phone, who decides how the payment is used, can she visit the agent alone", "Gender-intentional follow-up"],
    ["F. Preferences", "Language, preferred call time", "Localisation; IVR scheduling"],
  ], [2100, 4626, 2300], { zebra: true }),
  P("The snapshot is reported on SDPI's live dashboard by section and variable for each province, district and tehsil, so that Karandaaz and BISP see the same standardised profile as it builds up."),
  caption("Table 6: Capability Matrix for the Digital Capability Track"),
  table(["Criterion", "Evidence", "Rule"], [
    ["Owns a phone", "Registration, section C", "Required"],
    ["Trainer recommendation", "Recorded at the end of the readiness session", "Required"],
    ["Primary schooling, or can read numbers and a payment SMS", "Registration, section B; readiness task check", "At least two of these three"],
    ["Has transacted herself (wallet, ATM or business payments)", "Registration, section D", ""],
    ["Passes the readiness task check (steps 1 to 5 of the ladder)", "Task check on the DFLT App", ""],
  ], [3400, 3326, 2300], { zebra: true }),

  H3("How segmentation drives deployment"),
  P("Every beneficiary enters through a physical session: **100% of each cohort attends the readiness sub-phase in person**. The three Karandaaz phases of 250,000, 400,000 and 350,000 beneficiaries are each delivered through two sub-phases, readiness and capability (Figure 4). A cohort of 30 women trained by one trainer receives four weeks of digital reinforcement after the readiness session and returns a month later for the capability sub-phase. Women who meet the Capability Matrix continue on the Digital Capability Track with four further weeks of capability content on their phone, while the others attend the physical capability session, built on simulations, role play and group work, followed by four weeks of reinforcement."),
  figure(FIG("fig_beneficiary_journey.png"), 600),
  caption("Figure 4: The beneficiary journey through the readiness and capability sub-phases"),
  P("The resulting composition is **70% physical and 30% digital in the capability sub-phase for each province taken as a whole** (Table 7). Individual districts will differ: urban pockets such as Lahore may be closer to 60:40 while remote rural districts may be close to fully physical, but provincial totals are balanced. The 30% is a planning figure; it is tested in the Phase 1 pilot and recalibrated in the Phase 1 Review (D6)."),
  caption("Table 7: Beneficiaries by Karandaaz phase and sub-phase"),
  table(["Karandaaz phase", "Readiness (100% physical)", "Capability: physical (≈70%)", "Capability: digital track (≈30%)"], [
    ["Phase 1 (pilot)", "250,000", "175,000", "75,000"],
    ["Phase 2 (scale-up)", "400,000", "280,000", "120,000"],
    ["Phase 3 (completion)", "350,000", "245,000", "105,000"],
    ["**Total**", "**1,000,000**", "**700,000**", "**300,000**"],
  ], [2526, 2200, 2150, 2150], { align: [AlignmentType.LEFT, AlignmentType.CENTER, AlignmentType.CENTER, AlignmentType.CENTER] }),
  P("Table 8 places each segment on the **tech–touch spectrum**. Where digital maturity is high, contact shifts towards technology; where it is low, human contact is added rather than removed."),
  caption("Table 8: Tech–touch matrix by segment"),
  table(["Segment", "Touch (in person)", "Tech (digital)", "Position"], [
    ["Smartphone owner meeting the Capability Matrix", "Readiness session; trainer clinic call", "WhatsApp videos and messages; capability content", "High tech"],
    ["Smartphone, owned or accessed", "Readiness and capability sessions", "WhatsApp videos and messages", "Tech-leaning"],
    ["USSD phone, owned or accessed", "Readiness and capability sessions", "IVR calls and SMS", "Balanced"],
    ["Shared phone or no phone", "Both sessions; peer educator follow-up", "IVR to the household phone; video screening at the venue", "High touch"],
  ], [2700, 2350, 2726, 1250], { zebra: true }),

  // ---------------- 3.1c
  H2("3.1(c) Task-based, action-oriented curriculum"),
  P("The curriculum is built around the high-impact behaviours named in the RFP (receiving payments, PIN use, safe cash-out, fraud awareness and grievance redressal) and the account uses that follow them. Abstract topics such as budgeting theory or branch banking are left out. **Each module targets one behaviour and ends with a task check** recorded on the DFLT App, linked to the Capability Ladder (Table 9)."),
  caption("Table 9: Curriculum map"),
  table(["Module", "Target behaviour", "Method", "Task check"], [
    { band: "Readiness sub-phase (all beneficiaries, in person)" },
    ["R1. My SIM, my account", "Keeps the BISP SIM active in a working handset; never hands it over", "Demonstration with dummy SIM and picture cards", "Shows the SIM in her handset; states the rule"],
    ["R2. Receiving my payment", "Recognises the 8171 message; checks her balance with the district wallet's USSD code", "Demonstration; practice on her own phone", "Identifies the genuine message; dials the code"],
    ["R3. My PIN, my secret", "Sets a PIN that cannot be guessed; refuses PIN and OTP requests; spots scam calls", "Trainer-versus-beneficiary role play; right-and-wrong worksheet", "Correct response in role play"],
    ["R4. My rights at the agent", "Knows there is no deduction; keeps the SMS; knows the complaint route", "Role play; counter card", "States the three counter checks"],
    { band: "Capability sub-phase (physical session or Digital Capability Track)" },
    ["C1. Safe cash-out", "Withdraws the full amount with her own PIN or biometric; counts the cash; checks the SMS", "Tablet simulation; mock POS and toy currency", "Completes a simulated withdrawal unaided"],
    ["C2. Beyond cash-out", "Sends money, pays a bill, keeps savings in the wallet", "Simulation; group worksheet", "Completes one transfer or bill payment"],
    ["C3. Staying safe", "Handles fraud scenarios, SIM swap and a lost phone", "Group stations; scenario cards", "Solves the scenario correctly"],
    ["C4. Getting help", "Lodges a complaint through the BISP helpline or tehsil office", "Practice call script", "Completes the script"],
    ["C5. My money, my decision", "Discusses and plans the use of her payment at home", "Life-situation discussion", "Names one action she will take"],
  ], [1850, 2950, 2326, 1900], { zebra: false }),
  H3("Learning methods"),
  P("**Trainer-versus-beneficiary role play.** The trainer plays the agent: \"Your payment has arrived. Pay me one thousand rupees as my fee.\" The trainer then stops, and the cohort decides whether the beneficiary should pay and how much. The answer, that she pays nothing and keeps her full payment, is reached by the women themselves, which makes it memorable."),
  P("**Group activity session.** On the capability day the cohort of 30 is divided into five groups of six that rotate through stations: a role play, a scenario, a life situation, a worksheet and a simulation. Group work builds peer support and gives less confident women room to practise."),
  P("**Group worksheet: the payment journey.** Each group arranges seven picture cards into the right order (wallet active and PIN set, 8171 message arrives, balance checked, visit to the agent, own PIN or biometric entered, full amount counted, SMS kept) and presents it to the cohort. The trainer corrects the sequence and links each card to the task check."),
  P("**Right-and-wrong worksheet.** A pictorial sheet of everyday situations, such as \"telling the agent my PIN\" or \"waiting for the 8171 message before going to the agent\", on which women tick the right action and cross the wrong one. It tests judgement without requiring reading."),
  P("**Transaction simulation.** Under BISP's district model, each district is served by an assigned bank wallet (for example, the Bank of Punjab in Lahore). Each trainer carries a tablet with an offline simulator that reproduces the USSD button screens and the app interface of the wallet assigned to that district. Women perform near-real withdrawals, transfers and bill payments in which no money moves, one transaction per group at least. Women who own a phone also practise the balance check on their own handset."),

  // ---------------- 3.1d
  H2("3.1(d) Localisation across languages, literacy levels and geographies"),
  P("**Languages.** Content is developed in Urdu and localised into Sindhi, Pashto, Brahvi and Marwari, giving five languages for print and audio. Trainers are recruited locally and facilitate orally in the language of the cohort, including Punjabi, Saraiki and Balochi.", { fn: 5 }),
  P("**Literacy.** Every task can be learnt without reading: picture sequences, icons, numerals and colour cues in print; voice and animation in digital content; and demonstration in class. Text is limited to numbers, codes and short labels."),
  P("**Geography.** Content reflects the district's assigned wallet and its USSD codes, local agent networks, urban and rural examples, and local names and dress in illustrations. All localised versions are pre-tested with beneficiaries in the FGD tehsils before submission in the content package (D3)."),

  // ---------------- 3.1e
  H2("3.1(e) Blended content package"),
  P("The package covers both channels required by the RFP (Table 10). Every item is mapped to a module, a segment and a point in the journey, and all content is approved by Karandaaz and BISP before deployment."),
  caption("Table 10: Blended content package"),
  table(["Item", "Content and format", "Use"], [
    { band: "Physical channel" },
    ["Facilitator and trainer guides", "Session plans for readiness and capability, demonstration scripts, task checks, tips for low-literacy groups", "Trainers; ToT"],
    ["Participant handbook", "20-page pictorial handbook built on the DFLT Phase II handbook (a 72-page pictorial handbook printed by SDPI)", "Take-home reference"],
    ["Job aids", "Wallet-sized counter card (three checks at the agent) and district-specific USSD code card", "Carried to the agent"],
    ["Printed flyers", "High-contrast flyers on fraud warning signs and the complaint route", "Venues and payment points"],
    ["Demonstration toolkit", "Dummy SIMs, printed wallet screens, flow charts, toy currency, mock POS, worksheets and scenario cards", "Group activities"],
    ["Simulation tablet", "Offline simulator of the district wallet's USSD and app screens", "Capability session"],
    { band: "Digital channel" },
    ["IVR scripts", "Short audio dramas with keypad quizzes, recorded in local languages", "USSD and shared phones"],
    ["SMS nudge sequences", "Short Urdu messages timed to training and payment dates, sent through BISP's 8171 identity", "All phones"],
    ["Short instructional videos", "Animated task videos, building on the 12 DFLT videos developed by SDPI with BISP for DFLT Phase I and sent to 131,000 women in Phase II", "WhatsApp; venue screening"],
    ["Digital media awareness", "Infographics, audio clips and short reels on safe use and fraud", "WhatsApp groups and social media"],
    ["E-guides", "Electronic versions of the handbook and job aids, shared on WhatsApp and trainer tablets", "Offline reference"],
  ], [2150, 4776, 2100], { zebra: false }),
  H3("Digital package by device"),
  P("The digital content each woman receives depends on the phone she can use (Table 11).", { fn: 6 }),
  caption("Table 11: Digital reinforcement by device, per four-week window"),
  table(["Device", "Readiness window (weeks 1–4)", "Capability window (weeks 5–8)", "Total"], [
    ["Smartphone, owned or accessed", "3 videos and 4 WhatsApp messages (text with voice note)", "3 videos and 4 WhatsApp messages", "6 videos, 8 messages; no IVR"],
    ["USSD phone, owned or accessed", "4 IVR calls (one a week) and 3 SMS", "4 IVR calls and 3 SMS", "8 IVR calls, 6 SMS; no video"],
    ["Shared phone or no phone", "IVR to the household phone at her preferred time; peer educator relay", "Same, with video screening at the venue", "As for USSD phones"],
    ["All beneficiaries", "Robocall reminder and one human call before the capability session", "One human follow-up call", "2 human calls"],
  ], [2000, 2800, 2426, 1800], { zebra: true }),
  P("Messages to smartphone users are sent as WhatsApp messages rather than SMS, which is cheaper and allows a voice note. A sample IVR script is shown below; full IVR and SMS libraries are submitted with the content package."),
  caption("Sample IVR script: \"Your PIN, your secret\" (English rendering)"),
  table(["Node", "Prompt", "Logic"], [
    ["Opening", "\"Assalam-o-Alaikum. This is a message from BISP's training programme for [name]. If this phone belongs to someone else, please hand it to her.\"", "Female voice; 10 seconds"],
    ["Drama", "Agent: \"Baji, tell me your PIN and I will do it for you.\" Naila: \"No brother, I will enter my PIN myself.\"", "Two voices; 40 seconds"],
    ["Rule", "\"Your PIN is the key to your money. Never tell it to anyone: not the agent, not a caller, not a relative.\"", "Played twice"],
    ["Quiz", "\"If a caller from BISP asks for your PIN, what will you do? Press 1 to tell him. Press 2 to refuse and hang up.\"", "2: praise; 1: corrective message, then repeat"],
    ["Help", "\"To complain, call the BISP helpline or visit your BISP tehsil office. Press 5 to hear this again.\"", "5: repeat; 8: stop calls"],
  ], [1200, 5826, 2000], { zebra: true }),

  // ---------------- 3.1f
  H2("3.1(f) Gender-intentional content"),
  P("Gender is built into all content rather than added as a separate module. In DFLT Phase II every pictorial resource was led by women characters, and the handbook's protagonists, **Naila and Shumaila** and **Akbari and Asghari**, became familiar and popular among BISP beneficiaries because women could see themselves in their story of learning, deciding and acting. Phase III keeps these characters across the handbook, videos, IVR dramas and flyers, and uses them to carry the four themes the RFP requires: women's right to receive and control their own payment; keeping the SIM and PIN under their own control when the phone is shared; fraud that targets women, such as fake BISP calls and agents who demand a cut; and negotiating decisions about the payment within the household. All audio is written to be safe when heard on a shared phone, and men of beneficiary households are engaged through the FGDs and community sessions."),

  // ---------------- 3.1g
  H2("3.1(g) Training of Trainers (ToT)"),
  new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: "[To follow: ToT design for at least 1,200 BISP master trainers, to be drafted on the team lead's guidance.]", italics: true, color: "7F7F7F" })] }),

  // ---------------- 3.1h
  H2("3.1(h) Peer educator model"),
  P("Each trainer engages **one female peer educator in every community she serves** to support last-mile learning and confidence. The peer educator is a trusted, literate young woman from the community: often the daughter of a beneficiary, a woman from the trainer's own household or community, or a confident woman identified in the readiness session. She helps with mobilisation and registration, helps women open WhatsApp and practise the balance check, relays video content to women without a phone, and follows up with women who miss a session. She is oriented by the trainer, receives the job aids and e-guide, and is recorded on the DFLT App so that her follow-up can be tracked."),
  P("In addition, **each trainer holds one community session a month at a payment touchpoint**, such as a retail agent cluster or the BISP tehsil office, timed to the BISP payment window. With the peer educator, the trainer coaches women at the moment they withdraw their money, reminds agents of the zero-deduction rule and refers unresolved cases to the complaint mechanism."),
];

const doc = new d.Document({
  creator: "SDPI", title: "Component 1: Diagnostic, Curriculum Design and Capacity Building",
  styles, numbering, footnotes,
  sections: [{ properties: { page }, footers: { default: footer() }, children }],
});
save(doc, path.join(__dirname, "..", "Component 1 - Diagnostic, Curriculum Design and Capacity Building.docx"));
