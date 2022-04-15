import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import WinRouter from "./win/WinRouter";
import SerRouter from "./server/SerRouter";
import './assets/App.css';

export default function Router() {
  return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/win/file" />} />
        </Routes>
        <WinRouter />
        <SerRouter />
      </HashRouter>
  );
}
