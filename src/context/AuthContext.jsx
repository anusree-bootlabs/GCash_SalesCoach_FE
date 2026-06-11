import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const ROLE_PERMISSIONS = {
    dsp: ["view:dashboard", "view:action_center", "view:performance"],
    manager: ["view:dashboard", "view:merchants", "view:performance", "view:territory", "view:insights"],
    admin: [
        "view:dashboard",
        "view:merchants",
        "view:action_center",
        "view:performance",
        "view:territory",
        "view:insights",
        "view:admin_panel"
    ]
};

const USER_PROFILES = {
    dsp: {
        name: "Juan Dela Cruz",
        email: "juan.dc@gcash.com",
        roleName: "DSP Field Agent",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
    },
    manager: {
        name: "Maria Santos",
        email: "maria.santos@gcash.com",
        roleName: "Sales Coach Manager",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    admin: {
        name: "Alex Rivera",
        email: "alex.rivera@gcash.com",
        roleName: "System Administrator",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&crop=face"
    }
};

// Helper: base64 encoding (matching JWT output)
const base64Encode = (obj) => {
    try {
        const json = JSON.stringify(obj);
        return btoa(unescape(encodeURIComponent(json)));
    } catch (e) {
        return "";
    }
};

// Helper: base64 decoding (decodes JWT payload)
const decodeJWT = (token) => {
    try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;
        const payloadBase64 = parts[1];
        const json = decodeURIComponent(escape(atob(payloadBase64)));
        return JSON.parse(json);
    } catch (e) {
        console.error("JWT decoding failed:", e);
        return null;
    }
};

// Helper: mock JWT signature generator
const generateMockJWT = (payload) => {
    const header = { alg: "HS256", typ: "JWT" };
    const encodedHeader = base64Encode(header);
    const encodedPayload = base64Encode(payload);
    const signature = "mock_signature_hash_value_123456789";
    return `${encodedHeader}.${encodedPayload}.${signature}`;
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        return localStorage.getItem("gcash_salescoach_token") || null;
    });

    const [role, setRoleState] = useState("guest");
    const [user, setUser] = useState(null);
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState("en");

    // Initial Token Sync & Load
    useEffect(() => {
        if (token) {
            const claims = decodeJWT(token);
            if (claims && claims.exp * 1000 > Date.now()) {
                setRoleState(claims.role);
                setUser({
                    name: claims.name,
                    email: claims.email,
                    roleName: USER_PROFILES[claims.role]?.roleName || claims.role,
                    avatar: claims.avatar
                });
                setPermissions(ROLE_PERMISSIONS[claims.role] || []);
            } else {
                // Token expired
                logout();
            }
        } else {
            setRoleState("guest");
            setUser(null);
            setPermissions([]);
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password, selectedRole) => {
        // Simulate backend api response delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (!email || !password) {
            throw new Error("Credentials cannot be blank");
        }

        const profile = USER_PROFILES[selectedRole];
        if (!profile) {
            throw new Error("Invalid selection role");
        }

        const claims = {
            sub: selectedRole === "admin" ? "admin_1" : selectedRole === "manager" ? "manager_2" : "dsp_3",
            email: email,
            role: selectedRole,
            name: profile.name,
            avatar: profile.avatar,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 24 Hours
        };

        const generatedToken = generateMockJWT(claims);
        localStorage.setItem("gcash_salescoach_token", generatedToken);
        setToken(generatedToken);
        
        return claims;
    };

    const logout = () => {
        localStorage.removeItem("gcash_salescoach_token");
        setToken(null);
        setRoleState("guest");
        setUser(null);
        setPermissions([]);
        setLanguage("en"); // Reset language back to English by default on logout
    };

    const hasPermission = (permission) => {
        return permissions.includes(permission);
    };

    return (
        <AuthContext.Provider value={{ token, role, user, permissions, login, logout, hasPermission, loading, language, setLanguage }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
