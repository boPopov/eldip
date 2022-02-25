const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        webSecurity: false,
        webviewTag: true
      }
    })
    
    win.loadFile('index.html')
    win.webContents.openDevTools()
}

function settupEvents() {
    app.whenReady().then(() => {
        createWindow()
    })
    
    app.commandLine.appendSwitch('disable-features', 'CrossOriginOpenerPolicy') //Added for pages that are not opening

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })

    app.on('web-contents-created', (event, contents) => {
        contents.on('will-attach-webview', (event, webPreferences, params) => {
          // Strip away preload scripts if unused or verify their location is legitimate
          delete webPreferences.preload
          delete webPreferences.preloadURL
      
          // Disable Node.js integration
          webPreferences.nodeIntegration = false
      
          // Verify URL being loaded
          if (!params.src.startsWith('https://www.google.com/')) {
            event.preventDefault()
          }

          // console.log("params:", params)
          console.log("Starting...")
        })
      })
}

settupEvents()