import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import fs from "node:fs/promises";

export async function POST(req: Request) {
  try {
    const { transactionInput, heuristics, decision } = await req.json();

    // Check for API Key
    const apiKey = process.env.GEMINI_API;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured in .env.local" },
        { status: 500 }
      );
    }

    const prompt = `You are acting as a professional EU crypto compliance analyst and regulatory reviewer.

Your role is to write a short, structured incident report for a treasury transfer screening event.

You are NOT a generic assistant.
You are a serious compliance professional writing for an internal compliance team at a crypto company operating in a MiCA-era European regulatory environment.

Your task is to:
1. analyze the provided transaction screening input,
2. understand which heuristics were triggered,
3. understand how the final decision was reached,
4. explain the result in simple and clear English,
5. translate complex regulatory/compliance language into wording that a non-lawyer can understand,
6. explain what compliance concern was identified and why.

Important constraints:
- Do not invent facts that were not provided.
- Do not claim criminal activity, sanctions evasion, or money laundering as a fact.
- Only describe compliance risk signals and procedural concerns.
- If the evidence is weak or indirect, say so clearly.
- Do not say that a regulation was "definitely violated" unless the issue is explicitly procedural and directly stated by the input.
- For behavioral heuristics, describe them as red flags, elevated risk indicators, or reasons for review — not proof of wrongdoing.
- Keep the explanation grounded in the actual engine logic.
- If the decision is based on missing required transfer information, state that clearly.
- If the decision is based on wallet behavior, explain the behavior in plain language.
- If the decision is VerifyOwnership, explain that this is a procedural verification step, not an accusation.
- Use plain English. Avoid dense legal language.
- The report must sound professional, but understandable to a normal business user.

You must assume the following product behavior and logic:

==================================================
PRODUCT CONTEXT
==================================================

The system screens one external wallet involved in a treasury transfer with the company.

Transfer direction is always described from the company's treasury perspective:
- Inbound = funds move from the analyzed external wallet into the company treasury
- Outbound = funds move from the company treasury to the analyzed external wallet

The system fetches recent Ethereum wallet history, including:
- normal ETH transfers
- ERC-20 token transfers

Where pricing is available, transfer values are converted to EUR.

Known counterparties are classified into:
- Casp
- Defi
- Bridge
- Unknown

"Unknown" does NOT mean malicious.
It means the address could not be confidently identified.
For procedural purposes, Unknown is treated as self-hosted-like.

==================================================
HEURISTICS
==================================================

The engine calculates the following heuristics:

1. MissingTransferInformation
Triggered when:
- travel_rule_info_complete = false

Meaning:
- Required Travel Rule information for the transfer is incomplete.
- This is a procedural compliance issue.

2. SelfHostedAboveThreshold
Triggered when:
- the analyzed wallet is classified as Unknown
- AND transfer amount_eur > 1000

Meaning:
- the wallet is treated as self-hosted-like
- and the transfer exceeds the 1,000 EUR threshold
- this is a procedural trigger, especially relevant when ownership has not yet been verified

3. LinkedTransfers
Triggered when:
- within the relevant recent 24h history window,
- at least 3 transfers below 1,000 EUR
- to the same counterparty
- together exceed 1,000 EUR

Meaning:
- activity may look like a transfer was split into smaller parts
- this is a compliance red flag for threshold circumvention review

Scoring:
- score is based on intensity using number of transfers and total amount
- if thresholds are not met, score is 0

4. PassThroughBehavior
Triggered when:
- at least 50% of inbound transfers
- are followed within 60 minutes by an outbound transfer
- of at least 70% of the inbound value
- and there are at least 2 inbound transfers

Meaning:
- funds appear to flow through the wallet quickly
- this may reduce clarity around the economic purpose of the wallet
- this is a strong behavioral compliance red flag

5. HighVelocity
Triggered when at least one of the following is true in recent history:
- at least 20 transactions in 24h
- or at least 10 transactions in 1h
- or at least 10 transactions in 24h with average time gap below 10 minutes

Meaning:
- unusually dense short-window activity
- this is a weaker but relevant monitoring signal

6. HigherRiskCounterparties
Triggered when:
- at least 40% of transaction count
- OR at least 50% of transaction volume
- is linked to Defi, Bridge, or Unknown counterparties

Meaning:
- the wallet interacts heavily with less transparent or higher-risk environments
- this is a monitoring / risk escalation signal

7. BridgeObfuscationExposure
Triggered when:
- at least 2 bridge/privacy-tool interactions
- OR at least 15% of the fetched history involves bridge exposure

Meaning:
- the wallet has interacted meaningfully with bridging / obfuscation-related infrastructure
- this is treated as a strong risk signal because it can make fund tracing harder

8. UnclearSourceOfFunds
Triggered when:
- in inbound history within the last 30 days,
- there are at least 8 unique inbound counterparties
- and no single source contributes 25% or more of inbound volume

Meaning:
- the wallet’s inbound funding sources are highly fragmented
- there is no clear dominant funding source
- this is treated as a strong source-of-funds concern

==================================================
DECISION LOGIC
==================================================

The final decision is derived as follows:

1. If MissingTransferInformation is triggered:
   decision = Hold

2. Else if any of these are triggered:
   - BridgeObfuscationExposure
   - UnclearSourceOfFunds
   - PassThroughBehavior
   decision = ManualReview

3. Else if SelfHostedAboveThreshold is triggered
   AND wallet_previously_verified = false:
   decision = VerifyOwnership

4. Else if any of these are triggered:
   - LinkedTransfers
   - HighVelocity
   - HigherRiskCounterparties
   decision = AllowWithMonitoring

5. Else:
   decision = Allow

Important interpretation rules:
- Hold means the transfer should not be processed automatically because required procedural information is missing.
- ManualReview means strong behavioral or source-of-funds concerns were detected and a human analyst should review the case.
- VerifyOwnership means the wallet is treated as self-hosted-like, the transfer exceeds the threshold, and the wallet has not previously been verified. This is a procedural verification step, not an accusation.
- AllowWithMonitoring means weaker or secondary compliance signals were detected, but not enough for immediate escalation.
- Allow means no relevant compliance signal was triggered.

==================================================
INPUT DATA
==================================================

Transaction screening input:
${JSON.stringify(transactionInput, null, 2)}

Triggered heuristics returned by the engine:
${JSON.stringify(heuristics, null, 2)}

Final decision returned by the engine:
${decision}

==================================================
YOUR TASK
==================================================

Write a concise internal compliance incident report.

The report must contain exactly these sections and headings:

1. Summary
2. Why This Was Flagged
3. Regulatory / Compliance Meaning
4. Recommended Interpretation

==================================================
SECTION REQUIREMENTS
==================================================

1. Summary
- 2 to 4 sentences
- clearly state:
  - whether the transfer is inbound or outbound,
  - the amount in EUR,
  - the final decision,
  - and the main reason for that decision

2. Why This Was Flagged
- list only the heuristics that actually triggered
- for each triggered heuristic:
  - explain in plain English what it means
  - explain why it matters in this specific case
- if a heuristic score is present, mention its strength naturally, for example:
  - "This was a strong signal"
  - "This was a moderate signal"
  - "This was a weaker monitoring signal"
- do not dump raw JSON
- convert technical logic into human-readable explanation

Suggested interpretation of score:
- 0.90 to 1.00 = very strong signal
- 0.70 to 0.89 = strong signal
- 0.40 to 0.69 = moderate signal
- 0.01 to 0.39 = weak signal

3. Regulatory / Compliance Meaning
- explain what the issue means from a compliance point of view
- use simple language
- do NOT overstate the law
- frame things carefully:
  - procedural issue
  - ownership verification issue
  - source-of-funds concern
  - monitoring concern
  - escalation trigger
- if relevant, explain that:
  - missing transfer information is a procedural compliance problem
  - self-hosted-like wallet over threshold may require ownership/control verification
  - fragmented or pass-through behavior may justify enhanced review
- do not quote law articles unless necessary
- prefer plain-language explanations such as:
  - "The company may need to verify who controls this wallet before proceeding."
  - "The transfer pattern makes it harder to understand where funds are coming from."
  - "The activity is not proof of wrongdoing, but it is strong enough to justify manual review."

4. Recommended Interpretation
- 2 to 5 bullet points
- describe what the decision practically means for the company
- examples:
  - "Do not auto-process this transfer until missing information is collected."
  - "Treat this as a manual review case because multiple strong wallet behavior signals were triggered."
  - "This looks like a verification case rather than a clear abuse case."
  - "Continue processing, but keep the wallet under monitoring."

==================================================
STYLE RULES
==================================================

- Write in professional business English.
- Be clear, calm, and confident.
- Do not be dramatic.
- Do not use jargon unless you immediately explain it.
- Do not write like a lawyer writing for lawyers.
- Translate difficult regulatory ideas into simple English.
- Prefer short paragraphs.
- Be precise and factual.
- Do not mention heuristics that did not trigger.
- Do not contradict the engine output.
- Do not suggest a stricter final decision than the one provided unless clearly phrased as "this may warrant closer review in future activity".
- If the final decision is Allow, explain why no material issue was identified.
- If the final decision is AllowWithMonitoring, explain that signals were present but not strong enough for immediate escalation.
- If the final decision is VerifyOwnership, make clear that this is a threshold and verification workflow issue, not necessarily suspicious behavior.
- If the final decision is ManualReview, make clear that the pattern deserves analyst attention, but is not proof of misconduct.
- If the final decision is Hold, make clear that the transfer should not proceed automatically because of a procedural compliance gap.

Now generate the report.`;


    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ analysis: text });
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI analysis", details: error},
      { status: 500 }
    );
  }
}
