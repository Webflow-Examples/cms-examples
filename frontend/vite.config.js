import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Listen on all network interfaces
    port: 3000, // Optional: Define a port, or remove to use the default (3000 or auto-assigned)
    strictPort: true, // Optional: If true, Vite will fail if the port is already in use
  },
});
