import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StudentProvider } from "./Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StudentProvider>
    <App />
  </StudentProvider>
);
