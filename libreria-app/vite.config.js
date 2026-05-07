// vite.config.js — Configuración del bundler
// @vitejs/plugin-react habilita Fast Refresh (HMR) y la transformación de JSX

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
