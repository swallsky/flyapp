import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import WinRouter from "./win/WinRouter";
import SerRouter from "./server/SerRouter";
import { Provider } from "react-redux";
import store from "./store";
import './assets/App.css';

export default function Router() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="win" />} />
        </Routes>
        <WinRouter />
        <SerRouter />
      </HashRouter>
    </Provider>
  );
}
