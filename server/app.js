/**
 * 基础框架
 */
const port = process.env.PORT || "4321"; //端口号
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa-cors');

const app = new Koa();
const routes = require('./routes/index')

// 启动服务
module.exports = () => {
  app.use(cors()); //跨域
  app.use(koaBody());
  app.use(routes.routes()).use(routes.allowedMethods())
  app.listen(port, () => {
    console.log('服务已启动了');
  });
};
