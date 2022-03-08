import React from "react";

import { Button } from "antd";

import { Outlet } from "react-router-dom";

import "./App.css";

export default function App() {

  //窗口消息
  var messageTop = function (){
    new Notification("标题", { body: "消息窗口信息" })
  }

  return (
    <div>
      <Button type="primary" onClick={messageTop}>弹窗</Button>
      <Outlet />
    </div>
  );
}
