import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  //eslint-disable-next-line
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.VITE_API_BASE_URL": JSON.stringify(env.VITE_API_BASE_URL),
    },
    plugins: [react()],
    build: { chunkSizeWarningLimit: 2000 },
    // Add the server configuration here
    server: {
      host: true, // This enables access from other devices on the network
    },
  };
});
