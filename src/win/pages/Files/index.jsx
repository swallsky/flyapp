import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';

function Files(props) {
  const [apiDomain,setApiDomain] = useState(props.apiDomain+'/api/upload/qrcode');

  useEffect(()=>{
  },[])


  return (
    <div>
      <div>本地IP: {props.apiDomain}</div>
      <img src={apiDomain} alt='扫码上传文件' />
    </div>
  )
}

//state映射
const mapStateToProps = (state)=>{
  return {
    apiDomain:state.apiDomain, //服务端域名
  }
}

export default connect(mapStateToProps)(Files);