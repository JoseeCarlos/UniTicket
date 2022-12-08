const { app, BrowserWindow } = require('electron')
const direccion = require('path')

function crearVentana() {
    const ventanaPrincipal = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    })

    ventanaPrincipal.loadURL('http://localhost:3003')
}

app.whenReady().then(() => {
    crearVentana()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) crearVentana()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
