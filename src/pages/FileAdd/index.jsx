import React, { useState, useEffect } from "react";
import "../../styles/fileadd.css";
import ProgressBar from "./ProgressBar";


export default function FileAdd() {
  const [percents, setPercents] = useState([0]);

  useEffect(() => {
    setPercents([10,20,15]);
  }, []);

  var fileChange = (event)=>{
    console.log(event.target.files[0])
  }

  return (
    <>
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
    </>
  );
}
