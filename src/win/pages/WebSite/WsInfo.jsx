import React, { useEffect } from "react";
import { PageHeader, Descriptions } from "antd";

export default function WsInfo() {
  useEffect(() => {}, []);

  return (
    <PageHeader title="Web账号管理" subTitle="web账号管理说明" ghost={false}>
      <Descriptions size="middle" column={1} bordered>
        <Descriptions.Item label="密码保存">
          保存常用项目网站用户名和密码
        </Descriptions.Item>
        <Descriptions.Item label="分组管理">
          支持按项目和产品进行两级分类管理
        </Descriptions.Item>
        <Descriptions.Item label="自动填充">
          可根据Web应用类型自动填写用户名和密码
        </Descriptions.Item>
        <Descriptions.Item label="快捷登录">
          可根据当前应用自动登录，支持窗口多开
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  );
}

