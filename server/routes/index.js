const Router = require('koa-router');
const home = require('./home');
const upload = require('./upload/upload');
const qrcode = require('./upload/qrcode');

const router = new Router({
    prefix:'/api'
});
router.use(home.routes(),home.allowedMethods());
router.use('/upload',upload.routes(),upload.allowedMethods());
router.use('/upload',qrcode.routes(),qrcode.allowedMethods());

module.exports = router;