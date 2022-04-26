import React, { useState, useEffect } from "react";
import { PageHeader, Button, Table, Space, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import AcGroupsForm from "./AcGroupsForm";
import { useOutletContext } from "react-router-dom";
import request from "../../../request";

export default function AcGroups(props) {
  const [formTitle, setFormTitle] = useState("新增分组");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState();
  const [data, setData] = useState([]);
  const [ftotal, setFtotal] = useState(0);
  // 更新布局组件数据
  const [group, setGroup] = useOutletContext();
  const columns = [
    {
      title: "分组名",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "排序",
      dataIndex: "sort",
      key: "sort",
      width: "12%",
    },
    {
      title: "操作",
      width: "30%",
      key: "id",
      render: (text, record) => (
        <Space size="middle">
          {record.pid===0?<Button
            onClick={() => addGroup(record)}
            icon={<PlusCircleOutlined />}
          />:""}
          <Button onClick={() => editGroup(record)} icon={<EditOutlined />} />
          <Popconfirm
            title="确定删除吗?"
            onConfirm={() => delGroup(record)}
            okText="确定"
            cancelText="取消"
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  // 载加数据
  useEffect(() => {
    setData(group);
    setFtotal(group.length);
  }, [group]);
  // 获取列表
  function getDataList() {
    request.get("/api/account/group/list").then((data) => {
      setData(data.data);
      setFtotal(data.data.length);
      setGroup(data.data); // 更新布局数据
    });
  }
  // 新增账号
  function addGroup(dt) {
    setFormTitle(dt.id === 0 ? dt.title : "新增[" + dt.title + "]二级分组");
    setIsFormVisible(true);
    setFormData({ pid: dt.id });
  }
  // 修改账号
  function editGroup(data) {
    setFormTitle("修改账号");
    setIsFormVisible(true);
    setFormData(data);
  }

  // 删除账号
  function delGroup(data) {
    request.get("/api/account/group/delete?id=" + data.id).then((data) => {
      getDataList(); // 拉取数据列表
    });
  }
  return (
    <PageHeader
      title="分组管理"
      subTitle={`共计${ftotal}个分组`}
      extra={[
        <Button
          key="add"
          type="primary"
          onClick={() => addGroup({ id: 0, title: "新增一级分组", pid: 0 })}
        >
          新增一级分组
        </Button>,
      ]}
      ghost={false}
    >
      <AcGroupsForm
        isFormVisible={isFormVisible}
        setIsFormVisible={setIsFormVisible}
        getDataList={getDataList}
        formTitle={formTitle}
        formData={formData}
      />
      <Table bordered columns={columns} dataSource={data} pagination={false} />
    </PageHeader>
  );
}
