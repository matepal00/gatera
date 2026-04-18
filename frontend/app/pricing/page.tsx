"use client";

import Link from "next/link";

const comingSoon = () => {
  window.alert("Coming soon");
};

export default function Pricing() {
  return (
    <div className="bg-background min-h-screen text-on-surface selection:bg-primary-container selection:text-on-primary">
      <header className="fixed top-0 w-full z-50 bg-[#111222]/60 backdrop-blur-xl glow-shadow border-b border-outline-variant/5">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-6">
          <Link href="/" className="text-2xl font-bold tracking-[0.2em] text-primary-container font-headline uppercase">Gatera</Link>
          <nav className="hidden md:flex items-center gap-10">
            <Link className="headline-editorial text-sm text-on-surface-variant hover:text-primary-container transition-all duration-300 uppercase" href="/">Solutions</Link>
            <Link className="headline-editorial text-sm text-on-surface-variant hover:text-primary-container transition-all duration-300 uppercase" href="/api">API</Link>
            <Link className="headline-editorial text-sm text-primary-container border-b border-primary-container pb-1 transition-all duration-300 uppercase" href="/pricing">Pricing</Link>
          </nav>
          <Link href="/login" className="bg-primary-container text-on-primary px-6 py-2.5 font-headline font-bold uppercase text-xs tracking-widest hover:brightness-110 active:scale-95 transition-all glow-shadow">Launch App</Link>
        </div>
      </header>

      <main className="pt-32 pb-24">
        <section className="max-w-7xl mx-auto px-8 mb-24 text-center">
          <h1 className="font-headline text-5xl md:text-7xl font-bold uppercase text-white mb-6 tracking-tight">
            Pricing for <span className="text-primary-container">Wallet Screening.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-on-surface-variant text-lg font-body leading-relaxed mb-12">
            Start with a small screening volume, then scale by the number of wallets analyzed each month. Every plan uses the same decision model and triggered-heuristics response.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-8">
            <div className="bg-surface-container-low p-10 flex flex-col items-start text-left relative overflow-hidden group">
              <span className="font-label text-[10px] tracking-[0.3em] uppercase text-slate-500 mb-4 block">MVP Access</span>
              <h2 className="font-headline text-3xl font-bold text-white mb-2 uppercase tracking-wide">Starter</h2>
              <div className="flex items-baseline gap-2 mb-8 border-b border-outline-variant/10 pb-4 w-full">
                <span className="text-4xl font-headline font-bold text-primary-container">$0</span>
                <span className="text-slate-500 text-[10px] uppercase tracking-widest font-label">/ Month</span>
              </div>
              <ul className="space-y-4 mb-12 w-full">
                <li className="flex items-center gap-3 text-sm text-on-surface-variant font-body">
                  <span className="material-symbols-outlined text-primary-container text-lg">check_circle</span>
                  100 wallet screenings per month
                </li>
                <li className="flex items-center gap-3 text-sm text-on-surface-variant font-body">
                  <span className="material-symbols-outlined text-primary-container text-lg">check_circle</span>
                  Supported chain transfer screening
                </li>
                <li className="flex items-center gap-3 text-sm text-on-surface-variant font-body">
                  <span className="material-symbols-outlined text-primary-container text-lg">check_circle</span>
                  Triggered heuristics and scores
                </li>
                <li className="flex items-center gap-3 text-sm text-on-surface-variant font-body">
                  <span className="material-symbols-outlined text-primary-container text-lg">check_circle</span>
                  Basic AI event reports
                </li>
              </ul>
              <Link href="/login" className="mt-auto w-full border border-primary-container/30 py-4 font-headline uppercase tracking-widest text-xs hover:bg-primary-container hover:text-on-primary transition-all text-center">Start Free Trial</Link>
            </div>

            <div className="glass-card p-10 flex flex-col items-start text-left relative glow-shadow scale-105 z-10 border border-primary-container/10">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-container to-primary-fixed-dim"></div>
              <div className="flex justify-between w-full items-start mb-4 gap-4">
                <span className="font-label text-[10px] tracking-[0.3em] uppercase text-primary-container">Growth</span>
                <span className="bg-primary-container text-on-primary text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest shadow-[0_0_10px_rgba(0,242,255,0.4)]">Most Useful</span>
              </div>
              <h2 className="font-headline text-3xl font-bold text-white mb-2 uppercase tracking-wide">Professional</h2>
              <div className="flex items-baseline gap-2 mb-8 border-b border-primary-container/20 pb-4 w-full">
                <span className="text-4xl font-headline font-bold text-primary-container">$149</span>
                <span className="text-slate-400 text-[10px] uppercase tracking-widest font-label">/ Month</span>
              </div>
              <ul className="space-y-4 mb-12 w-full">
                <li className="flex items-center gap-3 text-sm text-white font-body">
                  <span className="material-symbols-outlined text-primary-container text-lg">bolt</span>
                  5,000 wallet screenings per month
                </li>
                <li className="flex items-center gap-3 text-sm text-white font-body">
                  <span className="material-symbols-outlined text-primary-container text-lg">bolt</span>
                  Larger transaction history windows
                </li>
                <li className="flex items-center gap-3 text-sm text-white font-body">
                  <span className="material-symbols-outlined text-primary-container text-lg">bolt</span>
                  AI event reports for every decision
                </li>
                <li className="flex items-center gap-3 text-sm text-white font-body">
                  <span className="material-symbols-outlined text-primary-container text-lg">bolt</span>
                  CSV export for reviewed events
                </li>
              </ul>
              <button onClick={comingSoon} type="button" className="mt-auto w-full bg-primary-container py-4 font-headline font-bold text-on-primary uppercase tracking-widest text-xs shadow-[0_0_30px_rgba(0,242,255,0.3)] hover:brightness-110 active:scale-95 transition-all outline-none">Choose Professional</button>
            </div>

            <div className="bg-surface-container-low p-10 flex flex-col items-start text-left relative overflow-hidden group">
              <span className="font-label text-[10px] tracking-[0.3em] uppercase text-slate-500 mb-4 block">Scale</span>
              <h2 className="font-headline text-3xl font-bold text-white mb-2 uppercase tracking-wide">Enterprise</h2>
              <div className="flex items-baseline gap-2 mb-8 border-b border-outline-variant/10 pb-4 w-full">
                <span className="text-4xl font-headline font-bold text-primary-container">Custom</span>
              </div>
              <ul className="space-y-4 mb-12 w-full">
                <li className="flex items-center gap-3 text-sm text-on-surface-variant font-body">
                  <span className="material-symbols-outlined text-primary-container text-lg">shield</span>
                  Custom monthly wallet volume
                </li>
                <li className="flex items-center gap-3 text-sm text-on-surface-variant font-body">
                  <span className="material-symbols-outlined text-primary-container text-lg">shield</span>
                  Dedicated screening limits
                </li>
                <li className="flex items-center gap-3 text-sm text-on-surface-variant font-body">
                  <span className="material-symbols-outlined text-primary-container text-lg">shield</span>
                  Custom report templates
                </li>
                <li className="flex items-center gap-3 text-sm text-on-surface-variant font-body">
                  <span className="material-symbols-outlined text-primary-container text-lg">shield</span>
                  Priority implementation support
                </li>
              </ul>
              <button onClick={comingSoon} type="button" className="mt-auto w-full border border-primary-container/30 py-4 font-headline uppercase tracking-widest text-xs hover:bg-primary-container hover:text-on-primary transition-all">Choose Enterprise</button>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-8 mb-32">
          <div className="bg-surface-container-lowest p-12 overflow-hidden relative border border-outline-variant/10">
            <div className="mb-16">
              <h3 className="font-headline text-2xl font-bold text-white tracking-widest uppercase mb-4">Plan Comparison</h3>
              <p className="text-slate-500 text-[10px] font-label uppercase tracking-[0.3em]">Screening capacity by monthly wallet volume</p>
            </div>
            <div className="space-y-0.5 overflow-x-auto">
              <div className="grid grid-cols-4 py-6 px-4 bg-surface-container-low mb-8 font-headline text-[10px] tracking-[0.3em] uppercase text-slate-500 min-w-[800px]">
                <div className="col-span-1 border-l-2 border-primary-container/40 pl-4">Feature</div>
                <div className="text-center">Starter</div>
                <div className="text-center">Professional</div>
                <div className="text-center">Enterprise</div>
              </div>
              {[
                ["Wallet screenings", "100 / month", "5,000 / month", "Custom"],
                ["Supported chains", "Initial network", "Initial network", "Custom rollout"],
                ["AI event reports", "Basic", "Included", "Custom templates"],
                ["Transaction history window", "Standard", "Extended", "Custom"],
                ["Support", "Community", "Email", "Priority"],
              ].map(([feature, starter, professional, enterprise]) => (
                <div className="grid grid-cols-4 py-8 px-4 border-b border-outline-variant/10 hover:bg-surface-container-high/30 transition-colors min-w-[800px]" key={feature}>
                  <div className="col-span-1 flex flex-col">
                    <span className="text-white font-headline font-bold uppercase tracking-widest text-sm mb-1">{feature}</span>
                  </div>
                  <div className="text-center text-on-surface-variant text-sm self-center font-body">{starter}</div>
                  <div className="text-center text-primary-container text-sm font-bold self-center font-body">{professional}</div>
                  <div className="text-center text-on-surface-variant text-sm self-center font-body italic">{enterprise}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

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
