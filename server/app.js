/**
 * 基础框架
 */
const port = process.env.PORT || "4321"; //端口号
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const debug = require("debug");
const routes = require("./routes");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("port", port);

// 路由配置
routes(app);

// Create HTTP server.
const server = http.createServer(app);
// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

// 启动服务
module.exports = function () {
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);
};
