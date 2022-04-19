/**
 * 自动登录阿里云
 * @param {*} username
 * @param {*} password
 */
function aliyun(username, password) {
  let tab = document.querySelectorAll("div.tabs-item");
  if (tab.length > 0) {
    //如果结点存在,则输入用户名和密码
    tab[1].click(); //点击切换到用户名登录
    setTimeout(() => {
      let loginbox =
        document.getElementById("alibaba-login-box").contentWindow.document; // 读取登录的iframe元素
      loginbox.getElementById("fm-login-id").value = username; // 设置用户名
      loginbox.getElementById("fm-login-password").value = password; // 设置密码
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
  if (nlogin > 0) { //当前为未登录状态
    nlogin[0].querySelector("a").click(); //邮件登录
    setTimeout(() => {
      let ouser = document.querySelector("input.J-username");
      ouser.value = username;
      let opwd = document.querySelector("input.J-password");
      opwd.value = password;
      setTimeout(() => document.querySelector("a.J-loginBtn").click(), 500); //点击登录
    }, 1000);
  }
}

// dom加载完成
window.addEventListener("DOMContentLoaded", () => {
  let data = window.process.argv.slice(-3); // 获取后三个参数
  switch (data[0]) {
    case "aliyun":
      aliyun(data[1], data[2]);
      break;
    case "tencent":
      tencent(data[1], data[2]);
      break;
    default:
      break;
  }
});
