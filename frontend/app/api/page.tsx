"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const sections = ["overview", "authentication", "transaction", "decisions", "errors"] as const;

type SectionId = (typeof sections)[number];

const requestBody = `{
  "transferDirection": "Outbound",
  "amountEur": 1200.0,
  "chain": "SupportedChain",
  "walletAddress": "0xPUT_WALLET_ADDRESS_HERE",
  "travelRuleInfoComplete": true,
  "walletPreviouslyVerified": false,
  "txHistoryWindow": 100
}`;

const responseBody = `{
  "decision": "VerifyOwnership",
  "heuristics": [
    {
      "kind": "SelfHostedAboveThreshold",
      "rationale": "Unknown analyzed wallet is treated as self-hosted-like and transfer amount is above 1,000 EUR",
      "score": 1.0
    }
  ]
}`;

export default function ApiReference() {
  const [activeSection, setActiveSection] = useState<SectionId>("overview");

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (documentHeight - scrollBottom < 80) {
        setActiveSection("errors");
        return;
      }

      const sectionAtTop = sections
        .map((section) => {
          const element = document.getElementById(section);
          return element ? { section, top: element.getBoundingClientRect().top } : null;
        })
        .filter((item): item is { section: SectionId; top: number } => Boolean(item))
        .filter((item) => item.top <= 180)
        .at(-1);

      if (sectionAtTop) {
        setActiveSection(sectionAtTop.section);
        return;
      }

      const firstVisibleSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) {
          return false;
        }
        const rect = element.getBoundingClientRect();
        return rect.bottom > 180;
      });

      setActiveSection(firstVisibleSection ?? "overview");
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const sidebarLinkClass = (section: SectionId, extraClass = "") =>
    [
      activeSection === section
        ? "text-primary-container"
        : "text-slate-400 hover:text-primary-container",
      "transition-colors",
      extraClass,
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <div className="bg-background min-h-screen text-on-surface font-body selection:bg-primary-container selection:text-on-primary">
      <header className="fixed top-0 w-full z-50 bg-[#111222]/60 backdrop-blur-xl glow-shadow border-b border-outline-variant/5">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-6">
          <Link href="/" className="text-2xl font-bold tracking-[0.2em] text-primary-container font-headline uppercase">Gatera</Link>
          <nav className="hidden md:flex items-center gap-10">
            <Link className="headline-editorial text-sm text-on-surface-variant hover:text-primary-container transition-all duration-300 uppercase" href="/">Solutions</Link>
            <Link className="headline-editorial text-sm text-primary-container border-b border-primary-container pb-1 transition-all duration-300 uppercase" href="/api">API</Link>
            <Link className="headline-editorial text-sm text-on-surface-variant hover:text-primary-container transition-all duration-300 uppercase" href="/pricing">Pricing</Link>
          </nav>
          <Link href="/login" className="bg-primary-container text-on-primary px-6 py-2.5 font-headline font-bold uppercase text-xs tracking-widest hover:brightness-110 active:scale-95 transition-all glow-shadow">Launch App</Link>
        </div>
      </header>

      <div className="pt-24 flex min-h-screen">
        <aside className="hidden lg:block w-72 h-[calc(100vh-6rem)] sticky top-24 overflow-y-auto px-8 py-12 bg-surface-container-low border-r border-outline-variant/10">
          <div className="space-y-10">
            <div>
              <h5 className="font-headline text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-6">Guide</h5>
              <ul className="space-y-4 font-label text-xs uppercase tracking-widest">
                <li><Link className={sidebarLinkClass("overview")} href="#overview">Overview</Link></li>
                <li><Link className={sidebarLinkClass("authentication")} href="#authentication">Authentication</Link></li>
                <li><Link className={sidebarLinkClass("transaction")} href="#transaction">Transaction</Link></li>
                <li><Link className={sidebarLinkClass("decisions")} href="#decisions">Decisions</Link></li>
                <li><Link className={sidebarLinkClass("errors")} href="#errors">Errors</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-headline text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-6">Endpoint</h5>
              <ul className="space-y-4 font-label text-xs uppercase tracking-widest">
                <li>
                  <Link className={sidebarLinkClass("transaction", "flex items-center gap-2")} href="#transaction">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-sm font-bold ${activeSection === "transaction" ? "bg-primary-container/20 text-primary-container" : "bg-primary-container/10 text-primary-container"}`}>POST</span>
                    /transaction
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        <main className="flex-1 px-8 lg:px-20 py-12 overflow-hidden bg-background">
          <header className="mb-20 scroll-mt-32" id="overview">
            <span className="font-label text-xs uppercase tracking-[0.4em] text-primary-container mb-6 block">API Reference</span>
            <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tight text-white mb-8 leading-[0.9] uppercase">
              Wallet <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-primary-fixed-dim">Screening.</span>
            </h1>
            <p className="max-w-3xl text-xl text-on-surface-variant font-body leading-relaxed">
              Submit the wallet involved in a company treasury transfer. Gatera analyzes recent on-chain activity, token values, Travel Rule status, and wallet-risk heuristics, then returns a compact decision for the event.
            </p>
          </header>

          <section className="mb-24 scroll-mt-32" id="authentication">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-headline font-bold tracking-widest mb-8 flex items-center gap-4 uppercase text-white">
                  <span className="material-symbols-outlined text-primary-container text-2xl">key</span>
                  Authentication
                </h2>
                <div className="space-y-6 text-on-surface-variant font-body text-lg leading-relaxed">
                  <p>The MVP API does not require client authentication yet.</p>
                  <p>The backend server still needs a chain data provider key in its environment so it can fetch account history.</p>
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-sm overflow-hidden border border-outline-variant/10 shadow-2xl">
                <div className="bg-surface-container px-6 py-4 border-b border-outline-variant/10">
                  <span className="font-headline text-[10px] uppercase tracking-[0.3em] text-slate-500">Backend Environment</span>
                </div>
                <pre className="p-8 font-mono text-xs leading-7 bg-[#0c0d1d] text-slate-300 overflow-x-auto">{`CHAIN_DATA_API_KEY=your_key_here`}</pre>
              </div>
            </div>
          </section>

          <section className="mb-24 scroll-mt-32" id="transaction">
            <div className="bg-surface-container-low p-10 border border-outline-variant/10">
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="px-2 py-1 bg-primary-container/10 text-primary-container text-[10px] font-bold rounded-sm border border-primary-container/20">POST</span>
                <code className="text-white font-headline text-2xl font-bold tracking-wide">/transaction</code>
              </div>
              <h2 className="font-headline text-3xl font-bold uppercase tracking-[0.2em] text-white mb-6">Screen a Treasury Transfer</h2>
              <p className="text-on-surface-variant text-lg mb-10 leading-relaxed font-body max-w-3xl">
                The analyzed wallet is the wallet on the other side of the treasury transfer. For inbound transfers, it is the sender wallet. For outbound transfers, it is the destination wallet.
              </p>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-[#0c0d1d] border border-outline-variant/10 overflow-hidden">
                  <div className="bg-surface-container px-6 py-4 border-b border-outline-variant/10">
                    <span className="font-headline text-[10px] uppercase tracking-[0.3em] text-slate-500">Example Request Body</span>
                  </div>
                  <pre className="p-8 font-mono text-xs leading-7 text-slate-300 overflow-x-auto">{requestBody}</pre>
                </div>
                <div className="bg-[#0c0d1d] border border-outline-variant/10 overflow-hidden">
                  <div className="bg-surface-container px-6 py-4 border-b border-outline-variant/10">
                    <span className="font-headline text-[10px] uppercase tracking-[0.3em] text-slate-500">Example Response</span>
                  </div>
                  <pre className="p-8 font-mono text-xs leading-7 text-slate-300 overflow-x-auto">{responseBody}</pre>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="text-3xl font-headline font-bold tracking-widest mb-10 uppercase text-white">Required Fields</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ["transferDirection", "Inbound or Outbound, relative to the company treasury."],
                ["amountEur", "The current transfer amount in EUR."],
                ["chain", "The network selected for the wallet screening."],
                ["walletAddress", "The wallet address being analyzed."],
                ["travelRuleInfoComplete", "Whether required Travel Rule information is complete."],
                ["walletPreviouslyVerified", "Whether ownership or control was already verified."],
                ["txHistoryWindow", "How many recent on-chain records to analyze, up to the backend limit."],
              ].map(([field, description]) => (
                <div className="bg-surface-container p-6 border border-outline-variant/10" key={field}>
                  <code className="block text-primary-container font-bold mb-3">{field}</code>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-24 scroll-mt-32" id="decisions">
            <h2 className="text-3xl font-headline font-bold tracking-widest mb-10 uppercase text-white">Decisions</h2>
            <div className="space-y-3">
              {[
                ["Allow", "No relevant risk signal was triggered."],
                ["AllowWithMonitoring", "A weak or medium signal triggered; continue with monitoring."],
                ["VerifyOwnership", "Ownership or control verification is required before proceeding."],
                ["ManualReview", "A strong wallet-risk signal requires human review."],
                ["Hold", "Required Travel Rule information is missing."],
              ].map(([decision, meaning]) => (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-surface-container-low px-6 py-5 border border-outline-variant/10" key={decision}>
                  <code className="text-primary-container font-bold">{decision}</code>
                  <p className="md:col-span-2 text-on-surface-variant text-sm">{meaning}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-24">
            <h2 className="text-3xl font-headline font-bold tracking-widest mb-10 uppercase text-white">Triggered Heuristics</h2>
            <p className="max-w-3xl text-on-surface-variant mb-8 leading-relaxed">
              The response only includes heuristics that triggered. Scores are normalized from 0.00 to 1.00 and can be used as structured context for an AI-generated event report.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "MissingTransferInformation",
                "SelfHostedAboveThreshold",
                "LinkedTransfers",
                "PassThroughBehavior",
                "HighVelocity",
                "HigherRiskCounterparties",
                "BridgeObfuscationExposure",
                "UnclearSourceOfFunds",
              ].map((name) => (
                <div className="bg-surface-container p-5 border-l-2 border-primary-container" key={name}>
                  <code className="text-white text-sm">{name}</code>
                </div>
              ))}
            </div>
          </section>

          <section className="scroll-mt-32" id="errors">
            <h2 className="text-3xl font-headline font-bold tracking-widest mb-10 uppercase text-white">Errors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-container-low p-8 border border-outline-variant/10">
                <span className="text-error font-headline text-lg font-bold">400 Validation Error</span>
                <pre className="mt-6 bg-[#0c0d1d] p-6 text-xs overflow-x-auto text-slate-300">{`{
  "error": "walletAddress must be a valid address for the selected chain"
}`}</pre>
              </div>
              <div className="bg-surface-container-low p-8 border border-outline-variant/10">
                <span className="text-error font-headline text-lg font-bold">502 Upstream Error</span>
                <pre className="mt-6 bg-[#0c0d1d] p-6 text-xs overflow-x-auto text-slate-300">{`{
  "error": "missing chain data provider api key"
}`}</pre>
              </div>
            </div>
          </section>
        </main>
      </div>

      <footer className="w-full py-12 bg-[#111222] border-t border-[#3A494B]/15">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold tracking-[0.2em] text-primary-container font-headline uppercase">Gatera</div>
          <div className="flex flex-wrap justify-center gap-8">
            <Link className="font-body text-xs tracking-wider text-slate-500 hover:text-primary-container transition-all opacity-80 hover:opacity-100 uppercase" href="/">Solutions</Link>
            <Link className="font-body text-xs tracking-wider text-slate-500 hover:text-primary-container transition-all opacity-80 hover:opacity-100 uppercase" href="/api">API</Link>
            <Link className="font-body text-xs tracking-wider text-slate-500 hover:text-primary-container transition-all opacity-80 hover:opacity-100 uppercase" href="/pricing">Pricing</Link>
          </div>
          <div className="font-body text-xs tracking-wider text-slate-500">
            © {new Date().getFullYear()} Gatera. Wallet transfer screening for treasury flows.
          </div>
        </div>
      </footer>
    </div>
  );
}
