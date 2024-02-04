import path from "path";
import { BrowserWindow, Menu, Tray, app, ipcMain, nativeImage } from "electron";
const si = require("systeminformation");

let mainWindow: any = null;
let tray = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("dist/index.html");
  // mainWindow.webContents.openDevTools({ mode: "detach" });

  // Close to Hide Window
  mainWindow.on("close", (event: any) => {
    event.preventDefault();
    mainWindow.hide();
  });
};

// Single Instance
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) app.exit();

app.whenReady().then(() => {
  ipcMain.handle("system", () => si.system());
  ipcMain.handle("wifiConnections", () => si.wifiConnections());

  createWindow();

  // Tray Icon
  let iconPath: string;
  if (process.platform === "win32")
    iconPath = path.join(__dirname, "./../src/assets/icon.ico");
  else iconPath = path.join(__dirname, "./../src/assets/icon.png");

  // Tray
  const trayIcon = nativeImage.createFromPath(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    { label: "終了", click: () => app.exit() },
  ]);
  tray = new Tray(trayIcon);
  tray.setToolTip(app.name);
  tray.setContextMenu(contextMenu);
  tray.on("click", () => {
    !mainWindow.isVisible() && mainWindow.show();
  });
});

// app.once("window-all-closed", () => app.quit());
