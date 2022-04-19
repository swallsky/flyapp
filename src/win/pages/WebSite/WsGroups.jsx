import React, { useState } from "react";
import { PageHeader, Button, Table, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function WsGroups() {
  const columns = [
    {
      title: "分组名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "排序",
      dataIndex: "age",
      key: "age",
      width: "12%",
    },
    {
      title: "操作",
      width: "30%",
      key: "address",
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} />
          <Popconfirm title="确定删除吗?" okText="确定" cancelText="取消">
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: 1,
      name: "John Brown sr.",
      age: 60,
      address: "New York No. 1 Lake Park",
      children: [
        {
          key: 11,
          name: "John Brown",
          age: 42,
          address: "New York No. 2 Lake Park",
        },
        {
          key: 12,
          name: "John Brown jr.",
          age: 30,
          address: "New York No. 3 Lake Park",
        },
        {
          key: 13,
          name: "Jim Green sr.",
          age: 72,
          address: "London No. 1 Lake Park",
          children: [
            {
              key: 131,
              name: "Jim Green",
              age: 42,
              address: "London No. 2 Lake Park",
            },
          ],
        },
      ],
    },
    {
      key: 2,
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
  ];
  return (
    <PageHeader
      title="分组管理"
      subTitle={`共计0个分组`}
      extra={[
        <Button key="add" type="primary">
          新增一级分组
        </Button>,
      ]}
      ghost={false}
    >
      <Table bordered columns={columns} dataSource={data} pagination={false} />
    </PageHeader>
  );
}
