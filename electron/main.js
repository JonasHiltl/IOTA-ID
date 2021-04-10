const {
  app,
  BrowserWindow,
  ipcMain
} = require("electron");
const path = require("path")
const backend = require("i18next-electron-fs-backend");
const fs = require("fs");
const storage = require("electron-json-storage");
const {
  FETCH_DATA_FROM_STORAGE,
  HANDLE_FETCH_DATA,
  SAVE_DATA_IN_STORAGE,
  HANDLE_SAVE_DATA
} = require("./utils/constants");

let win

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  })
  backend.mainBindings(ipcMain, win, fs);
  win.loadFile("index.html");
}

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "node_modules", ".bin", "electron")
})

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  } else {
    i18nextBackend.clearMainBindings(ipcMain);
  }
});

ipcMain.on(FETCH_DATA_FROM_STORAGE, (event, message) => {
  console.log("Main received: FETCH_DATA_FROM_STORAGE with message", message)
  win.send(HANDLE_FETCH_DATA, {
    success: true,
    message: message
  })
})

ipcMain.on(SAVE_DATA_IN_STORAGE, (event, message) => {
  console.log("Main received: SAVE_DATA_IN_STORAGE with message", message)
  win.send(HANDLE_SAVE_DATA, {
    success: true,
    message: message
  })
})