const router = require("koa-router")();
const sqllite = require("../../sqlite3");

router.post("/add", async (ctx, next) => {
  const data = ctx.request.body;
  if (data.id > 0) {
    //修改
    await sqllite.update("website", data, "id=" + data.id);
  } else {
    //新增
    await sqllite.insert("website", data);
  }
  ctx.body = {
    status: 200,
    msg: "更新成功",
  };
});
