/**
 * 账号管理
 */
const router = require("koa-router")();
const sqllite = require("../../sqlite3");

/**
 * 新增/修改数据
 */
router.post("/update", async (ctx, next) => {
  const data = ctx.request.body;
  if (data.id > 0) {
    //修改
    await sqllite.update("account", data, "id=" + data.id);
  } else {
    //新增
    await sqllite.insert("account", data);
  }
  ctx.body = {
    status: 200,
    msg: "更新成功",
  };
});

/**
 * 删除数据
 */
router.get("/delete", async (ctx, next) => {
  const { id } = ctx.query;
  if (id > 0) await sqllite.execute("delete from account where id=" + id + "");
  ctx.body = {
    status: 200,
    msg: "删除成功",
  };
});

/**
 * 获取列表
 */
router.get("/list", async (ctx, next) => {
  const { mid } = ctx.query;
  let data = mid !== '0'
      ? await sqllite.fetchAll(
          "select * from account where mid=? order by create_date desc",
          [mid]
        )
      : await sqllite.fetchAll(
          "select * from account order by create_date desc"
        );
  ctx.status = 200;
  ctx.body = data;
});

module.exports = router;
