import { FileAddOutlined, ChromeOutlined } from "@ant-design/icons";
// import { FileAddOutlined, SettingOutlined, ProfileOutlined } from '@ant-design/icons';
import "./styles/app.css";
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
const { Content, Sider } = Layout;

/**
 * 基础布局
 */
export default function WinApp() {
  const navigate = useNavigate();
  const [defMenu, setDefMenu] = useState([""]); //设置默认菜单状态

  useEffect(() => {
    setDefMenu(window.location.hash.substring(1));
  }, []);

  // 点击菜单
  let menuClick = (e) => {
    // console.log(e);
    setDefMenu(e.key);
    navigate(e.key);
  };

  return (
    <div>
      <div className="titlBar"></div>
      <Layout
        hasSider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 30,
          right: 0,
          bottom: 0,
        }}
      >
        <Sider width={60}>
          <Menu
            onClick={menuClick}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={defMenu}
            selectedKeys={defMenu}
          >
            <Menu.Item
              key="/win/account"
              style={{ paddingLeft: "16px" }}
              icon={<ChromeOutlined style={{ fontSize: 28 }} />}
            ></Menu.Item>
            <Menu.Item
              key="/win/file"
              style={{ paddingLeft: "16px" }}
              icon={<FileAddOutlined style={{ fontSize: 28 }} />}
            ></Menu.Item>
          </Menu>
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
}
