import React from "react";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./Routes";

export default function Navigate() {
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  );
}
