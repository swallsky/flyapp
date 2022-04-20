import React, { useState, useEffect } from "react";
import { List, PageHeader, Button,Popconfirm } from "antd";
import WsFormData from "./WsFormData";
import { EditOutlined, DeleteOutlined, LoginOutlined } from "@ant-design/icons";
import request from "../../../request";
import { useSearchParams } from "react-router-dom";

export default function WsList() {
  const [data, setData] = useState([]);
  const [ftotal, setFtotal] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formTitle, setFormTile] = useState("");
  const [formData, setFormData] = useState();
  const [params] = useSearchParams(); //获取参数
  const [menuInfo,setMenuInfo] = useState({id:0,pid:0,ptitle:"全部账号",title:"全部账号"});

  useEffect(() => {
    let mid = params.get("mid");
    if(mid!==null) request.get("/api/website/group/info?mid="+mid).then((data) => {
      setMenuInfo(data.data);
    });
    getAccount();
  }, [params]);

  // 获取数据列表
  function getAccount() {
    request.get("/api/website/list").then((data) => {
      setData(data.data);
      setFtotal(data.data.length);
    });
  }
  // 新增账号
  function addAccount() {
    setFormTile("新增账号");
    setIsFormVisible(true);
    setFormData({});
  }
  // 修改账号
  function editAccount(data){
    setFormTile("修改账号");
    setIsFormVisible(true);
    setFormData(data);
  }

  // 删除账号
  function delAccount(data){
    request.get("/api/website/delete?id="+data.id).then(data=>{
      getAccount();// 拉取数据列表
    })
  }

  // 打开窗口
  function openLogin(data){
    window.electronApi.openLogin(data);
  }

  return (
    <>
      <WsFormData
        isFormVisible={isFormVisible}
        setIsFormVisible={setIsFormVisible}
        getAccount={getAccount}
        formTitle={formTitle}
        formData={formData}
      />
      <PageHeader
        title={menuInfo.ptitle+" > "+menuInfo.title}
        subTitle={`共计${ftotal}个文件`}
        extra={[
          <Button key="add" type="primary" onClick={addAccount}>
            新增
          </Button>,
        ]}
        ghost={false}
      >
        <List
          itemLayout="horizontal"
          dataSource={data}
          style={{
            height: 410,
            overflow: "auto",
          }}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button onClick={()=>editAccount(item)} icon={<EditOutlined />} />,
                <Popconfirm
                  title="确定删除吗?"
                  onConfirm={()=>delAccount(item)}
                  okText="确定"
                  cancelText="取消"
                ><Button icon={<DeleteOutlined />} /></Popconfirm>,
                <Button onClick={()=>openLogin(item)} icon={<LoginOutlined />} />,
              ]}
            >
              <List.Item.Meta
                title={<div>{item.title}</div>}
                description={
                  <div style={{ cursor: "default" }}>【{item.username}】({item.url})</div>
                }
              />
            </List.Item>
          )}
        />
      </PageHeader>
    </>
  );
}
