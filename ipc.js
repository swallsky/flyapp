const { ipcMain, dialog } = require("electron");
/**
 * 主进程与渲染进程间通讯
 */
module.exports = () => {
  //打开文件夹,并返回文件夹信息,双向通讯，ipcMain.handle与ipcRenderer.invoke配对
  ipcMain.handle("open-dir", () => {
    let res = dialog.showOpenDialogSync({
      properties: ["openDirectory"],
    });
    return res;
  });
  //打开文件(单向) ipcMain.on与ipcRenderer.send配对
  // ipcMain.on('open-file',(e,filepath)=>{
  //     shell.openPath(filepath);
  // });
};
