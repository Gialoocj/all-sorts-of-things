import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import en from "../locales/en/translation.json";
import vi from "../locales/vi/translation.json";
import kr from "../locales/kr/translation.json";
import jp from "../locales/jp/translation.json";
// import EN from "../locales/en/translation.json";

// Initialize i18n
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    vi: {
      translation: vi,
    },
    kr: {
      translation: kr,
    },
    jp: {
      translation: jp,
    },
  },
  lng: "en", // default language
  fallbackLng: "en", // fallback language
  interpolation: {
    escapeValue: false, // React already safes from xss
  },
});

export default i18n;
