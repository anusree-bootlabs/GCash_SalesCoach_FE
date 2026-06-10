import DashboardIcon from "@mui/icons-material/Dashboard";
import StorefrontIcon from "@mui/icons-material/Storefront";
import BoltIcon from "@mui/icons-material/Bolt";
import TimelineIcon from "@mui/icons-material/Timeline";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AppShell from "./components/layout/appShell.jsx";
// import useLanguage from "../src/i18n/useLanguage.js";

const sidebarItems = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: <DashboardIcon />,
    },
    {
        id: "merchants",
        label: "Merchants",
        icon: <StorefrontIcon />,
    },
    {
        id: "action-center",
        label: "Action Center",
        icon: <BoltIcon />,
    },
    {
        id: "performance",
        label: "Performance",
        icon: <TimelineIcon />,
    },
    {
        id: "territory",
        label: "Territory",
        icon: <MapOutlinedIcon />,
    },
    {
        id: "insights",
        label: "AI Insights",
        icon: <AutoAwesomeIcon />,
    },
];

export default function Layout({ language, setLanguage }) {
    // const { t } = useLanguage(language);

    return (
        <AppShell
            sidebarItems={sidebarItems}
            breadcrumbs={["Home", "Dashboard"]}
        >
            {/* Page Content */}
            <div>Your Page Content</div>
        </AppShell>
    );
}