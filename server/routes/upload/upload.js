/**
 * 文件上传
 */
const router = require('koa-router')();
const path = require('path');
const multiparty = require('multiparty');
const fs = require('fs-extra');
const { mkdirsSync } = require('../../utils/dir');
const sqllite = require('../../sqlite3');

/**
 * 获取上传目录
 */
router.get('/getpath',async (ctx,next)=>{
  let dir = await sqllite.fetch('select * from metaData where type="uploaddir"');
  if(dir){
    if(fs.existsSync(dir.data)){
      ctx.body = { status:200, data:dir.data};
    }else{
      ctx.body = {status:404,data:'目录不存在'};
    }
  }else{
    ctx.body = {status:404,data:'请选择要上传文件目录'};
  }
});

/**
 * 修改上传目录
 */
router.post('/uppath',async (ctx,next)=>{
  const {data} = ctx.request.body;
  let updir = await sqllite.fetch('select * from metaData where type="uploaddir"');
  if(updir){ //存在则更新
    await sqllite.execute('update metaData set data="'+data+'" where type="uploaddir"');
  }else{ //不存在则写入
    await sqllite.insert('insert into metaData(data,type) values(?,?)',[data,"uploaddir"]);
  }
  ctx.body = { status:200,msg:'修改成功' };
});


/**
 * 文件上传接口
 */
router.post('/upload', async (ctx, next) => {
  let chunksPath = '';
  //读取上传目录
  let dir = await sqllite.fetch('select * from metaData where type="uploaddir"');
  if(dir){
    if(fs.existsSync(dir.data)){ //文件存在
      chunksPath = path.join(dir.data, '.tmp');
      if (!fs.existsSync(chunksPath)) mkdirsSync(chunksPath);
    }else{
      ctx.body = {status:404,msg:"未找到文件目录!"}
      return;
    }
  }else{
    ctx.body = {status:404,msg:"未找到文件目录!"}
    return;
  }

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
  // console.log(res);
  ctx.body = {
    status:200,
    msg:'上传成功'
  };
})

/**
 * 合并切片
 */
router.post('/merge_chunks', async (ctx, next) => {

  let uploadPath = '';
  //读取上传目录
  let dir = await sqllite.fetch('select * from metaData where type="uploaddir"');
  if(dir){
    if(fs.existsSync(dir.data)){ //文件存在
      uploadPath = dir.data;
    }else{
      ctx.body = {status:404,msg:"未找到文件目录!"}
      return;
    }
  }else{
    ctx.body = {status:404,msg:"未找到文件目录!"}
    return;
  }

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