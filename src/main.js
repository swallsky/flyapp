const { app, BrowserWindow, Notification } = require("electron");
const path = require("path");

/**
 * 创建主窗口进程
 */
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "nodes", "preload.js"),
    },
  });
  win.loadFile(path.join(__dirname, "index.html"));
}

//启动时的消息通知
function startNotification() {
  new Notification({ title: "启动通知", body: "启动通知主体" }).show();
}

app.whenReady().then(createWindow).then(startNotification);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});