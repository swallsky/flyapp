/**
 * 账号分组管理
 */
const router = require("koa-router")();
const sqllite = require("../../sqlite3");

/**
 * 通过二级获取组信息
 */
router.get("/info", async (ctx, next) => {
  const { mid } = ctx.query;
  let amid = mid.split(",");
  let smenu = await sqllite.fetch("select * from acgroup where id=?", [amid[1]]);
  let pmenu = await sqllite.fetch("select * from acgroup where id=?", [amid[0]]);
  ctx.status = 200;
  ctx.body = {
    pid: pmenu.id,
    ptitle: pmenu.title,
    id: smenu.id,
    title: smenu.title,
  };
});
/**
 * 添加/更新
 */
router.post("/update", async (ctx, next) => {
  const data = ctx.request.body;
  if (data.id > 0) {
    //修改
    await sqllite.update("acgroup", data, "id=" + data.id);
  } else {
    //新增
    await sqllite.insert("acgroup", data);
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
  if (id > 0) await sqllite.execute("delete from acgroup where id=" + id + "");
  ctx.body = {
    status: 200,
    msg: "删除成功",
  };
});

/**
 * 获取列表
 */
router.get("/list", async (ctx, next) => {
  let pdata = await sqllite.fetchAll(
    "select *,id as key from acgroup where pid=0 order by sort asc"
  );
  let data = [];
  for (let i = 0; i < pdata.length; i++) {
    let item = pdata[i];
    let sdata = await sqllite.fetchAll(
      "select *,id as key from acgroup where pid=? order by sort asc",
      [item.id]
    );
    item.children = sdata;
    data.push(item);
  }
  ctx.status = 200;
  ctx.body = data;
});

module.exports = router;
