import React, { useEffect } from "react";
import { Modal, Form, Input, message, Cascader } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import request from "../../../request";
/**
 * 表单数据
 * @returns
 */
export default function AcFormData(props) {
  //表单对象
  const [accout] = Form.useForm();

  // 提交
  const handleOk = async () => {
    let data = await accout.validateFields();
    if (props.formData.id) {
      data.id = props.formData.id;
    }
    let res = await request.post("/api/account/update", data);
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
    let wtypeCase = value.join(",");
    switch (wtypeCase) {
      case "web,github":
        accout.setFieldsValue({ url: "https://github.com/login" });
        break;
      case "web,aliyun":
        accout.setFieldsValue({
          url: "https://account.aliyun.com/login/login.htm",
        }); //阿里云登录地址
        break;
      case "web,tencent":
        accout.setFieldsValue({ url: "https://cloud.tencent.com/login" });
        break;
      case "web,mygitlab":
        accout.setFieldsValue({ url: "" });
        break;
      case "web,other":
        accout.setFieldsValue({ url: "" });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (props.formData) {
      if (props.formData.hasOwnProperty("mid")) {
        props.formData.mid = props.formData.mid
          .toString()
          .split(",")
          .map(Number);
      }
      if (props.formData.hasOwnProperty("wtype")) {
        props.formData.wtype = props.formData.wtype.toString().split(",");
      }

      accout.setFieldsValue(props.formData); //有填充数据时，更新
    }
  }, [props, accout]);

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
        labelAlign="right"
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
          label="应用类型"
          rules={[{ required: true, message: "请选择应用类型" }]}
        >
          <Cascader
            onChange={onWtypeChange}
            options={[
              {
                value: "web",
                label: "Web应用",
                children: [
                  {
                    value: "github",
                    label: "GitHub",
                  },
                  {
                    value: "aliyun",
                    label: "阿里云",
                  },
                  {
                    value: "tencent",
                    label: "腾讯云",
                  },
                  {
                    value: "mygitlab",
                    label: "自建gitlab",
                  },
                  {
                    value: "other",
                    label: "其他",
                  },
                ],
              },
              {
                value: "server",
                label: "服务器",
                children: [
                  {
                    value: "ssh",
                    label: "SSH远程",
                  },
                ],
              },
              {
                value: "database",
                label: "数据库",
                children: [
                  {
                    value: "mysql",
                    label: "MySQL",
                  },
                  {
                    value: "mongodb",
                    label: "MongoDB",
                  },
                  {
                    value: "postgresql",
                    label: "PostgreSQL",
                  },
                  {
                    value: "sqllite",
                    label: "Sqllite",
                  },
                ],
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="地址"
          name="url"
          rules={[{ required: true, message: "请输入地址(网址/Host/IP)" }]}
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
          />
        </Form.Item>

        <Form.Item
          label="备注"
          name="remark"
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
