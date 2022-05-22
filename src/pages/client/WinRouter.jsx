import React from "react";
import { Routes, Route } from "react-router-dom";

import NoMatch from "./NoMatch";
// 窗口部分
import WinApp from "./WinApp";
// 局域网文件传输
import FileLayout from "./Files/FileLayout";
import FilesUpload from "./Files/Upload";
import FileConf from "./Files/FileConf";
import DataList from "./Files/DataList";
// 账号管理
import AcLayout from "./Account/AcLayout";
import AcInfo from "./Account/AcInfo";
import AcGroups from "./Account/AcGroups";
import AcList from "./Account/AcList";

export default function WinRouter() {
  return (
    <Routes>
      <Route path="/win" element={<WinApp />}>
        <Route path="account" element={<AcLayout />}>
          <Route path="" element={<AcInfo />} />
          <Route path="groups" element={<AcGroups />} />
          <Route path="list" element={<AcList />} />
        </Route>
        <Route path="file" element={<FileLayout />}>
          <Route path="" element={<FilesUpload />} />
          <Route path="list" element={<DataList />} />
          <Route path="conf" element={<FileConf />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
