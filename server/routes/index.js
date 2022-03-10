const router = require('koa-router')();
const home = require('./home');
const upload = require('./upload');

router.use('/',home.routes(),home.allowedMethods());
router.use('/file',upload.routes(),upload.allowedMethods());

module.exports = router;