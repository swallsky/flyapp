import React, { useState, useEffect } from "react";
import { List, PageHeader, Avatar, Button } from "antd";
import WsFormData from "./WsFormData";
import request from "../../../request";

export default function WsList() {
  const [data, setData] = useState([]);
  const [ftotal, setFtotal] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    getAccount();
  }, []);

  // 获取数据列表
  function getAccount(){
    request.get('/api/website/list').then(data=>{
      setData(data.data);
      setFtotal(data.data.length);
    });
  }
  // 新增账号
  function addAccount() {
    setIsFormVisible(true);
  }

  return (
    <>
      <WsFormData isFormVisible={isFormVisible} setIsFormVisible={setIsFormVisible} getAccount={getAccount} />
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
                <Button key="edit">修改</Button>,
                <Button key="edit">登录</Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src="" />}
                title={<a href={item.url}>{item.url}</a>}
                description={
                  <div style={{ cursor: "default" }}>{item.username}</div>
                }
              />
            </List.Item>
          )}
        />
      </PageHeader>
    </>
  );
}
