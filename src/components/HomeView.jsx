import React from "react"
import {
  Sparkles,
  MapPin,
  Info,
  ChevronRight,
  Plus,
  Home,
  Store,
  ClipboardList,
  BrainCircuit
} from "lucide-react"

function WelcomeSection() {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-dark-heading m-0">Good morning, Juan!</h1>
      <p className="text-muted-gray text-sm mt-1">Here is your field update for today.</p>
    </div>
  )
}

function DailyGoalCard({ alingNenaStatus }) {
  const progress = alingNenaStatus === "action_taken" ? 83 : alingNenaStatus === "pending" ? 79 : 75

  return (
    <section className="bg-white rounded-2xl p-5 micro-elevation border border-gray-100 mb-4 w-full">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-semibold text-muted-gray tracking-widest uppercase">Daily Goal Progress</p>
          <p className="text-3xl font-bold text-dark-heading mt-0.5">{progress}%</p>
        </div>
        <div className="bg-green-50 px-3 py-1 rounded-full">
          <p className="text-xs font-bold text-status-green tracking-widest uppercase">On Track</p>
        </div>
      </div>

      <div className="w-full h-2.5 bg-gray-100 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-primary-main rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between">
        <div>
          <p className="text-xs text-muted-gray font-medium">Visits</p>
          <p className="text-lg font-bold text-dark-heading">
            {alingNenaStatus ? "9/12" : "8/12"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-gray font-medium">Activations</p>
          <p className="text-lg font-bold text-dark-heading">
            {alingNenaStatus === "action_taken" ? "3/5" : "2/5"}
          </p>
        </div>
      </div>
    </section>
  )
}

function AiCoachSection({ onOpenBrief }) {
  return (
    <section className="w-full">
      <div className="flex items-center gap-1.5 mb-3">
        <Sparkles className="w-4 h-4 text-primary-container" />
        <h2 className="text-xs font-bold text-primary-container tracking-widest uppercase m-0">AI Coach Recommendation</h2>
      </div>

      <div className="bg-primary-container ai-shimmer micro-elevation rounded-2xl p-4 text-white relative overflow-hidden">
        <div className="flex justify-between items-start mb-1">
          <div>
            <h3 className="text-2xl font-bold m-0">Upgrade SoundPay Plus</h3>
            <p className="text-blue-200 text-sm mt-0.5">Aling Nena's Groceries</p>
          </div>
          <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full tracking-wider whitespace-nowrap">
            94% Confidence
          </span>
        </div>

        <div className="bg-white/10 rounded-xl p-3 my-3 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-200 shrink-0" />
            <span className="text-xs font-bold text-blue-200 tracking-widest uppercase">AI Insight</span>
          </div>
          <p className="text-base text-white leading-relaxed m-0 ml-6">
            Dynamic QR scanning timeout detected. Pitched SoundPay Plus audio confirmation to resolve checkout queue bottle-necks.
          </p>
        </div>

        <button 
          onClick={onOpenBrief}
          className="w-full bg-white text-primary-main font-semibold text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
        >
          Execute Action
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  )
}

function PriorityCard({ name, badge, badgeBg, badgeText, accentColor, address, priority, priorityColor, lastTrans, alert, onClick }) {
  return (
    <article 
      onClick={onClick}
      className={`bg-white rounded-2xl p-4 border-l-4 ${accentColor} shadow-sm border border-gray-100 w-full ${onClick ? "cursor-pointer hover:bg-gray-50/50 hover:shadow-md transition-all" : ""}`}
    >
      <div className="flex items-start justify-between mb-1.5">
        <h3 className="font-bold text-dark-heading text-sm m-0">{name}</h3>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider ${badgeBg} ${badgeText}`}>
          {badge}
        </span>
      </div>

      <div className="flex items-center gap-1 text-muted-gray text-xs mb-3">
        <MapPin className="w-3 h-3" />
        <span>{address}</span>
      </div>

      {(priority || lastTrans) && (
        <div className="flex gap-6 mb-2.5">
          {priority && (
            <div>
              <p className="text-[10px] font-semibold text-muted-gray tracking-widest uppercase">Priority</p>
              <p className={`text-sm font-bold ${priorityColor}`}>{priority}</p>
            </div>
          )}
          {lastTrans && (
            <div>
              <p className="text-[10px] font-semibold text-muted-gray tracking-widest uppercase">Last Trans</p>
              <p className="text-sm font-bold text-dark-heading">{lastTrans}</p>
            </div>
          )}
        </div>
      )}

      {alert && (
        <div className="flex items-start gap-1.5 text-muted-gray">
          <Info className="w-3 h-3 mt-0.5 shrink-0" />
          <p className="text-xs italic m-0">{alert}</p>
        </div>
      )}
    </article>
  )
}

function PriorityVisitsSection({ alingNenaStatus, onOpenBrief }) {
  return (
    <section className="mt-4 w-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-dark-heading m-0">Priority Visits</h2>
        <button className="text-sm font-semibold text-deep-navy hover:underline cursor-pointer">View All →</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        {/* Aling Nena's Groceries */}
        <PriorityCard
          name="Aling Nena's Groceries"
          badge={alingNenaStatus === "action_taken" ? "Action Taken" : alingNenaStatus === "pending" ? "Pending" : "At Risk"}
          badgeBg={alingNenaStatus === "action_taken" ? "bg-green-50" : alingNenaStatus === "pending" ? "bg-amber-50" : "bg-red-50"}
          badgeText={alingNenaStatus === "action_taken" ? "text-status-green" : alingNenaStatus === "pending" ? "text-amber-600" : "text-status-red"}
          accentColor={alingNenaStatus === "action_taken" ? "border-l-status-green" : alingNenaStatus === "pending" ? "border-l-amber-500" : "border-l-status-red"}
          address="Quezon City, Metro Manila"
          priority="HIGH"
          priorityColor="text-status-red"
          lastTrans="TODAY"
          alert='"QR terminal speed drops detected intermittently"'
          onClick={onOpenBrief}
        />

        {/* Juan's Sari-Sari Store */}
        <PriorityCard
          name="Juan's Sari-Sari Store"
          badge="At Risk"
          badgeBg="bg-red-50"
          badgeText="text-status-red"
          accentColor="border-l-status-red"
          address="34 Rizal Ave, Sector 4"
          priority="HIGH"
          priorityColor="text-status-red"
          lastTrans="14 DAYS AGO"
          alert='"No transaction for 14 days"'
        />

        {/* Lina's Fresh Produce */}
        <PriorityCard
          name="Lina's Fresh Produce"
          badge="Active"
          badgeBg="bg-green-50"
          badgeText="text-status-green"
          accentColor="border-l-status-green"
          address="Market Hub, Stall 12"
        />
      </div>
    </section>
  )
}

export default function HomeView({ alingNenaStatus, onOpenBrief }) {
  return (
    <div className="w-full h-full bg-transparent space-y-6">
      <WelcomeSection />
      <DailyGoalCard alingNenaStatus={alingNenaStatus} />
      <AiCoachSection onOpenBrief={onOpenBrief} />
      <PriorityVisitsSection alingNenaStatus={alingNenaStatus} onOpenBrief={onOpenBrief} />
    </div>
  )
}
