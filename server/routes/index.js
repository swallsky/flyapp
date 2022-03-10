const home = require("./home");

// 导出路由配置
module.exports = app=>{
    // 权限判断
    // app.use(function(req,res,next){
    //     next();
    // });

    //相关路由配置
    app.use('/',home);
};