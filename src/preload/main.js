/**
 * 主窗口
 */
const { contextBridge, ipcRenderer, shell } = require("electron");
const remote = require("@electron/remote");
const path = require("path");

let accountWin = [];

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
   * web应用
   * @param {*} data 账号数据
   */
   webapp: async (data) => {
    const { id, title, url, wtype, username, password } = data;
    let twtype = wtype.replace("web,",""); //替换web,前缀
    accountWin[id] = new remote.BrowserWindow({
      title: title,
      width: 1280,
      height: 750,
      webPreferences: {
        webSecurity: false, // 解决CORS问题 关闭浏览器安全性检查
        // nativeWindowOpen: false, //关闭 window.open
        preload: path.resolve(path.dirname(__dirname), "preload", "acWeb.js"), //预加载node模块
        additionalArguments: [twtype, username, password], //传递相关参数
        partition: new Date().getTime().toString(), // 隔离多窗口cookie信息，可实现多开账号登录
      },
    });
    accountWin[id].loadURL(url);
    // accountWin[id].webContents.openDevTools();
  },
  /**
   * 服务器
   * @param {*} data 账号数据
   */
   serverApp: async (data) => {
    // const { id, title, url, wtype, username, password } = data;
    console.log(data);
  },
});
