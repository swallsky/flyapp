import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import App from "./App";

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* <Route path="/login" element={<Login />} /> */}
        </Route>
      </Routes>
    </HashRouter>
  );
}
