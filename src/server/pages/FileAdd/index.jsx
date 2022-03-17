import React, { useState, useEffect } from "react";
import "../../styles/fileadd.css";
import ProgressBar from "./ProgressBar";
import Share from './shard';
import axios from "axios";

/**
 * 文件上传组件
 * @returns 
 */
function FileAdd() {
  const [localDomain, setLocalDomain] = useState('');
  const [percents, setPercents] = useState([]);

  useEffect(() => {
    // 设置api domain
    let host = window.location.host;
    let apiDomain = 'localhost:3000'===host?
      'http://localhost:4321': //开发环境
      'http://' + host; //正式环境
    setLocalDomain(apiDomain);
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
    percents[fsn] = {fname,percent};
    setPercents(()=>[...percents]);
  }

  // 文件变改时
  var fileChange = async (event) => {
    //判断上传目录是存在
    let dirData = await axios.get(localDomain+'/api/upload/getpath');
    if(dirData.data.status === 404){
      alert(dirData.data.data);
      return;
    }

    let files = event.target.files;
    //同时上传多个文件
    for (let i = 0; i < files.length; i++) {
      await Share(localDomain, i, files[i], setPrecent);
    }
  }

  return (
    <div className="fileaddwarp">
      <div>{localDomain}</div>
      <div>
        <input type="file" multiple name="avatar" onChange={fileChange} />
        {
          percents.map((data, index) => <ProgressBar key={index} percent={data.percent} fname={data.fname} />)
        }
      </div>
    </div>
  );
}

export default FileAdd;
