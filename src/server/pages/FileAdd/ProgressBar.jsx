import React from "react";

export default function ProgressBar(props) {
  return (
    <div className="precent">
      <div>{props.fname}</div>
      <input type="range" readOnly value={props.percent} />
      <span>{props.percent}%</span>
    </div>
  );
}
