// 在渲染器中使用开放的 API
let data = window.myapi.readConfig();
console.log(data);

// 窗口消息
function messageTop() {
  new Notification("标题", { body: "消息窗口信息" })
    .onclick = () => {
        document.getElementById("output").innerText = "点击了消息通知"
    };
}
