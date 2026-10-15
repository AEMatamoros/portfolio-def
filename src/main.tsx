import App from "@/app/App";
import { AppProviders } from "@/app/AppProviders";
import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import init from "@/i18n/init";

import { createRoot } from "react-dom/client";
import { initReactI18next, I18nextProvider } from "react-i18next";

import "@/index.css";

const i18nInstance = i18n.createInstance();
i18nInstance.use(detector).use(initReactI18next).init(init);

createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18nInstance}>
    <AppProviders>
      <App />
    </AppProviders>
  </I18nextProvider>,
);
