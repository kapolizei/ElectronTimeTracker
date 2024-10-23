const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    takeScreenshot: () => ipcRenderer.send('take-screenshot'),
    onScreenshotSuccess: (callback) => ipcRenderer.on('screenshot-success', (event, path) => callback(path)),
    onScreenshotError: (callback) => ipcRenderer.on('screenshot-error', (event, error) => callback(error))
});
