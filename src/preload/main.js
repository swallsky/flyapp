/**
 * 主窗口
 */
const { contextBridge, ipcRenderer, shell, clipboard } = require("electron");
const remote = require("@electron/remote");
const { chromium } = require("playwright");
const acWeb = require("./acWeb");
const path = require("path");

var browser = null;
async function getBrowser(){
  let savepath = await remote.app.getPath("downloads");
  return await chromium.launch({ 
    downloadsPath: path.join(savepath,"flyapp"), //设置下载目录
    headless: false
  });
}

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
    try {
      //容错处理，防止因为浏览器关闭，导致的错误
      if(browser != null){
        await acWeb(browser, data);
      }else{
        browser = await getBrowser();
        await acWeb(browser, data);
      }
    } catch (e) {
      browser = await getBrowser();
      await acWeb(browser, data);
    }
  },
});
