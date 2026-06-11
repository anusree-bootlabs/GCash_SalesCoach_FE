import React, { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

import Layout from "./layout";
import { useAuth } from "./context/AuthContext";

// Gateways & Login Pages
import LoginChoice from "./components/pages/LoginChoice";
import LoginPage from "./components/pages/LoginPage";

// Protected Route Guard
function ProtectedRoute({ allowedRoles }) {
    const { token, role, loading } = useAuth();

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    bgcolor: "#f8fafc"
                }}
            >
                <CircularProgress color="primary" />
            </Box>
        );
    }

    if (!token || role === "guest") {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        // Redirect to their default portal page if they have wrong roles for namespace
        if (role === "manager") return <Navigate to="/manager/dashboard" replace />;
        if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}

export default function AppRoutes() {
    const { language, setLanguage } = useAuth();

    return (
        <Routes>
            {/* Public Entry Gateway Options */}
            <Route path="/" element={<LoginChoice />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/manager/login" element={<LoginPage />} />

            {/* DSP / Field Representative Protected Namespace */}
            <Route element={<ProtectedRoute allowedRoles={["dsp", "admin"]} />}>
                <Route path="/dashboard" element={<Layout language={language} setLanguage={setLanguage} selectedTab="dashboard" />} />
                <Route path="/action-center" element={<Layout language={language} setLanguage={setLanguage} selectedTab="action-center" />} />
                <Route path="/performance" element={<Layout language={language} setLanguage={setLanguage} selectedTab="performance" />} />
            </Route>

            {/* Manager Operations Protected Namespace */}
            <Route element={<ProtectedRoute allowedRoles={["manager", "admin"]} />}>
                <Route path="/manager/dashboard" element={<Layout language={language} setLanguage={setLanguage} selectedTab="dashboard" />} />
                <Route path="/manager/merchants" element={<Layout language={language} setLanguage={setLanguage} selectedTab="merchants" />} />
                <Route path="/manager/performance" element={<Layout language={language} setLanguage={setLanguage} selectedTab="performance" />} />
                <Route path="/manager/territory" element={<Layout language={language} setLanguage={setLanguage} selectedTab="territory" />} />
                <Route path="/manager/insights" element={<Layout language={language} setLanguage={setLanguage} selectedTab="insights" />} />
            </Route>

            {/* Admin Console Protected Namespace */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/admin/dashboard" element={<Layout language={language} setLanguage={setLanguage} selectedTab="dashboard" />} />
                <Route path="/admin/panel" element={<Layout language={language} setLanguage={setLanguage} selectedTab="admin-panel" />} />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
