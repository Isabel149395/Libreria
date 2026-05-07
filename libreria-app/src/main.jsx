// main.jsx — Punto de entrada de la aplicación
// React monta el árbol de componentes en el div#root del index.html
// Esto es Client-Side Rendering (CSR): el HTML inicial está vacío,
// React inyecta el contenido en el DOM desde el navegador.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
