/**
 * sqlite3 基础类
 */
const fs = require('fs-extra');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { app } = require('electron');
const sqlfilePath = path.join(app.getPath('home'), '.flyphoto.db');
const db = new sqlite3.Database(sqlfilePath);

// // 如果文件不存在，则创建
// if(!fs.existsSync(sqlfilePath)){
//     fs.writeFileSync(sqlfilePath,'');
// }

/**
 * 单行写入数据
 * @param {*} sql 表字段定义
 * @param {*} data 二维数据 
 * sql: insert into demo(id,name,age) values(?,?,?)
 * data: [1,"张三",20]
 * @https://www.runoob.com/sqlite/sqlite-insert.html
 */
function insert(sql, data) {
    return new Promise(function (resolve, reject) {
        db.serialize(() => {
            let stmt = db.prepare(sql);
            stmt.run(data); //逐行写入数据
            stmt.finalize();
            resolve(true);
        })
    });
}

/**
 * 批量写入数据
 * @param {*} sql 表字段定义
 * @param {*} data 二维数据 
 * sql: insert into demo(id,name,age) values(?,?,?)
 * data: [[1,"张三",20],[2,"李四",21],[3,"王五",22]]
 * @https://www.runoob.com/sqlite/sqlite-insert.html
 */
function batchInsert(sql, data) {
    return new Promise(function (resolve, reject) {
        db.serialize(() => {
            let stmt = db.prepare(sql);
            for (let i = 0; i < data.length; ++i) {
                stmt.run(data[i]); //逐行写入数据
            }
            stmt.finalize();
            resolve(true);
        })
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
            if (err) reject("fetch error:" + err.message)
            else resolve(row)
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
        })
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
            if (err) reject(err.message)
            else resolve(res);
        })
    });
}

/**
 * 关闭数据库连接
 */
function close() {
    return new Promise(function (resolve, reject) {
        db.close();
        resolve(true);
    })
}


module.exports = { db, execute, fetch, fetchAll, insert, batchInsert, close };