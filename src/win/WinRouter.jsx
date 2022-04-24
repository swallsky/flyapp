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
// 账号管理
import AcLayout from "./pages/Account/AcLayout";
import AcInfo from "./pages/Account/AcInfo";
import AcGroups from "./pages/Account/AcGroups";
import AcList from "./pages/Account/AcList";

import RsXterm from "./pages/RemoteSSH/RsXterm";

export default function WinRouter() {
  return (
    <Routes>
      <Route path="/win" element={<WinApp />}>
        <Route path="file" element={<FileLayout />}>
          <Route path="" element={<FilesUpload />} />
          <Route path="list" element={<DataList />} />
          <Route path="conf" element={<FileConf />} />
        </Route>
        <Route path="account" element={<AcLayout />}>
          <Route path="" element={<AcInfo />} />
          <Route path="groups" element={<AcGroups />} />
          <Route path="list" element={<AcList />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="/ssh/remotessh" element={<RsXterm />} />
    </Routes>
  );
}
