import React, { useEffect } from "react";
import { Modal, Form, Input,InputNumber, message } from "antd";
import request from "../../../request";
/**
 * 分组数据
 * @returns
 */
export default function AcGroupsForm(props) {
  //表单对象
  const [group] = Form.useForm();

  // 提交
  const handleOk = async () => {
    let data = await group.validateFields();
    if(props.formData.id){
      data.id = props.formData.id;
    }
    let res = await request.post("/api/account/group/update",data);
    // console.log(res);
    if(res.status === 200){
      message.success("更新成功!");
      props.setIsFormVisible(false);
      props.getDataList(); //刷新列表
      group.resetFields(); //重置
    }else{
      message.error(res.msg);
    }
  };

  // 取消
  const handleCancel = () => {
    props.setIsFormVisible(false);
  };

  useEffect(() => {
    if (props.formData) group.setFieldsValue(props.formData); //有填充数据时，更新
  }, [props.formData, group]);

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
        form={group}
        labelCol={{ flex: "110px" }}
        labelAlign="right"
        labelWrap
        wrapperCol={{ flex: 1 }}
      >
        <Form.Item
          label="分组名称"
          name="title"
          rules={[{ required: true, message: "请输入分组名称" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="pid"
          name="pid"
          hidden={true}
          initialValue={0}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="排序"
          name="sort"
          initialValue={0}
          rules={[{ type: "number", required: true, message: "请输入排序" }]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
}
