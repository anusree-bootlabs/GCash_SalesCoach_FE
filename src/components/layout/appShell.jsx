import React, { useState } from "react";
import {
    AppBar,
    Avatar,
    Box,
    Breadcrumbs,
    Divider,
    Drawer,
    FormControl,
    Link,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    Toolbar,
    Typography,
    IconButton,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MenuIcon from "@mui/icons-material/Menu";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../i18n/useLanguage.js";


const drawerWidth = 240;

const Logo = () => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="24" height="24" rx="6" fill="#1a237e" />
            <path
                d="M7 14V17H10V14H7ZM7 10V13H10V10H7ZM11 14V17H14V14H11ZM11 10V13H14V10H11ZM15 14V17H18V14H15ZM15 10V13H18V10H15ZM7 6V9H18V6H7Z"
                fill="white"
            />
        </svg>

        <Box>
            <Typography
                variant="subtitle2"
                sx={{
                    fontWeight: 700,
                    color: "#1a237e",
                    lineHeight: 1.1,
                }}
            >
                GCash Coach
            </Typography>

            <Typography
                variant="caption"
                sx={{
                    color: "text.secondary",
                    fontSize: "10px",
                    letterSpacing: 0.5,
                }}
            >
                SALES & PERFORMANCE
            </Typography>
        </Box>
    </Box>
);

export default function AppShell({
    children,
    sidebarItems = [],
    breadcrumbs = [],
    language = "en",
    setLanguage,
    selectedItem,
    onSelectItem
}) {
    const { role, user, setRole, logout } = useAuth();
    const navigate = useNavigate();
    const { t } = useLanguage(language);
    const [internalSelected, setInternalSelected] = useState(sidebarItems?.[0]?.id);
    const [mobileOpen, setMobileOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const activeItem = selectedItem !== undefined ? selectedItem : internalSelected;
    
    const handleSelect = (id) => {
        if (onSelectItem) {
            onSelectItem(id);
        } else {
            setInternalSelected(id);
        }
    };

    const handleRoleChange = (newRole) => {
        setRole(newRole);
        if (newRole === "manager") {
            navigate("/manager/dashboard");
        } else if (newRole === "admin") {
            navigate("/admin/dashboard");
        } else {
            navigate("/dashboard");
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const renderDrawer = () => (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Box sx={{ p: 3 }}>
                <Logo />
            </Box>

            <List sx={{ px: 2 }}>
                {sidebarItems.map((item) => (
                    <ListItemButton
                        key={item.id}
                        selected={activeItem === item.id}
                        onClick={() => {
                            handleSelect(item.id);
                            if (isMobile) {
                                setMobileOpen(false);
                            }
                        }}
                        sx={{
                            mb: 1,
                            borderRadius: 2,
                            minHeight: 48,

                            "&.Mui-selected": {
                                bgcolor: "#1a237e",
                                color: "#fff",
                            },

                            "&.Mui-selected .MuiListItemIcon-root": {
                                color: "#fff",
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 36,
                                color:
                                    activeItem === item.id
                                        ? "#fff"
                                        : "text.secondary",
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>

                        <ListItemText primary={item.label} />
                    </ListItemButton>
                ))}
            </List>

            <Box sx={{ flexGrow: 1 }} />

            <Divider />

            <List sx={{ p: 2 }}>
                <ListItemButton sx={{ borderRadius: 2 }}>
                    <ListItemText primary={t("settings")} />
                </ListItemButton>

                <ListItemButton sx={{ borderRadius: 2 }}>
                    <ListItemText primary={t("support")} />
                </ListItemButton>

                <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, color: "#ba1a1a" }}>
                    <ListItemIcon sx={{ minWidth: 36, color: "#ba1a1a" }}>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary={t("logout")} />
                </ListItemButton>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
            {/* Sidebar for Mobile */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        borderRight: "1px solid #e5e7eb",
                        bgcolor: "#fff",
                    },
                }}
            >
                {renderDrawer()}
            </Drawer>

            {/* Sidebar for Desktop */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", md: "block" },
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        borderRight: "1px solid #e5e7eb",
                        bgcolor: "#fff",
                    },
                }}
            >
                {renderDrawer()}
            </Drawer>

            {/* Main Area */}
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>

                <AppBar
                    position="static"
                    elevation={0}
                    color="inherit"
                    sx={{
                        bgcolor: "#fff",
                        borderBottom: "1px solid #e5e7eb",
                    }}
                >
                    <Toolbar
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            px: { xs: 1.5, sm: 2 },
                        }}
                    >
                        {/* Left Side: Mobile Hamburger Menu & Breadcrumbs/Title */}
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 1, display: { md: "none" } }}
                            >
                                <MenuIcon />
                            </IconButton>

                            {/* Breadcrumbs for larger screens */}
                            <Box sx={{ display: { xs: "none", sm: "block" } }}>
                                <Breadcrumbs>
                                    {breadcrumbs.map((item, index) => (
                                        <Link
                                            key={index}
                                            underline="hover"
                                            color={
                                                index === breadcrumbs.length - 1
                                                    ? "text.primary"
                                                    : "inherit"
                                            }
                                        >
                                            {item}
                                        </Link>
                                    ))}
                                </Breadcrumbs>
                            </Box>

                            {/* Simple Title for mobile screens */}
                            <Box sx={{ display: { xs: "flex", sm: "none" }, alignItems: "center" }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#1a237e" }}>
                                    Sales Coach
                                </Typography>
                            </Box>
                        </Box>

                        {/* Right Side Controls */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: { xs: 1, sm: 2 },
                            }}
                        >

                            {/* Role Switcher Selector */}
                            <FormControl size="small" sx={{ minWidth: 140 }}>
                                <Select
                                    value={role}
                                    onChange={(e) => handleRoleChange(e.target.value)}
                                    sx={{
                                        height: 38,
                                        bgcolor: "#f1f5f9",
                                        borderRadius: 2,
                                        fontWeight: 600,
                                        fontSize: 13,
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            border: "none"
                                        }
                                    }}
                                >
                                    <MenuItem value="dsp">DSP Agent</MenuItem>
                                    <MenuItem value="manager">Manager</MenuItem>
                                    <MenuItem value="admin">Administrator</MenuItem>
                                </Select>
                            </FormControl>


                            {/* Language Selector */}
                            <FormControl size="small">
                                <Select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    sx={{
                                        minWidth: 100,
                                        height: 38,
                                        borderRadius: 2,
                                        fontSize: 13

                                    }}
                                >
                                    <MenuItem value="en">English</MenuItem>
                                    <MenuItem value="ph">Philippine</MenuItem>
                                </Select>
                            </FormControl>

                            <IconButton sx={{ bgcolor: "#f8fafc", p: 1 }}>
                                <NotificationsNoneOutlinedIcon />
                            </IconButton>

                            {/* Vertical Divider */}
                            <Divider
                                orientation="vertical"
                                flexItem
                                sx={{ height: 30, my: "auto" }}
                            />

                            {/* User details & Avatar */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                <Box sx={{ display: { xs: "none", md: "block" }, textAlign: "right" }}>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary", lineHeight: 1.1 }}>
                                        {user?.name}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: "text.secondary", fontSize: 10 }}>
                                        {user?.roleName}
                                    </Typography>
                                </Box>
                                <Avatar
                                    src={user?.avatar}
                                    sx={{ width: 38, height: 38, border: "2px solid #e5e7eb" }}
                                />
                            </Box>

                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Subpage Content */}
                <Box sx={{ p: 3, flexGrow: 1 }}>{children}</Box>

            </Box>
        </Box>
    );
}