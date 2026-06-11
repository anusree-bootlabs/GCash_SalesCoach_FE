import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",

        primary: {
            main: "#000666",
            contrastText: "#ffffff",
        },

        secondary: { 
            main: "#006c49",
            contrastText: "#ffffff",
        },

        error: {
            main: "#ba1a1a",
        },

        background: {
            default: "#f8f9fa",
            paper: "#ffffff",
        },

        text: {
            primary: "#0a2022",
            secondary: "#454652",
        },

        success: {
            main: "#006c49",
        },

        warning: {
            main: "#d48700",
        },
    },

    typography: {
        fontFamily: "Inter, sans-serif",

        h1: {
            fontFamily: "Plus Jakarta Sans",
            fontSize: "36px",
            fontWeight: 700,
            lineHeight: "44px",
        },

        h2: {
            fontFamily: "Plus Jakarta Sans",
            fontSize: "24px",
            fontWeight: 600,
            lineHeight: "32px",
        },

        h3: {
            fontFamily: "Plus Jakarta Sans",
            fontSize: "20px",
            fontWeight: 600,
            lineHeight: "28px",
        },

        body1: {
            fontSize: "16px",
            lineHeight: "24px",
        },

        body2: {
            fontSize: "14px",
            lineHeight: "20px",
        },

        caption: {
            fontSize: "12px",
            lineHeight: "16px",
            letterSpacing: "0.05em",
        },
    },

    shape: {
        borderRadius: 8,
    },

    spacing: 8,

    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    background: "#ffffff",
                    boxShadow:
                        "0px 2px 4px rgba(26,35,126,0.04), 0px 8px 16px rgba(26,35,126,0.08)",
                    borderRadius: 8,
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    textTransform: "none",
                    fontWeight: 600,
                },
            },
        },

        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 8,
                    },
                },
            },
        },
    },
});

export default theme;