const router = require('koa-router')();
const home = require('./home');
const upload = require('./upload');

router.use('/api',home.routes(),home.allowedMethods());
router.use('/api/file',upload.routes(),upload.allowedMethods());

module.exports = router;