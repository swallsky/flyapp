const router = require('koa-router')();
const qrimage = require('qr-image');
const getIpAddress = require('../../utils/ip');


router.get('/qrcode',async (ctx)=>{
    let ip = getIpAddress();
    let url = 'http://'+ip+':4321/#/api';
    console.log(url);
    let img = qrimage.image(url,{type:'png',size:8});
    ctx.status = 200;
    ctx.type = 'image/png';
    ctx.body = img;
});

module.exports = router;