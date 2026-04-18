"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    
    // Simulate biometric/vault decryption delay
    setTimeout(() => {
      router.push("/dashboard");
    }, 1800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-surface-dim selection:bg-primary-container selection:text-on-primary">
      {/* Atmospheric Depth Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-container opacity-[0.03] blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-fixed-dim opacity-[0.05] blur-[150px] rounded-full"></div>
      
      {/* Main Auth Canvas */}
      <main className="w-full max-w-[440px] px-6 z-10">
        <div className="glass-effect rounded-lg border border-outline-variant/15 p-10 glow-shadow relative overflow-hidden">
          {/* Asymmetric accent line */}
          <div className="absolute top-0 left-0 w-1 h-12 bg-primary-container"></div>
          
          {/* Branding Header */}
          <header className="flex flex-col items-center mb-10">
            <div className="mb-6 relative">
              <Image 
                alt="Gatera Brand Identity" 
                className="h-20 w-auto" 
                src="/logo.svg"
                width={200}
                height={80}
              />
            </div>
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mt-2">Secure Institutional Gateway</p>
          </header>

          {/* Auth Form */}
          <div className="relative">
            {isAuthenticating && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-surface-container/90 backdrop-blur-sm transition-all duration-500 animate-in fade-in">
                <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
                  {/* Modern Circular Fill Animation */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <title>Biometric Scan Progress</title>
                    <circle
                      cx="56"
                      cy="56"
                      r="52"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-primary-container/10"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r="52"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="327"
                      strokeDashoffset="327"
                      className="text-primary-container animate-[fill-progress_1.8s_ease-in-out_infinite]"
                      style={{ filter: 'drop-shadow(0 0 8px rgba(0, 242, 255, 0.6))' }}
                    />
                  </svg>
                  <span className="material-symbols-outlined text-primary-container text-4xl animate-pulse">fingerprint</span>
                </div>
                <div className="text-center">
                  <span className="font-headline text-primary-container text-sm font-bold tracking-[0.2em] uppercase block mb-1">Verifying Identity</span>
                  <span className="font-label text-on-surface-variant text-[9px] uppercase tracking-[0.3em] animate-pulse">Decrypting Vault Access...</span>
                </div>
              </div>
            )}

            <form className={`space-y-8 transition-all duration-500 ${isAuthenticating ? 'opacity-20 blur-sm pointer-events-none' : 'opacity-100'}`} onSubmit={handleLogin}>
              {/* Email Field */}
              <div className="group">
                <label htmlFor="identity" className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant mb-3 block">Identity Reference</label>
                <div className="relative flex items-center border-b border-outline-variant/40 group-focus-within:border-primary-container transition-all duration-300 input-underglow pb-2">
                <span className="material-symbols-outlined mt-2 text-outline text-lg mx-3">alternate_email</span>
                  <input 
                    id="identity"
                  className="bg-transparent border-none focus:ring-0 w-full text-on-surface pt-2 font-body placeholder:text-outline-variant/60 outline-none" 
                    placeholder="Email address" 
                    type="email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <div className="flex justify-between items-end mb-3">
                  <label htmlFor="access-key" className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant block">Access Key</label>
                  <Link className="font-label text-[10px] uppercase tracking-wider text-primary-fixed-dim hover:text-primary-container transition-colors" href="#">Forgot password?</Link>
                </div>
                <div className="relative flex items-center border-b border-outline-variant/40 group-focus-within:border-primary-container transition-all duration-300 input-underglow pb-2">
                <span className="material-symbols-outlined mt-2 text-outline text-lg mx-3">lock_open</span>
                  <input 
                    id="access-key"
                  className="bg-transparent border-none focus:ring-0 w-full text-on-surface pt-2 font-body placeholder:text-outline-variant/60 outline-none" 
                    placeholder="••••••••" 
                    type="password"
                    required
                  />
                </div>
              </div>

              {/* Primary Action */}
              <button 
                type="submit" 
                disabled={isAuthenticating}
                className="w-full bg-linear-to-tr from-primary-container to-primary-fixed-dim text-on-primary font-headline font-bold py-4 tracking-widest uppercase text-sm rounded-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(0,242,255,0.2)] disabled:opacity-50"
              >
                {isAuthenticating ? "Accessing..." : "Enter the Vault"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 py-2">
                <div className="h-px grow bg-outline-variant/20"></div>
                <span className="font-label text-[10px] text-outline-variant tracking-widest uppercase">Or Authenticate via</span>
                <div className="h-px grow bg-outline-variant/20"></div>
              </div>

              {/* Secondary Action */}
              <button type="button" className="w-full border border-outline-variant/30 bg-surface-container-high/40 text-primary-fixed-dim font-headline font-semibold py-4 tracking-[0.05em] text-sm rounded-sm hover:bg-surface-container-highest/60 transition-all flex items-center justify-center gap-3">
                <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
                Connect Web3 Wallet
              </button>
            </form>
          </div>
        </div>

        {/* System Message */}
        <div className="mt-8 flex justify-center">
          <div className="bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/10 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-container"></span>
            </span>
            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface">Security Status: Operational</span>
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="absolute bottom-8 w-full px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-8 order-2 md:order-1">
          <Link className="font-label text-[11px] uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary-container transition-colors" href="#">Legal</Link>
          <Link className="font-label text-[11px] uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary-container transition-colors" href="#">Privacy</Link>
        </div>
        <div className="order-1 md:order-2 flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="font-headline text-[10px] tracking-widest text-primary-container font-bold">GATERA TERMINAL</span>
            <span className="font-label text-[8px] text-outline-variant/60 tracking-widest">v1.0.84-STABLE</span>
          </div>
          <div className="w-[1px] h-6 bg-outline-variant/20"></div>
          <div className="flex gap-2">
            <span className="material-symbols-outlined text-outline-variant text-base hover:text-primary-container cursor-pointer transition-colors">help_outline</span>
            <span className="material-symbols-outlined text-outline-variant text-base hover:text-primary-container cursor-pointer transition-colors">lan</span>
          </div>
        </div>
      </footer>

      {/* Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay" 
        style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtDRQYA0Yp7MAyzIPKXitBFyXo_PA8jiRYmI701SvwyVOtFvFw6tdjm1RKSbhCChIygazZT1nXIDxGhQW-6sDLFUAX8ksXeL8RSHVFI4BvxV0qcCGUVQ8yyxB7tJ3nld-bzATUtpSLy6OdABtzzBK0LXLkZW8Vd2sxauvpoe6t-ucO7hjNqF8CcbQvsoyusY5dpfGwfCtT_vECho3VZiCyB7J7dq415VjDrMqIM_ajKDCa74-10k3NImuAZ8DypSRkBDE-jsXqSkpw')` }}
      ></div>
    </div>
  );
}
