import React, { useState, useEffect } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

export default function RsXterm() {
  const [renderID,setRenderID] = useState("testID");

  function getTerm() {
    const term = new Terminal({
        rendererType: 'canvas', // 渲染方式
        convertEol: true, //启用时，光标将设置为下一行的开头
        cursorStyle: 'underline', //光标样式
        cursorBlink: true, //光标闪烁
        disableStdin: false, // 是否禁用输入
    });
    term.open(document.getElementById(renderID));//帮定dom结点
    // 自适应大小(使终端的尺寸和几何尺寸适合终端容器尺寸),初始化的时候宽高是对的
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    fitAddon.fit();

    term.write('admin $ \x1B[1;3;31mxterm.js\x1B[0m $ ');
    // term.onData((val)=>{
    //   console.log(typeof val);
    //     // term.write(val);
    //     // console.log(val);
    // });
    // 输入
    // term.onKey(e=>{
    //     const ev = e.domEvent;
    //     console.log(ev.key);
    //     // const printable = !ev.altKey && !ev.altGrphKey && !ev.ctrlKey && !ev.metaKey;
    //     // if(ev.key === 'Enter'){ //回车
    //     //     term.prompt();
    //     // } else if (ev.key === 'BackSpace'){ // 回退键
    //     //     console.log('>>',ev.key);
    //     //     // if(term._core.buffer.x > 2){
    //     //     //     term.write('\b \b');
    //     //     // }
    //     // }else if (printable){
    //     //     term.write(e.key);
    //     //     //socket部分
    //     // }
    // })
  }

  useEffect(() => {
    setRenderID("testID");
    if(renderID!=='') getTerm();
  }, [renderID]);
  return (
    <>
      <div id={renderID} style={{height:'100vh'}}></div>
    </>
  );
}
