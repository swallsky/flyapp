import React, { useState, useEffect } from "react";
import "../../styles/fileadd.css";
import ProgressBar from "./ProgressBar";
import Share from './shard';

/**
 * 文件上传组件
 * @returns 
 */
function FileAdd() {
  const [localDomain, setLocalDomain] = useState('');
  const [percents, setPercents] = useState([]);

  useEffect(() => {
    setLocalDomain('http://' + window.location.host);
  }, []);

  // 计算百分比
  function setPrecent(i, nowUploadNums, blockCount) {
    let percent = Math.ceil(nowUploadNums / blockCount) * 100;
    let newper = [...percents, percent];
    // newper[i] = percent;
    setPercents(newper);
    console.log(i, newper, percents);
  }

  // 文件变改时
  var fileChange = async (event) => {
    let apiDomain = 'http://' + window.location.host; // 获取本地ip+port地址
    let files = event.target.files;
    //同时上传多个文件
    for (let i = 0; i < files.length; i++) {
      await Share(apiDomain, i, files[i], setPrecent);
    }
  }

  return (
    <div className="fileaddwarp">
      <div>{localDomain}</div>
      <div>
        <input type="file" multiple name="avatar" onChange={fileChange} />
        {
          percents.map((percent, index) => <ProgressBar key={index} percent={percent} />)
        }
      </div>
    </div>
  );
}

export default FileAdd;
