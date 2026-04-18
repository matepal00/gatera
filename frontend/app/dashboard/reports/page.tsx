"use client";

export default function ReportsPage() {
  const reports = [
    {
      id: "RPT-2023-089",
      title: "Monthly AML Summary",
      description: "Comprehensive review of high-risk transactions exceeding threshold parameters.",
      entity: "Global Operations",
      date: "2023.10.24 14:30 UTC",
      type: "CRITICAL",
      isCritical: true
    },
    {
      id: "RPT-2023-088",
      title: "Single Wallet Audit",
      description: "Deep-dive analysis of incoming transfers for flagged entity.",
      entity: "0x71C...3A9B",
      date: "2023.10.23 09:15 UTC",
      type: "ROUTINE",
      isCritical: false
    },
    {
      id: "RPT-2023-087",
      title: "Compliance Review Q3",
      description: "Quarterly aggregate of all screening activities and matches.",
      entity: "Compliance Dept",
      date: "2023.10.01 00:00 UTC",
      type: "ROUTINE",
      isCritical: false
    }
  ];

  return (
    <div className="flex flex-col bg-background relative p-6 md:p-8 xl:p-8 gap-12 max-w-7xl mx-auto w-full min-h-screen">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full">
        <div className="flex flex-col gap-2 transition-all">
          <h2 className="text-[10px] font-label uppercase tracking-[0.4em] text-on-surface-variant font-bold">Intelligence Repository</h2>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface uppercase tracking-tight shadow-[0_0_20px_rgba(0,242,255,0.05)]">
            Reports <span className="text-primary-container">&</span> Audits
          </h1>
        </div>
      </header>

      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        
        <div className="bg-surface-container-low rounded-lg p-8 flex flex-col justify-between min-h-[160px] ghost-border glow-shadow relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-container/5 rounded-full blur-2xl group-hover:bg-primary-container/10 transition-all duration-700"></div>
          <div className="flex justify-between items-start z-10">
            <span className="text-[10px] font-label uppercase text-on-surface-variant tracking-[0.2em] font-bold">Generated This Month</span>
            <span className="material-symbols-outlined text-primary-container/40 text-lg">insert_chart</span>
          </div>
          <div className="text-4xl font-headline font-light text-on-surface z-10 mt-4 tracking-tighter">142</div>
        </div>

        
        <div className="bg-surface-container-low rounded-lg p-8 flex flex-col justify-between min-h-[160px] ghost-border relative overflow-hidden group">
          <div className="flex justify-between items-start z-10">
            <span className="text-[10px] font-label uppercase text-on-surface-variant tracking-[0.2em] font-bold">Scheduled Runs</span>
            <span className="material-symbols-outlined text-primary-container/40 text-lg">schedule</span>
          </div>
          <div className="text-4xl font-headline font-light text-on-surface z-10 mt-4 tracking-tighter">08</div>
        </div>

        
        <div className="bg-surface-container-low rounded-lg p-8 flex flex-col justify-center items-center min-h-[160px] ghost-border hover:bg-surface-container-highest transition-all cursor-pointer group hover:scale-[1.02] active:scale-[0.98]">
          <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-primary-container/10 transition-all shadow-inner">
            <span className="material-symbols-outlined text-primary-container text-2xl group-hover:scale-110 transition-all">cloud_download</span>
          </div>
          <span className="text-[10px] font-headline uppercase text-primary-container tracking-[0.2em] text-center font-bold">Export Bulk CSV</span>
        </div>
      </section>

      
      <section className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-4">
        <div className="flex gap-4 items-center">
          <div className="flex bg-surface-container-lowest rounded p-1 ghost-border p-1.5 shadow-[inset_0_0_20px_rgba(0,0,0,0.4)]">
            <button type="button" className="px-5 py-2.5 text-[10px] font-label text-primary-container font-bold tracking-widest bg-surface-container-highest rounded-sm uppercase shadow-lg">All Reports</button>
            <button type="button" className="px-5 py-2.5 text-[10px] font-label text-on-surface-variant hover:text-on-surface transition-colors tracking-widest uppercase font-bold">AML Audits</button>
            <button type="button" className="px-5 py-2.5 text-[10px] font-label text-on-surface-variant hover:text-on-surface transition-colors tracking-widest uppercase font-bold">Wallet Scans</button>
          </div>
        </div>
        <div className="flex gap-4 w-full lg:w-auto">
          <div className="input-underglow border-b border-outline-variant/30 flex items-center px-2 py-2 w-full lg:w-80 group">
            <span className="material-symbols-outlined text-on-surface-variant text-lg mr-3 group-focus-within:text-primary-container transition-colors">search</span>
            <input 
              className="bg-transparent border-none focus:ring-0 text-sm font-body text-on-surface w-full placeholder:text-on-surface-variant/30 outline-none" 
              placeholder="SEARCH REPORT ID OR ENTITY..." 
              type="text"
            />
          </div>
          <button type="button" className="flex items-center justify-center w-12 h-12 rounded bg-surface-container-low ghost-border text-on-surface-variant hover:text-primary-container transition-all hover:bg-surface-container-highest">
            <span className="material-symbols-outlined text-xl">filter_list</span>
          </button>
        </div>
      </section>

      
      <section className="w-full flex flex-col gap-6">
        
        <div className="hidden md:grid grid-cols-12 gap-6 px-10 py-2 text-[10px] font-label text-on-surface-variant uppercase tracking-[0.3em] font-bold border-b border-outline-variant/10 pb-6">
          <div className="col-span-5">Report Authentication / Details</div>
          <div className="col-span-3">Entity / Target</div>
          <div className="col-span-2">Date Timestamp</div>
          <div className="col-span-2 text-right">Repository Actions</div>
        </div>

        
        <div className="flex flex-col gap-4">
          {reports.map((report) => (
            <div 
              key={report.id} 
              className={`bg-surface-container-low rounded-lg p-8 ghost-border flex flex-col md:grid md:grid-cols-12 gap-6 items-start md:items-center hover:bg-surface-container transition-all group relative overflow-hidden ${report.isCritical ? 'border-primary-container/20 border-l-2' : ''}`}
            >
              {report.isCritical && (
                <div className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-primary-container shadow-[0_0_15px_#00F2FF]"></div>
              )}
              
              <div className="col-span-5 flex flex-col gap-2 w-full">
                <div className="flex items-center gap-3 mb-1">
                  <span className={`px-2 py-1 rounded-sm text-[9px] font-label font-black tracking-widest border ${report.isCritical ? 'bg-primary-container/10 text-primary-container border-primary-container/30' : 'bg-surface-container-highest text-on-surface-variant border-outline-variant/30'}`}>
                    {report.type}
                  </span>
                  <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest opacity-60">ID: {report.id}</span>
                </div>
                <h3 className="text-xl font-headline text-on-surface font-bold group-hover:text-primary-container transition-colors tracking-tight">{report.title}</h3>
                <p className="text-sm font-body text-on-surface-variant line-clamp-1 opacity-70 leading-relaxed font-medium">{report.description}</p>
              </div>

              <div className="col-span-3 flex flex-col w-full md:w-auto mt-2 md:mt-0">
                <span className="text-[10px] md:hidden font-label text-on-surface-variant uppercase mb-1 tracking-widest font-bold">Target</span>
                <span className="text-base font-label text-on-surface font-mono tracking-tighter bg-surface-container-highest/30 px-3 py-1.5 rounded-sm border border-outline-variant/5">
                  {report.entity}
                </span>
              </div>

              <div className="col-span-2 flex flex-col w-full md:w-auto mt-2 md:mt-0">
                <span className="text-[10px] md:hidden font-label text-on-surface-variant uppercase mb-1 tracking-widest font-bold">Generation Date</span>
                <span className="text-xs font-label text-on-surface-variant/80 font-mono tracking-tight group-hover:text-on-surface transition-colors">
                  {report.date}
                </span>
              </div>

              <div className="col-span-2 flex items-center justify-start md:justify-end gap-3 w-full mt-4 md:mt-0">
                <button type="button" className="text-on-surface-variant hover:text-primary-container transition-all flex items-center justify-center w-10 h-10 rounded-lg bg-surface-container ghost-border hover:bg-surface-container-highest hover:-translate-y-0.5 shadow-sm">
                  <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
                </button>
                <button type="button" className="text-on-surface-variant hover:text-primary-container transition-all flex items-center justify-center w-10 h-10 rounded-lg bg-surface-container ghost-border hover:bg-surface-container-highest hover:-translate-y-0.5 shadow-sm">
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        
        <div className="w-full flex justify-center mt-12">
          <button type="button" className="text-[10px] font-headline uppercase tracking-[0.3em] text-on-surface-variant hover:text-primary-container transition-all flex items-center gap-3 font-black group bg-surface-container-low/50 px-8 py-4 rounded-full border border-outline-variant/10 hover:border-primary-container/30">
            <span className="material-symbols-outlined text-lg group-hover:translate-y-1 transition-transform">expand_more</span>
            Load Historical Repository
          </button>
        </div>
      </section>
    </div>
  );
}
