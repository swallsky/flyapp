import React, { useState, useEffect } from 'react';
import request from '../../../request';
import { PageHeader, Divider, Descriptions, Button, message } from "antd";

export default function FileConf(props) {
    const [saveDir, setSaveDir] = useState(''); // 上传保存目录
    const [localIP, setLocalIP] = useState(''); // 本地ip

    useEffect(() => {
        // 获取本地ip
        request.get('/api/get-remote-api').then(dm => {
            setLocalIP(dm.data); //修改为局域网ip port
        });
        // 获取保存目录
        request.get('/api/upload/getpath').then(data => {
            setSaveDir(data.data.data);
        });
    }, [])

    async function openDir() {
        let dirs = await window.electronApi.saveDir();
        if (dirs) {
            let res = await request.post('/api/upload/uppath', { data: dirs[0] });
            setSaveDir(res.data.dir); //显示保存目录
            message.success('目录设置成功');
        } else {
            console.log(dirs);
        }
    }

    return (
        <PageHeader
            title="配置信息"
            subTitle="文件上传配置信息"
            ghost={false}>
            <Divider orientation="left">文件上传配置</Divider>
            <Descriptions size="small" column={1} bordered>
                <Descriptions.Item label={<Button type='primary' onClick={openDir}>请选择目录</Button>}>{saveDir}</Descriptions.Item>
                <Descriptions.Item label="文件切片大小">2M</Descriptions.Item>
                <Descriptions.Item label="本地服务地址">{localIP}</Descriptions.Item>
            </Descriptions>
        </PageHeader>
    )
}