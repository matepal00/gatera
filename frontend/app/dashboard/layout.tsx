"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: "grid_view" },
    { name: "Screening", href: "/dashboard/screening", icon: "policy" },
    { name: "Wallets", href: "/dashboard/wallets", icon: "account_balance_wallet" },
    { name: "Reports", href: "/dashboard/reports", icon: "analytics" },
  ];

  return (
    <div className="bg-background text-on-surface font-body antialiased h-screen overflow-hidden flex selection:bg-primary-container selection:text-on-primary">
      {/* SideNavBar Component */}
      <nav className="h-screen w-64 bg-linear-to-r from-[#111222] to-[#1a1b2e] shadow-[10px_0_30px_rgba(0,0,0,0.5)] fixed left-0 top-0 flex flex-col z-50">
        {/* Header */}
        <div className="px-6 py-8 flex flex-col items-start justify-center">
          <h1 className="text-xl font-black text-primary-container font-headline tracking-[0.1em]">GATERA</h1>
          <span className="text-[0.65rem] font-label text-on-surface-variant tracking-[0.2em] mt-1 uppercase">Risk Engine</span>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-4 px-6 py-4 transition-all duration-200 font-headline uppercase tracking-tight ${
                  isActive
                    ? "bg-primary-container/10 text-primary-container border-r-2 border-primary-container font-bold"
                    : "text-slate-500 hover:bg-surface-container-highest/30 hover:text-primary-container"
                }`}
              >
                <span 
                  className="material-symbols-outlined" 
                  style={{ fontVariationSettings: `'FILL' ${isActive ? 1 : 0}` }}
                >
                  {link.icon}
                </span>
                <span className="text-sm">{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="p-6 mt-auto">
          <Link 
            href="/dashboard/screening"
            className="w-full py-3 px-4 bg-linear-to-br from-primary-container to-primary-fixed-dim text-on-primary font-headline font-bold text-sm tracking-wider rounded uppercase hover:scale-[0.98] transition-all shadow-[0_0_15px_rgba(0,242,255,0.2)] flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            New Screening
          </Link>
          <div className="flex flex-col gap-2 font-body text-sm font-medium text-slate-500 border-t border-outline-variant/20 mt-6 pt-4">

            <Link className="flex items-center gap-3 py-2 hover:text-primary-container transition-colors" href="/login">
              <span className="material-symbols-outlined text-xl">logout</span>
              Sign Out
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="ml-64 flex-1 h-full overflow-hidden flex flex-col relative bg-surface">
        {/* TopNavBar Component */}
        <header className="z-40 bg-[#111222]/80 backdrop-blur-lg border-none shadow-[0_4px_30px_rgba(0,242,255,0.03)] flex justify-between items-center w-full px-8 py-4 sticky top-0">
          <div className="flex-1"></div>

          {/* User Identity & Logout */}
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-4">
              <span className="text-[9px] font-headline uppercase tracking-[0.3em] text-on-surface-variant font-bold opacity-50">System Access</span>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-highest/30 rounded-sm ghost-border border-primary-container/10">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse shadow-[0_0_8px_#00F2FF]"></span>
                <span className="text-[10px] font-headline font-black text-primary-container uppercase tracking-widest drop-shadow-[0_0_5px_rgba(0,242,255,0.4)]">Institutional Treasury</span>
              </div>
            </div>
            


          </div>
        </header>

        {/* Content Portal */}
        <div className="flex-1 overflow-y-auto w-full">
            {children}
        </div>
      </main>
    </div>
  );
}
