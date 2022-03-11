import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import WinRouter from "./win/WinRouter";
import SerRouter from "./server/SerRouter";
import NoMatch from "./NoMatch";

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="win" />} />
      </Routes>
      <WinRouter />
      <SerRouter />
      <Routes>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </HashRouter>
  );
}
