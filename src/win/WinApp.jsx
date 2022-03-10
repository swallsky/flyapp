import React from "react";


import "./styles/App.css";
import Layout from "./pages/Layout/Layout";
/**
 * 基础布局
 */
export default function WinApp() {

  return (
    <div>
      <div className="titlBar"></div>
      <Layout />
    </div>
  );
}
