const router = require('koa-router')();

router.get('/',async (ctx)=>{
    ctx.body = 'server start!';
});

module.exports = router;