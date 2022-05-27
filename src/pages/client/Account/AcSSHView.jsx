import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Cascader, Tooltip, Button } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  CopyOutlined,
} from "@ant-design/icons";
/**
 * 表单数据
 * @returns
 */
export default function AcSSHView(props) {
  //表单对象
  const [sshform] = Form.useForm();
  const [url, setUrl] = useState();
  const [username, setUserName] = useState();
  const [password, setPassWord] = useState();

  // 取消
  const handleCancel = () => {
    props.setIsSSHVisible(false);
  };

  // 复制文本
  const Copyfn = (v)=>{
    window.electronApi.copyText(v);
  }

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
      setUrl(props.formData.url);
      setUserName(props.formData.username);
      setPassWord(props.formData.password);
    }
  }, [props, sshform]);

  return (
    <Modal
      title={props.formTitle}
      visible={props.isSSHVisible}
      colon={false}
      onCancel={handleCancel}
      footer={false}
    >
      <Form
        name="wrap"
        form={sshform}
        labelCol={{ flex: "110px" }}
        labelAlign="right"
        labelWrap
        wrapperCol={{ flex: 1 }}
      >
        <Form.Item label="分组" name="mid">
          <Cascader
            fieldNames={{ label: "title", value: "id", children: "children" }}
            options={props.groupData}
          />
        </Form.Item>

        <Form.Item label="标题" name="title">
          <Input />
        </Form.Item>

        <Form.Item name="wtype" label="应用类型">
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
                    value: "umeng",
                    label: "友盟",
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

        <Form.Item label="地址" name="url">
          <Input.Group compact>
            <Input
              style={{ width: "calc(100% - 32px)" }}
              name="url"
              value={url}
            />
            <Tooltip title="复制地址">
              <Button icon={<CopyOutlined />} onClick={()=>Copyfn(url)} />
            </Tooltip>
          </Input.Group>
        </Form.Item>

        <Form.Item label="用户名" name="username">
          <Input.Group compact>
            <Input
              style={{ width: "calc(100% - 32px)" }}
              name="username"
              value={username}
            />
            <Tooltip title="复制用户名">
              <Button icon={<CopyOutlined />} onClick={()=>Copyfn(username)} />
            </Tooltip>
          </Input.Group>
        </Form.Item>

        <Form.Item label="密码" name="password">
          <Input.Group compact>
            <Input.Password
              style={{ width: "calc(100% - 32px)" }}
              name="password"
              value={password}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            <Tooltip title="复制密码">
              <Button icon={<CopyOutlined />} onClick={()=>Copyfn(password)} />
            </Tooltip>
          </Input.Group>
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
