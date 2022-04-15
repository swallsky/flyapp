import React, { useEffect } from "react";
import { PageHeader, Descriptions } from "antd";

export default function WsInfo() {
  useEffect(() => {}, []);

  return (
    <PageHeader title="功能说明" subTitle="功能说明" ghost={false}>
      <Descriptions size="middle" column={1} bordered>
        <Descriptions.Item label="密码保存">
          保存常用项目网站密码
        </Descriptions.Item>
        <Descriptions.Item label="快捷登录">
          一键登录，无须重复输入
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  );
}

