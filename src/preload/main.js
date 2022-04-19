/**
 * 主窗口
 */
const { contextBridge, ipcRenderer, shell } = require("electron");
const remote = require("@electron/remote");
const path = require("path");

let webSiteWin = [];

contextBridge.exposeInMainWorld("electronApi", {
  // 获取本机ip
  getLocalIP: async () => ipcRenderer.invoke("get-local-ip"),
  //保存文件夹
  saveDir: async () => {
    let res = await remote.dialog.showOpenDialogSync({
      properties: ["openDirectory"],
    });
    return res;
  },
  // 打开文件
  openFile: (filePath) => {
    shell.openPath(filePath);
  },
  /**
   * 自动登录
   * @param {*} data 自动登录数据
   */
  openLogin: async (data) => {
    const { id, url, wtype, username, password } = data;
    webSiteWin[id] = new remote.BrowserWindow({
      width: 1280,
      height: 750,
      webPreferences: {
        webSecurity: false, // 解决CORS问题 关闭浏览器安全性检查
        // nativeWindowOpen: false, //关闭 window.open
        preload: path.resolve(path.dirname(__dirname), "preload", "website.js"), //预加载node模块
        additionalArguments: [wtype, username, password], //传递相关参数
        partition: new Date().getTime().toString(), // 隔离多窗口cookie信息，可实现多开账号登录
      },
    });
    webSiteWin[id].loadURL(url);
  },
});
