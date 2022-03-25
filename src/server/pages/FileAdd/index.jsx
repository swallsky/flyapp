import React, { useState, useEffect } from "react";
import "../../styles/fileadd.css";
import Share from './shard';
import axios from "axios";
import { PageHeader, Descriptions, Progress, message, List,Divider } from "antd";

/**
 * 文件上传组件
 * @returns 
 */
function FileAdd() {
  const [localDomain, setLocalDomain] = useState('');
  const [percents, setPercents] = useState([]);
  const [saveDir, setSaveDir] = useState(''); // 上传保存目录

  useEffect(() => {
    // 设置api domain
    let host = window.location.host;
    let apiDomain = 'localhost:3000' === host ?
      'http://localhost:4321' : //开发环境
      'http://' + host; //正式环境
    setLocalDomain(apiDomain);

    // 获取保存目录
    axios.get(apiDomain + '/api/upload/getpath').then(data => {
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
    let dirData = await axios.get(localDomain + '/api/upload/getpath');
    if (dirData.data.status === 404) {
      message.error(dirData.data.data);
      return;
    }
    let files = event.target.files;
    //同时上传多个文件
    for (let i = 0; i < files.length; i++) {
      await Share(localDomain, i, files[i], setPrecent);
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
        dataSource={percents}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.fname}
              description={<Progress percent={item.percent} />}
            />
          </List.Item>
        )}
      />
    </PageHeader>
  );
}

export default FileAdd;
