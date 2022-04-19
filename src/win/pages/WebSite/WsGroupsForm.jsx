import React,{useEffect} from "react";
import { Modal, Form, Input,message,Select } from "antd";
import request from "../../../request";
/**
 * 分组数据
 * @returns
 */
export default function WsGroupsForm(props) {
  //表单对象
  const [group] = Form.useForm(); 
  
  // 提交
  const handleOk = async () => {
    // let data = await accout.validateFields();
    // if(props.formData.id){
    //   data.id = props.formData.id;
    // }
    // let res = await request.post("/api/website/update",data);
    // // console.log(res);
    // if(res.status === 200){
    //   message.success("更新成功!");
    //   props.setIsFormVisible(false);
    //   props.getAccount(); //刷新列表
    //   accout.resetFields(); //重置
    // }else{
    //   message.error(res.msg);
    // }
  };

  // 取消
  const handleCancel = () => {
    // props.setIsFormVisible(false);
  };

  useEffect(()=>{
    if(props.formData) group.setFieldsValue(props.formData); //有填充数据时，更新
  },[props.formData,group]);

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
        labelAlign="left"
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
          label="排序"
          name="sort"
          initialValue={0}
          rules={[{ required: true, message: "请输入排序" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
