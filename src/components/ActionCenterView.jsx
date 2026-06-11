import React, { useState, useRef } from "react"
import {
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
  TextField,
  Select,
  MenuItem,
  Button,
  Chip,
  Card,
  CardContent,
  Typography,
  InputAdornment,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material"
// Icons
import SearchIcon from "@mui/icons-material/Search"
import PsychologyIcon from "@mui/icons-material/Psychology"
import TrendingDownIcon from "@mui/icons-material/TrendingDown"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import ChatIcon from "@mui/icons-material/Chat"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import MapIcon from "@mui/icons-material/Map"

export default function ActionCenterView({ triggerToast }) {
  const [selectedMerchantId, setSelectedMerchantId] = useState("golden")
  const [filterQuery, setFilterQuery] = useState("")
  const [notesText, setNotesText] = useState("")
  const [outcomeStatus, setOutcomeStatus] = useState("")
  const [uploadedFileName, setUploadedFileName] = useState(null)
  const fileInputRef = useRef(null)

  const merchantsData = {
    golden: {
      id: "#882-990",
      name: "Golden Harvest Cafe",
      subtitle: "Upgrade to SoundPay Plus",
      priority: "HIGH",
      confidence: 94,
      desc: "High transaction volume detected. Merchant losing 2.4% margin on current plan.",
      reasons: [
        {
          title: "Volume Efficiency Loss",
          body: "Merchant processed $120k last month. Current 'Starter' tier has 2.9% + 30c fee structure. SoundPay Plus reduces this to 2.2% Flat, saving them ~$840/mo.",
          icon: <TrendingDownIcon />
        },
        {
          title: "Retention Opportunity",
          body: "SoundPay Plus includes the Rewards Program. Similar cafes in this zip code saw 18% increase in repeat customers after enabling.",
          icon: <LocalOfferIcon />
        }
      ],
      points: [
        "I noticed your volume hit a new milestone last month. Congratulations! We actually have a high-volume tier that would have saved you nearly $900 last month.",
        "Nearby cafes are leveraging our loyalty program to offset the summer slowdown. Would you like to see how SoundPay Plus could integrate that for you today?"
      ],
      address: "1221 Pike St, Seattle WA"
    },
    blue: {
      id: "#302-881",
      name: "Blue Wave Surf Shop",
      subtitle: "Enable Multi-Currency",
      priority: "MED",
      confidence: 88,
      desc: "Significant tourist season approaching. Historical data shows 12% drop-off at checkout.",
      reasons: [
        {
          title: "Tourist Drop-off Minimization",
          body: "Over 35% of foreign visitors drop off when prices are not presented in home currencies. Multi-currency eliminates conversion hesitation.",
          icon: <TrendingDownIcon />
        },
        {
          title: "MDR Fee Adjustment",
          body: "Multi-currency checkout processes cross-border transfers directly, reducing international routing surcharges by 0.5% per ticket.",
          icon: <LocalOfferIcon />
        }
      ],
      points: [
        "With tourist season starting next week, foreign transactions will spike. We can enable automatic local currency displays at checkout to prevent cart abandonment.",
        "Your international card processing overhead is currently higher than average. Enabling this feature actually reduces routing surcharges."
      ],
      address: "405 Alki Ave SW, Seattle WA"
    },
    metro: {
      id: "#104-225",
      name: "Metro Fitness Center",
      subtitle: "Hardware Refresh",
      priority: "LOW",
      confidence: 76,
      desc: "Terminal ID #8829 reported 3 connectivity errors this week.",
      reasons: [
        {
          title: "Hardware Packet Loss",
          body: "The counter terminal registers recurring handshake latency. Replacing the reader protects checkout volume from intermittent dropouts.",
          icon: <TrendingDownIcon />
        },
        {
          title: "Tap-to-Pay Readiness",
          body: "The upgraded terminal package natively supports high-speed NFC transactions, allowing gym members to tap-to-enter with smart watches.",
          icon: <LocalOfferIcon />
        }
      ],
      points: [
        "Our telemetry logs show your current card reader registered some connection packet timeouts. We can dispatch a brand new terminal today to keep checkouts fast.",
        "The new terminals support seamless Apple and Google Watch NFC check-ins. Gym members love checking in without digging out cards."
      ],
      address: "801 Eastlake Ave E, Seattle WA"
    }
  }

  const activeMerchant = merchantsData[selectedMerchantId] || merchantsData.golden

  const handleFileUploadClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedFileName(file.name)
      triggerToast(`📄 File "${file.name}" uploaded successfully as visit proof!`)
    }
  }

  const handleSubmitVisitOutcome = () => {
    if (!outcomeStatus) {
      triggerToast("⚠️ Please select an outcome status before submitting!")
      return
    }
    triggerToast(`🚀 Visit outcome logged for ${activeMerchant.name}! Outcome: ${outcomeStatus.toUpperCase()}`)
    setOutcomeStatus("")
    setNotesText("")
    setUploadedFileName(null)
  }

  // Search filter
  const filteredMerchants = Object.keys(merchantsData).filter((key) => {
    const item = merchantsData[key]
    return (
      item.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(filterQuery.toLowerCase())
    )
  })

  return (
    <div className="w-full h-full bg-transparent flex flex-col xl:flex-row gap-6 animate-fadeIn items-start">
      
      {/* ================= LEFT COLUMN — ACTION QUEUE ================= */}
      <div className="w-full xl:w-[280px] shrink-0 space-y-4">
        {/* Header Block */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 leading-none">Action Queue</h2>
          <span className="bg-[#000666]/85 backdrop-blur-md text-white text-[9px] font-black h-5 px-2.5 rounded-full uppercase flex items-center justify-center shrink-0 border border-white/5 shadow-xs">
            12 Active
          </span>
        </div>

        {/* Filter Input with reduced height */}
        <TextField
          id="filter-merchants"
          placeholder="Filter merchants..."
          fullWidth
          size="small"
          variant="outlined"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          sx={{
            bgcolor: "#fff",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              height: "32px", // Compact height
              fontSize: "12px",
              "& input": {
                py: 0.5,
                fontSize: "12px"
              }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ mr: 0.5 }}>
                <SearchIcon sx={{ color: "text.secondary", fontSize: 16 }} />
              </InputAdornment>
            )
          }}
        />

        {/* Border after the filter with more gap */}
        <div className="border-b border-gray-200/80 my-5" />

        {/* Stacked Merchants Queue list with more gap */}
        <div className="flex flex-col gap-4 mt-4">
          {filteredMerchants.length > 0 ? (
            filteredMerchants.map((key) => {
              const item = merchantsData[key]
              const isSelected = selectedMerchantId === key
              const badgeColors = 
                item.priority === "HIGH" 
                  ? { bg: "bg-red-50 text-red-600 border border-red-200/50" }
                  : item.priority === "MED"
                    ? { bg: "bg-yellow-50 text-yellow-700 border border-yellow-200/50" }
                    : { bg: "bg-green-50 text-green-600 border border-green-200/50" }

                    const cardSelectedClasses = isSelected
                    ? "bg-slate-50 border-slate-700 ring-1 ring-slate-200"
                    : "bg-white hover:bg-gray-50 border-gray-200"

              return (
                <article
                  key={key}
                  onClick={() => setSelectedMerchantId(key)}
                  className={`p-4 rounded-xl border border-gray-150 transition-all cursor-pointer ${cardSelectedClasses}`}
                >
                  <div className="flex justify-between items-start gap-1">
                    <h3 className="font-bold text-xs text-primary   tracking-widest leading-none truncate">
                      {item.name}
                    </h3>
                    <Chip 
                      label={`! ${item.priority}`} 
                      size="small" 
                      sx={{
                        bgcolor: item.priority === "HIGH" 
                          ? "#fef2f2" 
                          : item.priority === "MED"
                            ? "#fef9c3"
                            : "#f0fdf4",
                        color: item.priority === "HIGH" 
                          ? "#dc2626" 
                          : item.priority === "MED"
                            ? "#a16207"
                            : "#16a34a",
                        border: item.priority === "HIGH" 
                          ? "1px solid rgba(220, 38, 38, 0.25)" 
                          : item.priority === "MED"
                            ? "1px solid rgba(161, 98, 7, 0.25)"
                            : "1px solid rgba(22, 163, 74, 0.25)",
                        fontWeight: 900,
                        fontSize: "9px",
                        borderRadius: "6px",
                        height: "18px",
                        "& .MuiChip-label": {
                          px: 1,
                        }
                      }}
                    />
                  </div>

                  <h4 className="font-extrabold text-sm text-gray-800 mt-2">
                    {item.subtitle}
                  </h4>
                  <div className="flex items-center gap-1 text-emerald-700 text-[10px] font-black uppercase tracking-wider mt-2.5">
  <PsychologyIcon
    sx={{
      fontSize: 15,
      color: "#047857",
    }}
  />
  <span>{item.confidence}% Confidence</span>
</div>

                  <p className="text-[11px] text-gray-800 font-semibold leading-relaxed mt-2">
                    {item.desc}
                  </p>
                </article>
              )
            })
          ) : (
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100 text-xs text-gray-400 font-bold">
              No matching merchants found.
            </div>
          )}
        </div>
      </div>

      {/* ================= CENTER COLUMN — MERCHANT DETAIL PANEL ================= */}
      <div className="flex-grow w-full xl:max-w-none space-y-6">
        
        {/* Breadcrumb Bar */}
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-surface-variant text-on-surface-variant px-2 py-1 rounded font-label-md text-[10px] uppercase">Merchant ID: {activeMerchant.id}</span>
          <span className="text-on-surface-variant material-symbols-outlined text-[8px]">chevron_right</span>
          <span className="text-secondary font-bold font-label-md text-[12px] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">verified</span> Active Merchant
          </span>
        </div>

        {/* Title and control actions */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-tight">
              {activeMerchant.name}
            </h1>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
              {activeMerchant.subtitle}
            </p>
          </div>

          <div className="flex flex-row items-center gap-3 flex-nowrap shrink-0 overflow-x-auto self-start md:self-auto">
            <Chip 
              label={`Priority: ${activeMerchant.priority}`} 
              sx={{
                bgcolor: activeMerchant.priority === "HIGH" 
                  ? "#fef2f2" 
                  : activeMerchant.priority === "MED"
                    ? "#fef9c3"
                    : "#f0fdf4",
                color: activeMerchant.priority === "HIGH" 
                  ? "#dc2626" 
                  : activeMerchant.priority === "MED"
                    ? "#a16207"
                    : "#16a34a",
                border: activeMerchant.priority === "HIGH" 
                  ? "1px solid rgba(220, 38, 38, 0.2)" 
                  : activeMerchant.priority === "MED"
                    ? "1px solid rgba(161, 98, 7, 0.2)"
                    : "1px solid rgba(22, 163, 74, 0.2)",
                fontWeight: 800,
                fontSize: "11px",
                borderRadius: "8px",
                height: "36px",
              }}
            />
            <Button 
              variant="outlined" 
              onClick={() => triggerToast(`❌ Action for ${activeMerchant.name} has been discarded.`)}
              sx={{
                borderColor: "divider",
                color: "text.secondary",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "12px",
                px: 2,
                py: 0.8,
                whiteSpace: "nowrap",
                "&:hover": {
                  borderColor: "text.primary",
                  bgcolor: "action.hover"
                }
              }}
            >
              Discard Action
            </Button>
            <Button 
              variant="contained" 
              onClick={() => triggerToast(`💼 Initiated field visit logs for ${activeMerchant.name}`)}
              sx={{
                bgcolor: "#1a237e",
                color: "white",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "12px",
                px: 2.5,
                py: 0.8,
                whiteSpace: "nowrap",
                "&:hover": {
                  bgcolor: "#0d1b4b"
                }
              }}
            >
              Start Visit
            </Button>
          </div>
        </div>

        {/* Progress Stepper */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm overflow-x-auto">
          <Stepper 
            activeStep={1} 
            alternativeLabel
            sx={{
              "& .MuiStepConnector-line": {
                borderColor: "#1a237e",
                borderTopWidth: 2,
              },
              "& .MuiStepIcon-root.Mui-active": {
                color: "#1a237e",
              },
              "& .MuiStepIcon-root.Mui-completed": {
                color: "#1a237e",
              }
            }}
          >
            <Step completed>
              <StepLabel>Pending</StepLabel>
            </Step>
            <Step active>
              <StepLabel>In Progress</StepLabel>
            </Step>
            <Step>
              <StepLabel>Action Taken</StepLabel>
            </Step>
            <Step>
              <StepLabel>Deferred</StepLabel>
            </Step>
            <Step>
              <StepLabel>Verified</StepLabel>
            </Step>
          </Stepper>
        </div>

        {/* AI Explained Card */}
        <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary-container/5 p-lg space-y-5">
          {/* Top-left small badge: aligned with horizontal divider line */}
          <div className="flex items-center gap-4 w-full mb-1">
            <span className="bg-[#000666] text-white text-[9px] font-black px-3.5 py-1.5 rounded-md tracking-widest uppercase block shrink-0">
              AI EXPLAINED
            </span>
            <div className="flex-grow h-px bg-[rgba(0,6,102,0.15)]" />
          </div>

          <h3 className="text-primary font-headline-sm text-headline-sm mb-4">
            Why this recommendation?
          </h3>

          {/* Reason Rows inside card */}
          <div className="space-y-4 pt-1">
            {activeMerchant.reasons.map((reason, idx) => {
              const isSecondReason = idx === 1
              const boxClass = isSecondReason
                ? "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm text-secondary"
                : "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm text-primary"
              
              const titleClass = isSecondReason
                ? "font-extrabold text-sm text-secondary"
                : "font-extrabold text-sm text-primary"

              return (
                <div key={idx} className="flex gap-2 items-start text-xs  pb-2 last:border-0 last:pb-0">
                  <div className={boxClass}>
                    {reason.icon}
                  </div>
                  <div>
                    <h4 className={titleClass}>{reason.title}</h4>
                    <p className="text-gray-500 font-semibold leading-relaxed mt-1">{reason.body}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Confidence Score progress bar */}
          <div className="pt-4 border-t border-[rgba(0,6,102,0.15)] space-y-2">
            <div className="flex justify-between items-center text-xs font-black text-[#000666]">
              <span className="uppercase tracking-widest text-[10px]">Confidence Score</span>
              <span>{activeMerchant.confidence}%</span>
            </div>
            <LinearProgress 
              variant="determinate" 
              value={activeMerchant.confidence} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                bgcolor: "rgba(26, 35, 126, 0.08)",
                "& .MuiLinearProgress-bar": {
                  bgcolor: "#000666"
                }
              }} 
            />
          </div>
        </section>

        {/* Recommended Talking Points Card */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-gray-400">
            <ChatIcon className="w-5 h-5 text-gray-400 shrink-0" />
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">
              RECOMMENDED TALKING POINTS
            </span>
          </div>

          <div className="space-y-3.5">
            {activeMerchant.points.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="bg-[#000B73] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-gray-600 font-semibold italic leading-relaxed">
                  "{point}"
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ================= RIGHT COLUMN — LOG VISIT OUTCOME ================= */}
      <div className="w-full xl:w-[280px] shrink-0 space-y-6 xl:sticky xl:top-20">
        
        {/* Main Logging Card */}
        <section className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900 leading-none">Log Visit Outcome</h2>
          
          {/* Outcome Status Select */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
              Outcome Status
            </label>
            <FormControl fullWidth size="small">
              <Select
                id="outcome-select"
                value={outcomeStatus}
                onChange={(e) => setOutcomeStatus(e.target.value)}
                displayEmpty
                sx={{
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 700,
                  "& .MuiSelect-select": {
                    py: 1.2
                  }
                }}
              >
                <MenuItem value="" disabled>Select an outcome</MenuItem>
                <MenuItem value="pending">Visit Pending / Rescheduled</MenuItem>
                <MenuItem value="completed">Upgraded to SoundPay Plus</MenuItem>
                <MenuItem value="deferred">Deferred / Objections Unresolved</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Visit Notes TextField */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
              Visit Notes
            </label>
            <TextField
              id="visit-notes"
              multiline
              rows={4}
              placeholder="Mention specific owner objections or merchant sentiment..."
              fullWidth
              variant="outlined"
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  fontSize: "12px"
                }
              }}
            />
          </div>

          {/* Upload Proof / Photo Box */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
              Upload Proof / Photo
            </label>
            <div 
              onClick={handleFileUploadClick}
              className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:bg-gray-50/50 hover:border-[#1a237e] transition-all space-y-2 bg-gray-50/30"
            >
              <CameraAltOutlinedIcon className="w-8 h-8 text-gray-400 mx-auto" />
              <p className="text-[11px] font-bold text-gray-500">
                {uploadedFileName ? "📄 " + uploadedFileName : "Tap to upload file"}
              </p>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*,application/pdf"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            variant="contained" 
            fullWidth
            onClick={handleSubmitVisitOutcome}
            sx={{
              bgcolor: "#1a237e",
              color: "white",
              borderRadius: "8px",
              py: 1.2,
              textTransform: "none",
              fontWeight: 700,
              fontSize: "12px",
              "&:hover": {
                bgcolor: "#0d1b4b"
              }
            }}
          >
            Submit for Verification
          </Button>

          {/* Manager Verification Panel */}
          <div className="pt-4 border-t border-gray-50 space-y-2.5">
            <div className="flex items-center gap-1.5 text-gray-400 leading-none">
              <LockOutlinedIcon className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-[9px] font-black uppercase tracking-widest leading-none">
                MANAGER VERIFICATION
              </span>
            </div>
            
            <div className="bg-gray-50/70 border border-gray-150 p-4 rounded-xl text-center space-y-1.5">
              <LockOutlinedIcon className="w-6 h-6 text-gray-400/80 mx-auto" />
              <p className="text-[10px] font-bold text-gray-400/90 leading-relaxed">
                Verification will be available after DSP submission
              </p>
            </div>
          </div>
        </section>

        {/* Merchant Location Card */}
        <section className="bg-slate-900 text-white rounded-2xl h-44 relative overflow-hidden shadow-sm flex flex-col justify-end p-4">
          {/* CSS-based Mock GPS Radar Grid Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/90 to-slate-900 pointer-events-none" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          {/* Pulse Signal Points */}
          <div className="absolute top-[40%] left-[30%] w-3 h-3 bg-emerald-400 rounded-full animate-ping pointer-events-none" />
          <div className="absolute top-[40%] left-[30%] w-2 h-2 bg-emerald-500 rounded-full border border-white pointer-events-none" />
          
          <div className="absolute top-[65%] left-[70%] w-3.5 h-3.5 bg-blue-400 rounded-full animate-ping pointer-events-none" />
          <div className="absolute top-[65%] left-[70%] w-2 h-2 bg-blue-500 rounded-full border border-white pointer-events-none" />

          {/* Map Overlay Text */}
          <div className="relative z-10 flex gap-2 items-start">
            <MapIcon className="w-5 h-5 text-blue-200 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-black tracking-tight text-white leading-tight">
                Merchant Location
              </p>
              <p className="text-[10px] text-blue-200 mt-1 font-semibold">
                {activeMerchant.address}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
