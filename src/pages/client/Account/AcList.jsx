import React, { useState, useEffect } from "react";
import { List, PageHeader, Button, Popconfirm } from "antd";
import AcFormData from "./AcFormData";
import AcSSHView from "./AcSSHView";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import request from "../../../request";
import { useParams, useOutletContext } from "react-router-dom";

export default function AcList() {
  const [data, setData] = useState([]);
  const [ftotal, setFtotal] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false); //是否显示填写表单
  const [isSSHVisible, setIsSSHVisible] = useState(false); //是否显示ssh信息
  const [formTitle, setFormTile] = useState("");
  const [formData, setFormData] = useState();
  const {mid} = useParams();
  const [menuInfo, setMenuInfo] = useState({
    id: 0,
    pid: 0,
    ptitle: "全部账号",
    title: "全部账号",
  });
  const [group] = useOutletContext(); // 读取group数据

  useEffect(() => {
    if (mid !== '0') {
      request.get("/api/account/group/info?mid=" + mid).then((data) => {
        setMenuInfo(data.data);
      });
    } else {
      setMenuInfo({ id: 0, pid: 0, ptitle: "全部账号", title: "全部账号" });
    }
    getAccount(mid);

  }, [mid]);

  // 获取数据列表
  function getAccount(id) {
    request.get("/api/account/list?mid=" + id).then((data) => {
      setData(data.data);
      setFtotal(data.data.length);
    });
  }
  // 新增账号
  function addAccount() {
    setFormTile("新增账号");
    setIsFormVisible(true);
    setFormData({
      mid: mid,
      title: "",
      wtype: "",
      url: "",
      username: "",
      password: "",
      remark: "",
    });
  }
  // 修改账号
  function editAccount(data) {
    setFormTile("修改账号");
    setIsFormVisible(true);
    setFormData(data);
  }

  // 删除账号
  function delAccount(data) {
    request.get("/api/account/delete?id=" + data.id).then((data) => {
      getAccount(mid); // 拉取数据列表
    });
  }

  // 打开窗口应用
  function openApp(data) {
    let wtype = data.wtype;
    wtype = typeof wtype == "string" ? wtype : wtype.join(",");
    if (wtype.indexOf("web,") !== -1) {
      // web应用
      window.electronApi.webapp(data);
    }else{
      // 其他应用
      setFormTile(data.title);
      setIsSSHVisible(true);
      setFormData(data);
    }
  }

  return (
    <>
      <AcFormData
        isFormVisible={isFormVisible}
        setIsFormVisible={setIsFormVisible}
        getAccount={getAccount}
        formTitle={formTitle}
        formData={formData}
        mid={mid}
        groupData={group}
      />
      <AcSSHView
        isSSHVisible={isSSHVisible}
        setIsSSHVisible={setIsSSHVisible}
        formTitle={formTitle}
        formData={formData}
        mid={mid}
        groupData={group}
      />
      <PageHeader
        title={menuInfo.ptitle + " > " + menuInfo.title}
        subTitle={`共计${ftotal}个文件`}
        extra={[
          menuInfo.id === 0 ? (
            ""
          ) : (
            <Button key="add" type="primary" onClick={addAccount}>
              新增
            </Button>
          ),
        ]}
        ghost={false}
      >
        <List
          itemLayout="horizontal"
          dataSource={data}
          style={{
            height: 610,
            overflow: "auto",
          }}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  onClick={() => editAccount(item)}
                  icon={<EditOutlined />}
                />,
                <Popconfirm
                  title="确定删除吗?"
                  onConfirm={() => delAccount(item)}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button icon={<DeleteOutlined />} />
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                title={<div>{item.title}</div>}
                description={
                  <div style={{ cursor: "default" }} onClick={() => openApp(item)}>
                    【{item.username}】({item.url})
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </PageHeader>
    </>
  );
}
