const router = require('koa-router')();
const getIpAddress = require('../utils/ip');

// 首页
router.get('/',async (ctx)=>{
    ctx.body = 'server start!';
});

// 获取本机ip
router.get('/get-remote-api',async (ctx)=>{
    let ip = getIpAddress();
    ctx.body = 'http://'+ip+":4321";
})

module.exports = router;