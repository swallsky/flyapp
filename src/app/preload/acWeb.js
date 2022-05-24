const $ = require("./selector");
/**
 * 自动登录GitHub
 * @param {*} username
 * @param {*} password
 */
function github(username, password) {
  $("#login_field").val(username);
  $("#password").val(password);
  setTimeout(() => $('input[type="submit"]').click(), 500);
}
/**
 * 自动登录阿里云
 * @param {*} username
 * @param {*} password
 */
function aliyun(username, password) {
  let tab = document.querySelectorAll("div.tabs-item");
  if (tab.length > 0) {
    //如果结点存在,则输入用户名和密码
    // tab[1].click(); //点击切换到用户名登录
    setTimeout(() => {
      let loginbox =
        document.getElementById("alibaba-login-box").contentWindow.document; // 读取登录的iframe元素
      loginbox.querySelector("#fm-login-id").value = username; // 设置用户名
      loginbox.querySelector("#fm-login-password").value = password; // 设置密码
      setTimeout(
        () => loginbox.querySelector("div.fm-btn > button").click(),
        500
      ); //点击登录
    }, 2000);
  }
}

/**
 * 自动登录腾讯云
 * @param {*} username
 * @param {*} password
 */
function tencent(username, password) {
  let nlogin = document.querySelectorAll("div.clg-other-link");
  if (nlogin.length > 0) {
    //当前为未登录状态
    nlogin[0].querySelector("a").click(); //邮件登录
    setTimeout(() => {
      $("input.J-username").val(username); //用户名
      $("input.J-password").val(password); //密码
      setTimeout(() => $("a.J-loginBtn").click(), 500); //点击登录
    }, 1000);
  }
}

/**
 * 自建gitlab
 * @param {*} username
 * @param {*} password
 */
function mygitlab(username, password) {
  $("#user_login").val(username); //填充用户名
  $("#user_password").val(password); //填充密码
  setTimeout(() => $('input[name="commit"]').click(), 500); //点击登录
}

/**
 * 其他情况，尝试自动填充
 * @param {*} username
 * @param {*} password
 */
function other(username, password) {
  setTimeout(() => {
    //防止ajax加载，延时1秒再填充
    let ouser = $('input[name="username"],#username,#account,#qquin');
    if (ouser.getDom()) ouser.val(username); //填写用户名
    let opwd = $(
      'input[name="password"],input[name="passwd"],#password,input#pp'
    );
    if (opwd.getDom()) opwd.val(password); //填写密码
    // 未找到对应的用户名和密码时，显示用户名或者密码
    if (ouser.getDom() == null || opwd.getDom() == null) {
      let usertip = document.createElement("div");
      usertip.innerHTML = `
        <div style="position:absolute;top: 0; left: 0; width: 200px; height:18px ; background-color:aqua;z-index:99999999;">
        <span>用户名:${username}</span>
        <span>密码:${password}</span>
        </div>
        `;
      document.querySelector("body").appendChild(usertip);
    } else {
      setTimeout(() => {
        //提交尝试
        $(
          'input[name="submit"],input[type="submit"],button[type="submit"],#submit,#LAY-user-login-submit,button.ant-btn'
        ).click();
      }, 500);
    }
  }, 1000);
}

// DOM加载完成时执行
window.addEventListener("DOMContentLoaded", () => {
  let data = window.process.argv.slice(-3); // 获取后三个参数
  // console.log(data);
  switch (data[0]) {
    case "github":
      github(data[1], data[2]);
      break;
    case "aliyun":
      aliyun(data[1], data[2]);
      break;
    case "tencent":
      tencent(data[1], data[2]);
      break;
    case "mygitlab":
      mygitlab(data[1], data[2]);
      break;
    default:
      other(data[1], data[2]);
  }
});
