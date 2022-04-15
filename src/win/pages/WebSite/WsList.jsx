import React, { useState, useEffect } from "react";
import { List, PageHeader, Button,Popconfirm } from "antd";
import WsFormData from "./WsFormData";
import { EditOutlined, DeleteOutlined, LoginOutlined } from "@ant-design/icons";
import request from "../../../request";

export default function WsList() {
  const [data, setData] = useState([]);
  const [ftotal, setFtotal] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formTitle, setFormTile] = useState("");
  const [formData, setFormData] = useState();

  useEffect(() => {
    getAccount();
  }, []);

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
        title="登录列表"
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
                <Button icon={<LoginOutlined />} />,
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
