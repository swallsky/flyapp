import React, { useState, useEffect } from "react";
import "../../styles/fileadd.css";
import ProgressBar from "./ProgressBar";
import ShardUpload from "./shardupload";


export default function FileAdd() {
  const [percents, setPercents] = useState([]);

  useEffect(() => {
    // setPercents([10,20,15]);
    console.log('percent:',percents);
  }, [percents]);

  // 计算百分比
  function setPrecent(i,nowUploadNums, blockCount){
    let percent = Math.ceil(nowUploadNums/blockCount)*100;
    let newper = [...percents];
    // newper[i] = percent;
    newper.push(percent);
    setPercents(newper);
    console.log(i,newper,percents);
  }

  // 文件变改时
  var fileChange = async (event)=>{
    let files = event.target.files;
    // console.log(files.length);
    // let file = files[0];
    // for(let i=0;i<files.length;i++){
      // await ShardUpload(i,files[i],setPrecent);
      await ShardUpload(0,files[0],setPrecent);
    // }
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
