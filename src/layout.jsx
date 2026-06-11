import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorefrontIcon from "@mui/icons-material/Storefront";
import BoltIcon from "@mui/icons-material/Bolt";
import TimelineIcon from "@mui/icons-material/Timeline";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Paper, Typography } from "@mui/material";

import AppShell from "./components/layout/appShell.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { useLanguage } from "./i18n/useLanguage.js";

const sidebarItems = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: <DashboardIcon />,
        permission: "view:dashboard"
    },
    {
        id: "merchants",
        label: "Merchants",
        icon: <StorefrontIcon />,
        permission: "view:merchants"
    },
    {
        id: "action-center",
        label: "Action Center",
        icon: <BoltIcon />,
        permission: "view:action_center"
    },
    {
        id: "performance",
        label: "Performance",
        icon: <TimelineIcon />,
        permission: "view:performance"
    },
    {
        id: "territory",
        label: "Territory",
        icon: <MapOutlinedIcon />,
        permission: "view:territory"
    },
    {
        id: "insights",
        label: "AI Insights",
        icon: <AutoAwesomeIcon />,
        permission: "view:insights"
    },
    {
        id: "admin-panel",
        label: "Admin Panel",
        icon: <AdminPanelSettingsIcon />,
        permission: "view:admin_panel"
    }
];

export default function Layout({ language, setLanguage, selectedTab = "dashboard" }) {
    const { hasPermission, role } = useAuth();
    const navigate = useNavigate();
    const { t } = useLanguage(language);

    // Map tab IDs to routes based on current role
    const getRouteForId = (id) => {
        if (role === "manager") {
            if (id === "dashboard") return "/manager/dashboard";
            if (id === "merchants") return "/manager/merchants";
            if (id === "performance") return "/manager/performance";
            if (id === "territory") return "/manager/territory";
            if (id === "insights") return "/manager/insights";
        }
        if (role === "admin") {
            if (id === "dashboard") return "/admin/dashboard";
            if (id === "admin-panel") return "/admin/panel";
        }
        // DSP / Default
        if (id === "dashboard") return "/dashboard";
        if (id === "action-center") return "/action-center";
        if (id === "performance") return "/performance";
        return "/dashboard";
    };

    const handleSelectTab = (id) => {
        const route = getRouteForId(id);
        navigate(route);
    };

    // Filtered sidebar items with translated labels
    const filteredSidebarItems = sidebarItems
        .filter(item => hasPermission(item.permission))
        .map(item => ({
            ...item,
            label: t(item.id)
        }));

    // Get current item metadata
    const activeItem = sidebarItems.find(item => item.id === selectedTab) || sidebarItems[0];

    return (
        <AppShell
            sidebarItems={filteredSidebarItems}
            breadcrumbs={[t("welcome"), t(activeItem?.id) || t("dashboard")]}
            language={language}
            setLanguage={setLanguage}
            selectedItem={selectedTab}
            onSelectItem={handleSelectTab}
        >
            <Paper elevation={0} sx={{ p: 4, border: "1px solid #e2e8f0", borderRadius: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, fontFamily: "Plus Jakarta Sans", color: "#000666" }}>
                    {t("success_title")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {t("success_msg")} <strong>{role.toUpperCase()}</strong>.
                </Typography>
            </Paper>
        </AppShell>
    );
}