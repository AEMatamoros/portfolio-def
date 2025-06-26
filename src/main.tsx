import App from "@/App.tsx";
import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import init from "@/i18n/init";

import { createRoot } from "react-dom/client";
import { initReactI18next, I18nextProvider } from "react-i18next";

import "@/index.css";
import SplashScreen from "@Components/ui/SplashScreen";

const i18nInstance = i18n.createInstance();
i18nInstance.use(HttpApi).use(detector).use(initReactI18next).init(init);

createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18nInstance}>
    <SplashScreen />
    <App />
  </I18nextProvider>
);
