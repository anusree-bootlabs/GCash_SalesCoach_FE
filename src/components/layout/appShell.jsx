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
} from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
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

export default function AppShell({ children,   sidebarItems = [], breadcrumbs = [], language, setLanguage,}) {
    const [selectedItem, setSelectedItem] = useState(sidebarItems?.[0]?.id);
    // const { t } = useLanguage(language);

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
            {/* Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
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
                <Box sx={{ p: 3 }}>
                    <Logo />
                </Box>

                <List sx={{ px: 2 }}>
                    {sidebarItems.map((item) => (
                        <ListItemButton
                            key={item.id}
                            selected={selectedItem === item.id}
                            onClick={() => setSelectedItem(item.id)}
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
            </Drawer>

            {/* Main Area */}
            <Box sx={{ flexGrow: 1 }}>
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
                        }}
                    >
                        {/* Breadcrumbs */}
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

                        {/* Right Side */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <IconButton>
                                <NotificationsNoneOutlinedIcon />
                            </IconButton>

                            <FormControl size="small">
                                <Select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    sx={{
                                        minWidth: 130,
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
                                sx={{ height: 30 }}
                            />

                            <Avatar
                                src="https://i.pravatar.cc/100"
                                sx={{ width: 36, height: 36 }}
                            />
                        </Box>
                    </Toolbar>
                </AppBar>

                <Box sx={{ p: 3 }}>{children}</Box>
            </Box>
        </Box>
    );
}