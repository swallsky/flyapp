import React from "react";
import { HashRouter,Routes,Route } from "react-router-dom";

import WinRouter from "./win/WinRouter";
import SerRouter from "./server/SerRouter";
import NoMatch from "./NoMatch";

export default function Router() {
  return (
    <HashRouter>
        <WinRouter />
        <SerRouter />
        <Routes>
          <Route path="*" element={<NoMatch />} />
        </Routes>
    </HashRouter>
  );
}
