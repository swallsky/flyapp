const { app, BrowserWindow } = require("electron");
const remote = require("@electron/remote/main");
const Server = require("./server/app");
const ipcManager = require("./ipc");
const { mainWindow, mainLoading,trayIcon } = require("./win/main");

let win = null;
let iconTary = null;
//先创建主窗口，再启动后台服务
app
  .whenReady()
  .then(() => {
    ipcManager(); //主进程与渲染进程间通讯管理
    win = mainWindow();
    iconTary = trayIcon(win);
    mainLoading(win);
    // 引入remote模块
    remote.initialize();
    remote.enable(win.webContents);
  })
  .then(Server);

// 关闭所有窗口时
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    //非mac系统
    app.quit();
    win = null;
  } else {
    iconTary.destroy();
  }
});

// 激活应用时
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    win = mainWindow();
    iconTary = trayIcon(win);
    mainLoading(win);
  }
});

// 只运行单个应用
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commdLine, workingDirctory) => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
      win.show();
    }
  });
}
