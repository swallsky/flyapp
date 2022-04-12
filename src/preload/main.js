/**
 * 主窗口
 */
const { contextBridge, ipcRenderer, shell } = require("electron");

contextBridge.exposeInMainWorld("electronApi", {
  //保存文件夹
  saveDir: async () => ipcRenderer.invoke("open-dir"),
  // 打开文件
  openFile: (filePath) => {
    shell.openPath(filePath);
  },
});

