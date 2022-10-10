import { Hash } from "crypto";
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/:coinId/*" element={<Coin />} />
        <Route path="/" element={<Coins />} />
      </Routes>
    </HashRouter>
  );
}
