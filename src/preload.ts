const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('si', {
  system: () => ipcRenderer.invoke('system'),
  wifiConnections: () => ipcRenderer.invoke('wifiConnections'),
})

console.log("preloaded!");
