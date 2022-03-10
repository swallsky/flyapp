import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

// 服务端部分
import SerApp from "./server/SerApp";
import FileAdd from "./server/pages/FileAdd";

// 窗口部分
import WinApp from "./win/WinApp";
import Files from "./win/pages/Files";

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<WinApp />}>
          <Route path="/" element={<Files />} />
        </Route>
        <Route path="/s" element={<SerApp />}>
          <Route path="/s/f" element={<FileAdd />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
