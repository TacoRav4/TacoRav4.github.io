import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { PortfolioApp } from "./static-app";

hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <PortfolioApp pathname={window.location.pathname} />
  </StrictMode>,
);
