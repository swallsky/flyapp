/**
 * 主窗口
 */
const { contextBridge, ipcRenderer, shell, clipboard } = require("electron");
const remote = require("@electron/remote");
const { chromium } = require("playwright");
const acWeb = require("./acWeb");
var browser = null;
chromium.launch({ headless:false }).then(res=>{
  browser = res;
});

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
  // 复制文本
  copyText: (v) => {
    clipboard.writeText(v);
  },
  /**
   * web应用
   * @param {*} data 账号数据
   */
  webapp: async (data) => {
    data.wtype = data.wtype.replace("web,", ""); //替换web,前缀
    try{//容错处理，防止因为浏览器关闭，导致的错误
      await acWeb(browser,data);
    }catch(e){
      browser = await chromium.launch({ headless:false });
      await acWeb(browser,data);
    }
  },
});
