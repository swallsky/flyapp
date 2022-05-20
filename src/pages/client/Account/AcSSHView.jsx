import React, { useEffect } from "react";
import { Modal, Form, Input, Cascader } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
/**
 * 表单数据
 * @returns
 */
export default function AcSSHView(props) {
  //表单对象
  const [sshform] = Form.useForm();

  // 取消
  const handleCancel = () => {
    props.setIsSSHVisible(false);
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

      sshform.setFieldsValue(props.formData); //有填充数据时，更新
    }
  }, [props, sshform]);

  return (
    <Modal
      title={props.formTitle}
      visible={props.isSSHVisible}
      colon={false}
      onCancel={handleCancel}
      cancelText="取消"
    >
      <Form
        name="wrap"
        form={sshform}
        labelCol={{ flex: "110px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
      >
        <Form.Item
          label="分组"
          name="mid"
        >
          <Cascader
            fieldNames={{ label: "title", value: "id", children: "children" }}
            options={props.groupData}
          />
        </Form.Item>

        <Form.Item
          label="标题"
          name="title"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="wtype"
          label="应用类型"
        >
          <Cascader
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
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="用户名"
          name="username"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
        >
          <Input.Password
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
