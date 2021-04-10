const {
  contextBridge,
  ipcRenderer
} = require("electron");
const backend = require("i18next-electron-fs-backend");
const { FETCH_DATA_FROM_STORAGE, SAVE_DATA_IN_STORAGE, REMOVE_DATA_FROM_STORAGE} = require("./utils/constants")


contextBridge.exposeInMainWorld(
  "api", {
      i18nextElectronBackend: backend.preloadBindings(ipcRenderer)
  }
);

// Ask main to load data from its persistent storage
export function loadSavedData() {
  ipcRenderer.send(FETCH_DATA_FROM_STORAGE, "items")
}

export function saveDataInStorage(item) {
  console.log("Renderer sending SAVE_DATA_IN_STORAGE")
  ipcRenderer.send(SAVE_DATA_IN_STORAGE, item)
}

function removeDataFromStorage(item) {
  console.log("Renderer sending: REMOVE_DATA_FROM_STORAGE")
  ipcRenderer.send(REMOVE_DATA_FROM_STORAGE, item)
}
