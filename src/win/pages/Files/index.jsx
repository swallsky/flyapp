import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { PageHeader, Button, Descriptions,Image,message } from "antd";

function Files(props) {
  const [qrUrl, setQrUrl] = useState(''); //二维码地址
  const [saveDir,setSaveDir] = useState(''); // 上传保存目录

  useEffect(() => {
    // 获取本地ip
    axios.get(props.apiDomain + '/api/get-remote-api').then(dm => {
      props.updateApiDm(dm.data); //修改为局域网ip port
      setQrUrl(dm.data + '/api/upload/qrcode');
    });
    // 获取保存目录
    axios.get(props.apiDomain+'/api/upload/getpath').then(data=>{
      setSaveDir(data.data.data);
    });

  }, [props])

  async function openDir() {
    const { ipcRenderer } = window.electron;
    let dirs = await ipcRenderer.invoke('open-dir');
    if (dirs) {
      let res = await axios.post(props.apiDomain + '/api/upload/uppath', { data: dirs[0] });
      setSaveDir(res.data.dir); //显示保存目录
      message.success('目录设置成功');
    } else {
      console.log(dirs);
    }
  }

  return (
    <PageHeader title="文件上传" subTitle="局域网文件传输软件"
    extra={[
      <Button type='primary' key={0} onClick={openDir}>请选择目录</Button>
    ]}
    >
      <Descriptions size="middle" column={1}>
        <Descriptions.Item label="保存目录">{saveDir}</Descriptions.Item>
        <Descriptions.Item label="本机IP">{props.apiDomain}</Descriptions.Item>
        <Descriptions.Item label="打开微信扫码">
          <Image width={200} height={200} src={qrUrl} />
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  )
}

//state映射
const mapStateToProps = (state) => {
  return {
    apiDomain: state.apiDomain, //服务端域名
  }
}

// 事件派发映射: 将reducer中的事件映射成props
const mapDisptchToProps = (dispatch) => {
  return {
    /**
     * 修改后端api地址
     * @param {*} domain 
     */
    updateApiDm(domain) {
      const action = { type: "updateApiDomain", apiDomain: domain };
      dispatch(action);// 更新redux
    }
  }
}

export default connect(mapStateToProps, mapDisptchToProps)(Files);