import "animate.css/animate.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "@examples/shared/dist/styles.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
