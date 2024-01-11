import path from "path";
import { BrowserWindow, app, ipcMain } from "electron";
const si = require('systeminformation');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("dist/index.html");
  // mainWindow.webContents.openDevTools({ mode: "detach" });
};

app.whenReady().then(() => {
  ipcMain.handle('system', () => si.system())

  createWindow();
});

app.once("window-all-closed", () => app.quit());
