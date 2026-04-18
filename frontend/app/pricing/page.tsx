"use client";

import Link from "next/link";

export default function Pricing() {
  return (
    <div className="bg-background min-h-screen text-on-surface selection:bg-primary-container selection:text-on-primary">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-[#111222]/60 backdrop-blur-xl glow-shadow border-b border-outline-variant/5">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-6">
          <div className="text-2xl font-bold tracking-[0.2em] text-primary-container font-headline uppercase">Gatera</div>
          <nav className="hidden md:flex items-center gap-10">
            <Link className="headline-editorial text-sm text-on-surface-variant hover:text-primary-container transition-all duration-300 uppercase" href="/">Solutions</Link>
            <Link className="headline-editorial text-sm text-on-surface-variant hover:text-primary-container transition-all duration-300 uppercase" href="/api">API</Link>
            <Link className="headline-editorial text-sm text-primary-container border-b border-primary-container pb-1 transition-all duration-300 uppercase" href="/pricing">Pricing</Link>
          </nav>
          <div className="flex items-center gap-6">
            <button type="button" className="bg-primary-container text-on-primary px-6 py-2.5 font-headline font-bold uppercase text-xs tracking-widest hover:brightness-110 active:scale-95 transition-all glow-shadow">Launch App</button>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-24">
        {/* Pricing Section (Scalable Infrastructure) */}
        <section className="max-w-7xl mx-auto px-8 mb-24 text-center">
            <h1 className="font-headline text-5xl md:text-7xl font-bold uppercase text-white mb-6 tracking-tight">Scalable <span className="text-primary-container">Vaults.</span></h1>
            <p className="max-w-2xl mx-auto text-on-surface-variant text-lg font-body leading-relaxed mb-12">
              Transparent architectural pricing designed for institutional grade stability. Choose the tier that matches your operational velocity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-8">
              {/* Starter Tier */}
              <div className="bg-surface-container-low p-10 flex flex-col items-start text-left relative overflow-hidden group">
                <span className="font-label text-[10px] tracking-[0.3em] uppercase text-slate-500 mb-4 block">Phase I</span>
                <h2 className="font-headline text-3xl font-bold text-white mb-2 uppercase tracking-wide">Starter</h2>
                <div className="flex items-baseline gap-2 mb-8 border-b border-outline-variant/10 pb-4 w-full">
                  <span className="text-4xl font-headline font-bold text-primary-container">$0</span>
                  <span className="text-slate-500 text-[10px] uppercase tracking-widest font-label">/ Month</span>
                </div>
                <ul className="space-y-4 mb-12 w-full">
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant font-body">
                    <span className="material-symbols-outlined text-primary-container text-lg">check_circle</span>
                    Standard API Access
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant font-body">
                    <span className="material-symbols-outlined text-primary-container text-lg">check_circle</span>
                    Community Node Support
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant font-body">
                    <span className="material-symbols-outlined text-primary-container text-lg">check_circle</span>
                    Public Repository Screening
                  </li>
                </ul>
                <button type="button" className="mt-auto w-full border border-primary-container/30 py-4 font-headline uppercase tracking-widest text-xs hover:bg-primary-container hover:text-on-primary transition-all">Initialize Free</button>
              </div>

              {/* Professional Tier (Featured) */}
              <div className="glass-card p-10 flex flex-col items-start text-left relative glow-shadow scale-105 z-10 border border-primary-container/10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-container to-primary-fixed-dim"></div>
                <div className="flex justify-between w-full items-start mb-4">
                  <span className="font-label text-[10px] tracking-[0.3em] uppercase text-primary-container">Phase II</span>
                  <span className="bg-primary-container text-on-primary text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest shadow-[0_0_10px_rgba(0,242,255,0.4)]">Institutional Choice</span>
                </div>
                <h2 className="font-headline text-3xl font-bold text-white mb-2 uppercase tracking-wide">Professional</h2>
                <div className="flex items-baseline gap-2 mb-8 border-b border-primary-container/20 pb-4 w-full">
                  <span className="text-4xl font-headline font-bold text-primary-container">$149</span>
                  <span className="text-slate-400 text-[10px] uppercase tracking-widest font-label">/ Month</span>
                </div>
                <ul className="space-y-4 mb-12 w-full">
                  <li className="flex items-center gap-3 text-sm text-white font-body">
                    <span className="material-symbols-outlined text-primary-container text-lg">bolt</span>
                    Unlimited Private Vaults
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white font-body">
                    <span className="material-symbols-outlined text-primary-container text-lg">bolt</span>
                    Priority Risk Engine Compute
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white font-body">
                    <span className="material-symbols-outlined text-primary-container text-lg">bolt</span>
                    Deep Wallet Forensics
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white font-body">
                    <span className="material-symbols-outlined text-primary-container text-lg">bolt</span>
                    Dedicated Support Architect
                  </li>
                </ul>
                <button type="button" className="mt-auto w-full bg-primary-container py-4 font-headline font-bold text-on-primary uppercase tracking-widest text-xs shadow-[0_0_30px_rgba(0,242,255,0.3)] hover:brightness-110 active:scale-95 transition-all outline-none">Evolve Access</button>
              </div>

              {/* Enterprise Tier */}
              <div className="bg-surface-container-low p-10 flex flex-col items-start text-left relative overflow-hidden group">
                <span className="font-label text-[10px] tracking-[0.3em] uppercase text-slate-500 mb-4 block">Phase III</span>
                <h2 className="font-headline text-3xl font-bold text-white mb-2 uppercase tracking-wide">Enterprise</h2>
                <div className="flex items-baseline gap-2 mb-8 border-b border-outline-variant/10 pb-4 w-full">
                  <span className="text-4xl font-headline font-bold text-primary-container">Custom</span>
                </div>
                <ul className="space-y-4 mb-12 w-full">
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant font-body">
                    <span className="material-symbols-outlined text-primary-container text-lg">shield</span>
                    Sovereign Hardware Isolation
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant font-body">
                    <span className="material-symbols-outlined text-primary-container text-lg">shield</span>
                    Custom Governance Logic
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant font-body">
                    <span className="material-symbols-outlined text-primary-container text-lg">shield</span>
                    Global Compliance Audits
                  </li>
                </ul>
                <button type="button" className="mt-auto w-full border border-primary-container/30 py-4 font-headline uppercase tracking-widest text-xs hover:bg-primary-container hover:text-on-primary transition-all">Speak to an Architect</button>
              </div>
            </div>
        </section>

        {/* Feature Comparison (Architectural Matrix) */}
        <section className="max-w-7xl mx-auto px-8 mb-32">
          <div className="bg-surface-container-lowest p-12 overflow-hidden relative border border-outline-variant/10">
            <div className="mb-16">
              <h3 className="font-headline text-2xl font-bold text-white tracking-widest uppercase mb-4">Architectural Comparison</h3>
              <p className="text-slate-500 text-[10px] font-label uppercase tracking-[0.3em]">Institutional Matrix v2.4</p>
            </div>
            <div className="space-y-0.5 overflow-x-auto">
              {/* Table Header */}
              <div className="grid grid-cols-4 py-6 px-4 bg-surface-container-low mb-8 font-headline text-[10px] tracking-[0.3em] uppercase text-slate-500 min-w-[800px]">
                <div className="col-span-1 border-l-2 border-primary-container/40 pl-4">System Parameter</div>
                <div className="text-center">Starter</div>
                <div className="text-center">Professional</div>
                <div className="text-center">Enterprise</div>
              </div>
              {/* Row 1 */}
              <div className="grid grid-cols-4 py-8 px-4 border-b border-outline-variant/10 hover:bg-surface-container-high/30 transition-colors min-w-[800px]">
                <div className="col-span-1 flex flex-col">
                  <span className="text-white font-headline font-bold uppercase tracking-widest text-sm mb-1">API Throughput</span>
                  <span className="text-slate-500 text-[10px] font-label uppercase tracking-widest">Requests per millisecond</span>
                </div>
                <div className="text-center text-on-surface-variant text-sm self-center font-body">100 req/s</div>
                <div className="text-center text-primary-container text-sm font-bold self-center font-body">Unlimited</div>
                <div className="text-center text-on-surface-variant text-sm self-center font-body italic">Custom Tier</div>
              </div>
              {/* Row 2 */}
              <div className="grid grid-cols-4 py-8 px-4 border-b border-outline-variant/10 hover:bg-surface-container-high/30 transition-colors min-w-[800px]">
                <div className="col-span-1 flex flex-col">
                  <span className="text-white font-headline font-bold uppercase tracking-widest text-sm mb-1">Compute Isolation</span>
                  <span className="text-slate-500 text-[10px] font-label uppercase tracking-widest">Multi-chain node density</span>
                </div>
                <div className="text-center self-center"><span className="material-symbols-outlined text-slate-700">remove</span></div>
                <div className="text-center self-center"><span className="material-symbols-outlined text-primary-container">shield</span></div>
                <div className="text-center self-center"><span className="material-symbols-outlined text-primary-container">shield</span></div>
              </div>
              {/* Row 3 */}
              <div className="grid grid-cols-4 py-8 px-4 border-b border-outline-variant/10 hover:bg-surface-container-high/30 transition-colors min-w-[800px]">
                <div className="col-span-1 flex flex-col">
                  <span className="text-white font-headline font-bold uppercase tracking-widest text-sm mb-1">Storage Encryption</span>
                  <span className="text-slate-500 text-[10px] font-label uppercase tracking-widest">AES-256 + Quantum Proof</span>
                </div>
                <div className="text-center text-on-surface-variant text-sm self-center uppercase tracking-widest font-label font-bold">Standard</div>
                <div className="text-center text-on-surface-variant text-sm self-center uppercase tracking-widest font-label font-bold">Advanced</div>
                <div className="text-center text-primary-container text-sm font-bold self-center uppercase tracking-widest font-label">Vault-Only</div>
              </div>
              {/* Row 4 */}
              <div className="grid grid-cols-4 py-8 px-4 border-b border-outline-variant/10 hover:bg-surface-container-high/30 transition-colors min-w-[800px]">
                <div className="col-span-1 flex flex-col">
                  <span className="text-white font-headline font-bold uppercase tracking-widest text-sm mb-1">Real-time Triggers</span>
                  <span className="text-slate-500 text-[10px] font-label uppercase tracking-widest">Automated asset freezing</span>
                </div>
                <div className="text-center self-center"><span className="material-symbols-outlined text-slate-700">lock_open</span></div>
                <div className="text-center self-center"><span className="material-symbols-outlined text-primary-container">lock</span></div>
                <div className="text-center self-center"><span className="material-symbols-outlined text-primary-container">lock</span></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 bg-[#111222] border-t border-[#3A494B]/15">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold tracking-[0.2em] text-primary-container font-headline uppercase">Gatera</div>
          <div className="flex flex-wrap justify-center gap-8">
            <Link className="font-body text-xs tracking-wider text-slate-500 hover:text-primary-container transition-all opacity-80 hover:opacity-100 uppercase" href="/">Solutions</Link>
            <Link className="font-body text-xs tracking-wider text-slate-500 hover:text-primary-container transition-all opacity-80 hover:opacity-100 uppercase" href="/api">API</Link>
            <Link className="font-body text-xs tracking-wider text-slate-500 hover:text-primary-container transition-all opacity-80 hover:opacity-100 uppercase" href="/pricing">Pricing</Link>
          </div>
          <div className="font-body text-xs tracking-wider text-slate-500">
            © 2024 Gatera. Engineered for the Next Frontier.
          </div>
        </div>
      </footer>
    </div>
  );
}
