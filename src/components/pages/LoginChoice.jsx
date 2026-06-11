import React from "react";
import { Box, Card, CardContent, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SecurityIcon from "@mui/icons-material/Security";

export default function LoginChoice() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#f4f6fc",
                backgroundImage: "radial-gradient(#e2e8f0 1.5px, transparent 1.5px)",
                backgroundSize: "24px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
                boxSizing: "border-box"
            }}
        >
            {/* Outer Frame to match premium app aesthetics */}
            <Box
                sx={{
                    position: "absolute",
                    top: 16,
                    bottom: 16,
                    left: 16,
                    right: 16,
                    border: "3px solid #818cf8",
                    borderRadius: 4,
                    pointerEvents: "none",
                    opacity: 0.3,
                    zIndex: 1
                }}
            />

            <Card
                elevation={0}
                sx={{
                    maxWidth: 480,
                    width: "100%",
                    borderRadius: 4,
                    boxShadow: "0px 10px 30px rgba(26, 35, 126, 0.05), 0px 30px 60px rgba(26, 35, 126, 0.08)",
                    border: "1px solid #e2e8f0",
                    position: "relative",
                    zIndex: 2,
                    overflow: "hidden"
                }}
            >
                {/* Visual Accent Bar */}
                <Box sx={{ height: 6, bggradient: "linear-gradient(90deg, #1a237e 0%, #3f51b5 100%)", bgcolor: "#1a237e" }} />
                
                <CardContent sx={{ p: 5, textAlign: "center" }}>
                    {/* Brand Logo Header */}
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                        <Box
                            sx={{
                                width: 56,
                                height: 56,
                                bgcolor: "#000666",
                                borderRadius: 3,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 8px 16px rgba(0, 6, 102, 0.2)"
                            }}
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" rx="6" fill="#000666" />
                                <path d="M7 14V17H10V14H7ZM7 10V13H10V10H7ZM11 14V17H14V14H11ZM11 10V13H14V10H11ZM15 14V17H18V14H15ZM15 10V13H18V10H15ZM7 6V9H18V6H7Z" fill="white" />
                            </svg>
                        </Box>
                    </Box>

                    <Typography variant="h5" sx={{ fontWeight: 800, color: "#000666", mb: 0.5, fontFamily: "Plus Jakarta Sans" }}>
                        Sales Coach AI
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4, letterSpacing: 0.2 }}>
                        AI-Powered Sales Intelligence
                    </Typography>

                    <Typography variant="body1" sx={{ fontWeight: 600, color: "text.primary", mb: 3 }}>
                        Choose Your Gateway Portal
                    </Typography>

                    {/* Choice Action Buttons */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                        <Paper
                            onClick={() => navigate("/login")}
                            elevation={0}
                            sx={{
                                p: 2.5,
                                border: "1px solid #e2e8f0",
                                borderRadius: 3,
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                    borderColor: "#1a237e",
                                    bgcolor: "#fcfcff",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 6px 16px rgba(26, 35, 126, 0.04)"
                                }
                            }}
                        >
                            <Box sx={{ p: 1, bgcolor: "#e0f2fe", color: "#0284c7", borderRadius: 2, display: "flex" }}>
                                <DirectionsRunIcon />
                            </Box>
                            <Box sx={{ textAlign: "left" }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1a237e" }}>
                                    DSP Agent Portal
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Login to access tasks, route optimization and stats.
                                </Typography>
                            </Box>
                        </Paper>

                        <Paper
                            onClick={() => navigate("/manager/login")}
                            elevation={0}
                            sx={{
                                p: 2.5,
                                border: "1px solid #e2e8f0",
                                borderRadius: 3,
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                    borderColor: "#006c49",
                                    bgcolor: "#fbfdfc",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 6px 16px rgba(0, 108, 73, 0.04)"
                                }
                            }}
                        >
                            <Box sx={{ p: 1, bgcolor: "#dcfce7", color: "#15803d", borderRadius: 2, display: "flex" }}>
                                <SupervisorAccountIcon />
                            </Box>
                            <Box sx={{ textAlign: "left" }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1a237e" }}>
                                    Manager Operations Portal
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Access team leaderboards, AI recommendations and merchants.
                                </Typography>
                            </Box>
                        </Paper>

                        <Paper
                            onClick={() => navigate("/login?role=admin")}
                            elevation={0}
                            sx={{
                                p: 2,
                                border: "1px solid #e2e8f0",
                                borderRadius: 3,
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                opacity: 0.8,
                                "&:hover": {
                                    opacity: 1,
                                    borderColor: "#ba1a1a",
                                    bgcolor: "#fffbfa",
                                    transform: "translateY(-2px)"
                                }
                            }}
                        >
                            <Box sx={{ p: 1, bgcolor: "#fee2e2", color: "#b91c1c", borderRadius: 2, display: "flex" }}>
                                <SecurityIcon />
                            </Box>
                            <Box sx={{ textAlign: "left" }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1a237e" }}>
                                    System Administrator
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>

                    {/* Bottom compliance label */}
                    <Box sx={{ mt: 5, color: "text.secondary", fontSize: 11 }}>
                        PCI-DSS Compliant • Enterprise Secure Gateway
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
