const sqlite = require('./sqlite3');

const SQL = 
`
/* 文件切片列表 */
CREATE TABLE IF NOT EXISTS uploadList (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename VARCHAR,
    filepath VARCHAR,
    sn INT,
    create_date DATETIME DEFAULT (CURRENT_TIMESTAMP)
);
/* 文件列表 */
CREATE TABLE IF NOT EXISTS fileList (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename VARCHAR,
    filepath VARCHAR,
    filetype VARCHAR,
    create_date DATETIME DEFAULT (CURRENT_TIMESTAMP)
);
/* 账号分组管理 */
CREATE TABLE IF NOT EXISTS acgroup (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR,
    pid INT,
    sort INT,
    create_date DATETIME DEFAULT (CURRENT_TIMESTAMP)
);
/* 账号列表 */
CREATE TABLE IF NOT EXISTS account (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR,
    wtype VARCHAR,
    mid VARCHAR,
    url VARCHAR,
    username VARCHAR,
    password VARCHAR,
    remark TEXT,
    create_date DATETIME DEFAULT (CURRENT_TIMESTAMP)
);
/* 常用配置 */
CREATE TABLE IF NOT EXISTS metaData (type VARCHAR, data VARCHAR);
`;

// 数据库初始化
module.exports = function(){
    let esql = SQL.split(';');
    for(let i=0;i<esql.length;i++){
        if(esql[i]!==''){
            sqlite.execute(esql[i]); //执行sql 
        }
    }
}