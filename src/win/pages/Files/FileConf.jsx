import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { PageHeader, Divider, Descriptions, Button, message } from "antd";

function FileConf(props) {
    const [saveDir, setSaveDir] = useState(''); // 上传保存目录

    useEffect(() => {
        // 获取本地ip
        axios.get(props.apiDomain + '/api/get-remote-api').then(dm => {
            props.updateApiDm(dm.data); //修改为局域网ip port
        });
        // 获取保存目录
        axios.get(props.apiDomain + '/api/upload/getpath').then(data => {
            setSaveDir(data.data.data);
        });

    }, [props])

    async function openDir() {
        let dirs = await window.electron.ipcRenderer.invoke('open-dir');
        if (dirs) {
            let res = await axios.post(props.apiDomain + '/api/upload/uppath', { data: dirs[0] });
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
                <Descriptions.Item label="本地服务地址">{props.apiDomain}</Descriptions.Item>
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

export default connect(mapStateToProps, mapDisptchToProps)(FileConf);