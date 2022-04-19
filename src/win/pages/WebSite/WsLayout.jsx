import React,{useEffect,useState} from 'react'
import { Outlet,useNavigate } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from "antd";
const { Content, Sider } = Layout;


export default function WsLayout(props) {
  const navigate = useNavigate();

  const [defMenu, setDefMenu] = useState(['']); //设置默认菜单状态

  useEffect(() => {
    setDefMenu(window.location.hash.substring(1));
  }, [])

  // 点击菜单
  let menuClick = (e) => {
    // console.log(e);
    setDefMenu(e.key);
    navigate(e.key);
  }

  return (
    <Layout>
      <Sider width={220} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={defMenu} 
          selectedKeys={defMenu}
          style={{ height: '100vh', borderRight: 0 }}
          onClick={menuClick}
        >
          <Menu.Item key="/win/website">账号管理</Menu.Item>
          <Menu.Item key="/win/website/groups">分组管理</Menu.Item>
          <Menu.Item key="/win/website/list">登录列表</Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px',height:'100vh' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>账号管理</Breadcrumb.Item>
          <Breadcrumb.Item>{props.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
