import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { PageHeader, Descriptions, Image } from "antd";

function FilesUpload(props) {
  const [qrUrl, setQrUrl] = useState(''); //二维码地址
  const [saveDir, setSaveDir] = useState(''); // 上传保存目录

  useEffect(() => {
    // 获取本地ip
    axios.get(props.apiDomain + '/api/get-remote-api').then(dm => {
      props.updateApiDm(dm.data); //修改为局域网ip port
      setQrUrl(dm.data + '/api/upload/qrcode');
    });
    // 获取保存目录
    axios.get(props.apiDomain + '/api/upload/getpath').then(data => {
      setSaveDir(data.data.data);
    });

  }, [props])

  return (
    <PageHeader title="文件上传" subTitle="局域网文件传输软件" ghost={false}>
      <Descriptions size="middle" column={1} bordered>
        <Descriptions.Item label="特别说明"><span style={{ color: 'red' }}>请确保软件和扫码设备在同一局域网内</span></Descriptions.Item>
        <Descriptions.Item label="保存目录">{saveDir}</Descriptions.Item>
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

export default connect(mapStateToProps, mapDisptchToProps)(FilesUpload);