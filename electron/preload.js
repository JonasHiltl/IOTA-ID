const {
  contextBridge,
  ipcRenderer
} = require("electron");
const backend = require("i18next-electron-fs-backend");
const LanguageDetector = require('i18next-electron-language-detector');
const i18n = require('i18next');

contextBridge.exposeInMainWorld(
  "api", {
      i18nextElectronBackend: backend.preloadBindings(ipcRenderer)
  }
);

i18n.use(LanguageDetector)