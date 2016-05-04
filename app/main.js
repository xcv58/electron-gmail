/*eslint-disable */
const electron = require('electron');
/*eslint-enable */

const electronLocalshortcut = require('electron-localshortcut');
const { app, BrowserWindow } = electron;

let windows = [];
const gmailUrl = 'https://mail.google.com/mail/u/0/?ibxr=0';

const setShortcuts = (newWinCallback = () => {}) => {
  electronLocalshortcut.register('CommandOrControl+N', newWinCallback);

  electronLocalshortcut.register('CommandOrControl+R', () => {
    windows
    .filter(win => win.isFocused())
    .map(win => win.loadURL(gmailUrl));
  });
};

const newWindow = () => {
  const win = new BrowserWindow({ titleBarStyle: 'hidden', frame: false });
  win.maximize();
  win.loadURL(gmailUrl);
  return win;
};

const createWindow = () => {
  const win = newWindow();
  windows.push(win);
  win.on('closed', () => {
    windows = windows.filter(ele => ele !== win);
  });
  setShortcuts(createWindow);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => createWindow());

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
  if (windows.length === 0) {
    createWindow();
  }
});
