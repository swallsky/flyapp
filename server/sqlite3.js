// /**
//  * sqlite3 基础类
//  */

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./test.db");

/**
 * 创建表
 * @param {*} sql 
 * sql: CREATE TABLE IF NOT EXISTS demo(
        ID INT PRIMARY KEY     NOT NULL,
        NAME           TEXT    NOT NULL,
        AGE            INT     NOT NULL,
        ADDRESS        CHAR(50),
        SALARY         REAL
    )
 * @https://www.runoob.com/sqlite/sqlite-create-table.html
 */
function createTable(sql){
    db.serialize(()=>{
        db.run(sql,function(err){
            if(null != err){
                console.log(err);
                return;
            }
        });
    });
}

/**
 * 写入数据
 * @param {*} sql 表字段定义
 * @param {*} data 二维数据 
 * sql: insert into demo(id,name,age) values(?,?,?)
 * data: [[1,"张三",20],[2,"李四",21],[3,"王五",22]]
 * @https://www.runoob.com/sqlite/sqlite-insert.html
 */
function insertData(sql,data){
    db.serialize(()=>{
        let stmt = db.prepare(sql);
        for(let i=0;i<data.length;++i){
            stmt.run(data[i]); //逐行写入数据
        }
        stmt.finalize();
    })
}

/**
 * 执行sql,查找数据列表
 * @param {*} sql 
 * @param {*} callback 
 * sql: select * from demo where id>1 and id < 10
 * callback: 
function callbackData(objects){
    for(let i=0;i<objects.length;++i){
        console.log(objects[i]);
    }
}
 */
function queryData(sql,callback){
    db.all(sql,function(err,rows){
        if(null != err){
            console.log(err);
            return;
        }
        if(callback){
            callback(rows);
        }
    })
}

/**
 * 执行sql,例如修改数据
 * @param {*} sql 
 * sql: update demo set name="张三1" where id=1
 */
function executeSql(sql){
    db.run(sql,function(err){
        console.log(err);
        return;
    })
}

/**
 * 关闭数据库连接
 */
function close(){
    db.close();
}

module.exports = {
    createTable,insertData,queryData,executeSql,close
}