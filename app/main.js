/*eslint-disable */
const electron = require('electron');
/*eslint-enable */

const electronLocalshortcut = require('electron-localshortcut');
const { app, BrowserWindow } = electron;

// const Menu = remote.require('menu');
// const Menu = remote.Menu;
// const context = require('electron-contextmenu-middleware');
// console.log(context);
// const input = require('electron-input-menu');
// console.log(input);
// const debug = require('debug-menu').contextMdw;

// context.use(input);
// context.use(debug);
// context.activate();


let mainWindow = null;
const gmailUrl = 'https://mail.google.com/mail/u/0/?ibxr=0';

function createWindow() {
  mainWindow = new BrowserWindow({ titleBarStyle: 'hidden', frame: false });
  mainWindow.maximize();


  // mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.loadURL(gmailUrl);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
  // menuInit();
  electronLocalshortcut.register('CommandOrControl+R', () => {
    mainWindow.loadURL(gmailUrl);
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
