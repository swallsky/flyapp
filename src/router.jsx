import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import FileAdd from "./pages/FileAdd";

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<FileAdd />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
