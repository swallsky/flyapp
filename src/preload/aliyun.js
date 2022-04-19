// dom加载完成
window.addEventListener("DOMContentLoaded", () => {
  let data = window.process.argv.slice(-2); // 获取后两个参数
  let tab = document.querySelectorAll("div.tabs-item");
  if (tab.length > 0) {
    //如果结点存在,则输入用户名和密码
    tab[1].click(); //点击切换到用户名登录
    setTimeout(() => {
      let loginbox = document.getElementById("alibaba-login-box").contentWindow.document; // 读取登录的iframe元素
      loginbox.getElementById("fm-login-id").value = data[0]; // 设置用户名
      loginbox.getElementById("fm-login-password").value = data[1]; // 设置密码
      setTimeout(
        () => loginbox.querySelector("div.fm-btn > button").click(),
        500
      ); //点击登录
    }, 2000);
  }
});
