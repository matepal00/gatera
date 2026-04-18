"use client";

import Link from "next/link";

export default function ApiReference() {
  return (
    <div className="bg-background min-h-screen text-on-surface font-body selection:bg-primary-container selection:text-on-primary">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-[#111222]/60 backdrop-blur-xl glow-shadow border-b border-outline-variant/5">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-6">
          <div className="text-2xl font-bold tracking-[0.2em] text-primary-container font-headline uppercase">Gatera</div>
          <nav className="hidden md:flex items-center gap-10">
            <Link className="headline-editorial text-sm text-on-surface-variant hover:text-primary-container transition-all duration-300 uppercase" href="/">Solutions</Link>
            <Link className="headline-editorial text-sm text-primary-container border-b border-primary-container pb-1 transition-all duration-300 uppercase" href="/api">API</Link>
            <Link className="headline-editorial text-sm text-on-surface-variant hover:text-primary-container transition-all duration-300 uppercase" href="/pricing">Pricing</Link>
          </nav>
          <div className="flex items-center gap-6">
            <button type="button" className="bg-primary-container text-on-primary px-6 py-2.5 font-headline font-bold uppercase text-xs tracking-widest hover:brightness-110 active:scale-95 transition-all glow-shadow">Launch App</button>
          </div>
        </div>
      </header>

      <div className="pt-24 flex min-h-screen">
        {/* Documentation Sidebar */}
        <aside className="hidden lg:block w-72 h-[calc(100vh-6rem)] sticky top-24 overflow-y-auto px-8 py-12 bg-surface-container-low border-r border-outline-variant/10">
          <div className="space-y-10">
            <div>
              <h5 className="font-headline text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-6">Introduction</h5>
              <ul className="space-y-4 font-label text-xs uppercase tracking-widest">
                <li><Link className="text-primary-container" href="#getting-started">Overview</Link></li>
                <li><Link className="text-slate-400 hover:text-primary-container transition-colors" href="#authentication">Authentication</Link></li>
                <li><Link className="text-slate-400 hover:text-primary-container transition-colors" href="#errors">Procedures</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-headline text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-6">Endpoints</h5>
              <ul className="space-y-4 font-label text-xs uppercase tracking-widest">
                <li><Link className="text-slate-400 hover:text-primary-container transition-colors flex items-center gap-2" href="#endpoint-screen"><span className="text-[9px] bg-primary-container/10 px-1.5 py-0.5 rounded-sm text-primary-container font-bold">GET</span> /screen</Link></li>
                <li><Link className="text-slate-400 hover:text-primary-container transition-colors flex items-center gap-2" href="#endpoint-wallet"><span className="text-[9px] bg-secondary-container/20 px-1.5 py-0.5 rounded-sm text-secondary font-bold">POST</span> /balance</Link></li>
                <li><Link className="text-slate-400 hover:text-primary-container transition-colors flex items-center gap-2" href="#endpoint-assets"><span className="text-[9px] bg-primary-container/10 px-1.5 py-0.5 rounded-sm text-primary-container font-bold">GET</span> /assets</Link></li>
                <li><Link className="text-slate-400 hover:text-primary-container transition-colors flex items-center gap-2" href="#endpoint-vault"><span className="text-[9px] bg-error-container/20 px-1.5 py-0.5 rounded-sm text-error font-bold">POST</span> /lock</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-headline text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-6">Architect SDK</h5>
              <ul className="space-y-4 font-label text-xs uppercase tracking-widest">
                <li><Link className="text-slate-400 hover:text-primary-container transition-colors" href="#">Python Base</Link></li>
                <li><Link className="text-slate-400 hover:text-primary-container transition-colors" href="#">Node.js Core</Link></li>
                <li><Link className="text-slate-400 hover:text-primary-container transition-colors" href="#">Rust Implementation</Link></li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 px-8 lg:px-20 py-12 overflow-hidden bg-background">
          <header className="mb-20">
            <span className="font-label text-xs uppercase tracking-[0.4em] text-primary-container mb-6 block">Archived Data v2.4.0</span>
            <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tight text-white mb-8 leading-[0.9] uppercase">
              API <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-primary-fixed-dim">Vault.</span>
            </h1>
            <p className="max-w-3xl text-xl text-on-surface-variant font-body leading-relaxed">
              Build secure, next-generation financial applications with the Gatera API. Our infrastructure provides low-latency access to multi-chain data and institutional-grade security primitives.
            </p>
          </header>

          {/* Section: Authentication */}
          <section className="mb-32 scroll-mt-32" id="authentication">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl font-headline font-bold tracking-widest mb-8 flex items-center gap-4 uppercase text-white">
                  <span className="material-symbols-outlined text-primary-container text-2xl">key</span>
                  Authentication
                </h2>
                <div className="space-y-6 text-on-surface-variant font-body text-lg leading-relaxed">
                  <p>To authenticate your requests, you must include your security token in the <code className="text-primary-container bg-primary-container/5 px-2 py-0.5 rounded-sm">X-Gatera-Vault-Key</code> header.</p>
                  <p>All API requests must be made over <span className="text-white font-bold">HTTPS</span>. Calls made over plain HTTP will fail. API requests without authentication will result in immediate connection termination.</p>
                  
                  <div className="mt-10 p-8 bg-surface-container-low relative border-l-2 border-primary-container">
                    <h4 className="text-primary-container font-headline text-xs font-bold mb-4 uppercase tracking-[0.2em]">Security Protocol</h4>
                    <p className="text-sm italic leading-relaxed">Use our Environment Manager to rotate keys automatically every 90 days for enhanced security in production environments.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-surface-container-lowest rounded-sm overflow-hidden border border-outline-variant/10 shadow-2xl">
                  <div className="bg-surface-container px-6 py-4 flex items-center justify-between border-b border-outline-variant/10">
                    <span className="font-headline text-[10px] uppercase tracking-[0.3em] text-slate-500">Terminal Request</span>
                    <span className="material-symbols-outlined text-sm text-slate-500 cursor-pointer hover:text-primary-container transition-colors">content_copy</span>
                  </div>
                  <div className="p-8 font-mono text-[11px] leading-7 bg-[#0c0d1d]">
                    <div className="flex gap-6">
                      <span className="text-slate-700 select-none">01</span>
                      <code className="text-slate-300 font-light">curl <span className="text-primary-container italic">https://api.gatera.io/v2/vault</span> \</code>
                    </div>
                    <div className="flex gap-6">
                      <span className="text-slate-700 select-none">02</span>
                      <code className="text-slate-300 font-light">&nbsp;&nbsp;-H &quot;X-Gatera-Vault-Key: <span className="text-primary-container">ga_secure_928...374</span>&quot; \</code>
                    </div>
                    <div className="flex gap-6">
                      <span className="text-slate-700 select-none">03</span>
                      <code className="text-slate-300 font-light">&nbsp;&nbsp;-H &quot;Content-Type: application/json&quot;</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Endpoints Bento Grid */}
          <section className="mb-32">
            <h2 className="text-3xl font-headline font-bold tracking-widest mb-12 uppercase text-white">Core Endpoints</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* /screen */}
              <div className="md:col-span-2 bg-surface-container-low p-10 flex flex-col justify-between relative group" id="endpoint-screen">
                <div className="relative z-10 w-full">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="px-2 py-1 bg-primary-container/10 text-primary-container text-[10px] font-bold rounded-sm border border-primary-container/20">GET</span>
                    <code className="text-white font-headline text-2xl font-bold tracking-wide">/screen</code>
                  </div>
                  <h3 className="font-headline text-xl font-bold uppercase tracking-[0.2em] text-primary-container mb-6">Address Screening</h3>
                  <p className="text-on-surface-variant text-lg mb-10 leading-relaxed font-body max-w-xl">
                    Run a real-time risk assessment on any wallet address across 12+ supported chains. Detects association with sanctioned entities and high-risk mixers.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                  <div className="bg-surface-container px-6 py-4 border border-outline-variant/10">
                    <span className="block text-[10px] uppercase text-slate-500 mb-2 font-label tracking-widest">Global Latency</span>
                    <span className="font-headline text-lg text-primary-container font-bold">&lt; 140ms</span>
                  </div>
                  <div className="bg-surface-container px-6 py-4 border border-outline-variant/10">
                    <span className="block text-[10px] uppercase text-slate-500 mb-2 font-label tracking-widest">Throughput</span>
                    <span className="font-headline text-lg text-primary-container font-bold">1,000 req/min</span>
                  </div>
                </div>
              </div>

              {/* /balance */}
              <div className="bg-surface-container p-10 flex flex-col justify-between border-t-2 border-primary-container" id="endpoint-wallet">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-2 py-1 bg-secondary-container/20 text-secondary text-[10px] font-bold rounded-sm border border-secondary-container/30">POST</span>
                    <code className="text-white font-bold text-lg">/balance</code>
                  </div>
                  <h3 className="font-headline text-lg font-bold mb-6 uppercase tracking-[0.2em] text-white">Balance Audit</h3>
                  <p className="text-on-surface-variant text-sm mb-8 leading-relaxed font-body">Verify real-time liquidity and asset distributions across multiple vaults.</p>
                </div>
                <button type="button" className="w-full py-4 border border-primary-container/20 font-headline text-[10px] tracking-[0.3em] uppercase hover:bg-primary-container hover:text-on-primary transition-all duration-500">Initialize Test</button>
              </div>

              {/* /lock */}
              <div className="md:col-span-3 bg-surface-container-low p-10 flex flex-col md:flex-row gap-12 items-center" id="endpoint-vault">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="px-2 py-1 bg-error/10 text-error text-[10px] font-bold border border-error/20 rounded-sm">POST</span>
                    <code className="text-error font-headline text-2xl font-bold tracking-wide">/lock</code>
                  </div>
                  <h3 className="font-headline text-2xl font-bold mb-6 uppercase tracking-[0.2em] text-white">Secure Lock Initiation</h3>
                  <p className="text-on-surface-variant text-lg leading-relaxed font-body mb-8">Triggers an immediate cryptographic lock on the specified sub-vault. Requires high-privilege API credentials and hardware confirmation.</p>
                </div>
                <div className="w-full md:w-80 p-8 bg-[#0c0d1d] border border-outline-variant/10 shadow-2xl">
                  <code className="font-mono text-[11px] leading-7 text-slate-400">
                    <div className="text-slate-600">{"{"}</div>
                    <div className="ml-6"><span className="text-primary-container">&quot;status&quot;</span>: &quot;locked&quot;,</div>
                    <div className="ml-6"><span className="text-primary-container">&quot;vault_id&quot;</span>: &quot;v_0x1A2...&quot;,</div>
                    <div className="ml-6"><span className="text-primary-container">&quot;mode&quot;</span>: &quot;sovereign&quot;</div>
                    <div className="text-slate-600">{"}"}</div>
                  </code>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

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
