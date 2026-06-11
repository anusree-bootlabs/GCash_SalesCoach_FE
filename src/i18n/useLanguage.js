import { translations } from "./translation.js";

export const useLanguage = (lang = "en") => {
    const t = (key) => {
        return translations[lang]?.[key] || key;
    };

    return { t };
};