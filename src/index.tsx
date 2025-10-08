import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Mehr } from "./screens/Mehr";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Mehr />
  </StrictMode>,
);
