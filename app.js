const { app, BrowserWindow, BrowserView } = require("electron");
const path = require("path");
const Server = require('./server/app');
const ipcManager = require('./main/ipc');

/**
 * 创建主窗口进程
 */
let win; // 防止被垃圾回收掉
let loadingView;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false, // 为了防止白屏，先将主进程隐藏
    webPreferences: {
      nodeIntegration: true, //开启渲染进程node功能
      contextIsolation: false,
      preload: path.resolve(__dirname, "main", "preload.js"), //预加载node模块
    },
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#2f3241",
      symbolColor: "#74b1be",
    },
  });

  // loading界面
  loadingView = new BrowserView();
  win.setBrowserView(loadingView);
  loadingView.setBounds({ x: 0, y: 0, width: 800, height: 600 });
  loadingView.setBackgroundColor("#FFFFFF");
  loadingView.webContents.loadFile(path.resolve(__dirname,"main","loading.html"));
  loadingView.webContents.on('dom-ready', () => {
    win.show();
  });

  if (process.env.NODE_ENV === "dev") {
    // 开发环境时
    win.loadURL("http://localhost:3000/");
    //  打开开发者工具
    win.webContents.openDevTools();
  } else {
    // 生产环境时
    win.loadFile(path.resolve(__dirname, "build", "index.html"));
  }
}
//移除loading view
function removeLoading() {
  //延时1s
  setTimeout(()=>{
    win.removeBrowserView(loadingView);
  loadingView = null;
  },1000);
}

//先创建主窗口，再启动后台服务
app.whenReady().then(createWindow).then(removeLoading).then(Server).then(ipcManager);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
    // 移除loading窗口
    removeLoading();
  }
});

// 只运行单个应用
const gotTheLock = app.requestSingleInstanceLock();
if(!gotTheLock){
  app.quit();
}else{
  app.on('second-instance',(event,commdLine,workingDirctory)=>{
    if(win){
      if(win.isMinimized()) win.restore();
      win.focus();
      win.show();
    }
  })
}

