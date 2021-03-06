/**
 * 基础框架
 */
const port = process.env.PORT || "4321"; //端口号
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const reactStatic = require('koa-static');
const path = require('path');
const initsql = require('./initsql');

const app = new Koa();
// 路由
const routes = require('./routes/index');

// 启动服务
function Server(){
  app.use(reactStatic(path.join(__dirname,"..","..","..",'build')));
  app.use(cors()); //跨域
  app.use(koaBody());
  app.use(routes.routes()).use(routes.allowedMethods());
  
  app.listen(port, () => {
    //初始化数据库
    initsql();
    console.log('服务已启动了');
  });
  // 错误监控
  app.on('error',(err,ctx)=>{
    console.log('server error',err,ctx);
  })
}


// 单独启动服务端调试时启动
if (process.env.NODE_ENV === "serverDev") {
  Server();
}

// 启动服务
module.exports = Server;
