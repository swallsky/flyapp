import React from "react";

import { Outlet } from "react-router-dom";

import "./App.css";

export default function App() {

  //窗口消息
  var messageTop = function (){
    new Notification("标题", { body: "消息窗口信息" })
  }

  return (
    <div>
      <div className="titlBar">11111</div>
      <input type="button" value="弹窗" onClick={messageTop} />
      <Outlet />
    </div>
  );
}
