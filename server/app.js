/**
 * 基础框架
 */
const port = process.env.PORT || "4321"; //端口号
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const reactStatic = require('koa-static');
const path = require('path');

const app = new Koa();
// 路由
const routes = require('./routes/index');

// 启动服务
function Server(){
  app.use(reactStatic(path.dirname(__dirname)+'/build'));
  app.use(cors()); //跨域
  app.use(koaBody());
  app.use(routes.routes()).use(routes.allowedMethods())
  app.listen(port, () => {
    console.log('服务已启动了');
  });
  // 错误监控
  app.on('error',(err,ctx)=>{
    console.log('server error',err,ctx);
  })
}


// 开发时启动
if (process.env.NODE_ENV === "dev") {
  Server();
}

// 启动服务
module.exports = Server;
