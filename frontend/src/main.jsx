import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./styles/sidebar.css";
import "./styles/navbar.css";
import "./styles/form.css";
import "./styles/history.css";
import "./styles/responsive.css";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles/darkTheme.css";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <ThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
   </ThemeProvider>
  </React.StrictMode>
);