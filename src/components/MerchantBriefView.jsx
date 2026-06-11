import React from "react"
import {
  ArrowLeft,
  Store,
  MapPin,
  Zap,
  ShieldCheck,
  Sparkles,
  QrCode,
  Volume2,
  Smartphone,
  Gauge,
  AlertTriangle,
  Clock,
  CheckCircle2,
  TrendingUp,
  X,
  BrainCircuit,
  History
} from "lucide-react"

export default function MerchantBriefView({
  alingNenaStatus,
  onBack,
  notificationCount,
  triggerToast,
  onActionTaken,
  onPending,
  selectedProduct,
  setSelectedProduct,
  showHistoryLogs,
  setShowHistoryLogs,
  historyLogs,
  setShowAiExplanation,
  showAiExplanation
}) {
  return (
    <div className="w-full h-full bg-transparent pb-12 animate-fadeIn space-y-6">
      {/* 1. Inline Page Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center bg-white text-muted-gray hover:text-dark-heading hover:bg-gray-100 active:scale-95 transition-all cursor-pointer shadow-sm"
          aria-label="Back to home"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        </button>
        <span className="text-2xl font-bold text-primary-main">Merchant Brief</span>
      </div>

      {/* Main content body */}
      <main className="space-y-6">
        
        {/* Status banner */}
        {alingNenaStatus && (
          <div className={`p-4 rounded-2xl flex items-center justify-between shadow-xs ${
            alingNenaStatus === "action_taken" 
              ? "bg-emerald-50 border border-emerald-100 text-emerald-800" 
              : "bg-amber-50 border border-amber-100 text-amber-800"
          }`}>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5.5 h-5.5 text-emerald-600 shrink-0" />
              <span className="text-sm font-bold">
                {alingNenaStatus === "action_taken" 
                  ? "Action Logged: SoundPay Plus Pitch Scheduled with Aling Nena!" 
                  : "Action Pending: Revisit scheduled. Pricing details requested."}
              </span>
            </div>
          </div>
        )}

        {/* 2. Hero Merchant Card (Deep Navy Banner) */}
        <section className="bg-[#000B73] text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Aling Nena's Groceries
              </h2>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <Store className="w-4.5 h-4.5 text-blue-200 shrink-0" />
                  <span className="font-semibold">Retail Store</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <MapPin className="w-4.5 h-4.5 text-blue-200 shrink-0" />
                  <span className="font-semibold">Quezon City, Metro Manila</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2 rounded-xl shrink-0 shadow-inner self-start sm:self-auto">
              <span className="text-sm sm:text-base font-black text-white tracking-widest uppercase">
                ID #4922
              </span>
            </div>
          </div>
        </section>

        {/* WIDESCREEN GRID SYSTEM (Section 3, 4, 6 left, Section 5, 7, 8 and 9 right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL (col-span-8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 3. Quick Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card A: Activity */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs font-bold tracking-wider uppercase">
                    Activity Index
                  </span>
                  <div className="bg-emerald-50 p-1.5 rounded-xl">
                    <Zap className="w-4.5 h-4.5 text-emerald-500 fill-emerald-500" />
                  </div>
                </div>

                <div className="mt-3.5 flex items-baseline">
                  <span className="text-4xl font-black text-[#000B73] tracking-tight">
                    65
                  </span>
                  <span className="ml-3 bg-emerald-50 text-emerald-600 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <TrendingUp className="w-2.5 h-2.5 stroke-[2.5]" />
                    + 12%
                  </span>
                </div>

                <div className="mt-6 pt-0.5">
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full w-[65%] transition-all duration-1000" />
                  </div>
                  <div className="flex justify-between items-center mt-2.5 text-[10px] font-bold text-gray-400 tracking-wide uppercase">
                    <span>Performance Target Reach</span>
                    <span>65% Reach</span>
                  </div>
                </div>
              </div>

              {/* Card B: Risk Level */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs font-bold tracking-wider uppercase">
                    Risk Assessment
                  </span>
                  <div className="bg-emerald-50 p-1.5 rounded-xl">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 fill-emerald-100" />
                  </div>
                </div>

                <div className="mt-4">
                  <span className="bg-emerald-50 text-emerald-700 text-sm font-black px-4 py-1.5 rounded-full tracking-wider">
                    LOW
                  </span>
                </div>

                <p className="mt-6 text-xs font-bold text-gray-400 uppercase tracking-wide">
                  Stable trends
                </p>
              </div>
            </div>

            {/* 4. Transaction Trend Bar Chart Card */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-gray-800 font-extrabold text-base tracking-tight leading-none">
                    Transaction Trend (7d)
                  </h3>
                  <p className="text-xs text-gray-400 mt-1.5">Historical daily transaction frequencies.</p>
                </div>
                
                <div className="flex items-center gap-4 text-xs font-bold text-gray-500 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
                    <span>Muted</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-[#000B73] rounded-full" />
                    <span>Active</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full" />
                    <span>Peak</span>
                  </div>
                  <span className="text-[#000B73] font-black border-l border-gray-200 pl-3">
                    ₱42.5k avg
                  </span>
                </div>
              </div>

              {/* Chart Content */}
              <div className="h-40 flex items-end justify-between px-2 sm:px-6 border-b border-gray-155 pb-1">
                {/* MON */}
                <div className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer px-1.5">
                  <div className="relative w-full max-w-[48px] bg-gray-200 rounded-t-lg h-[40%] hover:bg-gray-300 transition-colors">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity font-bold whitespace-nowrap z-10 pointer-events-none">
                      ₱17.0k
                    </div>
                  </div>
                </div>

                {/* TUE */}
                <div className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer px-1.5">
                  <div className="relative w-full max-w-[48px] bg-gray-200 rounded-t-lg h-[55%] hover:bg-gray-300 transition-colors">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity font-bold whitespace-nowrap z-10 pointer-events-none">
                      ₱23.5k
                    </div>
                  </div>
                </div>

                {/* WED */}
                <div className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer px-1.5">
                  <div className="relative w-full max-w-[48px] bg-[#000B73] rounded-t-lg h-[75%] hover:opacity-90 transition-opacity">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity font-bold whitespace-nowrap z-10 pointer-events-none">
                      ₱31.8k
                    </div>
                  </div>
                </div>

                {/* THU */}
                <div className="flex-1 flex flex-col items-center h-full justify-end px-1.5">
                  <div className="w-full max-w-[48px] h-0" />
                </div>

                {/* FRI */}
                <div className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer px-1.5">
                  <div className="relative w-full max-w-[48px] bg-[#000B73] rounded-t-lg h-[65%] hover:opacity-90 transition-opacity">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity font-bold whitespace-nowrap z-10 pointer-events-none">
                      ₱27.6k
                    </div>
                  </div>
                </div>

                {/* SAT */}
                <div className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer px-1.5">
                  <div className="relative w-full max-w-[48px] bg-emerald-600 rounded-t-lg h-[95%] hover:bg-emerald-700 transition-colors">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity font-bold whitespace-nowrap z-10 pointer-events-none">
                      ₱42.5k
                    </div>
                  </div>
                </div>

                {/* SUN */}
                <div className="flex-1 flex flex-col items-center h-full justify-end px-1.5">
                  <div className="w-full max-w-[48px] h-0" />
                </div>
              </div>

              <div className="flex justify-between text-[11px] font-black text-gray-400 mt-3 px-2 sm:px-6 uppercase tracking-wider">
                <span className="flex-1 text-center">Mon</span>
                <span className="flex-1 text-center">Tue</span>
                <span className="flex-1 text-center">Wed</span>
                <span className="flex-1 text-center">Thu</span>
                <span className="flex-1 text-center">Fri</span>
                <span className="flex-1 text-center">Sat</span>
                <span className="flex-1 text-center">Sun</span>
              </div>
            </section>

            {/* 6. Product Portfolio Row */}
            <section className="space-y-3.5">
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-xs font-extrabold tracking-widest uppercase">
                  PRODUCT PORTFOLIO (TAP FOR SPECS)
                </span>
                <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">
                  Selected: {selectedProduct}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Column 1: QR */}
                <div 
                  onClick={() => setSelectedProduct("QR")}
                  className={`cursor-pointer rounded-2xl p-5 flex items-center justify-between shadow-xs hover:shadow-sm transition-all border ${
                    selectedProduct === "QR" 
                      ? "bg-[#E6F4EA] border-emerald-500 ring-2 ring-emerald-500/10 scale-[1.02]" 
                      : "bg-white border-gray-100/80 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-100/60 p-2.5 rounded-xl text-emerald-700">
                      <QrCode className="w-6.5 h-6.5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-emerald-800 text-base leading-none">
                        QR Code
                      </h4>
                      <span className="text-emerald-700 text-[10px] font-black tracking-widest mt-1.5 block">
                        ACTIVE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Column 2: SoundPay */}
                <div 
                  onClick={() => setSelectedProduct("SoundPay")}
                  className={`cursor-pointer rounded-2xl p-5 flex items-center justify-between shadow-xs hover:shadow-sm transition-all border ${
                    selectedProduct === "SoundPay" 
                      ? "bg-[#E5E7EB] border-gray-500 ring-2 ring-gray-500/10 scale-[1.02]" 
                      : "bg-white border-gray-100/80 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-200/50 p-2.5 rounded-xl text-gray-400">
                      <Volume2 className="w-6.5 h-6.5 stroke-[2]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-600 text-base leading-none">
                        SoundPay
                      </h4>
                      <span className="text-gray-400 text-[10px] font-black tracking-widest mt-1.5 block">
                        INACTIVE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Column 3: PocketPay */}
                <div 
                  onClick={() => setSelectedProduct("PocketPay")}
                  className={`cursor-pointer rounded-2xl p-5 flex items-center justify-between shadow-xs hover:shadow-sm transition-all border ${
                    selectedProduct === "PocketPay" 
                      ? "bg-[#E5E7EB] border-gray-500 ring-2 ring-gray-500/10 scale-[1.02]" 
                      : "bg-white border-gray-100/80 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-200/50 p-2.5 rounded-xl text-gray-400">
                      <Smartphone className="w-6.5 h-6.5 stroke-[2]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-600 text-base leading-none">
                        PocketPay
                      </h4>
                      <span className="text-gray-400 text-[10px] font-black tracking-widest mt-1.5 block">
                        INACTIVE
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Spec Details */}
              <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs transition-all">
                {selectedProduct === "QR" && (
                  <div className="flex gap-4 items-start text-sm">
                    <QrCode className="w-10 h-10 text-emerald-600 shrink-0 bg-emerald-50 p-2 rounded-xl" />
                    <div>
                      <h5 className="font-extrabold text-gray-900 text-base">QR Dynamic Scan Terminal</h5>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">Status: Active Service • Fee Model: 1.2% MDR</p>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                        Dynamic QR generates unique transaction payloads on screen for Juan. Instantly validates customer payment on cashier logs, lowering scanning drop-offs. Already fully configured for Aling Nena's Groceries cashier registers.
                      </p>
                    </div>
                  </div>
                )}
                {selectedProduct === "SoundPay" && (
                  <div className="flex gap-4 items-start text-sm">
                    <Volume2 className="w-10 h-10 text-blue-600 shrink-0 bg-blue-50 p-2 rounded-xl" />
                    <div>
                      <h5 className="font-extrabold text-gray-900 text-base">SoundPay Plus Audio Reader Terminal</h5>
                      <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mt-1">SME RECOMMENDED UPGRADE • Fee Model: 0.8% MDR promo</p>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                        Equips checkout counters with instant speaker receipt confirmation. Speaks out the exact paid amount automatically. Resolves cashier dynamic QR screenshot bottlenecks completely, speeding checkout lines by 40%.
                      </p>
                    </div>
                  </div>
                )}
                {selectedProduct === "PocketPay" && (
                  <div className="flex gap-4 items-start text-sm">
                    <Smartphone className="w-10 h-10 text-[#000B73] shrink-0 bg-blue-50 p-2 rounded-xl" />
                    <div>
                      <h5 className="font-extrabold text-gray-900 text-base">PocketPay Mobile Register SDK</h5>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1">Status: Inactive • Fee Model: Subscription Only</p>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                        Transforms cashiers' personal Android devices into card reader terminals using NFC attachments. Highly portable, best fit for logistics/delivery agents rather than fixed retail counters like Aling Nena's.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Visit Logs & Audits Ledger */}
            {showHistoryLogs && (
              <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-3">
                  <h4 className="font-extrabold text-gray-800 text-sm tracking-tight flex items-center gap-2">
                    <History className="w-4.5 h-4.5 text-[#000B73]" /> Visit Logs & Audits
                  </h4>
                  <button 
                    onClick={() => setShowHistoryLogs(false)}
                    className="text-xs text-gray-400 hover:text-gray-600 font-bold cursor-pointer"
                  >
                    Hide Ledger
                  </button>
                </div>

                <div className="space-y-3.5">
                  {historyLogs.map((log, i) => (
                    <div key={i} className="flex items-start justify-between text-xs border-b border-gray-50/50 pb-2.5 last:border-0 last:pb-0">
                      <div className="space-y-1 pr-4">
                        <p className="font-extrabold text-gray-800">{log.event}</p>
                        <p className="text-[10px] text-gray-400 font-semibold">Logged by: {log.agent}</p>
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap self-start">{log.date}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT PANEL (col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 5. AI Generated Brief Card */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4.5 h-4.5 text-[#000B73] fill-[#000B73]" />
                <h3 className="text-[#000B73] font-black text-xs tracking-wider uppercase">
                  AI Generated Brief
                </h3>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-5 font-semibold">
                Aling Nena's Groceries is currently a{" "}
                <button
                  onClick={() => setShowAiExplanation(true)}
                  className="underline font-black text-[#000B73] hover:text-blue-800 transition-colors inline-block cursor-pointer focus:outline-none"
                >
                  high-frequency merchant
                </button>{" "}
                with steady grocery footfall. However, they are missing out on higher-tier transaction speed optimizations. Recent transaction data suggests a peak-hour bottleneck that SoundPay Plus could solve.
              </p>

              <div className="flex items-center gap-2.5 pt-4 border-t border-gray-150">
                <span className="bg-gray-100 text-gray-500 text-[10px] font-black px-2.5 py-1 rounded-md tracking-wider">
                  RETAIL GAP
                </span>
                <span className="bg-gray-100 text-gray-500 text-[10px] font-black px-2.5 py-1 rounded-md tracking-wider">
                  EFFICIENCY LOGIC
                </span>
              </div>

              {/* Inline AI Explanation Popover/Modal */}
              {showAiExplanation && (
                <div className="absolute inset-0 bg-white rounded-2xl p-6 z-20 flex flex-col justify-between border-2 border-[#000B73]/20 animate-fadeIn">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5 text-[#000B73]">
                        <BrainCircuit className="w-5.5 h-5.5" />
                        <h4 className="font-extrabold text-sm tracking-tight">AI Sales Explanation</h4>
                      </div>
                      <button 
                        onClick={() => setShowAiExplanation(false)}
                        className="text-gray-400 hover:text-gray-600 p-0.5 rounded-full hover:bg-gray-100 cursor-pointer"
                        aria-label="Close explanation"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                      <strong className="text-gray-800">High-Frequency Merchant Status:</strong> This refers to businesses processing over <span className="text-[#000B73] font-bold">120+ quick checkouts daily</span>. 
                      Because footfall is steady, any slight checkout lag severely aggregates during peak hours. Enabling audio transaction receipts via SoundPay Plus speeds up checkouts by 40% because cashiers don't have to manually inspect receipts.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAiExplanation(false)}
                    className="w-full bg-[#000B73] hover:bg-blue-900 text-white font-bold text-xs py-2.5 rounded-xl transition-colors mt-4 cursor-pointer"
                  >
                    Got it, Back to Brief
                  </button>
                </div>
              )}
            </section>

            {/* 7. Pitch Banner Card */}
            <section className="bg-gradient-to-br from-[#000B73] to-[#121A8F] p-6 sm:p-8 rounded-2xl text-white shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />

              <div className="flex items-center justify-between">
                <span className="bg-[#E6F4EA] text-[#137333] text-[10px] font-black px-3 py-1.5 rounded-md tracking-wider uppercase">
                  ⚡RK TOP PITCH
                </span>
                <span className="text-blue-200/90 text-xs font-bold">
                  Confidence: 94%
                </span>
              </div>

              <div className="mt-5">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  Upgrade to SoundPay Plus
                </h3>
                <p className="text-blue-100 text-xs font-semibold mt-1">
                  Recommended for high volume retail stores like this.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-5 mt-5 flex items-center gap-4">
                <div className="bg-white/15 p-2.5 rounded-lg shrink-0 text-white">
                  <Gauge className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-blue-200 text-[10px] font-black tracking-widest uppercase block leading-none">
                    EXPECTED OUTCOME
                  </span>
                  <span className="text-sm sm:text-lg font-extrabold text-white mt-2 block leading-tight">
                    Increase transaction speed by 40%
                  </span>
                </div>
              </div>
            </section>

            {/* 8. Open Tickets Section */}
            <section className="space-y-3.5">
              <div className="flex items-center justify-between text-gray-500">
                <span className="text-xs font-extrabold tracking-widest uppercase">
                  OPEN TICKETS (1)
                </span>
                <AlertTriangle className="w-4.5 h-4.5 text-rose-500 fill-rose-500/10" />
              </div>

              <article className="bg-white border border-gray-100 border-l-4 border-l-rose-500 rounded-r-2xl rounded-l-md p-5 flex justify-between items-start gap-4 shadow-sm">
                <div className="space-y-2 flex-1">
                  <h4 className="text-gray-900 font-extrabold text-sm tracking-tight leading-tight">
                    QR Scanning Issue
                  </h4>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold">
                    Merchant reports terminal fails to generate dynamic QR codes intermittently.
                  </p>
                  <div className="flex items-center gap-1.5 pt-1.5">
                    <span className="w-2 h-2 bg-rose-500 rounded-full shrink-0" />
                    <span className="text-rose-600 text-[10px] font-extrabold tracking-wider uppercase">
                      HIGH PRIORITY
                    </span>
                  </div>
                </div>

                <span className="text-gray-400 text-xs font-bold whitespace-nowrap pt-0.5 shrink-0">
                  2h ago
                </span>
              </article>
            </section>

            {/* 9. Visit Resolution Actions Card (Embedded on page naturally) */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
              <div>
                <h4 className="font-extrabold text-gray-800 text-sm tracking-tight leading-none">
                  Visit Resolution Actions
                </h4>
                <p className="text-xs text-gray-400 mt-1.5">
                  Save visiting resolution status directly inside document flow.
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-1">
                {/* Pending Button */}
                <button
                  onClick={onPending}
                  className="w-full bg-gray-50 hover:bg-gray-100 active:scale-98 text-gray-700 py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer border border-gray-200"
                >
                  <Clock className="w-4.5 h-4.5 text-gray-500 shrink-0 stroke-[2.5]" />
                  <span>Mark Visit as Pending</span>
                </button>

                {/* Action Taken Button */}
                <button
                  onClick={onActionTaken}
                  className="w-full bg-[#000B73] hover:bg-blue-900 active:scale-98 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4.5 h-4.5 text-white shrink-0 stroke-[2.5]" />
                  <span>Log Action Taken</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
