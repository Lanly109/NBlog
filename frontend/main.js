const {app, ipcMain, BrowserWindow, globalShortcut, dialog} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
    nodeIntegration: true,
    webSecurity: false,
    allowRunningInsecureContent: true
  })

  // 加载应用----react 打包
  mainWindow.loadURL(path.join('file://', __dirname, 'dist/index.html'))

  // 加载应用----适用于 react 开发时项目
  // mainWindow.loadURL('http://localhost:8000/');

  // 打开调试.
  mainWindow.webContents.openDevTools()


    ipcMain.on('open-file-dialog-for-file', function (event) {
        dialog.showOpenDialog(mainWindow, {
          properties: ['openDirectory', 'createDirectory']
        }).then(result => {
          event.reply('selected-file', result.filePaths[0])
        }).catch(err => {
          console.log(err)
        })
    });

}

app.whenReady().then(() => {

  // const { execFile } = require('child_process')
  // execFile('/Users/lanly/Documents/Latex/softproject/NBlog/backend/nblog-server')

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
