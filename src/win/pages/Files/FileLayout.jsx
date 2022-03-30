import React,{useEffect,useState} from 'react'
import { Outlet,useNavigate } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from "antd";
const { Content, Sider } = Layout;


export default function FileLayout(props) {
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
      <Sider width={150} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={defMenu} 
          selectedKeys={defMenu}
          style={{ height: '100vh', borderRight: 0 }}
          onClick={menuClick}
        >
          <Menu.Item key="/win/file">扫码上传</Menu.Item>
          <Menu.Item key="/win/file/list">文件列表</Menu.Item>
          <Menu.Item key="/win/file/conf">配置信息</Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px',height:'100vh' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>文件管理</Breadcrumb.Item>
          <Breadcrumb.Item>{props.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
