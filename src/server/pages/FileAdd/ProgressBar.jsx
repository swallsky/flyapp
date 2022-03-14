import React from "react";

export default function ProgressBar(props) {
  return (
    <div className="precent">
      <input type="range" readOnly value={props.percent} />
      <span>{props.percent}%</span>
    </div>
  );
}