import React, { useState, useEffect } from 'react';
import request from '../../../request';
import { PageHeader, Descriptions, Image } from "antd";

export default function FilesUpload(props) {
  const [qrUrl, setQrUrl] = useState(''); //二维码地址
  const [saveDir, setSaveDir] = useState(''); // 上传保存目录

  useEffect(() => {
    // 获取本地ip
    request.get('/api/get-remote-api').then(dm => {
      setQrUrl(dm.data + '/api/upload/qrcode');
    });
    // 获取保存目录
    request.get('/api/upload/getpath').then(data => {
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