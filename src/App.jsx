import React from "react";

import { Outlet } from "react-router-dom";

import "./App.css";

import ActivityBar from "./pages/Layout/ActivityBar";

/**
 * 基础布局
 */
export default function App() {

  return (
    <div>
      <div className="titlBar"></div>
      <ActivityBar />
      <Outlet />
    </div>
  );
}
