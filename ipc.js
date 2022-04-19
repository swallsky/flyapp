const { ipcMain } = require("electron");
const os = require("os");

/**
 * 主进程与渲染进程间通讯
 */
module.exports = () => {
  // 获取本地ip地址
  ipcMain.handle("get-local-ip", () => {
    let ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      let iface = ifaces[dev];
      for (let i = 0; i < iface.length; i++) {
        let { family, address, internal } = iface[i];
        if (family === "IPv4" && address !== "127.0.0.1" && !internal) {
          return address;
        }
      }
    }
    return '';
  });
};
