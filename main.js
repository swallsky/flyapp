const { app, BrowserWindow } = require("electron");
const path = require("path");
const Server = require('./server/app');

/**
 * 创建主窗口进程
 */
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration:true //开启渲染进程node功能
    },
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#2f3241",
      symbolColor: "#74b1be",
    },
  });

  if (process.env.NODE_ENV === "dev") {
    // 开发环境时
    win.loadURL("http://localhost:3000/");
    //  打开开发者工具
    win.webContents.openDevTools();
  } else {
    // 生产环境时
    win.loadFile(path.join(__dirname, "build", "index.html"));
  }
}

//先创建主窗口，再启动后台服务
app.whenReady().then(createWindow).then(Server);

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
