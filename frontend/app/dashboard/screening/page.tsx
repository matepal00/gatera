"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import jsPDF from "jspdf";

type Chain = "Ethereum";
type TransferDirection = "Inbound" | "Outbound";

interface TransactionRequest {
  transferDirection: TransferDirection;
  amountEur: number;
  chain: Chain;
  walletAddress: string;
  travelRuleInfoComplete: boolean;
  walletPreviouslyVerified: boolean;
  txHistoryWindow: number;
}

export default function ScreeningPage() {
  const [walletAddress, setWalletAddress] = useState("");
  const [amountEur, setAmountEur] = useState("");
  const [direction, setDirection] = useState<TransferDirection>("Inbound");
  const [isProcessing, setIsProcessing] = useState(false);
  const [historyWindow, setHistoryWindow] = useState(100);
  const [showDepthSlider, setShowDepthSlider] = useState(false);

  const [lastResult, setLastResult] = useState<any>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const [travelRule, setTravelRule] = useState(true);
  const [historicVerification, setHistoricVerification] = useState(true);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sliderRef.current && !sliderRef.current.contains(event.target as Node)) {
        setShowDepthSlider(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExportPDF = () => {
    if (!aiAnalysis) return;

    const doc = new jsPDF();
    const cyan = [0, 242, 255];
    const white = [255, 255, 255];
    const dimWhite = [180, 180, 200];

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let currentY = 0;

    const drawPageBackground = (pdf: jsPDF) => {
      pdf.setFillColor(17, 18, 34);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      
      pdf.setDrawColor(25, 30, 50);
      pdf.setLineWidth(0.1);
      for (let i = 0; i < pageWidth; i += 25) pdf.line(i, 0, i, pageHeight);
      for (let i = 0; i < pageHeight; i += 25) pdf.line(0, i, pageWidth, i);

      pdf.setDrawColor(0, 242, 255);
      pdf.setLineWidth(0.5);
      pdf.line(margin - 8, 20, margin - 8, pageHeight - 20);
    };

    const cleanMarkdown = (text: string) => {
      return text
        .replace(/\*\*(.*?)\*\*/g, "$1") 
        .replace(/\*(.*?)\*/g, "$1")     
        .replace(/#+\s*/g, "")           
        .trim();
    };

    const checkPageBreak = (needed: number) => {
      if (currentY + needed > pageHeight - 30) {
        doc.addPage();
        drawPageBackground(doc);
        currentY = 25;
        return true;
      }
      return false;
    };

    drawPageBackground(doc);
    currentY = 30;

    // --- HEADER ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(0, 242, 255);
    doc.text("GATERA", margin, currentY);
    
    doc.setFontSize(8);
    doc.setTextColor(110, 120, 160);
    doc.text("INTELLIGENCE ASSET // CLASS: CRYPTO-CRIME // MiCA_v1.0", margin, currentY + 6);
    currentY += 28;

    // --- META BOX ---
    doc.setFillColor(20, 25, 55); 
    doc.rect(margin, currentY, contentWidth, 34, 'F');
    doc.setDrawColor(0, 80, 85);
    doc.setLineWidth(0.3);
    doc.line(margin, currentY, margin + contentWidth, currentY);
    doc.line(margin, currentY + 34, margin + contentWidth, currentY + 34);
    
    doc.setFont("courier", "bold");
    doc.setFontSize(8);
    
    const metaX1 = margin + 6;
    const metaX2 = margin + 95;
    let metaY = currentY + 10;

    const drawMeta = (label: string, value: string, x: number, y: number, color = white) => {
        doc.setTextColor(0, 242, 255);
        doc.text(label.padEnd(10, ' '), x, y);
        doc.setTextColor(color[0], color[1], color[2]);
        doc.text(value, x + 20, y);
    };

    drawMeta("DATE", new Date().toLocaleDateString(), metaX1, metaY);
    drawMeta("NETWORK", "ETH_MAINNET", metaX2, metaY);
    metaY += 10;
    
    let decisionColor = [0, 242, 255]; 
    const dec = (lastResult?.decision || "ManualReview").toUpperCase();
    if (dec === "HOLD" || dec === "MANUALREVIEW") decisionColor = [255, 60, 60];
    else if (dec === "ALLOW") decisionColor = [0, 255, 140];
    
    drawMeta("DECISION", dec, metaX1, metaY, decisionColor);
    drawMeta("WALLET", walletAddress.slice(0, 16).toUpperCase() + "...", metaX2, metaY);
    metaY += 10;
    
    drawMeta("SUBJECT", `ASSET_SCREENING: ${direction.toUpperCase()}_TRANSFER`, metaX1, metaY);

    currentY += 55;

    // --- BODY PARSER ---
    const rawLines = aiAnalysis.split("\n");
    
    rawLines.forEach((line) => {
      line = line.trim();
      if (!line) {
        currentY += 3;
        return;
      }

      const cleanLine = cleanMarkdown(line);

      // --- SECTION HEADERS (check cleaned text, not raw markdown) ---
      if (cleanLine.match(/^\d+\./) || line.match(/^#{1,3}\s/)) {
        checkPageBreak(20);
        currentY += 5;
        
        // Header Background Bar
        doc.setFillColor(25, 32, 60);
        doc.rect(margin - 2, currentY - 6, contentWidth + 4, 10, 'F');
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(0, 242, 255);
        doc.text(cleanLine.toUpperCase(), margin + 2, currentY);
        
        // Underline accent
        doc.setDrawColor(0, 120, 130);
        doc.setLineWidth(0.4);
        doc.line(margin, currentY + 3, margin + 50, currentY + 3);
        
        currentY += 10;
        return;
      }

      // --- LIST ITEMS ---
      if (line.startsWith("*") || line.startsWith("-") || line.startsWith("•")) {
        checkPageBreak(12);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(200, 210, 240);
        const wrappedList = doc.splitTextToSize("• " + cleanLine.replace(/^[\*\-\•]\s*/, ""), contentWidth - 10);
        doc.text(wrappedList, margin + 5, currentY);
        currentY += (wrappedList.length * 5.5) + 1;
        return;
      }

      // --- PARAGRAPHS ---
      checkPageBreak(12);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11.5);
      doc.setTextColor(dimWhite[0], dimWhite[1], dimWhite[2]);
      const wrapped = doc.splitTextToSize(cleanLine, contentWidth);
      doc.text(wrapped, margin, currentY);
      currentY += (wrapped.length * 5.5) + 2;
    });

    // --- FOOTER ---
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(7);
      doc.setTextColor(60, 70, 110);
      const hash = `0x${Math.random().toString(16).slice(2, 12).toUpperCase()}`;
      doc.text(`GATERA_CORE_REPORT // INTEGRITY_CHECK: ${hash} // PAGE ${i}_OF_${pageCount}`, pageWidth / 2, pageHeight - 12, { align: "center" });
    }

    doc.save(`GATERA_FORENSIC_${walletAddress.slice(0, 6).toUpperCase()}.pdf`);
  };

  const buildFallbackReport = (input: TransactionRequest, result: { heuristics: { kind: string; rationale: string; score: number }[]; decision: string }): string => {
    const decisionLabels: Record<string, string> = {
      Allow: "Allow — No compliance signals detected",
      AllowWithMonitoring: "Allow with Monitoring — Secondary signals present",
      VerifyOwnership: "Verify Ownership — Procedural verification required",
      ManualReview: "Manual Review — Strong behavioral signals detected",
      Hold: "Hold — Missing required compliance data",
    };

    const scoreLabel = (score: number): string => {
      if (score >= 0.9) return "Very strong signal";
      if (score >= 0.7) return "Strong signal";
      if (score >= 0.4) return "Moderate signal";
      if (score > 0) return "Weak signal";
      return "Not triggered";
    };

    const triggered = result.heuristics.filter((h) => (h.score || 0) > 0);

    let md = `## Engine Decision\n\n**${decisionLabels[result.decision] || result.decision}**\n\n`;

    if (triggered.length > 0) {
      md += `## Triggered Heuristics\n\n`;
      for (const h of triggered) {
        md += `**${h.kind}** — ${scoreLabel(h.score)} (${h.score})\n\n`;
        md += `${h.rationale}\n\n`;
      }
    } else {
      md += `## Heuristics\n\nNo heuristics were triggered. The wallet behavior appears within normal parameters.\n\n`;
    }

    md += `## Transaction Parameters\n\n`;
    md += `- **Direction:** ${input.transferDirection}\n`;
    md += `- **Amount:** €${input.amountEur.toLocaleString()}\n`;
    md += `- **Chain:** ${input.chain}\n`;
    md += `- **Wallet:** \`${input.walletAddress}\`\n`;
    md += `- **Travel Rule Complete:** ${input.travelRuleInfoComplete ? "Yes" : "No"}\n`;
    md += `- **Previously Verified:** ${input.walletPreviouslyVerified ? "Yes" : "No"}\n`;
    md += `- **History Window:** ${input.txHistoryWindow} transactions\n`;

    return md;
  };

  const executeRiskAssessment = async () => {
    if (!walletAddress) {
      alert("Please enter a wallet address.");
      return;
    }

    setIsProcessing(true);
    setAiAnalysis(null);
    setLastResult(null);

    const requestBody: TransactionRequest = {
      transferDirection: direction,
      amountEur: parseFloat(amountEur) || 0,
      chain: "Ethereum",
      walletAddress: walletAddress,
      travelRuleInfoComplete: travelRule,
      walletPreviouslyVerified: historicVerification,
      txHistoryWindow: Math.min(historyWindow, 500),
    };

    try {
      const response = await fetch("http://localhost:3001/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const engineResult = await response.json();
      setLastResult(engineResult);
      await triggerAiAnalysis(requestBody, engineResult);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const triggerAiAnalysis = async (input: TransactionRequest, result: { heuristics: any[]; decision: string }) => {
    setIsAiProcessing(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transactionInput: input,
          heuristics: result.heuristics,
          decision: result.decision,
        }),
      });

      const data = await response.json();
      if (data.analysis) {
        setAiAnalysis(data.analysis);
      } else {
        setAiAnalysis(buildFallbackReport(input, result));
      }
    } catch (error) {
      setAiAnalysis(buildFallbackReport(input, result));
    } finally {
      setIsAiProcessing(false);
    }
  };

  return (
    <div className="p-8 pb-32 max-w-7xl mx-auto w-full flex flex-col gap-12 min-h-screen">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-[10px] font-label uppercase tracking-[0.4em] text-on-surface-variant font-bold">Initialize Verification</h2>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface uppercase tracking-tight">
            New <span className="text-primary-container">Screening</span> Request
          </h1>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column - Form */}
        <div className="lg:col-span-7 flex flex-col gap-8 text-on-surface">

          {/* Transaction Details */}
          <section className="bg-surface-container-low rounded-lg p-8 flex flex-col gap-8 ghost-border relative">
            <header className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-container text-lg font-bold">receipt_long</span>
              <h2 className="text-[11px] font-label uppercase tracking-[0.2em] text-primary-container font-bold">Transaction Details</h2>
            </header>

            <div className="flex flex-col gap-8">
              {/* Wallet Address */}
              <div className="input-underglow border-b border-outline-variant/30 p-3 pb-2 flex flex-col gap-2 group bg-surface-container-low/30 rounded-t-sm">
                <label htmlFor="wallet-address" className="text-[10px] font-label text-primary-container uppercase tracking-[0.2em] font-bold px-1">Target Wallet Address</label>
                <div className="flex items-center gap-4 px-1">
                  <span className="material-symbols-outlined text-on-surface-variant/40 text-lg">database</span>
                  <input
                    id="wallet-address"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    autoComplete="off"
                    className="bg-transparent border-none focus:ring-0 text-lg font-mono text-on-surface w-full p-0 placeholder:text-on-surface-variant/20 outline-none tracking-tight"
                    placeholder="0x0000...0000"
                    type="text"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={async () => {
                        const text = await navigator.clipboard.readText();
                        setWalletAddress(text);
                      }}
                      className="text-[10px] font-headline font-bold text-primary-container border border-primary-container/30 px-2 py-1 rounded hover:bg-primary-container/10 transition-all uppercase tracking-widest"
                    >
                      Paste
                    </button>
                    <span className="material-symbols-outlined text-on-surface-variant/60 hover:text-primary-container cursor-pointer transition-colors text-xl font-bold">qr_code_scanner</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Amount */}
                <div className="input-underglow border-b border-outline-variant/30 p-3 pb-1 flex flex-col gap-2 group">
                  <label htmlFor="amount-eur" className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest px-1">Amount (EUR)</label>
                  <div className="flex items-center gap-3 px-1">
                    <span className="text-xl font-headline text-on-surface-variant/60">€</span>
                    <input
                      id="amount-eur"
                      value={amountEur}
                      onChange={(e) => setAmountEur(e.target.value)}
                      className="bg-transparent border-none focus:ring-0 text-xl font-headline text-on-surface w-full p-0 placeholder:text-on-surface-variant/20 outline-none"
                      placeholder="0.00"
                      type="number"
                    />
                  </div>
                </div>

                {/* Chain */}
                <div className="input-underglow border-b border-outline-variant/30 pb-3 flex flex-col gap-2 cursor-not-allowed group">
                  <label htmlFor="chain-select" className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest px-1">Blockchain Network</label>
                  <div id="chain-select" className="flex justify-between items-center py-0.5 px-1">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#627EEA] flex items-center justify-center text-[9px] font-bold text-white shadow-[0_0_10px_rgba(98,126,234,0.3)]">ETH</div>
                      <span className="text-base font-body">Ethereum Mainnet</span>
                    </div>
                    <span className="material-symbols-outlined  text-on-surface-variant group-hover:text-primary-container transition-colors font-bold">expand_more</span>
                  </div>
                </div>

                {/* Direction */}
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest px-1">Flow Direction</label>
                  <div className="flex bg-surface-container-lowest rounded p-1 ghost-border w-full">
                    <button
                      type="button"
                      onClick={() => setDirection("Inbound")}
                      className={`flex-1 py-2 text-xs font-headline font-bold uppercase tracking-widest rounded transition-all duration-300 ${direction === "Inbound" ? "bg-surface-container text-primary-container shadow-sm" : "text-on-surface-variant hover:text-on-surface"}`}
                    >
                      Inbound
                    </button>
                    <button
                      type="button"
                      onClick={() => setDirection("Outbound")}
                      className={`flex-1 py-2 text-xs font-headline font-bold uppercase tracking-widest rounded transition-all duration-300 ${direction === "Outbound" ? "bg-surface-container text-primary-container shadow-sm" : "text-on-surface-variant hover:text-on-surface"}`}
                    >
                      Outbound
                    </button>
                  </div>
                </div>

                {/* Screening Depth */}
                <div className="relative" ref={sliderRef}>
                  <button
                    type="button"
                    onClick={() => setShowDepthSlider(!showDepthSlider)}
                    className="input-underglow border-b border-outline-variant/30 pb-3 flex flex-col gap-2 cursor-pointer group w-full text-left"
                  >
                    <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest px-1">Screening Depth</span>
                    <span className="flex justify-between items-center py-0.5 px-1">
                      <span className={`text-base font-headline font-bold transition-colors ${showDepthSlider ? "text-primary-container" : "text-on-surface opacity-80"}`}>
                        LAST <span className="font-mono">{historyWindow}</span> TRANSACTIONS
                      </span>
                      <span className={`material-symbols-outlined text-primary-container transition-transform duration-300 ${showDepthSlider ? "rotate-90" : ""} font-bold`}>tune</span>
                    </span>
                  </button>

                  {showDepthSlider && (
                    <div className="absolute top-full left-0 right-0 mt-4 bg-surface-container-highest/95 backdrop-blur-xl border border-primary-container/20 rounded-lg p-6 z-50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-6 text-on-surface">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-label text-primary-container uppercase tracking-widest font-black">Adjust Forensic Depth</span>
                        <span className="text-xl font-mono text-on-surface font-black drop-shadow-[0_0_8px_rgba(0,242,255,0.4)]">{historyWindow}</span>
                      </div>
                      <div className="relative h-10 flex items-center">
                        <input
                          type="range"
                          min="1"
                          max="500"
                          value={historyWindow}
                          onChange={(e) => setHistoryWindow(parseInt(e.target.value, 10))}
                          className="w-full appearance-none bg-surface-container-low h-1.5 rounded-full cursor-pointer accent-primary-container focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {[50, 250, 500].map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setHistoryWindow(val)}
                            className={`py-2 rounded-sm text-[10px] font-headline font-black uppercase tracking-widest border transition-all ${historyWindow === val ? "bg-primary-container/20 border-primary-container text-primary-container" : "bg-transparent border-outline-variant/30 text-on-surface-variant hover:border-on-surface-variant"}`}
                          >
                            {val} TX
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Compliance Toggles */}
          <section className="bg-surface-container-low rounded-lg p-8 flex flex-col gap-8 ghost-border relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary-container shadow-[0_0_15px_#00F2FF]"></div>
            <header className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-container text-lg font-bold">verified</span>
              <h2 className="text-[11px] font-label uppercase tracking-[0.2em] text-primary-container font-bold">Compliance Protocols</h2>
            </header>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="flex justify-between items-center py-4 border-b border-outline-variant/10 border-dashed cursor-pointer w-full text-left"
                onClick={() => setTravelRule(!travelRule)}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Travel Rule Compliance</span>
                  <span className="text-[10px] text-on-surface-variant font-label uppercase tracking-wider">{'Verification for transfers > €1,000'}</span>
                </div>
                <div className={`w-12 h-6 rounded-full border border-primary-container/30 relative transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] ${travelRule ? "bg-primary-container/10" : "bg-transparent opacity-30"}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-primary-container shadow-[0_0_12px_#00F2FF] transition-all ${travelRule ? "right-1" : "right-7"}`}></div>
                </div>
              </button>

              <button
                type="button"
                className="flex justify-between items-center py-4 cursor-pointer w-full text-left"
                onClick={() => setHistoricVerification(!historicVerification)}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Historic Verification</span>
                  <span className="text-[10px] text-on-surface-variant font-label uppercase tracking-wider">Cross-reference with known secure pools</span>
                </div>
                <div className={`w-12 h-6 rounded-full border border-primary-container/30 relative transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] ${historicVerification ? "bg-primary-container/10" : "bg-transparent opacity-30"}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-primary-container shadow-[0_0_12px_#00F2FF] transition-all ${historicVerification ? "right-1" : "right-7"}`}></div>
                </div>
              </button>
            </div>
          </section>

          {/* CTA */}
          <button
            type="button"
            onClick={executeRiskAssessment}
            disabled={isProcessing || isAiProcessing}
            className={`w-full mt-4 bg-linear-to-tr from-primary-container to-primary-fixed-dim text-on-primary font-headline font-bold text-lg py-5 rounded-lg glow-shadow active:scale-[0.99] transition-all flex items-center justify-center gap-4 uppercase tracking-widest shadow-[0_0_40px_rgba(0,242,255,0.15)] ${isProcessing || isAiProcessing ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"}`}
          >
            {isProcessing ? "Processing Analysis..." : isAiProcessing ? "AI Review in Progress..." : "Execute Risk Assessment"}
            <span className={`material-symbols-outlined font-bold ${isProcessing || isAiProcessing ? "animate-spin" : ""}`}>
              {isProcessing || isAiProcessing ? "refresh" : "terminal"}
            </span>
          </button>
        </div>

        {/* Right Column - AI Report or Radar */}
        <div className="lg:col-span-5 h-full min-h-[600px] relative">
          {aiAnalysis ? (
            <div
              className="rounded-xl border border-primary-container/20 shadow-[0_30px_90px_rgba(0,0,0,0.8)] overflow-y-auto h-full max-h-[85vh] relative z-[60]"
              style={{ backgroundColor: "#111222" }}
            >
              {/* Report Header */}
              <div className="p-8 pb-0">
                <header className="flex items-center gap-5 mb-6 pb-6 border-b border-outline-variant/20">
                  <div className="w-14 h-14 rounded-xl bg-primary-container/10 flex items-center justify-center border border-primary-container/30 shadow-[0_0_20px_rgba(0,242,255,0.08)]">
                    <span className="material-symbols-outlined text-primary-container text-3xl animate-pulse">science</span>
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex justify-between items-start w-full">
                      <h2 className="text-[10px] font-label text-primary-container uppercase tracking-[0.5em] font-black leading-none">Intelligence Report</h2>
                      
                      {/* Dynamic Decision Badge */}

                    </div>
                    <h3 className="text-2xl font-headline font-bold text-on-surface uppercase tracking-tight">Forensic Analysis</h3>
                  </div>
                </header>
              </div>
                      {lastResult?.decision && (
                        <div className={`px-3 w-fit  mx-8 mb-2 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ${
                          lastResult.decision === "Allow" ? "bg-green-500/10 border-green-500/30 text-green-400" :
                          lastResult.decision === "AllowWithMonitoring" ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" :
                          "bg-red-500/10 border-red-500/30 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                            lastResult.decision === "Allow" ? "bg-green-400" :
                            lastResult.decision === "AllowWithMonitoring" ? "bg-yellow-400" :
                            "bg-red-500"
                          }`}></span>
                          {lastResult.decision.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      )}
              {/* Report Body */}
              <div className="px-8 pb-8">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-lg font-headline font-bold text-primary-container uppercase tracking-wider mt-0 mb-6 pb-3 border-b border-primary-container/20">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <div className="mt-10 mb-5 flex items-center gap-3">
                        <div className="w-1 h-6 bg-primary-container rounded-full shadow-[0_0_10px_rgba(0,242,255,0.3)]"></div>
                        <h2 className="text-sm font-headline font-bold text-primary-container uppercase tracking-[0.15em]">
                          {children}
                        </h2>
                      </div>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-sm font-headline font-bold text-on-surface uppercase tracking-wider mt-6 mb-3">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-[13px] font-body text-on-surface-variant/80 leading-[1.9] mb-5">
                        {children}
                      </p>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-primary-container font-black">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="text-on-surface/90 not-italic font-medium">{children}</em>
                    ),
                    ul: ({ children }) => (
                      <ul className="space-y-3 my-5 ml-1">{children}</ul>
                    ),
                    li: ({ children }) => (
                      <li className="flex items-start gap-3 text-[13px] font-body text-on-surface-variant/80 leading-relaxed">
                        <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-primary-container/50 shrink-0 shadow-[0_0_6px_rgba(0,242,255,0.2)]"></span>
                        <span>{children}</span>
                      </li>
                    ),
                    hr: () => <hr className="border-outline-variant/15 my-8" />,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-2 border-primary-container/30 pl-4 my-6 text-on-surface-variant/60 italic">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {aiAnalysis}
                </ReactMarkdown>
              </div>

              {/* Report Footer & Actions */}
                <div className="mx-8 py-6 border-t border-outline-variant/15 flex flex-col md:flex-row justify-between items-center gap-6 mb-4">
                  <div className="flex flex-col gap-1.5 opacity-40">
                    <div className="flex items-center gap-3 text-[9px] font-label text-on-surface-variant uppercase tracking-[0.25em] font-black">
                      <span className="w-2 h-2 bg-primary-container rounded-full animate-pulse shadow-[0_0_10px_#00F2FF]"></span>
                      System Encrypted
                    </div>
                    <span className="text-[8px] font-label text-on-surface-variant uppercase tracking-[0.15em] ml-5">GATERA-CORE-v1.0.4</span>
                  </div>

                  <button 
                    type="button"
                    onClick={handleExportPDF}
                    className="flex items-center gap-3 px-6 py-3 bg-surface-container-highest/40 hover:bg-primary-container/10 border border-primary-container/20 hover:border-primary-container/50 rounded-lg text-primary-container transition-all group active:scale-95 shadow-lg"
                  >
                    <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">picture_as_pdf</span>
                    <span className="text-[10px] font-headline font-black uppercase tracking-[0.2em]">Export Forensic PDF</span>
                  </button>
                </div>
            </div>
          ) : (
            <div className="sticky top-28 bg-surface-container-lowest rounded-xl p-10 border border-outline-variant/15 flex flex-col items-center justify-center min-h-[600px] text-center gap-8 relative overflow-hidden z-10 shadow-2xl">
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: "linear-gradient(#3A494B 1px, transparent 1px), linear-gradient(90deg, #3A494B 1px, transparent 1px)", backgroundSize: "30px 30px" }}
              ></div>

              <div className="relative w-56 h-56 flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full border border-primary-container/10 ${isProcessing || isAiProcessing ? "animate-[ping_2s_infinite]" : "animate-[pulse_4s_infinite]"}`}></div>
                <div className="absolute inset-6 rounded-full border-2 border-primary-container/20 border-dashed animate-[spin_20s_linear_infinite]"></div>
                <div className="absolute inset-12 rounded-full border border-outline-variant/30"></div>
                <div className="w-28 h-28 rounded-full bg-surface-container flex items-center justify-center relative z-10">
                  <span className={`material-symbols-outlined text-5xl transition-all duration-700 ${isProcessing || isAiProcessing ? "text-primary-container scale-110 drop-shadow-[0_0_15px_#00F2FF]" : "text-on-surface-variant opacity-40"}`}>
                    {isProcessing || isAiProcessing ? "radar" : "query_stats"}
                  </span>
                </div>
                <div className="absolute top-4 right-8 w-2 h-2 rounded-full bg-primary-container/40 animate-pulse"></div>
                <div className="absolute bottom-10 left-4 w-1.5 h-1.5 rounded-full bg-primary-container/30"></div>
              </div>

              <div className="relative z-10 flex flex-col gap-4">
                <h3 className="text-xl font-headline font-bold text-on-surface-variant tracking-wider uppercase">
                  {isProcessing ? "Analyzing Risk Vectors" : isAiProcessing ? "AI Analyst is Reviewing" : "Awaiting Parameters"}
                </h3>
                <p className="text-sm text-outline-variant font-body max-w-[280px] leading-relaxed mx-auto">
                  {isProcessing
                    ? "Our neural engine is currently cross-referencing global sanctions lists and forensic databases."
                    : isAiProcessing
                    ? "Generating a human-readable regulatory incident report based on detected heuristics."
                    : "Populate the industrial data fields to initialize the neural risk screening engine."}
                </p>
              </div>

              <div className={`w-full max-w-[220px] space-y-3 transition-opacity duration-500 ${isProcessing || isAiProcessing ? "opacity-100" : "opacity-20"}`}>
                <div className="h-1.5 w-full bg-primary-container/30 rounded-full overflow-hidden relative">
                  <div className={`absolute inset-0 bg-primary-container ${isProcessing || isAiProcessing ? "animate-[shimmer_2s_infinite]" : ""}`} style={{ width: isProcessing || isAiProcessing ? "100%" : "0%" }}></div>
                </div>
                <div className="h-1.5 w-4/6 bg-outline-variant rounded-full mx-auto"></div>
                <div className="h-1.5 w-5/6 bg-outline-variant rounded-full mx-auto"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
