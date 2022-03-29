import React from "react";
import { Routes,Route } from "react-router-dom";

import NoMatch from "./pages/NoMatch";
// 窗口部分
import WinApp from "./WinApp";
import Files from "./pages/Files";
import Conf from "./pages/Conf";

export default function WinRouter() {
  return (
    <Routes>
      <Route path="/win" element={<WinApp />}>
        <Route path="" element={<Files />} />
        <Route path="conf" element={<Conf />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
