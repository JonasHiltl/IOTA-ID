import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import backend from "i18next-electron-fs-backend";

// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

const Languages = ['en', 'de']

i18n
  .use(backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "./public/locales/{{lng}}/{{ns}}.json",
      addPath: "./public/locales/{{lng}}/{{ns}}.missing.json",
      ipcRenderer: window.api.i18nextElectronBackend // important!
    },

    // other options you might configure
    debug: true,
    saveMissing: true,
    saveMissingTo: "current",
    whitelist: Languages,
    fallbackLng: 'en'
  });
  

export default i18n;