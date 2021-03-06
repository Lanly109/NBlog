const {app, ipcMain, BrowserWindow, globalShortcut, dialog} = require('electron')
const path = require('path')

const isDevelopment = process.env.NODE_ENV === 'development'

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

    console.log(isDevelopment)
    console.log(process.env.NODE_ENV)


  if (isDevelopment){
  // 打开调试.
  // 加载应用----适用于 react 开发时项目
      mainWindow.webContents.openDevTools()
      mainWindow.loadURL('http://localhost:8000/');
  }else{
  // 加载应用----react 打包
      mainWindow.loadURL(path.join('file://', __dirname, 'dist/index.html'))
  }


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

  const { execFile } = require('child_process')
  if (!isDevelopment){
      if (process.platform === 'win32'){
          execFile(path.join(__dirname, 'nblog-server.exe'))
      } else{
          execFile(path.join(__dirname, 'nblog-server'))
      }
  }

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
