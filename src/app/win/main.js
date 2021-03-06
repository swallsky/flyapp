const {
  app,
  BrowserWindow,
  BrowserView,
  nativeImage,
  Tray,
  Menu,
} = require("electron");
const path = require("path");
/**
 * 创建主窗口进程
 */
exports.mainWindow = function () {
  let win = new BrowserWindow({
    width: 1280,
    height: 800,
    show: false, // 为了防止白屏，先将主进程隐藏
    webPreferences: {
      preload: path.resolve(app.getAppPath(), "src", "preload", "main.js"), //预加载node模块
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
    win.loadFile(path.resolve(app.getAppPath(), "build", "index.html"));
  }

  //自定义菜单
  appMenu();

  return win;
};

/**
 * 应用菜单
 */
function appMenu() {
  const isMac = process.platform === "darwin";
  const template = [
    // { role: 'appMenu' }
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: "about",label:"关于flyapp" },
              { type: "separator" },
              { role: "hide",label:"隐藏flyapp" },
              { type: "separator" },
              { role: "quit",label:"退出flyapp" },
            ],
          },
        ]
      : []),
    // { role: 'editMenu' }
    {
      label: "编辑",
      submenu: [
        { role: "cut",label:"剪切" },
        { role: "copy",label:"复制" },
        { role: "paste",label:"粘帖" },
      ],
    },
    ...(app.isPackaged === true?[]:
      [
        {
          label:"开发",
          submenu:[
            { role:"reload", label:"刷新" },
            { role:"forceReload", label:"强制刷新" },
            { role:"toggleDevTools", label:"切换开发者工具" },
            { type:"separator" },
            { role:"resetZoom", label: "还原大小" },
            { role:"zoomIn", label: "缩小" },
            { role:"zoomOut", label: "放大" },
            { type:"separator" },
            { role:"togglefullscreen", label: "全屏" },
          ]
        }
      ])
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

/**
 * 托盘图标
 * @param {*} win
 */
exports.trayIcon = function (win) {
  let tray = null;
  // console.log('mu:',app.getAppPath(),path.resolve(path.join(path.dirname(__dirname), "src", "assets", "logo", "logo-tray.png")))
  // 加入托盘
  const icon = nativeImage.createFromPath(
    path.resolve(
      path.join(app.getAppPath(), "src", "assets", "logo", "logo-tray.png")
    )
  );
  tray = new Tray(icon);
  // const contextMenu = Menu.buildFromTemplate([
  //   { label: "菜单1", type: "radio" },
  //   { label: "菜单2", type: "radio", checked: true },
  //   { label: "菜单1", type: "radio" },
  // ]);
  // iconTary.setContextMenu(contextMenu);
  tray.addListener("click", (e) => {
    win.show();
  });
  return tray;
};

/**
 * loading蒙板
 * @param {*} win 附着的窗体
 */
exports.mainLoading = function (win) {
  // loading界面
  const loadingView = new BrowserView();
  win.setBrowserView(loadingView);
  loadingView.setBounds({ x: 0, y: 0, width: 1280, height: 800 });
  loadingView.setBackgroundColor("#FFFFFF");
  loadingView.webContents.loadFile(
    path.resolve(path.dirname(__dirname), "win", "loading.html")
  );
  loadingView.webContents.on("dom-ready", () => {
    win.show();
    //延时1s,去掉loading
    setTimeout(() => {
      win.removeBrowserView(loadingView);
    }, 800);
  });
};
