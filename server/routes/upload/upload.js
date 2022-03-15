/**
 * 文件上传
 */
const router = require('koa-router')();
const path = require('path');
const multiparty = require('multiparty');
const fs = require('fs-extra');
const { mkdirsSync } = require('../../utils/dir');
const sqllite = require('../../sqlite3');

const uploadPath = path.join(__dirname, '../', '../', '../', 'upload'); // 文件存储目录
const chunksPath = path.join(uploadPath, '.tmp'); //切片目录

//初始化
(function () {
  // 如果目录不存在，则创建
  if (!fs.existsSync(chunksPath)) mkdirsSync(chunksPath);
  // 初始化数据库
  sqllite.execute(`
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
  // 同步写入
  let res = await new Promise((resolve,reject)=>{
    // 上传文件
    const form = new multiparty.Form({
      uploadDir: chunksPath
    });
    form.parse(ctx.req, async function (err, fields, files) {
      if (err) {//错误处理
        reject(err);
      } else {
        //写入数据库
        await sqllite.batchInsert(`INSERT INTO uploadList (filename, filepath, sn) VALUES (?,?,?)`, [[fields.filename[0], files.file[0].path, fields.fi[0]]]);
      }
    });
    form.on('file', () => {
      resolve('上传成功!');
    });
  })
  console.log(res);
  
  ctx.status = 200;
  ctx.res.end('上传成功');
})

/**
 * 合并切片
 */
router.post('/merge_chunks', async (ctx, next) => {
  const { filename } = ctx.request.body; //获取参数
  const filePath = path.join(uploadPath, filename); //生成的文件名

  let data = await sqllite.fetchAll('select * from uploadList where filename=? order by sn asc',[filename]);
  let buffers = []; // blob
  for (let i = 0; i < data.length; i++) {
    //读取单片文件
    let buffer = fs.readFileSync(data[i].filepath);
    buffers.push(buffer);
    // 删除分片文件
    fs.unlinkSync(data[i].filepath);
  }
  //合并文件
  let concatBuffer = Buffer.concat(buffers);
  fs.writeFileSync(filePath, concatBuffer);
  console.log('切片合并成功!');

  ctx.status = 200;
  ctx.res.end('切片合并成功!');
})


module.exports = router;