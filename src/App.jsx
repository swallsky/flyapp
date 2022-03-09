import React from "react";

import { Outlet } from "react-router-dom";

import "./App.css";
import Layout from "./pages/Layout/Layout";
/**
 * 基础布局
 */
export default function App() {

  return (
    <div>
      <div className="titlBar"></div>
      <Layout />
      <Outlet />
    </div>
  );
}
