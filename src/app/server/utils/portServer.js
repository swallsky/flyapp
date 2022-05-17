const net = require("net");
/**
 * 端口检测，并返回可用的端口
 * @param {*} port
 * @returns
 */
function portServer(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.listen(port);
    //如果正常，则关闭服务
    server.on("listening", () => {
      resolve(port);
      server.close();
    });

    server.on("error", async (err) => {
      if (err.code === "EADDRINUSE") {
        port++; //端口冲突时，自动增加端口号
        await portServer(port);
        resolve(port);
      }
    });
  });
}

module.exports = portServer;
