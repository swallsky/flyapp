const { contextBridge } = require("electron");
const { readFileSync } = require("fs");

// 隔离上下文时，使用contextBridge.exposeInMainWorld访问
contextBridge.exposeInMainWorld("myapi", {
  readConfig: () => {
    const data = readFileSync("./package.json");
    return data;
  },
});
