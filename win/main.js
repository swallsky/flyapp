const { BrowserWindow, BrowserView } = require("electron");
const path = require("path");
/**
 * 创建主窗口进程
 */
exports.mainWindow = function () {
  let win = new BrowserWindow({
    width: 980,
    height: 600,
    show: false, // 为了防止白屏，先将主进程隐藏
    webPreferences: {
      preload: path.resolve(
        path.dirname(__dirname),
        "src",
        "preload",
        "main.js"
      ), //预加载node模块
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
    win.loadFile(path.resolve(path.dirname(__dirname), "build", "index.html"));
  }
  return win;
};

/**
 * loading蒙板
 * @param {*} win 附着的窗体
 */
exports.mainLoading = function (win) {
  // loading界面
  const loadingView = new BrowserView();
  win.setBrowserView(loadingView);
  loadingView.setBounds({ x: 0, y: 0, width: 800, height: 600 });
  loadingView.setBackgroundColor("#FFFFFF");
  loadingView.webContents.loadFile(
    path.resolve(path.dirname(__dirname), "win", "loading.html")
  );
  loadingView.webContents.on("dom-ready", () => {
    win.show();
    //延时1s,去掉loading
    setTimeout(() => {
      win.removeBrowserView(loadingView);
    }, 1000);
  });
};
