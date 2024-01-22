// import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/


function defineConfig({ mode }) {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          // target: "https://backend-of-inventory-management-system.vercel.app", 
          target: env.VITE_API, // Replace with your API URL
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    }
  }
}

export default defineConfig;
