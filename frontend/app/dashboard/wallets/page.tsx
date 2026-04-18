"use client";

export default function WalletsPage() {
  const wallets = [
    {
      id: 1,
      name: "Treasury Hot Wallet",
      address: "0x71C...976F",
      network: "Ethereum",
      balance: "$4,250,000.00",
      risk: "high",
      lastScan: "2 mins ago"
    },
    {
      id: 2,
      name: "Cold Storage Alpha",
      address: "bc1q...mkw9",
      network: "Bitcoin",
      balance: "$12,800,450.00",
      risk: "low",
      lastScan: "4 hrs ago"
    },
    {
      id: 3,
      name: "DeFi Yield Aggregator",
      address: "0x2A4...3B1C",
      network: "Polygon",
      balance: "$145,200.50",
      risk: "medium",
      lastScan: "Yesterday"
    }
  ];

  const getRiskStyles = (risk: string) => {
    switch (risk) {
      case "high":
        return {
          bg: "bg-[#2D1618]",
          text: "text-error",
          border: "border-error/20",
          dot: "bg-error",
          glow: "bg-error"
        };
      case "medium":
        return {
          bg: "bg-[#2A2318]",
          text: "text-[#FFB4AB]",
          border: "border-[#FFB4AB]/20",
          dot: "bg-[#FFB4AB]",
          glow: "bg-[#FFB4AB]"
        };
      default:
        return {
          bg: "bg-surface-container-highest",
          text: "text-primary-container",
          border: "border-primary-container/20",
          dot: "bg-primary-container",
          glow: "bg-primary-container"
        };
    }
  };

  return (
    <div className="flex flex-col bg-background relative min-h-screen p-8 pb-32 max-w-7xl mx-auto w-full gap-12">
      {/* Unified Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full">
        <div className="flex flex-col gap-2 transition-all">
          <h2 className="text-[10px] font-label uppercase tracking-[0.4em] text-on-surface-variant font-bold">Asset Surveillance</h2>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface uppercase tracking-tight">
            Monitored <span className="text-primary-container">Wallets</span>
          </h1>
        </div>
      </header>

      {/* Filters Area */}
      <section className="w-full">
        <div className="flex flex-wrap gap-6 items-center">
          {/* Search */}
          <div className="relative group flex-1 min-w-[300px]">
            <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary-container transition-colors">search</span>
            <input 
              className="bg-transparent border-b border-outline-variant/30 text-on-surface pl-8 pr-4 py-2 w-full focus:outline-none focus:border-primary-container focus:shadow-[0_1px_0_0_#00f2ff] transition-all font-body text-sm placeholder:text-on-surface-variant/40 outline-none" 
              placeholder="Search address or label..." 
              type="text"
            />
          </div>

          <div className="flex gap-4 items-center">
            <div className="relative">
              <select className="appearance-none bg-surface-container border border-outline-variant/20 text-on-surface text-xs font-label px-4 py-2 pr-10 rounded hover:bg-surface-container-high focus:outline-none focus:border-primary-container transition-colors cursor-pointer">
                <option value="">All Risk Levels</option>
                <option value="critical">Critical Only</option>
                <option value="high">High Risk</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-sm font-bold">expand_more</span>
            </div>
          </div>
        </div>
      </section>

      {/* Data Canvas */}
      <section className="w-full">
        <div className="bg-surface-container-low rounded-lg shadow-[0_0_40px_rgba(0,0,0,0.3)] overflow-hidden relative ghost-border border-outline-variant/5">
          <div className="grid grid-cols-12 gap-4 px-8 py-5 bg-surface-container text-[10px] font-label text-on-surface-variant uppercase tracking-widest border-b border-outline-variant/10 font-bold">
            <div className="col-span-4">Wallet Identity</div>
            <div className="col-span-2">Network</div>
            <div className="col-span-2 text-right">Balance (USD)</div>
            <div className="col-span-2 text-center">Risk Vector</div>
            <div className="col-span-2 text-right">Last Analysis</div>
          </div>

          <div className="flex flex-col relative divide-y divide-outline-variant/5 text-on-surface">
            {wallets.map((wallet) => {
              const styles = getRiskStyles(wallet.risk);
              return (
                <div key={wallet.id} className="grid grid-cols-12 gap-4 px-8 py-6 items-center hover:bg-surface-container transition-all group relative cursor-pointer">
                  <div className={`absolute left-0 top-0 bottom-0 w-[2.5px] ${styles.glow} opacity-60 shadow-[0_0_10px_currentColor] transition-opacity group-hover:opacity-100`}></div>
                  
                  <div className="col-span-4 flex flex-col">
                    <span className="font-headline font-bold text-base tracking-tight">{wallet.name}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-label text-[11px] text-on-surface-variant font-mono tracking-tight">{wallet.address}</span>
                      <button type="button" className="text-on-surface-variant hover:text-primary-container transition-colors">
                        <span className="material-symbols-outlined text-[14px]">content_copy</span>
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-surface-container-highest flex items-center justify-center text-[10px] font-bold border border-outline-variant/10 shadow-sm">
                      {wallet.network === "Ethereum" ? "ETH" : "BTC"}
                    </div>
                    <span className="text-sm font-label font-medium">{wallet.network}</span>
                  </div>

                  <div className="col-span-2 text-right font-headline font-bold">
                    {wallet.balance}
                  </div>

                  <div className="col-span-2 flex justify-center">
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm ${styles.bg} ${styles.text} font-label text-[10px] uppercase font-bold tracking-widest border ${styles.border} shadow-sm`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot} animate-pulse`}></span>
                      {wallet.risk} Risk
                    </span>
                  </div>

                  <div className="col-span-2 flex justify-end items-center">
                    <span className="text-xs font-label text-on-surface-variant font-medium">
                      {wallet.lastScan}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-8 py-5 bg-surface-container-lowest border-t border-outline-variant/10 flex justify-between items-center text-[10px] font-label text-on-surface-variant uppercase tracking-widest font-bold">
            <div>Showing 1-{wallets.length} of 142 Assets</div>
            <div className="flex gap-4">
              <button type="button" className="p-1 hover:text-on-surface disabled:opacity-30 flex items-center gap-2 transition-colors uppercase" disabled>
                <span className="material-symbols-outlined text-base">chevron_left</span>
                Prev
              </button>
              <button type="button" className="p-1 hover:text-on-surface flex items-center gap-2 transition-colors uppercase font-bold text-primary-container">
                Next
                <span className="material-symbols-outlined text-base font-bold">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
