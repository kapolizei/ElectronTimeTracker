const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const screenshot = require('screenshot-desktop');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
    createWindow();

    ipcMain.on('take-screenshot', async (event) => {
        const screenshotPath = path.join(app.getPath('pictures'), 'screenshot.png');

        try {
            // Используем screenshot-desktop для захвата всего экрана
            const image = await screenshot({ format: 'png' });

            // Записываем изображение в файл
            fs.writeFileSync(screenshotPath, image);
            event.reply('screenshot-success', screenshotPath);
        } catch (error) {
            console.error(`Ошибка при создании скриншота: ${error.message}`);
            event.reply('screenshot-error', `Failed to take screenshot: ${error.message}`);
        }
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
