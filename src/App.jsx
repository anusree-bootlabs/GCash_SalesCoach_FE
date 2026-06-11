<<<<<<< HEAD
import { useState, useEffect } from "react"
import { Check } from "lucide-react"

// Material UI Icons used in the original layout
import DashboardIcon from "@mui/icons-material/Dashboard"
import StorefrontIcon from "@mui/icons-material/Storefront"
import BoltIcon from "@mui/icons-material/Bolt"
import TimelineIcon from "@mui/icons-material/Timeline"
import MapOutlinedIcon from "@mui/icons-material/MapOutlined"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"

// Existing Sidebar Layout Wrapper
import AppShell from "./components/layout/appShell.jsx"

// SME Dashboard Subviews
import HomeView from "./components/HomeView"
import MerchantBriefView from "./components/MerchantBriefView"
import ActionCenterView from "./components/ActionCenterView"

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { id: "merchants", label: "Merchants", icon: <StorefrontIcon /> },
  { id: "action-center", label: "Action Center", icon: <BoltIcon /> },
  { id: "performance", label: "Performance", icon: <TimelineIcon /> },
  { id: "territory", label: "Territory", icon: <MapOutlinedIcon /> },
  { id: "insights", label: "AI Insights", icon: <AutoAwesomeIcon /> }
]

export default function App() {
  const [route, setRoute] = useState(window.location.pathname)
  const [alingNenaStatus, setAlingNenaStatus] = useState(null) // null | "action_taken" | "pending"
  const [language, setLanguage] = useState("en")
  
  // States
  const [showAiExplanation, setShowAiExplanation] = useState(false)
  const [notificationCount, setNotificationCount] = useState(1)
  const [toast, setToast] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState("SoundPay")
  const [showHistoryLogs, setShowHistoryLogs] = useState(true)

  // Custom action history ledger
  const [historyLogs, setHistoryLogs] = useState([
    { date: "Jun 08, 2026", type: "system", event: "Dynamic QR verification passed.", agent: "Automated System" },
    { date: "Jun 04, 2026", type: "visit", event: "Periodic field check-in. Terminal cleaned.", agent: "Juan dela Cruz" },
    { date: "May 28, 2026", type: "support", event: "QR Scan issue reported. Terminal ticket #2041 opened.", agent: "Tech Support" }
  ])

  // Synchronize routing and support root redirection
  useEffect(() => {
    if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
      window.history.replaceState({}, "", "/dsb-dashboard")
      setRoute("/dsb-dashboard")
    }

    const handlePopState = () => {
      setRoute(window.location.pathname)
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  const navigate = (path) => {
    window.history.pushState({}, "", path)
    setRoute(path)
  }

  const triggerToast = (message) => {
    setToast(message)
    setTimeout(() => {
      setToast(null)
    }, 4000)
  }

  // Sidebar mapping
  const getSelectedItem = () => {
    if (route === "/dsb-dashboard") return "dashboard"
    if (route === "/dsb-dashboard/brief") return "merchants"
    if (route === "/dsb-action-center") return "action-center"
    return route.replace("/dsb-", "")
  }

  const handleSidebarSelect = (itemId) => {
    if (itemId === "dashboard") {
      navigate("/dsb-dashboard")
    } else if (itemId === "merchants") {
      navigate("/dsb-dashboard/brief")
    } else if (itemId === "action-center") {
      navigate("/dsb-action-center")
    } else {
      navigate(`/dsb-${itemId}`)
    }
  }

  const getBreadcrumbs = () => {
    if (route === "/dsb-dashboard") return ["Home", "SME Dashboard"]
    if (route === "/dsb-dashboard/brief") return ["Home", "Merchants", "Aling Nena's Groceries"]
    if (route === "/dsb-action-center") return ["Home", "Action Center"]
    return ["Home", route.replace("/dsb-", "").toUpperCase()]
  }

  return (
    <div className="min-h-screen bg-[#F4F6F9] font-sans antialiased">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-[90%] bg-gray-900 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3.5 border border-gray-800 transition-all animate-bounce">
          <div className="bg-emerald-500 text-white p-1 rounded-full shrink-0">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <p className="text-sm font-bold tracking-tight">{toast}</p>
        </div>
      )}

      {/* Existing AppShell Layout Wrapper */}
      <AppShell
        sidebarItems={sidebarItems}
        breadcrumbs={getBreadcrumbs()}
        language={language}
        setLanguage={setLanguage}
        selectedItem={getSelectedItem()}
        setSelectedItem={handleSidebarSelect}
      >
        {/* Routed Component Views */}
        {route === "/dsb-dashboard/brief" ? (
          <MerchantBriefView
            alingNenaStatus={alingNenaStatus}
            onBack={() => navigate("/dsb-dashboard")}
            notificationCount={notificationCount}
            triggerToast={triggerToast}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            showHistoryLogs={showHistoryLogs}
            setShowHistoryLogs={setShowHistoryLogs}
            historyLogs={historyLogs}
            setShowAiExplanation={setShowAiExplanation}
            showAiExplanation={showAiExplanation}
          />
        ) : route === "/dsb-dashboard" ? (
          <HomeView
            alingNenaStatus={alingNenaStatus}
            onOpenBrief={() => navigate("/dsb-dashboard/brief")}
            notificationCount={notificationCount}
            onClearNotifications={() => setNotificationCount(0)}
            triggerToast={triggerToast}
          />
        ) : route === "/dsb-action-center" ? (
          <ActionCenterView triggerToast={triggerToast} />
        ) : (
          /* Placeholder for other Sidebar tabs */
          <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm text-center space-y-4 max-w-2xl mx-auto my-12 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-800">Feature Under Development</h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
              The Sales Coach <span className="font-bold text-[#000B73]">{route.replace("/dsb-", "").replace("-", " ").toUpperCase()}</span> module is currently being finalized for agent operations. Check back soon for AI integration details!
            </p>
            <button
              onClick={() => navigate("/dsb-dashboard")}
              className="bg-[#000B73] text-white hover:bg-blue-900 px-5 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer inline-block"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </AppShell>
    </div>
  )
}
=======
import { useState } from "react";
import Layout from "./Layout";

function App() {
    const [language, setLanguage] = useState("en");

    return (
        <Layout language={language} setLanguage={setLanguage}>
            <div>Your page content here</div>
        </Layout>
    );
}

export default App;
>>>>>>> 36a3656 (layout fix)
