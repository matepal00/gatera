"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="bg-background min-h-screen text-on-surface selection:bg-primary-container selection:text-on-primary">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-[#111222]/60 backdrop-blur-xl glow-shadow border-b border-outline-variant/5">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-6">
          <div className="text-2xl font-bold tracking-[0.2em] text-primary-container font-headline uppercase">Gatera</div>
          <nav className="hidden md:flex items-center gap-10">
            <Link className="headline-editorial text-sm text-primary-container border-b border-primary-container pb-1 transition-all duration-300 uppercase" href="/">Solutions</Link>
            <Link className="headline-editorial text-sm text-on-surface-variant hover:text-primary-container transition-all duration-300 uppercase" href="/api">API</Link>
            <Link className="headline-editorial text-sm text-on-surface-variant hover:text-primary-container transition-all duration-300 uppercase" href="/pricing">Pricing</Link>
          </nav>
          <div className="flex items-center gap-6">
            <Link href="/login" className="bg-primary-container text-on-primary px-6 py-2.5 font-headline font-bold uppercase text-xs tracking-widest hover:brightness-110 active:scale-95 transition-all glow-shadow">Launch App</Link>
          </div>
        </div>
      </header>

      <main className="pt-22">
        {/* Hero Section */}
        <section className="w-full relative overflow-hidden">
          {/* Background Video - Full Width */}
          <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
            <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
              <source src="/0418.mov" />
            </video>
            <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background"></div>
          </div>

          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-container/5 rounded-full blur-[120px]"></div>
          
          <div className="max-w-7xl mx-auto px-8 py-20 lg:py-32 relative z-10">
            <div className="max-w-4xl">
              <span className="font-label text-xs uppercase tracking-[0.3em] text-primary-container mb-6 block">The Hyper-Luminous Vault</span>
              <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tight text-white mb-8 leading-[0.9] uppercase">
                Secure the <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-container to-primary-fixed-dim">Frontier.</span>
              </h1>
              <p className="font-body text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                Gatera provides institutional-grade screening and automated compliance for the next generation of digital wealth. Engineered for absolute precision.
              </p>
              <div className="mt-12 flex flex-col sm:flex-row gap-6">
                 <Link href="/login" className="bg-primary-container text-on-primary px-8 py-4 font-headline font-bold text-base hover:brightness-110 active:scale-95 transition-all glow-shadow flex items-center gap-3">
                   Start Screening
                   <span className="material-symbols-outlined text-xl">arrow_forward</span>
                 </Link>
                 <button onClick={() => router.push("/api")} type="button" className="bg-surface-container/40 backdrop-blur-xl border cursor-pointer border-outline-variant/15 text-primary-container px-8 py-4 font-headline font-bold text-base hover:bg-surface-container/60 transition-all flex items-center gap-3">
                   <span className="material-symbols-outlined cursor-pointer  text-xl">terminal</span>
                   View API Docs
                 </button>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid: Core Capabilities */}
        <section className="max-w-7xl mx-auto px-8 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large Feature */}
            <div className="md:col-span-2 bg-surface-container-low p-10 flex flex-col justify-between relative overflow-hidden group">
              {/* Decorative Element - SVG for guaranteed visibility */}
              <div className="absolute -bottom-32 -right-16 opacity-5 pointer-events-none text-white">
                <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor">
                  <title>Decorative Shield</title>
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>  
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container mb-8">
                  <span className="material-symbols-outlined text-primary-container text-2xl">shield</span>
                </div>
                <h3 className="font-headline text-3xl font-bold text-white mb-4 tracking-wide uppercase">Institutional Screening</h3>
                <p className="text-on-surface-variant max-w-md font-body">Deep-dive due diligence and entity resolution for complex institutional wallets. Cross-reference billions of data points in milliseconds.</p>
              </div>
              <div className="mt-12 flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-500 relative z-10">
                <span className="headline-editorial text-xs tracking-widest uppercase text-primary-container">Explore Engine</span>
                <span className="material-symbols-outlined text-primary-container text-sm">arrow_forward</span>
              </div>
            </div>

            {/* Small Feature 1 */}
            <div className="bg-surface-container-highest p-10 flex flex-col justify-between border-l-2 border-primary-container">
              <div>
                <span className="material-symbols-outlined text-primary-container mb-6">speed</span>
                <h3 className="font-headline text-2xl font-bold text-white mb-4 uppercase">Real-Time AML</h3>
                <p className="text-on-surface-variant font-body text-sm leading-relaxed">Live transaction monitoring with automated risk scoring and immediate freezing triggers for high-risk flags.</p>
              </div>
              <div className="pt-8">
                <div className="w-full h-[2px] bg-outline-variant/20 relative">
                  <div className="absolute top-0 left-0 h-full w-2/3 bg-primary-container shadow-[0_0_10px_#00f2ff]"></div>
                </div>
                <div className="flex justify-between mt-2 font-label text-[10px] uppercase text-slate-500">
                  <span>Analysis Flow</span>
                  <span>99.9% Latency</span>
                </div>
              </div>
            </div>

            {/* Small Feature 2 */}
            <div className="bg-surface-container p-10 flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-primary-container mb-6">verified_user</span>
                <h3 className="font-headline text-2xl font-bold text-white mb-4 uppercase">Compliance Hub</h3>
                <p className="text-on-surface-variant font-body text-sm leading-relaxed">Automated regulatory reporting for global jurisdictions. One-click export for audit readiness.</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-8">
                <span className="px-3 py-1 bg-background text-[10px] font-label uppercase tracking-tighter text-slate-400">SOC2</span>
                <span className="px-3 py-1 bg-background text-[10px] font-label uppercase tracking-tighter text-slate-400">GDPR</span>
                <span className="px-3 py-1 bg-background text-[10px] font-label uppercase tracking-tighter text-slate-400">FATF</span>
              </div>
            </div>

            {/* Medium Feature */}
            <div className="md:col-span-2 bg-surface-container-low p-10 flex items-center justify-between gap-12 group">
              <div className="flex-1">
                <h3 className="font-headline text-3xl font-bold text-white mb-4 uppercase">AI-Driven Risk Engine</h3>
                <p className="text-on-surface-variant font-body">Predictive modeling that identifies emerging threat patterns before they hit the ledger. Harnessing neural networks to protect your liquidity pools.</p>
              </div>
              <div className="w-48 h-48 shrink-0 bg-surface-container-highest flex items-center justify-center relative overflow-hidden">
                <Image 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000" 
                  alt="abstract digital visualization" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAu4FftBCne4TnynzvXxyBhK_ob0lsKpL7fho3nqTz9w05DU-1qcH14UlgIN9De4mkp7RUl0SjU5AxoCqnO3YyhzhX0-Nv2xIjnBjYriRmMa5Yq-GVpPUSQK0XYATl9KwZYbzCXoyBYIXUXj6lTcbpDG4bjIlJCMlDXPUlNbxb8V194_eBKVa90DPeO4OG1au4eElk8Mrl6o5UmuL_G7XsQtQgQ9C-JsufbKlcYDtcZ16HSq8-joTT3WLeu4QV5EW7XMuB4Nc2te87D"
                  width={200}
                  height={200}
                  unoptimized
                />
                <span className="material-symbols-outlined text-4xl text-primary-container relative z-10">psychology</span>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases: Industry Vertical Section */}
        <section className="bg-surface-container-low py-32 relative">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-20 text-center">
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wider">Designed for Every Tier.</h2>
              <p className="text-on-surface-variant max-w-xl mx-auto font-body">Adaptive compliance frameworks tailored to your specific ecosystem requirements.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* DeFi Use Case */}
              <div className="glass-card p-1 text-left relative group">
                <div className="bg-surface-container p-8 h-full">
                  <div className="h-1 bg-primary-container w-12 mb-8 group-hover:w-full transition-all duration-700"></div>
                  <h4 className="font-headline text-2xl font-bold text-white mb-4 uppercase">DeFi Protocols</h4>
                  <p className="text-on-surface-variant font-body text-sm mb-8 leading-relaxed">Permissioned pools and decentralized identity verification. Maintain anonymity while satisfying regulatory mandates.</p>
                  <ul className="space-y-4 mb-10">
                    <li className="flex items-center gap-3 font-label text-xs uppercase tracking-wider text-slate-300">
                      <span className="material-symbols-outlined text-sm text-primary-container">check_circle</span>
                      Zero-Knowledge KYC
                    </li>
                    <li className="flex items-center gap-3 font-label text-xs uppercase tracking-wider text-slate-300">
                      <span className="material-symbols-outlined text-sm text-primary-container">check_circle</span>
                      Liquidity Screening
                    </li>
                  </ul>
                </div>
              </div>
              {/* Exchanges Use Case */}
              <div className="glass-card p-1 text-left relative group translate-y-4">
                <div className="bg-surface-container p-8 h-full border-t border-primary-container/20">
                  <div className="h-1 bg-primary-container w-12 mb-8 group-hover:w-full transition-all duration-700"></div>
                  <h4 className="font-headline text-2xl font-bold text-white mb-4 uppercase">Crypto Exchanges</h4>
                  <p className="text-on-surface-variant font-body text-sm mb-8 leading-relaxed">High-throughput monitoring for VASP operations. Automated SAR filing and risk scoring for millions of accounts.</p>
                  <ul className="space-y-4 mb-10">
                    <li className="flex items-center gap-3 font-label text-xs uppercase tracking-wider text-slate-300">
                      <span className="material-symbols-outlined text-sm text-primary-container">check_circle</span>
                      VASP Compliance Hub
                    </li>
                    <li className="flex items-center gap-3 font-label text-xs uppercase tracking-wider text-slate-300">
                      <span className="material-symbols-outlined text-sm text-primary-container">check_circle</span>
                      Automated SAR Filing
                    </li>
                  </ul>
                </div>
              </div>
              {/* TradFi Use Case */}
              <div className="glass-card p-1 text-left relative group">
                <div className="bg-surface-container p-8 h-full">
                  <div className="h-1 bg-primary-container w-12 mb-8 group-hover:w-full transition-all duration-700"></div>
                  <h4 className="font-headline text-2xl font-bold text-white mb-4 uppercase">TradFi Institutions</h4>
                  <p className="text-on-surface-variant font-body text-sm mb-8 leading-relaxed">Bridging the gap for legacy banks entering digital assets. Unified dashboards for on-chain and off-chain assets.</p>
                  <ul className="space-y-4 mb-10">
                    <li className="flex items-center gap-3 font-label text-xs uppercase tracking-wider text-slate-300">
                      <span className="material-symbols-outlined text-sm text-primary-container">check_circle</span>
                      Hybrid Asset Audits
                    </li>
                    <li className="flex items-center gap-3 font-label text-xs uppercase tracking-wider text-slate-300">
                      <span className="material-symbols-outlined text-sm text-primary-container">check_circle</span>
                      Legacy API Adapters
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Visualization (Simulated Dashboard) */}
        <section className="max-w-7xl mx-auto px-8 py-32">
          <div className="bg-surface-container-lowest p-12 lg:p-20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <Image 
                className="w-full h-full object-cover" 
                alt="data dashboard" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUC07k2vS8yS1H4_n_hRSLF0KKvyF91tMS4uIEIydM-iyVQsvVnPv6P1U2XbjoWj_H1S40U11dmXV_QmBYAfN0GUBEe-00IQm7HUvSLWbsKbK9LvTMvfFd7IDGu9Ag9FhoGD3iu8ZVBcaX1Jy93JTfIzAG0Rsh2IHUPb7ZUH1WB9FFmY5CiFVeHxOV41tHbHDbIzGb544kx2uXVgFStPXyVmb5SPnufskK9tSwi_TuQ8IngHdQ4vdNzb8lPYcDoh_9ARHHVfj0cAu_"
                fill
                unoptimized
              />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
              <div className="max-w-xl text-left">
                <h2 className="font-headline text-4xl font-bold text-white mb-6 leading-tight uppercase tracking-wide">Total Visibility over the Cipher.</h2>
                <p className="text-on-surface-variant font-body mb-8">Our API-first architecture allows you to integrate Gatera’s risk scoring directly into your trading engine or wallet interface.</p>
                <button type="button" className="border border-primary-container/30 hover:border-primary-container text-primary-container px-8 py-3 font-headline font-bold uppercase text-xs tracking-widest transition-all">Documentation</button>
              </div>
              <div className="w-full md:w-1/2 bg-surface-container-high/80 p-8 border-l-4 border-primary-container glass-card">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-label text-xs uppercase tracking-widest text-slate-400">Live Risk Feed</span>
                  <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                </div>
                <div className="space-y-4 font-body">
                  <div className="flex items-center justify-between py-2 border-b border-outline-variant/10">
                    <span className="text-sm text-white">Wallet: 0x4f...92d1</span>
                    <span className="text-[10px] font-label px-2 py-0.5 bg-error/10 text-error">CRITICAL</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-outline-variant/10">
                    <span className="text-sm text-white">Entity: L3-Ventures</span>
                    <span className="text-[10px] font-label px-2 py-0.5 bg-primary-container/10 text-primary-container">CLEAR</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-white">TXID: 9812...bb21</span>
                    <span className="text-[10px] font-label px-2 py-0.5 bg-surface-container-highest text-slate-400">PENDING</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-7xl mx-auto px-8 py-32 text-center">
          <h2 className="font-headline text-5xl md:text-7xl font-bold text-white mb-10 tracking-tight uppercase">Evolve Your <span className="italic font-extralight text-primary-container">Compliance.</span></h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link href="/login" className="w-full md:w-auto bg-primary-container text-on-primary px-12 py-4 font-headline font-bold uppercase text-sm tracking-widest hover:brightness-110 transition-all glow-shadow text-center">Launch Platform</Link>
            <button onClick={() => window.open("https://t.me/jakukow")} type="button" className="w-full md:w-auto border-b-2 border-primary-container text-white px-12 py-4 font-headline font-bold uppercase text-sm tracking-widest hover:text-primary-container transition-all">Speak to an Architect</button>
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
            © {new Date().getFullYear()} Gatera. Engineered for the Next Frontier.
          </div>
        </div>
      </footer>
    </div>
  );
}
