import React from "react";
import { Modal, Form, Input,message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import request from "../../../request";
/**
 * 表单数据
 * @returns
 */
export default function WsFormData(props) {
  const [accout] = Form.useForm(); //表单对象

  // 提测
  const handleOk = async () => {
    let data = await accout.validateFields();
    // console.log(data);
    let res = await request.post("/api/website/add",data);
    console.log(res);
    if(res.status === 200){
      message.success("新增成功");
      props.setIsFormVisible(false);
      props.getAccount(); //刷新列表
      accout.resetFields(); //重置
    }else{
      message.error(res.msg);
    }
  };

  // 取消
  const handleCancel = () => {
    props.setIsFormVisible(false);
  };

  return (
    <Modal
      title="新增账号"
      visible={props.isFormVisible}
      colon={false}
      onOk={handleOk}
      okText="确定"
      onCancel={handleCancel}
      cancelText="取消"
    >
      <Form
        name="wrap"
        form={accout}
        labelCol={{ flex: "110px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
      >
        <Form.Item
          label="网址"
          name="url"
          rules={[{ required: true, message: "请输入网址" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
