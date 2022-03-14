import React, { useState, useEffect } from "react";
import "../../styles/fileadd.css";
import ProgressBar from "./ProgressBar";
import Share from './shard';


export default function FileAdd() {
  const [percents, setPercents] = useState([]);

  useEffect(() => {
    // setPercents([10,20,15]);
    console.log('percent:',percents.length,percents);
  }, [percents]);

  // 计算百分比
  function setPrecent(i,nowUploadNums, blockCount){
    let percent = Math.ceil(nowUploadNums/blockCount)*100;
    let newper = [...percents,percent];
    // newper[i] = percent;
    setPercents(newper);
    console.log(i,newper,percents);
  }

  // 文件变改时
  var fileChange = async (event)=>{
    let files = event.target.files[0];
    // console.log(files.length);
    // for(let i=0;i<files.length;i++){
    //   await ShardUpload(i,files[i],setPrecent);
    // }
    Share(files);
  }

  return (
    <div className="fileaddwarp">
      <div>
        <input type="file" multiple name="avatar" onChange={fileChange} />
        {
          percents.map((percent,index)=><ProgressBar key={index} percent={percent} />)
        }
      </div>
    </div>
  );
}