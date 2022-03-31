//在渲染进程中预加载相关的node模块
const loadApi = [
    'electron', //引入electron模块
    'fs-extra', //引入文件操作模块
];

// 通过global加入全局变量中
loadApi.map((item=>{
    global[item] = require(item);
}));