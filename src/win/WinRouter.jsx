import React from "react";
import { Routes,Route } from "react-router-dom";

// 窗口部分
import WinApp from "./WinApp";
import Files from "./pages/Files";

export default function WinRouter() {
  return (
    <Routes>
      <Route path="/" element={<WinApp />}>
        <Route path="/" element={<Files />} />
      </Route>
    </Routes>
  );
}
