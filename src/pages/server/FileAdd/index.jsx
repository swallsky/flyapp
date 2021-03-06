import React, { useState, useEffect } from "react";
import "../styles/fileadd.css";
import Share from './shard';
import request from "../../../request";
import { PageHeader, Descriptions, Progress, message, List, Divider, Image } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

var uploadSn = 0; //当前文件序号,刷新页面时会重新计数
/**
 * 文件上传组件
 * @returns 
 */
 export default function FileAdd() {
  const [localDomain, setLocalDomain] = useState('');
  const [percents, setPercents] = useState([]);
  const [saveDir, setSaveDir] = useState(''); // 上传保存目录

  useEffect(() => {
    // 设置api domain
    request.getRemoteURL().then(url=>{
      setLocalDomain(url);
    })

    // 获取保存目录
    request.get('/api/upload/getpath').then(data => {
      setSaveDir(data.data.data);
    });

  }, []);

  /**
   * 更新上传进度
   * @param {*} fsn 当前文件序号
   * @param {*} fname 当前文件名称
   * @param {*} sn 已上传的切片个数 
   * @param {*} stotal 总切数 
   */
  function setPrecent(fsn, fname, sn, stotal) {
    let percent = ((sn / stotal) * 100).toFixed(2);
    // console.log(percent);
    percents[fsn] = { fname, percent };
    setPercents(() => [...percents]);
  }

  // 文件变改时
  var fileChange = async (event) => {
    //判断上传目录是存在
    let dirData = await request.get('/api/upload/getpath');
    if (dirData.data.status === 404) {
      message.error(dirData.data.data);
      return;
    }
    let files = event.target.files;
    //同时上传多个文件
    for (let i = 0; i < files.length; i++) {
      await Share(localDomain, uploadSn, files[i], setPrecent);
      uploadSn++; //当前文件序号
    }
  }

  return (
    <PageHeader
      title="上传文件"
      subTitle="请选择需要上传文件"
      extra={[
        (<input key={0} type="file" multiple name="avatar" onChange={fileChange} />)
      ]}
    >
      <Descriptions size="middle" column={1}>
        <Descriptions.Item label="保存目录">{saveDir}</Descriptions.Item>
        <Descriptions.Item label="本机IP">{localDomain}</Descriptions.Item>
      </Descriptions>
      <Divider orientation="left">文件列表</Divider>
      <List
        itemLayout="horizontal"
        dataSource={percents.reverse()}
        renderItem={item => {
          return (
            <List.Item>
              <List.Item.Meta
                avatar={
                  parseInt(item.percent) === 100 ? // 上传完成后，展示图片
                    <Image width={60} height={60} src={(localDomain + "/api/upload/priview?filename=" + item.fname + "&" + Math.random())} /> :
                    <div style={{ width: 60, height: 60, textAlign: 'center' }}><LoadingOutlined style={{ fontSize: 24 }} /></div>
                }
                title={item.fname}
                description={<Progress percent={item.percent} />}
              />
            </List.Item>
          )
        }}
      />
    </PageHeader>
  );
}
