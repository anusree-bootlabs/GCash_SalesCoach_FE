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
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MenuIcon from "@mui/icons-material/Menu";
// import useLanguage from "../../i18n/useLanguage.js";


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
                AI
            </Typography>

            <Typography
                variant="caption"
                sx={{
                    color: "text.secondary",
                    fontSize: "10px",
                    letterSpacing: 0.5,
                }}
            >
                GOVERNANCE & SECURITY
            </Typography>
        </Box>
    </Box>
);

export default function AppShell({ 
    children, 
    sidebarItems = [], 
    breadcrumbs = [], 
    language, 
    setLanguage,
    selectedItem: controlledSelectedItem,
    setSelectedItem: controlledSetSelectedItem
}) {
    const [localSelectedItem, setLocalSelectedItem] = useState(sidebarItems?.[0]?.id);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [mobileOpen, setMobileOpen] = useState(false);
    
    const selectedItem = controlledSelectedItem !== undefined ? controlledSelectedItem : localSelectedItem;
    const setSelectedItem = controlledSetSelectedItem !== undefined ? controlledSetSelectedItem : setLocalSelectedItem;
    // const { t } = useLanguage(language);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerContent = (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Box sx={{ p: 3 }}>
                <Logo />
            </Box>

            <List sx={{ px: 2 }}>
                {sidebarItems.map((item) => (
                    <ListItemButton
                        key={item.id}
                        selected={selectedItem === item.id}
                        onClick={() => {
                            setSelectedItem(item.id);
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
                                    selectedItem === item.id
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
                    <ListItemText primary={'Settings'} />
                </ListItemButton>

                <ListItemButton sx={{ borderRadius: 2 }}>
                    <ListItemText primary={"Support"} />
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
                {drawerContent}
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
                {drawerContent}
            </Drawer>

            {/* Main Area */}
            <Box sx={{ flexGrow: 1, width: "100%", overflowX: "hidden" }}>
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

                        {/* Right Side */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: { xs: 1, sm: 2 },
                            }}
                        >
                            <IconButton size="small">
                                <NotificationsNoneOutlinedIcon />
                            </IconButton>

                            <FormControl size="small">
                                <Select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    sx={{
                                        minWidth: { xs: 80, sm: 120 },
                                        fontSize: "12px",
                                    }}
                                >
                                    <MenuItem value="en">English</MenuItem>
                                    <MenuItem value="ph">Philippine</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Vertical Divider */}
                            <Divider
                                orientation="vertical"
                                flexItem
                                sx={{ height: 24, alignSelf: "center", display: { xs: "none", sm: "block" } }}
                            />

                            <Avatar
                                src="https://i.pravatar.cc/100"
                                sx={{ width: 32, height: 32 }}
                            />
                        </Box>
                    </Toolbar>
                </AppBar>

                <Box sx={{ p: { xs: 2, md: 3 } }}>{children}</Box>
            </Box>
        </Box>
    );
}