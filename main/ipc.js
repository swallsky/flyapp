const { ipcMain, dialog } = require('electron');
/**
 * 主进程通讯
 */
module.exports = () => {
    //打开文件夹,并返回文件夹信息
    ipcMain.handle('open-dir', () => {
        let res = dialog.showOpenDialogSync({
            properties: ['openDirectory']
        });
        return res;
    });
}