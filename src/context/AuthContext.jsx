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

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState(() => {
        return localStorage.getItem("gcash_salescoach_username") || "";
    });
    const [password, setPassword] = useState(() => {
        return localStorage.getItem("gcash_salescoach_password") || "";
    });
    const [role, setRoleState] = useState("guest");
    const [user, setUser] = useState(null);
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState("en");

    // Sync state with localStorage on mount and when login state changes
    useEffect(() => {
        const storedUsername = localStorage.getItem("gcash_salescoach_username");
        const storedRole = localStorage.getItem("gcash_salescoach_role") || "guest";
        
        if (storedUsername && storedRole !== "guest") {
            setUsername(storedUsername);
            setRoleState(storedRole);
            const profile = USER_PROFILES[storedRole];
            setUser({
                name: profile?.name || storedUsername,
                email: storedUsername,
                roleName: profile?.roleName || storedRole,
                avatar: profile?.avatar || ""
            });
            setPermissions(ROLE_PERMISSIONS[storedRole] || []);
        } else {
            setUsername("");
            setPassword("");
            setRoleState("guest");
            setUser(null);
            setPermissions([]);
        }
        setLoading(false);
    }, [username]);

    const login = async (email, passwordVal, selectedRole) => {
        // Simulate backend api response delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (!email || !passwordVal) {
            throw new Error("Credentials cannot be blank");
        }

        const profile = USER_PROFILES[selectedRole];
        if (!profile) {
            throw new Error("Invalid selection role");
        }

        // Store credentials in localStorage
        localStorage.setItem("gcash_salescoach_username", email);
        localStorage.setItem("gcash_salescoach_password", passwordVal);
        localStorage.setItem("gcash_salescoach_role", selectedRole);

        setUsername(email);
        setPassword(passwordVal);
        setRoleState(selectedRole);
        setUser({
            name: profile.name,
            email: email,
            roleName: profile.roleName,
            avatar: profile.avatar
        });
        setPermissions(ROLE_PERMISSIONS[selectedRole] || []);

        return {
            email: email,
            role: selectedRole,
            name: profile.name,
            avatar: profile.avatar
        };
    };

    const logout = () => {
        localStorage.removeItem("gcash_salescoach_username");
        localStorage.removeItem("gcash_salescoach_password");
        localStorage.removeItem("gcash_salescoach_role");

        setUsername("");
        setPassword("");
        setRoleState("guest");
        setUser(null);
        setPermissions([]);
        setLanguage("en"); // Reset language back to English by default on logout
    };

    const hasPermission = (permission) => {
        return permissions.includes(permission);
    };

    const token = username || null;

    return (
        <AuthContext.Provider value={{ token, username, password, role, user, permissions, login, logout, hasPermission, loading, language, setLanguage }}>
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
