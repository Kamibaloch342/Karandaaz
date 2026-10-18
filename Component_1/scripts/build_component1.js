// Builds "Component 1 - Diagnostic, Curriculum Design and Capacity Building.docx"
const path = require("path");
const L = require("./lib");
const { d, P, H1, H2, bullet, caption, source, table, figure, styles, numbering, footer, page, save } = L;
const { Paragraph, TextRun, AlignmentType } = d;
const FIG = f => path.join(__dirname, "..", "figures", f);
const C = AlignmentType.CENTER, LEFT = AlignmentType.LEFT;

const fn = t => ({ children: [new Paragraph({ children: [new TextRun({ text: t, size: 16 })] })] });
const footnotes = {
  1: fn("The questionnaires of the DFLT National Pilot, DFLT Phase I and DFLT Phase II are attached in Annex A."),
  2: fn("Following the Pakistan Bureau of Statistics definition of urban areas (metropolitan and municipal corporations, municipal committees, town committees and cantonments), a tehsil is classified as urban if at least half of its population lives in urban areas according to Census 2023."),
  3: fn("The DFLT informational videos developed by SDPI in collaboration with BISP are available at https://drive.google.com/drive/folders/14YuNgn4AHUPPUru1nSN6D8wzhhsuMiLw"),
};
const quote = t => new Paragraph({ children: [new TextRun({ text: t, italics: true, size: 20 })], indent: { left: 567, right: 567 },
  spacing: { before: 60, after: 60, line: 264 }, alignment: AlignmentType.JUSTIFIED });

const children = [
  H1("3.1 Component 1: Diagnostic, Curriculum Design and Capacity Building"),
  P("BISP now pays its beneficiaries through SIM-based wallets held in their own names, but access has not yet become use. In DFLT Phase II, 77% of women owned a phone and 29% reported a wallet, yet only 4% had ever made a transaction themselves. Most still rely on retail agents or relatives to withdraw their payments, which exposes them to deductions and fraud. The Digital and Financial Capability Training is therefore built around one practical outcome: **by her next BISP payment, every trained woman can receive, protect and withdraw her full payment herself, and knows where to complain if something goes wrong.**"),
  P("**Implementation model.** The programme will reach 1,000,000 beneficiaries in the three phases set by Karandaaz: 250,000, 400,000 and 350,000. Each phase is delivered in two sub-phases (Figure 1). In the **readiness sub-phase**, every beneficiary attends one in-person session in a cohort of 30 at the BISP tehsil office, where she is registered on the DFLT App and learns to keep her SIM active, recognise BISP's 8171 message, check her balance and protect her PIN. For the following four weeks she receives digital reinforcement on her phone. In the **capability sub-phase**, a month after her first session, she returns for a hands-on session in which she practises withdrawals, transfers and bill payments on a transaction simulator, followed by four further weeks of digital reinforcement. Women who already transact confidently complete the capability content digitally instead. The readiness sub-phase is therefore fully physical, and the capability sub-phase follows a 70:30 physical-to-digital split in each province."),
  figure(FIG("fig_beneficiary_journey.png"), 600),
  caption("Figure 1: Implementation model of the Digital and Financial Capability Training"),
  P("The sections below set out how this model is built: the baseline that establishes where beneficiaries stand (3.1a), the segmentation that decides what each woman receives (3.1b), and the curriculum, content and support structures that deliver it (3.1c to 3.1h)."),

  // 3.1(a)
  H2("3.1(a) Rapid Baseline Assessment"),
  P("The baseline will establish where beneficiaries stand before training on the variables specified in the RFP: digital and financial capability, transaction behaviour, gender-related constraints (mobility, trust and household dynamics), device access and digital connectivity. Its findings will set the emphasis of the content and confirm the modality split for each province before roll-out."),
  P("SDPI does not start from zero. Through the DFLT National Pilot (2023–24), the DFLT Phase I impact evaluation (2024–25) and the DFLT Phase II national roll-out (2025–26), it has profiled BISP women at scale. Table 1 summarises the national picture; provincial snapshots can be provided.", { fn: 1 }),
  caption("Table 1: Baseline snapshot of BISP beneficiary women"),
  table(["Indicator", "DFLT Phase I baseline (n = 5,370)", "DFLT Phase II (n = 254,648)"], [
    ["Owns a mobile phone", "41.9%", "77.0%"],
    ["Has WhatsApp on her own number", "–", "41.4%"],
    ["Has a mobile wallet or account", "12.6%", "29.0%"],
    ["Has ever transacted on a wallet herself", "–", "4.0%"],
    ["Would refuse a caller asking for her PIN", "36.3%", "–"],
    ["Can read and write", "–", "19.8%"],
    ["Takes household financial decisions herself", "15.0%", "–"],
  ], [5026, 2000, 2000], { zebra: true, align: [LEFT, C, C] }),
  source("Source: SDPI, DFLT Phase I Impact Evaluation and DFLT Phase II database."),
  P("To show where beneficiaries stand on a scale of 1 to 10, SDPI will use a ten-step **Capability Ladder** in which each step is a task the woman performs on her own (Table 2). On current evidence, the typical beneficiary stands at step 2 or 3. The same ladder will be applied at registration, after each session and at endline, so that progress is reported on one scale throughout the programme."),
  caption("Table 2: Capability Ladder"),
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
  P("Because a large quantitative profile already exists, the assessment will be qualitative. Focus group discussions (FGDs) will explain the patterns behind the numbers: why women with phones still rely on agents, who controls the SIM and the cash, and what prevents women from reaching an agent on their own. FGDs will be held in all four provinces across eight zones: North, Central and South Punjab; North and South Khyber Pakhtunkhwa; Upper and Lower Sindh; and Quetta. One district will be selected in each zone and, within it, one urban and one rural tehsil, giving 16 tehsils (Figure 2). In each tehsil, two FGDs will be held with beneficiary women and one with men of beneficiary households. The findings will be presented at the inception meeting in Month 1."),
  figure(FIG("fig_fgd_sampling_frame.png"), 580),
  caption("Figure 2: Sampling frame of the rapid baseline assessment"),

  // 3.1(b)
  H2("3.1(b) Segmenting Beneficiaries into Actionable Groups"),
  P("Segmentation decides three things for each woman: whether she needs the physical capability session, which digital channel can reach her, and how much follow-up she requires. It is built into registration, so that it adds no field time."),
  P("**Eligibility and registration.** BISP will share tehsil-wise beneficiary lists in which women already trained under DFLT Phase I and II are flagged. Before mobilisation, SDPI's customised DFLT App will screen each woman and exclude those already trained and those who are not active beneficiaries. Trainers, with the support of BISP tehsil offices, will mobilise eligible women, who are registered on the App on the day of their readiness session. Registration records a standardised profile of each beneficiary (Table 3), which is reported on SDPI's live dashboard by province, district and tehsil."),
  caption("Table 3: Standardised beneficiary profile recorded at registration"),
  table(["Section", "Variables"], [
    ["Identity and eligibility", "CNIC, district, tehsil, union council, urban or rural, BISP status, DFLT I or II status"],
    ["Socio-economic profile", "Age, marital status, education, household size and type, occupation or home enterprise"],
    ["Device and connectivity", "Smartphone or basic phone, ownership or shared access, BISP SIM in use, WhatsApp, network"],
    ["Wallet and transactions", "Assigned wallet, PIN set, last withdrawal and who assisted, any deduction faced"],
    ["Agency and preferences", "Who keeps the SIM and decides on the payment, ability to visit the agent alone, language"],
  ], [2400, 6626], { zebra: true }),
  P("**Segmentation layers.** Women are then segmented on three layers:"),
  new Paragraph({ children: [...L.runs("**Geography.** Each tehsil is classified as urban or rural, as agent access, connectivity, mobility and household norms differ between the two. DFLT Phase II trained women in 147 tehsils across 81 districts, of which 26 were urban and 121 rural (Figure 3)."), new d.FootnoteReferenceRun(2)], numbering: { reference: "bullets", level: 0 }, spacing: { after: 60, line: 264 } }),
  bullet("**Device.** Women are grouped by whether they use a smartphone or a basic phone, and whether they own it or share a household handset. This determines the digital channel through which she is reached."),
  bullet("**Capability.** At the end of the readiness session, the trainer identifies women who already transact independently, for example those running a small business from home. The App confirms this against phone ownership, literacy, prior transactions and the readiness task check. These women follow the digital capability track; all others attend the physical capability session."),
  figure(FIG("fig_dflt2_tehsil_map.png"), 470),
  caption("Figure 3: DFLT Phase II training tehsils by urban and rural classification"),
  source("Source: SDPI DFLT Phase II database (254,648 registrations); Pakistan Bureau of Statistics, Census 2023. Tehsils are shown within their district."),
  P("While the 70:30 capability split holds for each province as a whole, it will vary within it: urban districts such as Lahore are expected to carry a larger digital share and remote rural districts a smaller one."),

  // 3.1(c)
  H2("3.1(c) Task-Based, Action-Oriented Curriculum"),
  P("The curriculum teaches tasks rather than concepts. It focuses on the high-impact behaviours set out in the RFP (receiving payments, PIN use, safe cash-out, fraud awareness and grievance redressal) and then on using the account beyond cash-out. The readiness session prepares the woman to receive and protect her payment; the capability session enables her to withdraw and use it (Table 4). A module is complete only when she performs the task herself."),
  caption("Table 4: Curriculum outline"),
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
  P("Teaching relies on practice rather than lecture. In **trainer-versus-beneficiary role plays**, the trainer acts as an agent who demands a fee of PKR 1,000, and the cohort decides how the woman should respond. In the capability session, the cohort of 30 works in **five groups** on scenarios, role plays and pictorial worksheets, such as arranging picture cards into the steps of a safe withdrawal or marking the right and wrong action in everyday situations. Each trainer also carries a tablet with an offline **transaction simulator** that reproduces the USSD and app screens of the wallet assigned to that district, so that every woman completes a near-real withdrawal, transfer and bill payment without any money moving. Women with their own phones also practise on their handsets."),

  // 3.1(d)
  H2("3.1(d) Localisation across Languages, Literacy Levels and Geographies"),
  P("All content will be produced in Urdu, Sindhi, Pashto, Brahvi and Marwari, and trainers will be recruited locally so that sessions are conducted in the cohort's own language. Every task can be learnt without reading, through pictures, icons, numerals, audio and demonstration. Content will reflect each district's assigned wallet and local agent networks, and illustrations will reflect local settings. All localised material will be pre-tested with beneficiaries before it is submitted for approval."),

  // 3.1(e)
  H2("3.1(e) Blended Content Package"),
  P("**Physical content.** Trainers will work from facilitator and trainer guides for each session. Beneficiaries will receive a 20-page pictorial handbook, building on the DFLT Phase II handbook printed by SDPI, together with job aids such as a counter card listing the checks to make at the agent, and printed flyers on fraud warning signs and complaint channels. Sessions will use demonstration toolkits (dummy SIMs, printed wallet screens, flow charts and worksheets) and the simulation tablets."),
  P("**Digital content.** Digital reinforcement is matched to the beneficiary's device. Women with a smartphone receive short videos and messages through WhatsApp: three videos and four messages in each four-week window. Women with a basic phone receive IVR calls and SMS: four calls and three messages in each window. Robocall reminders and a human follow-up call reach all beneficiaries. The videos build on the 12 animated DFLT videos developed by SDPI in collaboration with BISP, and e-guide versions of the handbook will be shared through WhatsApp.", { fn: 3 }),
  P("Each IVR call is a short audio drama in the beneficiary's language that teaches one rule and tests it with a keypad question. For example:"),
  quote("Agent: \"Baji, tell me your PIN and I will do it for you.\" Naila: \"No, brother. I will enter my PIN myself.\" Narrator: \"Your PIN is the key to your money. Never share it with anyone. If someone asks for your PIN, what will you do? Press 1 to share it, or press 2 to refuse.\""),
  P("All physical and digital content will be approved by Karandaaz and BISP before deployment."),

  // 3.1(f)
  H2("3.1(f) Gender-Intentional Content"),
  P("Gender is built into all content rather than added as a separate module. In DFLT Phase II, all pictorial content was led by women characters, and the handbook's protagonists, Naila and Shumaila and Akbari and Asghari, became widely popular among beneficiaries, who saw themselves in their story of learning and taking decisions. These characters will carry the content across the handbook, videos, IVR dramas and flyers, addressing women's right to receive and control their own payment, keeping the SIM and PIN under their own control when a phone is shared, fraud that targets women, and navigating household decisions about the payment."),

  // 3.1(g)
  H2("3.1(g) Training of Trainers"),
  new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: "[Section to follow]", italics: true, color: "7F7F7F" })] }),

  // 3.1(h)
  H2("3.1(h) Peer Educator Model"),
  P("To support last-mile learning and confidence, each trainer will engage a female peer educator from the community, such as a literate daughter of a beneficiary or a trusted woman known to the trainer. The peer educator will help with mobilisation, help women set up WhatsApp and practise their balance check, share digital content with women who do not have a phone, and follow up with those who miss a session. Each trainer will also hold a monthly community session at a payment touchpoint, coaching women at the point of withdrawal and reinforcing safe transaction practices."),
];

const doc = new d.Document({
  creator: "SDPI", title: "Component 1: Diagnostic, Curriculum Design and Capacity Building",
  styles, numbering, footnotes,
  sections: [{ properties: { page }, footers: { default: footer() }, children }],
});
save(doc, path.join(__dirname, "..", "Component 1 - Diagnostic, Curriculum Design and Capacity Building.docx"));
