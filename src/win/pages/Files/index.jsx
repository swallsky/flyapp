import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// const { ipcRenderer } = window.require('electron');

function Files(props) {
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    axios.get(props.apiDomain + '/api/get-remote-api').then(dm => {
      props.updateApiDm(dm.data); //修改为局域网ip port
      setQrUrl(dm.data + '/api/upload/qrcode');
    });

  }, [props])

  async function openDir() {
    const { ipcRenderer } = window.electron;
    let dirs = await ipcRenderer.invoke('open-dir');
    // console.log(dirs);
    if (dirs) {
      let res = await axios.post(props.apiDomain + '/api/upload/uppath', { data: dirs[0] });
      console.log(res);
    } else {
      console.log(dirs);
    }
  }

  return (
    <div>
      <div onClick={openDir}>请选择本地保存目录</div>
      <div>本地IP: {props.apiDomain}</div>
      <img src={qrUrl} alt='扫码上传文件' />
    </div>
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