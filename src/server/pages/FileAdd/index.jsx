import React, { useState, useEffect } from "react";
import "../../styles/fileadd.css";
import ProgressBar from "./ProgressBar";

import ShardUpload from "./shardupload";


export default function FileAdd() {
  const [percents, setPercents] = useState([0]);

  useEffect(() => {
    setPercents([10,20,15]);
  }, []);

  // 文件变改时
  var fileChange = async (event)=>{
    let files = event.target.files;
    // console.log(files.length);
    // let file = files[0];
    for(let i=0;i<files.length;i++){
      await ShardUpload(files[i]);
    }
  }

  return (
    <div className="fileaddwarp">
      <div>
        <input type="file" multiple name="avatar" onChange={fileChange} />
        <div>
          <input type="button" readOnly value="提交" />
          <input type="button" readOnly value="暂停" />
        </div>
        {
          percents.map((percent,index)=><ProgressBar key={index} percent={percent} />)
        }
      </div>
    </div>
  );
}
