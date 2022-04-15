/**
 * 文件上传
 */
const router = require("koa-router")();
const path = require("path");
const fs = require("fs-extra");
const { app } = require("electron");
const sqllite = require("../../sqlite3");

/**
 * 新增数据
 */
router.post("/add", async (ctx, next) => {
  const data = ctx.request.body;
  await sqllite.insert(
    "insert into website(url,username,password) values(?,?,?)",
    [data.url, data.username, data.password]
  );
  ctx.body = {
    status: 200,
    msg: "写入成功",
  };
});

/**
 * 获取列表
 */
router.get("/list", async (ctx, next) => {
  let data = await sqllite.fetchAll(
    "select * from website order by create_date desc"
  );
  ctx.status = 200;
  ctx.body = data;
});

module.exports = router;
