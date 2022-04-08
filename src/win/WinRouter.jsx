import React from "react";
import { Routes, Route } from "react-router-dom";

import NoMatch from "./pages/NoMatch";
// 窗口部分
import WinApp from "./WinApp";
// 局域网文件传输
import FileLayout from "./pages/Files/FileLayout";
import FilesUpload from "./pages/Files/Upload";
import FileConf from "./pages/Files/FileConf";
import DataList from "./pages/Files/DataList";
// 网站密码管理
import WsLayout from "./pages/WebSite/WsLayout";
import WsInfo from "./pages/WebSite/WsInfo";
import WsList from "./pages/WebSite/WsList";

export default function WinRouter() {
  return (
    <Routes>
      <Route path="/win" element={<WinApp />}>
        <Route path="file" element={<FileLayout />}>
          <Route path="" element={<FilesUpload />} />
          <Route path="list" element={<DataList />} />
          <Route path="conf" element={<FileConf />} />
        </Route>
        <Route path="website" element={<WsLayout />}>
          <Route path="" element={<WsInfo />} />
          <Route path="list" element={<WsList />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
