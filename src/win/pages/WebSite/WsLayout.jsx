import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import request from "../../../request";
import {
  BookOutlined,
  UngroupOutlined,
  AppstoreAddOutlined,
  ApartmentOutlined,
  BarsOutlined,
} from "@ant-design/icons";
const { Content, Sider } = Layout;
const { SubMenu } = Menu;

export default function WsLayout(props) {
  const navigate = useNavigate(); //导航跳转
  const [defMenu, setDefMenu] = useState([""]); //设置默认菜单状态
  const [group, setGroup] = useState([]); //分组数据

  useEffect(() => {
    setDefMenu(window.location.hash.substring(1));
    // 读取分组列表
    readGroupList();
  }, []);

  // 读取分组列表
  function readGroupList() {
    request.get("/api/website/group/list").then((data) => {
      setGroup(data.data);
    });
  }
  // 点击菜单
  let menuClick = (e) => {
    // console.log(e);
    setDefMenu(e.key);
    navigate(e.key);
  };

  return (
    <Layout>
      <Sider width={280} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={defMenu}
          selectedKeys={defMenu}
          style={{ height: "100vh", borderRight: 0 }}
          onClick={menuClick}
        >
          <Menu.Item key="/win/website" icon={<BookOutlined />}>账号管理</Menu.Item>
          <Menu.Item key="/win/website/groups" icon={<UngroupOutlined />}>分组管理</Menu.Item>
          <Menu.Item key="/win/website/list" icon={<AppstoreAddOutlined />}>全部账号</Menu.Item>
          {group.map((smenu) => {
            return (
              <SubMenu key={"group_" + smenu.id} title={smenu.title} icon={<ApartmentOutlined />}>
                {smenu.children.map((children) => (
                  <Menu.Item key={"/win/website/list?mid="+smenu.id+","+children.id} icon={<BarsOutlined />}>
                    {children.title}
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          })}
        </Menu>
      </Sider>
      <Layout style={{ padding: "0 24px 24px", height: "100vh" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>账号管理</Breadcrumb.Item>
          <Breadcrumb.Item>{props.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Content>
          <Outlet context={[group, setGroup]} />
        </Content>
      </Layout>
    </Layout>
  );
}
