/**
 * 基础框架
 */
const port = process.env.PORT || "4321"; //端口号
const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();
const router = require('./router')

// 启动服务
module.exports = ()=> {
    app.use(koaBody());
    app.use(router.routes())
    app.use(router.allowedMethods());
    app.listen(port, () => {
      console.log('服务已启动了');
    });
};
