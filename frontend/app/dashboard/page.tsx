"use client";


export default function DashboardPage() {
  return (
    <div className="p-8 pb-24 space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-headline font-bold tracking-[0.05em] text-on-surface">System Overview</h2>
          <p className="text-sm font-label text-on-surface-variant mt-1 uppercase tracking-widest">Global Risk Metrics & Activity</p>
        </div>
        <div className="text-xs font-label text-primary-container font-medium tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary-container shadow-[0_0_10px_#00F2FF] animate-pulse"></span>
          LIVE FEED
        </div>
      </div>

      {/* KPIs Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-on-surface">
        {/* Total Screened */}
        <div className="bg-surface-container-low rounded p-6 ghost-border flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <span className="text-xs font-label text-on-surface-variant uppercase tracking-widest">Total Screened</span>
            <span className="material-symbols-outlined text-on-surface-variant/50">monitoring</span>
          </div>
          <div>
            <div className="text-4xl font-headline font-bold tracking-tight text-on-surface">1.24M</div>
            <div className="text-xs font-label text-secondary mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +12% this week
            </div>
          </div>
        </div>

        {/* Avg Risk Score */}
        <div className="bg-surface-container-highest rounded p-6 ghost-border glow-shadow relative overflow-hidden flex flex-col justify-between">
          {/* Accent Glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-container/20 rounded-full blur-[40px]"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <span className="text-xs font-label text-primary-container uppercase tracking-widest">Avg Risk Score</span>
            <span className="material-symbols-outlined text-primary-container">speed</span>
          </div>
          <div className="relative z-10">
            <div className="text-5xl font-headline font-black tracking-tighter text-primary-container drop-shadow-[0_0_15px_rgba(0,242,255,0.3)]">24.5</div>
            <div className="text-xs font-label text-on-surface-variant mt-2">Scale: 0-100 (Lower is better)</div>
          </div>
        </div>

        {/* High Risk Alerts */}
        <div className="bg-surface-container-low rounded p-6 ghost-border flex flex-col justify-between border-l-2 border-l-error/50">
          <div className="flex justify-between items-start mb-6">
            <span className="text-xs font-label text-on-surface-variant uppercase tracking-widest">High Risk Alerts</span>
            <span className="material-symbols-outlined text-error/80">warning</span>
          </div>
          <div>
            <div className="text-4xl font-headline font-bold tracking-tight text-error">843</div>
            <div className="text-xs font-label text-on-surface-variant mt-2">Requires immediate action</div>
          </div>
        </div>

        {/* Pending Reviews */}
        <div className="bg-surface-container-low rounded p-6 ghost-border flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <span className="text-xs font-label text-on-surface-variant uppercase tracking-widest">Pending Reviews</span>
            <span className="material-symbols-outlined text-secondary">pending_actions</span>
          </div>
          <div>
            <div className="text-4xl font-headline font-bold tracking-tight text-on-surface">156</div>
            <div className="text-xs font-label text-secondary mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span> View Queue
            </div>
          </div>
        </div>
      </div>

      {/* Charts & Activity Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Trends Chart Placeholder */}
        <div className="lg:col-span-2 bg-surface-container-low rounded p-6 ghost-border flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-label text-on-surface uppercase tracking-widest text-on-surface">Risk Exposure Trend (30D)</h3>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-surface-container-highest text-primary-container text-[10px] font-label uppercase tracking-widest rounded ghost-border">Network</span>
              <span className="px-2 py-1 bg-transparent text-on-surface-variant text-[10px] font-label uppercase tracking-widest rounded hover:text-on-surface cursor-pointer transition-colors">Entity</span>
            </div>
          </div>
          
          <div className="flex-1 relative w-full mt-4 border-l border-b border-outline-variant/20">
            {/* SVG Line Chart */}
            <svg className="absolute inset-0 w-full h-full p-4 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
               <title>chart</title>
               <defs>
                <linearGradient id="chartGlow" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#00F2FF" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#00F2FF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,80 L10,75 L20,85 L30,60 L40,65 L50,40 L60,55 L70,30 L80,45 L90,20 L100,25 L100,100 L0,100 Z" fill="url(#chartGlow)" />
              <path d="M0,80 L10,75 L20,85 L30,60 L40,65 L50,40 L60,55 L70,30 L80,45 L90,20 L100,25" fill="none" stroke="#00F2FF" strokeWidth="1.5" className="drop-shadow-[0_0_8px_rgba(0,242,255,0.4)]" />
              <circle className="animate-pulse" cx="90" cy="20" r="3" fill="#00e5ff" stroke="#000" strokeWidth="1" />
            </svg>
            
            <div className="absolute -left-8 inset-y-0 flex flex-col justify-between text-[10px] text-on-surface-variant font-label py-4">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="lg:col-span-1 bg-surface-container-low rounded p-0 ghost-border flex flex-col overflow-hidden">
          <div className="p-6 border-b border-outline-variant/15 flex justify-between items-center bg-surface-container-highest/50">
            <h3 className="text-sm font-label text-on-surface uppercase tracking-widest text-on-surface">Live Activity</h3>
            <button type="button" className="text-xs font-label text-primary-container hover:text-primary transition-colors">View All</button>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[400px]">
            <div className="divide-y divide-outline-variant/10">
              {[
                { id: "0x7F...3B9A", time: "2 mins ago", type: "Screening", risk: "High: 89", isCritical: true, icon: "currency_bitcoin" },
                { id: "Binance Hot Wallet", time: "15 mins ago", type: "Monitor", risk: "Low: 12", isCritical: false, icon: "account_balance" },
                { id: "OKX Settlement", time: "42 mins ago", type: "Screening", risk: "Med: 45", isCritical: false, icon: "account_balance_wallet" },
                { id: "0x2D...F91C", time: "1 hr ago", type: "Screening", risk: "High: 92", isCritical: true, icon: "security" },
                { id: "Coinbase Prime", time: "2 hrs ago", type: "Monitor", risk: "Low: 05", isCritical: false, icon: "hub" },
              ].map((row, i) => (
                <div key={i} className="hover:bg-surface-container-highest transition-colors group cursor-pointer p-4 px-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary-container transition-colors">
                      <span className="material-symbols-outlined text-[18px]">{row.icon}</span>
                    </div>
                    <div>
                      <div className="font-headline text-on-surface text-sm">{row.id}</div>
                      <div className="text-[10px] font-label text-on-surface-variant mt-0.5">{row.time} • {row.type}</div>
                    </div>
                  </div>
                  <div className={`px-2 py-0.5 rounded text-[10px] font-bold font-label uppercase tracking-wider ghost-border ${row.isCritical ? 'bg-error/10 text-error' : 'bg-surface-container-highest text-slate-400'}`}>
                    {row.risk}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
