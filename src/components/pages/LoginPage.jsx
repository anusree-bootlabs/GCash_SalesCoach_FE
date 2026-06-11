import React, { useState, useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    Checkbox,
    FormControlLabel,
    Link,
    InputAdornment,
    IconButton,
    Alert,
    CircularProgress
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SecurityIcon from "@mui/icons-material/Security";
import ShieldIcon from "@mui/icons-material/Shield";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
    const { login, role: activeRole } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Determine target role from URL pathname or query params
    const isManagerPath = location.pathname.includes("/manager");
    const queryParams = new URLSearchParams(location.search);
    const isAdmin = queryParams.get("role") === "admin";
    
    const targetRole = isAdmin ? "admin" : isManagerPath ? "manager" : "dsp";

    // Prefills based on target role
    const getInitialEmail = () => {
        if (targetRole === "admin") return "admin@gcash.com";
        if (targetRole === "manager") return "sales.manager@gcash.com";
        return "sales.agent@gcash.com";
    };

    const [email, setEmail] = useState(getInitialEmail());
    const [password, setPassword] = useState("password123");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // Sync state if navigation changes prefill parameters
    useEffect(() => {
        setEmail(getInitialEmail());
        setErrorMsg("");
    }, [targetRole]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrorMsg("");

        try {
            const claims = await login(email, password, targetRole);
            
            // Redirect to appropriate dashboard based on claims role
            if (claims.role === "manager") {
                navigate("/manager/dashboard");
            } else if (claims.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/dashboard");
            }
        } catch (err) {
            setErrorMsg(err.message || "Authentication failed. Please verify credentials.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#f4f6fc",
                backgroundImage: "radial-gradient(#e2e8f0 1.5px, transparent 1.5px)",
                backgroundSize: "24px 24px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                boxSizing: "border-box"
            }}
        >
            {/* Outer Blue Border Wrap - exactly matches the screen capture frame */}
            <Box
                sx={{
                    position: "absolute",
                    top: 14,
                    bottom: 14,
                    left: 14,
                    right: 14,
                    border: "3px solid #818cf8",
                    borderRadius: 4,
                    pointerEvents: "none",
                    opacity: 0.4,
                    zIndex: 1
                }}
            />

            {/* Main Content Area */}
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 4,
                    zIndex: 2
                }}
            >
                {/* Header Logo & Title */}
                <Box sx={{ textAlign: "center", mb: 3.5 }}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                        {/* Custom Blue SVG Logo */}
                        <Box
                            sx={{
                                width: 44,
                                height: 44,
                                bgcolor: "#000666",
                                borderRadius: 2.5,
                                display: "flex",
                                alignItems: "center",
                                justifyItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 6px 12px rgba(0, 6, 102, 0.15)"
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" rx="6" fill="#000666" />
                                <path d="M7 14V17H10V14H7ZM7 10V13H10V10H7ZM11 14V17H14V14H11ZM11 10V13H14V10H11ZM15 14V17H18V14H15ZM15 10V13H18V10H15ZM7 6V9H18V6H7Z" fill="white" />
                            </svg>
                        </Box>
                        
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 800,
                                color: "#000666",
                                letterSpacing: "-0.5px",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "28px"
                            }}
                        >
                            Sales Coach AI
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500, letterSpacing: "0.2px" }}>
                        AI-Powered Sales Intelligence.
                    </Typography>
                </Box>

                {/* Login Card */}
                <Card
                    elevation={0}
                    sx={{
                        maxWidth: 410,
                        width: "100%",
                        borderRadius: 4,
                        boxShadow: "0px 10px 40px rgba(0, 6, 102, 0.04), 0px 24px 64px rgba(0, 6, 102, 0.06)",
                        border: "1px solid #e2e8f0",
                        mb: 4,
                        overflow: "hidden"
                    }}
                >
                    {/* Top Navy Bar Accent */}
                    <Box sx={{ height: 5, bgcolor: "#000666" }} />

                    <CardContent sx={{ p: 4 }}>
                        <form onSubmit={handleSubmit}>
                            {errorMsg && (
                                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                                    {errorMsg}
                                </Alert>
                            )}

                            {/* Username / Email Section */}
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        display: "block",
                                        fontWeight: 700,
                                        color: "#454652",
                                        mb: 1,
                                        fontSize: "11px",
                                        letterSpacing: "0.5px"
                                    }}
                                >
                                    EMAIL / USERNAME
                                </Typography>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    placeholder={getInitialEmail()}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            borderRadius: 2,
                                            height: 44,
                                            bgcolor: "#ffffff"
                                        }
                                    }}
                                />
                            </Box>

                            {/* Password Section */}
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        display: "block",
                                        fontWeight: 700,
                                        color: "#454652",
                                        mb: 1,
                                        fontSize: "11px",
                                        letterSpacing: "0.5px"
                                    }}
                                >
                                    PASSWORD
                                </Typography>
                                <TextField
                                    fullWidth
                                    type={showPassword ? "text" : "password"}
                                    variant="outlined"
                                    size="small"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                                                    {showPassword ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            borderRadius: 2,
                                            height: 44,
                                            bgcolor: "#ffffff"
                                        }
                                    }}
                                />
                            </Box>

                            {/* Remember me & Forgot Password */}
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            size="small"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: "text.secondary", fontSize: 13 }}>
                                            Remember me
                                        </Typography>
                                    }
                                />
                                <Link
                                    href="#"
                                    underline="hover"
                                    sx={{
                                        fontWeight: 700,
                                        color: "#000666",
                                        fontSize: 12,
                                        fontFamily: "Plus Jakarta Sans"
                                    }}
                                >
                                    Forgot Password?
                                </Link>
                            </Box>

                            {/* Submit Login Button */}
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={submitting}
                                endIcon={!submitting && <ArrowForwardIcon />}
                                sx={{
                                    bgcolor: "#000666",
                                    height: 44,
                                    borderRadius: 2.5,
                                    fontWeight: 700,
                                    fontSize: 14,
                                    textTransform: "none",
                                    boxShadow: "none",
                                    mb: 3,
                                    "&:hover": {
                                        bgcolor: "#000550",
                                        boxShadow: "none"
                                    }
                                }}
                            >
                                {submitting ? <CircularProgress size={20} color="inherit" /> : "Login"}
                            </Button>
                        </form>

                        {/* Security Insight Banner */}
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1.5,
                                p: 2,
                                bgcolor: "#e8edf7",
                                borderRadius: 3.5,
                                border: "1px solid rgba(26, 35, 126, 0.05)"
                            }}
                        >
                            <AutoAwesomeIcon sx={{ color: "#000666", fontSize: 18, mt: 0.2 }} />
                            <Box>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        display: "block",
                                        fontWeight: 800,
                                        color: "#000666",
                                        letterSpacing: "0.2px",
                                        fontSize: "10px",
                                        mb: 0.2
                                    }}
                                >
                                    SECURITY INSIGHT
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "11.5px", lineHeight: 1.45 }}>
                                    Biometric verification is available on the GCash mobile app for instant, passwordless access.
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

            {/* PCI / Enterprise Compliance Seals */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 3.5, opacity: 0.6, mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                    <ShieldIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography sx={{ fontSize: "10px", fontWeight: 700, color: "text.secondary", letterSpacing: "0.5px" }}>
                        PCI DSS COMPLIANT
                    </Typography>
                </Box>
                
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                    <CheckCircleIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography sx={{ fontSize: "10px", fontWeight: 700, color: "text.secondary", letterSpacing: "0.5px" }}>
                        ENTERPRISE SECURE
                    </Typography>
                </Box>
            </Box>
        </Box>

        {/* Global Fintech Footer Bar */}
        <Box
            sx={{
                bgcolor: "#ffffff",
                borderTop: "1px solid #e5e7eb",
                py: 2,
                px: 4,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                zIndex: 2
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CheckCircleIcon sx={{ fontSize: 16, color: "#006c49" }} />
                <Typography variant="caption" sx={{ fontWeight: 600, color: "text.secondary" }}>
                    Secure Fintech Authentication
                </Typography>
            </Box>

            {/* Links */}
            <Box sx={{ display: "flex", gap: 3 }}>
                <Link href="#" underline="hover" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>
                    Privacy Policy
                </Link>
                <Link href="#" underline="hover" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>
                    Terms of Service
                </Link>
                <Link href="#" underline="hover" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>
                    Support
                </Link>
            </Box>

            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>
                © 2024 GCash x Sales Coach AI
            </Typography>
        </Box>
    </Box>
    );
}
