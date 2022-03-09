const { app, BrowserWindow, Notification } = require("electron");
const express = require("express");
const path = require("path");

/**
 * 创建主窗口进程
 */
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // webPreferences: {
    //   preload: path.join(__dirname, "server", "preload.js"),
    // },
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#2f3241",
      symbolColor: "#74b1be",
    },
  });

  if (process.env.NODE_ENV == "dev") {
    // 开发环境时
    win.loadURL("http://localhost:3000/");
  } else {
    // 生产环境时
    win.loadFile(path.join(__dirname, "build", "index.html"));
  }
}

//启动后台服务
function startServer() {
  const app = express();
  const server = app.listen(3100);
  app.get('/', function (req, res) {
    res.send('Server is ready!');
  });

}

app.whenReady().then(createWindow).then(startServer);

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
