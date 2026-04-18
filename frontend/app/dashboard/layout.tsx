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
    { name: "Compliance", href: "/dashboard/compliance", icon: "gavel" },
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
          <button type="button" className="w-full py-3 px-4 bg-linear-to-br from-primary-container to-primary-fixed-dim text-on-primary font-headline font-bold text-sm tracking-wider rounded uppercase hover:scale-[0.98] transition-transform shadow-[0_0_15px_rgba(0,242,255,0.2)]">
            New Assessment
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="ml-64 flex-1 h-full overflow-hidden flex flex-col relative bg-surface">
        {/* TopNavBar Component */}
        <header className="z-40 bg-[#111222]/80 backdrop-blur-lg border-none shadow-[0_4px_30px_rgba(0,242,255,0.03)] flex justify-between items-center w-full px-8 py-4 sticky top-0">
          {/* Search Bar */}
          <div className="flex items-center w-1/3">
            <div className="relative w-full max-w-md group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg group-focus-within:text-primary-container transition-colors">
                search
              </span>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-10 py-2 text-sm font-label text-on-surface focus:ring-0 focus:border-primary-container focus:outline-none transition-colors placeholder:text-on-surface-variant/50 outline-none"
                placeholder="SEARCH ENTITIES..."
                type="text"
              />
            </div>
          </div>

          <div className="flex-1"></div>

          {/* Trailing Actions & Profile */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-slate-400 font-headline tracking-wider uppercase text-xs">
              <button type="button" className="hover:text-primary-container transition-colors duration-300 active:scale-95">
                <span className="material-symbols-outlined text-xl">notifications</span>
              </button>
              <button type="button" className="hover:text-primary-container transition-colors duration-300 active:scale-95">
                <span className="material-symbols-outlined text-xl">shield_with_heart</span>
              </button>
              <button type="button" className="hover:text-primary-container transition-colors duration-300 active:scale-95">
                <span className="material-symbols-outlined text-xl">settings</span>
              </button>
            </div>
            <div className="w-9 h-9 rounded-full overflow-hidden ghost-border p-[1px]">
              <Image
                alt="User profile"
                className="w-full h-full object-cover rounded-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnKXYY96Fcvt1A9jM-YS1h9pwhJnD3Nqh44xSan6rN3Z7sGEvgmMQQxCI5HxpckmAlSM_XPoWLa3sC2k-Tbz2rqoKkoRyqsFJDgE9woiDgKAa4NSnwYapbU0LgQqu_OsSXuDNBFMv-Vd7OO3gDHga4o1F7VZDDxbL9I6qjMfCaoml0gCqmeTtRCL7gOVUyfuukw21BafLCaiAHQ8xLZuH5XURzo1g47G8ITpYJY0-MvJ08-in_vbY6JfNPPgxmN1t3hZKZU3UgjUiW"
                width={36}
                height={36}
                unoptimized
              />
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
