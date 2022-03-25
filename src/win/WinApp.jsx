import { FileAddOutlined, ProfileOutlined } from '@ant-design/icons';
import './styles/app.css';
import React from "react";
import { Outlet } from 'react-router-dom';
import { Layout, Menu } from "antd";
const { Content, Sider } = Layout;

/**
 * 基础布局
 */
export default function WinApp() {

  return (
    <div>
      <div className="titlBar"></div>
      <Layout hasSider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 30,
          right: 0,
          bottom: 0,
        }}
      >
        <Sider
          width={60}
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" style={{paddingLeft:'16px'}} icon={<FileAddOutlined style={{fontSize:28}} />}></Menu.Item>
            <Menu.Item key="2" style={{paddingLeft:'16px'}} icon={<ProfileOutlined style={{fontSize:28}} />}></Menu.Item>
          </Menu>
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
}
