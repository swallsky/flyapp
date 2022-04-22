import React, { useEffect } from "react";
import { Modal, Form, Input, message, Select, Cascader } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import request from "../../../request";
const { Option } = Select;
/**
 * 表单数据
 * @returns
 */
export default function WsFormData(props) {
  //表单对象
  const [accout] = Form.useForm();

  // 提交
  const handleOk = async () => {
    let data = await accout.validateFields();
    if (props.formData.id) {
      data.id = props.formData.id;
    }
    let res = await request.post("/api/website/update", data);
    // console.log(res);
    if (res.status === 200) {
      message.success("更新成功!");
      props.setIsFormVisible(false);
      props.getAccount(props.mid); //刷新列表
      accout.resetFields(); //重置
    } else {
      message.error(res.msg);
    }
  };

  // 取消
  const handleCancel = () => {
    props.setIsFormVisible(false);
  };

  // 选择网址类型
  const onWtypeChange = (value) => {
    // console.log(value);
    switch (value) {
      case "github":
        accout.setFieldsValue({ url: "https://github.com/login" });
        break;
      case "aliyun":
        accout.setFieldsValue({
          url: "https://account.aliyun.com/login/login.htm",
        }); //阿里云登录地址
        break;
      case "tencent":
        accout.setFieldsValue({ url: "https://cloud.tencent.com/login" });
        break;
      case "mygitlab":
        break;
      case "other":
        accout.setFieldsValue({ url: "" });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (props.formData) {
      if (props.formData.hasOwnProperty("mid")) {
        let tempMid = props.formData.mid;
        props.formData.mid = tempMid.toString().split(",").map(Number);
      }
      accout.setFieldsValue(props.formData); //有填充数据时，更新
    }
  }, [props, accout]);

  const selectAfter = (
    <Select defaultValue="auto" className="select-after">
      <Option value="auto">自动登录</Option>
      <Option value="hand">手动登录</Option>
    </Select>
  );

  return (
    <Modal
      title={props.formTitle}
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
          label="分组"
          name="mid"
          rules={[{ required: true, message: "请选择分组" }]}
        >
          <Cascader
            fieldNames={{ label: "title", value: "id", children: "children" }}
            options={props.groupData}
          />
        </Form.Item>

        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: "请输入标题" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="wtype"
          label="账号类型"
          rules={[{ required: true, message: "请选择账号类型" }]}
        >
          <Select
            placeholder="请选择账号类型"
            onChange={onWtypeChange}
            allowClear
          >
            <Option value="github">GitHub</Option>
            <Option value="aliyun">阿里云</Option>
            <Option value="tencent">腾讯云</Option>
            <Option value="mygitlab">自建gitlab</Option>
            <Option value="other">其他</Option>
          </Select>
        </Form.Item>

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
          <Input.Password
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            addonAfter={selectAfter}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
