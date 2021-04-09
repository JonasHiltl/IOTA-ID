const {
  app,
  BrowserWindow,
  ipcMain 
} = require("electron");
const path = require("path")
const backend = require("i18next-electron-fs-backend");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
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