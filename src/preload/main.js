/**
 * 主窗口
 */
const { contextBridge, ipcRenderer, shell } = require("electron");

contextBridge.exposeInMainWorld("electronApi", {
  // 获取本机ip
  getLocalIP: async () => ipcRenderer.invoke("get-local-ip"),
  //保存文件夹
  saveDir: async () => ipcRenderer.invoke("open-dir"),
  // 打开文件
  openFile: (filePath) => {
    shell.openPath(filePath);
  },
});
