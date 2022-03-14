/**
 * 文件上传
 */
const router = require('koa-router')();
const path = require('path');
const multiparty = require('multiparty');
const fs = require('fs-extra');
const { mkdirsSync } = require('../../utils/dir');
// const { strPadLeft } = require('../../utils/str');
const sqllite = require('../../sqlite3');

const uploadPath = path.join(__dirname, '../', '../', '../', 'upload'); // 文件存储目录
const chunksPath = path.join(uploadPath, 'tmp'); //切片目录

//初始化
(function () {
  // 如果目录不存在，则创建
  if (!fs.existsSync(chunksPath)) mkdirsSync(chunksPath);
  // 初始化数据库
  sqllite.createTable(`
  CREATE TABLE IF NOT EXISTS uploadList (
    id          INTEGER  PRIMARY KEY AUTOINCREMENT,
    filename    VARCHAR,
    filepath    VARCHAR,
    sn          INT,
    create_date DATETIME DEFAULT (CURRENT_TIMESTAMP) 
  );
  `);

})()


/**
 * 文件上传接口
 */
router.post('/upload', async (ctx, next) => {
  // console.log(ctx.request.body);
  // const {filename,fi} = ctx.req.body;
  // console.log(filename,fi);
  // 上传文件
  const form = new multiparty.Form({
    uploadDir: chunksPath
  });
  form.parse(ctx.req, function (err, fields, files) {
    if (err) {//错误处理
      console.log(err);
    } else {
      // if (fields.ftotal[0] > 1) { //分片大于1，为1个分片的，直接到合并请求
      //   let srcFile = files.file[0].path; //存储的文件
      //   // let dstFile = path.join(chunksPath, 's-' + strPadLeft(fields.fi[0], 6, 0) + '.part'); // 为防止文件排序错乱，需要加前导0
      //   // fs.renameSync(srcFile, dstFile);
      // }
      //写入数据库
      // console.log(files.file[0].originalFilename);
      // console.log(fields.fi[0]);
      sqllite.insertData(`INSERT INTO uploadList (filename, filepath, sn) VALUES (?,?,?)`, [[fields.filename[0], files.file[0].path, fields.fi[0]]]);
    }
  });
  form.on('file', () => {
    console.log('上传成功!');
  });
  ctx.status = 200;
  ctx.res.end('上传成功');
})

/**
 * 合并切片
 */
router.post('/merge_chunks', async (ctx, next) => {
  const { filename } = ctx.request.body; //获取参数
  const filePath = path.join(uploadPath, filename); //生成的文件名
  // console.log(filePath);

  sqllite.queryData('select * from uploadList where filename="'+filename+'" order by sn asc', function(data) {
    let buffers = []; // blob
    for (let i = 0; i < data.length; i++) {
      // console.log(data[i].sn,data[i].filepath);
      let buffer = fs.readFileSync(data[i].filepath);
      buffers.push(buffer);
      // 删除分片文件
      fs.unlinkSync(data[i].filepath);
    }
    //合并文件
    let concatBuffer = Buffer.concat(buffers);
    fs.writeFileSync(filePath, concatBuffer);
    console.log('切片合并完成!');
  });

  ctx.status = 200;
  ctx.res.end('切片合并成功!');
})

module.exports = router;