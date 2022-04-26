import "./styles/App.css";
import { Outlet } from 'react-router-dom';
import React from "react";
// import { Layout, Menu } from "antd";
// const { Header, Content } = Layout;
import { Layout } from "antd";
const { Content } = Layout;
/**
 * 基础布局
 */
export default function SerApp() {

  return (
    <Layout className="layout">
      {/* <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/api']}>
          <Menu.Item key="/api">文件上传</Menu.Item>
        </Menu>
      </Header> */}
      <Content style={{ height:'100vh' }}>
        <Outlet />
      </Content>
    </Layout>
  );
}
