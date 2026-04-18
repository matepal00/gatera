"use client";

import Link from "next/link";

const processSteps = [
  {
    title: "Describe the transfer",
    text: "Enter the wallet on the other side of the treasury transfer, the direction, amount, chain, Travel Rule status, and whether ownership was already verified.",
    icon: "edit_note",
  },
  {
    title: "Analyze wallet history",
    text: "Gatera checks recent on-chain activity, token values, linked transfers, velocity, pass-through behavior, bridge exposure, and source-of-funds patterns.",
    icon: "account_tree",
  },
  {
    title: "Get a decision",
    text: "The response returns one decision and only the heuristics that triggered, with normalized scores ready for an event report.",
    icon: "rule",
  },
];

const decisionCards = [
  ["Allow", "No relevant signal was triggered."],
  ["AllowWithMonitoring", "The transfer can continue, but the wallet should stay visible in monitoring."],
  ["VerifyOwnership", "Ownership or control of the wallet should be verified before proceeding."],
  ["ManualReview", "A strong wallet-risk signal needs a human decision."],
  ["Hold", "Required Travel Rule information is missing for the transfer."],
];

const inputRows = [
  ["Wallet Address", "The analyzed wallet, not the company treasury wallet."],
  ["Transfer Direction", "Inbound means funds come from the analyzed wallet into treasury. Outbound means funds leave treasury to that wallet."],
  ["Amount", "The current transfer amount in EUR."],
  ["Travel Rule Status", "Whether required transfer information is complete."],
  ["Wallet Verification", "Whether ownership or control was previously verified."],
  ["History Window", "How many recent records should be analyzed."],
];

export default function DashboardPage() {
  return (
    <div className="p-8 pb-32 space-y-12 max-w-7xl mx-auto w-full min-h-screen">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 w-full">
        <div className="flex flex-col gap-3 transition-all">
          <h2 className="text-[10px] font-label uppercase tracking-[0.4em] text-on-surface-variant font-bold">ETHSilesia Workspace</h2>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface uppercase tracking-tight">
            Wallet Screening <span className="text-primary-container">Guide</span>
          </h1>
          <p className="max-w-3xl text-sm md:text-base text-on-surface-variant leading-relaxed">
            Use Screening to assess the wallet involved in a treasury transfer before funds are accepted or sent. This MVP focuses on one case at a time and returns a clear operational decision.
          </p>
        </div>
        <Link
          href="/dashboard/screening"
          className="bg-primary-container text-on-primary px-6 py-3 font-headline font-bold uppercase text-xs tracking-widest hover:brightness-110 active:scale-95 transition-all glow-shadow flex items-center gap-3"
        >
          Start Screening
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </Link>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {processSteps.map((step, index) => (
          <div className="bg-surface-container-low rounded p-8 ghost-border min-h-[260px] flex flex-col" key={step.title}>
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-label text-primary-container uppercase tracking-[0.3em] font-bold">Step 0{index + 1}</span>
              <span className="material-symbols-outlined text-primary-container/60 text-2xl">{step.icon}</span>
            </div>
            <h3 className="font-headline text-2xl text-white uppercase tracking-wide mb-4">{step.title}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">{step.text}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-surface-container-low rounded-lg p-8 ghost-border">
          <div className="flex items-start justify-between gap-6 mb-10">
            <div>
              <h3 className="text-[10px] font-label text-on-surface uppercase tracking-[0.3em] font-bold">What You Need</h3>
              <p className="text-sm text-on-surface-variant mt-2">Inputs required to run a screening request.</p>
            </div>
            <span className="material-symbols-outlined text-primary-container/50">checklist</span>
          </div>

          <div className="space-y-3">
            {inputRows.map(([title, text]) => (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-background/20 border border-outline-variant/10 px-5 py-4" key={title}>
                <span className="font-headline text-white uppercase tracking-widest text-xs">{title}</span>
                <p className="md:col-span-2 text-on-surface-variant text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-surface-container-low rounded-lg p-8 ghost-border">
          <div className="flex items-start justify-between gap-6 mb-10">
            <div>
              <h3 className="text-[10px] font-label text-on-surface uppercase tracking-[0.3em] font-bold">What You Receive</h3>
              <p className="text-sm text-on-surface-variant mt-2">A compact decision response for the transfer event.</p>
            </div>
            <span className="material-symbols-outlined text-primary-container/50">output</span>
          </div>

          <div className="bg-[#0c0d1d] border border-outline-variant/10 p-6 font-mono text-xs leading-7 text-slate-300 overflow-x-auto">
            <div>{"{"}</div>
            <div className="ml-4"><span className="text-primary-container">&quot;decision&quot;</span>: &quot;VerifyOwnership&quot;,</div>
            <div className="ml-4"><span className="text-primary-container">&quot;heuristics&quot;</span>: [</div>
            <div className="ml-8">{"{"}</div>
            <div className="ml-12"><span className="text-primary-container">&quot;kind&quot;</span>: &quot;SelfHostedAboveThreshold&quot;,</div>
            <div className="ml-12"><span className="text-primary-container">&quot;score&quot;</span>: 1.0</div>
            <div className="ml-8">{"}"}</div>
            <div className="ml-4">]</div>
            <div>{"}"}</div>
          </div>

          <p className="text-on-surface-variant text-sm leading-relaxed mt-6">
            Only triggered heuristics are returned, so operators do not need to read through inactive checks.
          </p>
        </div>
      </section>

      <section className="bg-surface-container-low rounded-lg p-8 ghost-border">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-8">
          <div>
            <h3 className="text-[10px] font-label text-on-surface uppercase tracking-[0.3em] font-bold">Decision Meanings</h3>
            <p className="text-sm text-on-surface-variant mt-2">Use the decision as an operational next step, not as a legal conclusion.</p>
          </div>
          <Link href="/dashboard/screening" className="text-primary-container font-headline text-xs uppercase tracking-widest hover:text-white transition-colors">
            Run First Screening
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          {decisionCards.map(([decision, text]) => (
            <div className="bg-background/20 border border-outline-variant/10 p-5 min-h-[150px]" key={decision}>
              <code className="block text-primary-container font-bold text-sm mb-4">{decision}</code>
              <p className="text-on-surface-variant text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
