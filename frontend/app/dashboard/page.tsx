"use client";

export default function DashboardPage() {
  return (
    <div className="p-8 pb-32 space-y-12 max-w-7xl mx-auto w-full min-h-screen">
      {/* Unified Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full">
        <div className="flex flex-col gap-2 transition-all">
          <h2 className="text-[10px] font-label uppercase tracking-[0.4em] text-on-surface-variant font-bold">Global Intelligence</h2>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface uppercase tracking-tight">
            System <span className="text-primary-container">Overview</span>
          </h1>
        </div>
        <div className="text-[10px] font-label text-primary-container font-bold tracking-[0.2em] flex items-center gap-3 bg-surface-container-highest/30 px-4 py-2 rounded-sm ghost-border border-primary-container/10">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-container shadow-[0_0_10px_#00F2FF] animate-pulse"></span>
          LIVE DATA FEED
        </div>
      </header>

      {/* KPIs Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-on-surface">
        {/* Total Screened */}
        <div className="bg-surface-container-low rounded p-6 ghost-border flex flex-col justify-between min-h-[140px] shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-[0.2em] font-bold">Total Screened</span>
            <span className="material-symbols-outlined text-on-surface-variant/30 text-lg">monitoring</span>
          </div>
          <div>
            <div className="text-4xl font-headline font-bold tracking-tighter text-on-surface">1.24M</div>
            <div className="text-[10px] font-label text-secondary mt-2 flex items-center gap-1 uppercase tracking-widest font-bold">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +12% this week
            </div>
          </div>
        </div>

        {/* Avg Risk Score */}
        <div className="bg-surface-container-highest rounded p-6 ghost-border glow-shadow relative overflow-hidden flex flex-col justify-between min-h-[140px]">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-container/10 rounded-full blur-2xl"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <span className="text-[10px] font-label text-primary-container uppercase tracking-[0.2em] font-bold">Avg Risk Score</span>
            <span className="material-symbols-outlined text-primary-container/60 text-lg">speed</span>
          </div>
          <div className="relative z-10">
            <div className="text-4xl font-headline font-black tracking-tighter text-primary-container drop-shadow-[0_0_8px_rgba(0,242,255,0.3)]">24.5</div>
          </div>
        </div>

        {/* High Risk Alerts */}
        <div className="bg-surface-container-low rounded p-6 ghost-border flex flex-col justify-between border-l-2 border-l-error/50 min-h-[140px]">
          <div className="flex justify-between items-start mb-6">
            <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-[0.2em] font-bold text-error/80">High Risk Alerts</span>
            <span className="material-symbols-outlined text-error/40 text-lg">warning</span>
          </div>
          <div>
            <div className="text-4xl font-headline font-bold tracking-tighter text-error">843</div>
          </div>
        </div>

        {/* Pending Reviews */}
        <div className="bg-surface-container-low rounded p-6 ghost-border flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start mb-6">
            <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-[0.2em] font-bold">Pending Reviews</span>
            <span className="material-symbols-outlined text-secondary/40 text-lg">pending_actions</span>
          </div>
          <div>
            <div className="text-4xl font-headline font-bold tracking-tighter text-on-surface">156</div>
          </div>
        </div>
      </div>

      {/* Charts & Activity Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface-container-low rounded-lg p-8 ghost-border flex flex-col min-h-[450px]">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-[10px] font-label text-on-surface uppercase tracking-[0.3em] font-bold">Risk Exposure Trend (30D)</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1.5 bg-surface-container-highest text-primary-container text-[9px] font-label uppercase tracking-widest rounded-sm ghost-border font-black">Network</span>
              <span className="px-3 py-1.5 bg-transparent text-on-surface-variant text-[9px] font-label uppercase tracking-widest rounded-sm hover:text-on-surface cursor-pointer transition-colors font-bold">Entity</span>
            </div>
          </div>
          
          <div className="flex-1 relative w-full mt-4 border-l border-b border-outline-variant/10">
            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
               <title>Risk Trend Chart</title>
               <defs>
                <linearGradient id="chartGlowDashboard" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#00F2FF" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#00F2FF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,80 L10,75 L20,85 L30,60 L40,65 L50,40 L60,55 L70,30 L80,45 L90,20 L100,25 L100,100 L0,100 Z" fill="url(#chartGlowDashboard)" />
              <path d="M0,80 L10,75 L20,85 L30,60 L40,65 L50,40 L60,55 L70,30 L80,45 L90,20 L100,25" fill="none" stroke="#00F2FF" strokeWidth="1.5" className="drop-shadow-[0_0_8px_rgba(0,242,255,0.4)]" />
            </svg>
            
            <div className="absolute -left-10 inset-y-0 flex flex-col justify-between text-[9px] text-on-surface-variant font-label py-4 font-bold opacity-40 uppercase tracking-tighter">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 bg-surface-container-low rounded-lg p-0 ghost-border flex flex-col overflow-hidden">
          <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-highest/30">
            <h3 className="text-[10px] font-label text-on-surface uppercase tracking-[0.3em] font-bold">Live Activity</h3>
            <button type="button" className="text-[9px] font-label text-primary-container hover:text-primary transition-colors font-black tracking-widest uppercase">View Queue</button>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[400px] divide-y divide-outline-variant/5">
            {[
              { id: "0x7F...3B9A", time: "2 mins ago", type: "Screening", risk: "High: 89", isCritical: true, icon: "currency_bitcoin" },
              { id: "Binance Hot Wallet", time: "15 mins ago", type: "Monitor", risk: "Low: 12", isCritical: false, icon: "account_balance" },
              { id: "OKX Settlement", time: "42 mins ago", type: "Screening", risk: "Med: 45", isCritical: false, icon: "account_balance_wallet" },
              { id: "0x2D...F91C", time: "1 hr ago", type: "Screening", risk: "High: 92", isCritical: true, icon: "security" },
              { id: "Coinbase Prime", time: "2 hrs ago", type: "Monitor", risk: "Low: 05", isCritical: false, icon: "hub" },
            ].map((row, i) => (
              <div key={i} className="hover:bg-surface-container transition-all group cursor-pointer p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded bg-surface-container-highest/50 flex items-center justify-center text-on-surface-variant group-hover:text-primary-container transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-lg">{row.icon}</span>
                  </div>
                  <div>
                    <div className="font-headline font-bold text-on-surface text-sm tracking-tight">{row.id}</div>
                    <div className="text-[10px] font-label text-on-surface-variant mt-0.5 uppercase tracking-widest font-bold opacity-60">{row.time} • {row.type}</div>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-sm text-[9px] font-black uppercase tracking-[0.1em] border ${row.isCritical ? 'bg-error/10 text-error border-error/20 shadow-[0_0_10px_rgba(255,180,171,0.05)]' : 'bg-surface-container-highest text-on-surface-variant border-outline-variant/30 opacity-60'}`}>
                  {row.risk}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
