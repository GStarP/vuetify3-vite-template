const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ELECTRON', {
  openStats: () =>
    ipcRenderer.invoke('NEW_WINDOW', 'chrome://webrtc-internals/')
});
