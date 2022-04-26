/**
 * sqlite3 基础类
 */
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const { app } = require("electron");
const sqlfilePath = path.join(app.getPath("home"), ".flyapp.db");
const db = new sqlite3.Database(sqlfilePath);

/**
 * 单行写入数据
 * @param {*} sql 表字段定义
 * @param {*} data 二维数据
 * sql: insert into demo(id,name,age) values(?,?,?)
 * data: [1,"张三",20]
 * @https://www.runoob.com/sqlite/sqlite-insert.html
 */
function insert(table, data) {
  return new Promise(function (resolve, reject) {
    let fileds = [],valpre=[],values =[];
    for(let fd in data){
        fileds.push(fd); //需要写入的字段
        valpre.push("?"); //占位符
        values.push(data[fd]); //对应的值
    }
    let sql = 'INSERT INTO '+table+'('+fileds.join(',')+') VALUES('+valpre.join(',')+')';
    db.serialize(() => {
      let stmt = db.prepare(sql);
      stmt.run(values); //逐行写入数据
      stmt.finalize();
      resolve(true);
    });
  });
}

/**
 * 更新数据
 * @param {*} table 表名
 * @param {*} data 修改的数据
 * @param {*} where 限制条件
 * @returns
 */
function update(table, data, where) {
  return new Promise(function (resolve, reject) {
    let fileds = [],
      values = [];
    delete data['id']; //过滤id
    for (let fd in data) {
      fileds.push(fd + "=?"); //需要更新的字段
      values.push(data[fd]); //对应的值
    }
    let sql =
      "UPDATE " + table + " SET " + fileds.join(",") + " WHERE " + where;
    db.serialize(() => {
      let stmt = db.prepare(sql);
      stmt.run(values); //替换
      stmt.finalize();
      resolve(true);
    });
  });
}

/**
 * 批量写入数据
 * @param {*} table 表字段定义
 * @param {*} data 二维数据
 * table: demo 表名
 * data: [{'id':1,'name':"张三",age:20},{'id':2,'name':"李四",age:22}]
 * @https://www.runoob.com/sqlite/sqlite-insert.html
 */
function batchInsert(table, data) {
  return new Promise(function (resolve, reject) {
    let fileds = [],valpre=[];
    for(let fd in data[0]){
        fileds.push(fd); //需要写入的字段
        valpre.push("?"); //占位符
    }
    let sql = 'INSERT INTO '+table+'('+fileds.join(',')+') VALUES('+valpre.join(',')+')';
    db.serialize(() => {
      let stmt = db.prepare(sql);
      for (let i = 0; i < data.length; ++i) {
          let tempData = [];
          for(let td in data[i]){
            tempData.push(data[i][td])
          }
        stmt.run(tempData); //逐行写入数据
      }
      stmt.finalize();
      resolve(true);
    });
  });
}

/**
 * 查找单行数据
 * @param {*} sql sql语句
 * @param {*} params 替换的参数
 * @returns
 */
function fetch(sql, params = []) {
  return new Promise(function (resolve, reject) {
    db.get(sql, params, function (err, row) {
      if (err) reject("fetch error:" + err.message);
      else resolve(row);
    });
  });
}

/**
 * 执行sql,查找数据列表
 * @param {*} sql sql语句
 * @param {*} params 替换的参数
 */
function fetchAll(sql, params = []) {
  return new Promise(function (resolve, reject) {
    db.all(sql, params, function (err, rows) {
      if (err) reject("fetchall error:" + err.message);
      else resolve(rows);
    });
  });
}

/**
 * 执行sql,例如修改数据
 * @param {*} sql
 * sql: update demo set name="张三1" where id=1
 */
function execute(sql) {
  return new Promise(function (resolve, reject) {
    db.run(sql, function (res, err) {
      if (err) reject(err.message);
      else resolve(res);
    });
  });
}

/**
 * 关闭数据库连接
 */
function close() {
  return new Promise(function (resolve, reject) {
    db.close();
    resolve(true);
  });
}

module.exports = {
  db,
  execute,
  fetch,
  fetchAll,
  insert,
  update,
  batchInsert,
  close,
};
