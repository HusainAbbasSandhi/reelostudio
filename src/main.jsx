import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SiteGenTool from "./SiteGenTool.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SiteGenTool />
  </StrictMode>
);
