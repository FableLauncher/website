import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n/config";
import App from "./App";
import { homeScreen } from "./assets/launcherScreens";

const container = document.getElementById("root");
if (!container) throw new Error("The page is missing the #root mount element.");

const heroPreload = document.createElement("link");
heroPreload.rel = "preload";
heroPreload.as = "image";
heroPreload.type = "image/svg+xml";
heroPreload.href = homeScreen;
document.head.append(heroPreload);

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
