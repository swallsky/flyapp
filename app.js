const { app, BrowserWindow } = require("electron");
const Server = require("./server/app");
const { mainWindow, mainLoading } = require("./win/main");

let win = null;
//先创建主窗口，再启动后台服务
app
  .whenReady()
  .then(() => {
    win = mainWindow();
    mainLoading(win);
  })
  .then(Server);

// 关闭所有窗口时
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    //非mac系统
    app.quit();
    win = null;
  }
});

// 激活应用时
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    win = mainWindow();
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
