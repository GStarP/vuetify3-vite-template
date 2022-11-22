const { app, BrowserWindow, ipcMain } = require('electron');
const { join } = require('path');
const { DEV_SERVER_PORT } = require('../configs/dev-config.json');

const isDev = process.env.NODE_ENV === 'development';

let mainWindow = null;

const preload = join(__dirname, './preload.js');

function initMainWindow() {
  mainWindow = new BrowserWindow({
    icon: join(__dirname, '../public/favicon.ico'),
    webPreferences: {
      preload
    }
  });

  if (isDev) {
    mainWindow.loadURL(`http://127.0.0.1:${DEV_SERVER_PORT}`);
    mainWindow.webContents.openDevTools();
  } else {
    //
  }
}

app.whenReady().then(initMainWindow);

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    initMainWindow();
  }
});

app.on('window-all-closed', () => {
  mainWindow = null;
  if (process.platform !== 'darwin') app.quit();
});

/**
 * API exposed to browser env
 */
ipcMain.handle('NEW_WINDOW', (e, url) => {
  const window = new BrowserWindow({
    webPreferences: {
      preload
    }
  });
  window.loadURL(url);
});
