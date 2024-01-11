const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('si', {
  system: () => ipcRenderer.invoke('system'),
})

console.log("preloaded!");
