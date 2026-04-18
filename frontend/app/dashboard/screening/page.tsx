"use client";

import { useState } from "react";

export default function ScreeningPage() {
  const [direction, setDirection] = useState<"in" | "out">("in");

  return (
    <div className="p-8 pb-32 max-w-7xl mx-auto w-full flex flex-col gap-12 min-h-screen">
      {/* Unified Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full">
        <div className="flex flex-col gap-2 transition-all">
          <h2 className="text-[10px] font-label uppercase tracking-[0.4em] text-on-surface-variant font-bold">Initialize Verification</h2>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface uppercase tracking-tight">
             New <span className="text-primary-container">Screening</span> Request
          </h1>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column (Form) */}
        <div className="lg:col-span-7 flex flex-col gap-8 text-on-surface">
          
          {/* Section: Transaction Details */}
          <section className="bg-surface-container-low rounded-lg p-8 flex flex-col gap-8 ghost-border">
            <header className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-container text-lg">receipt_long</span>
              <h2 className="text-[11px] font-label uppercase tracking-[0.2em] text-primary-container font-bold">Transaction Details</h2>
            </header>

            <div className="flex flex-col gap-8">
              {/* Target Wallet Address */}
              <div className="input-underglow border-b border-outline-variant/30 p-3 pb-2 flex flex-col gap-2 group transition-all duration-300 bg-surface-container-low/30 rounded-t-sm">
                <label htmlFor="wallet-address" className="text-[10px] font-label text-primary-container uppercase tracking-[0.2em] font-bold px-1">Target Wallet Address</label>
                <div className="flex items-center gap-4 px-1">
                   <span className="material-symbols-outlined text-on-surface-variant/40 text-lg">database</span>
                   <input 
                    id="wallet-address"
                    className="bg-transparent border-none focus:ring-0 text-lg font-mono text-on-surface w-full p-0 placeholder:text-on-surface-variant/20 outline-none tracking-tight" 
                    placeholder="0x0000...0000" 
                    type="text"
                   />
                   <div className="flex items-center gap-2">
                     <button type="button" className="text-[10px] font-headline font-bold text-primary-container border border-primary-container/30 px-2 py-1 rounded hover:bg-primary-container/10 transition-all uppercase tracking-widest">Paste</button>
                     <span className="material-symbols-outlined text-on-surface-variant/60 hover:text-primary-container cursor-pointer transition-colors text-xl">qr_code_scanner</span>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Amount */}
                <div className="input-underglow border-b border-outline-variant/30 p-3 pb-1 flex flex-col gap-2 group transition-all duration-300">
                  <label htmlFor="amount-eur" className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest px-1">Amount (EUR)</label>
                  <div className="flex items-center gap-3 px-1">
                    <span className="text-xl font-headline text-on-surface-variant/60">€</span>
                    <input 
                      id="amount-eur"
                      className="bg-transparent border-none focus:ring-0 text-xl font-headline text-on-surface w-full p-0 placeholder:text-on-surface-variant/20 outline-none" 
                      placeholder="0.00" 
                      type="number"
                    />
                  </div>
                </div>

                {/* Chain Dropdown (Mock) */}
                <div className="input-underglow border-b border-outline-variant/30 pb-3 flex flex-col gap-2 cursor-pointer group transition-all duration-300">
                  <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest px-1">Blockchain Network</label>
                  <div className="flex justify-between items-center py-0.5 px-1">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#627EEA] flex items-center justify-center text-[9px] font-bold text-white shadow-[0_0_10px_rgba(98,126,234,0.3)]">ETH</div>
                        <span className="text-base font-body">Ethereum Mainnet</span>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary-container transition-colors">expand_more</span>
                  </div>
                </div>

                {/* Direction Selector */}
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest px-1">Flow Direction</label>
                  <div className="flex bg-surface-container-lowest rounded p-1 ghost-border w-full">
                    <button 
                      type="button"
                      onClick={() => setDirection("in")}
                      className={`flex-1 py-2 text-xs font-headline font-bold uppercase tracking-widest rounded transition-all duration-300 ${direction === "in" ? "bg-surface-container text-primary-container shadow-sm" : "text-on-surface-variant hover:text-on-surface"}`}
                    >
                      Inbound
                    </button>
                    <button 
                      type="button"
                      onClick={() => setDirection("out")}
                      className={`flex-1 py-2 text-xs font-headline font-bold uppercase tracking-widest rounded transition-all duration-300 ${direction === "out" ? "bg-surface-container text-primary-container shadow-sm" : "text-on-surface-variant hover:text-on-surface"}`}
                    >
                      Outbound
                    </button>
                  </div>
                </div>

                {/* Screening Depth */}
                <div className="input-underglow border-b border-outline-variant/30 pb-3 flex flex-col gap-2 cursor-pointer group transition-all duration-300">
                  <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest px-1">Screening Depth</label>
                  <div className="flex justify-between items-center py-0.5 px-1">
                    <span className="text-base font-body">Last 1,000 Transactions</span>
                    <span className="material-symbols-outlined text-primary-container group-hover:scale-110 transition-transform">segment</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Compliance Checkbox/Toggles */}
          <section className="bg-surface-container-low rounded-lg p-8 flex flex-col gap-8 ghost-border relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary-container shadow-[0_0_15px_#00F2FF]"></div>
            
            <header className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-container text-lg">verified</span>
              <h2 className="text-[11px] font-label uppercase tracking-[0.2em] text-primary-container font-bold">Compliance Protocols</h2>
            </header>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center py-4 border-b border-outline-variant/10 border-dashed">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Travel Rule Compliance</span>
                  <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-wider">Verification for transfers &gt; €1,000</p>
                </div>
                <div className="w-12 h-6 bg-primary-container/10 rounded-full border border-primary-container/30 relative cursor-pointer group shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]">
                  <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-primary-container shadow-[0_0_12px_#00F2FF] transition-all"></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Historic Verification</span>
                  <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-wider">Cross-reference with known secure pools</p>
                </div>
                <div className="w-12 h-6 bg-primary-container/10 rounded-full border border-primary-container/30 relative cursor-pointer group shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]">
                  <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-primary-container shadow-[0_0_12px_#00F2FF] transition-all"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Action CTA */}
          <button type="button" className="w-full mt-4 bg-linear-to-tr from-primary-container to-primary-fixed-dim text-on-primary font-headline font-bold text-lg py-5 rounded-lg glow-shadow hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-4 uppercase tracking-widest shadow-[0_0_40px_rgba(0,242,255,0.15)]">
            Execute Risk Assessment
            <span className="material-symbols-outlined font-bold">terminal</span>
          </button>
        </div>

        {/* Right Column (Preview) */}
        <div className="lg:col-span-5 hidden lg:block h-full">
          <div className="sticky top-28 bg-surface-container-lowest rounded-xl p-10 border border-outline-variant/15 flex flex-col items-center justify-center min-h-[600px] text-center gap-8 relative overflow-hidden">
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none" 
              style={{ backgroundImage: `linear-gradient(#3A494B 1px, transparent 1px), linear-gradient(90deg, #3A494B 1px, transparent 1px)`, backgroundSize: '30px 30px' }}
            ></div>
            
            <div className="relative w-56 h-56 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-primary-container/10 animate-[pulse_4s_infinite]"></div>
              <div className="absolute inset-6 rounded-full border-2 border-primary-container/20 border-dashed animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute inset-12 rounded-full border border-outline-variant/30"></div>
              <div className="w-28 h-28 rounded-full bg-surface-container flex items-center justify-center relative z-10 shadow-[inner_0_0_40px_rgba(0,0,0,0.4)]">
                <span className="material-symbols-outlined text-5xl text-on-surface-variant opacity-40">query_stats</span>
              </div>
              <div className="absolute top-4 right-8 w-2 h-2 rounded-full bg-primary-container/40 animate-pulse"></div>
              <div className="absolute bottom-10 left-4 w-1.5 h-1.5 rounded-full bg-primary-container/30"></div>
              <div className="absolute top-1/2 -right-2 w-1 h-1 rounded-full bg-primary-container/50"></div>
            </div>

            <div className="relative z-10 flex flex-col gap-4">
              <h3 className="text-xl font-headline font-bold text-on-surface-variant tracking-wider uppercase">Awaiting Parameters</h3>
              <p className="text-sm text-outline-variant font-body max-w-[280px] leading-relaxed mx-auto">
                Populate the industrial data fields to initialize the neural risk screening engine.
              </p>
            </div>

            <div className="w-full max-w-[220px] space-y-3 opacity-20">
              <div className="h-1.5 w-full bg-outline-variant rounded-full"></div>
              <div className="h-1.5 w-4/6 bg-outline-variant rounded-full mx-auto"></div>
              <div className="h-1.5 w-5/6 bg-outline-variant rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
