import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // "/api": "http://localhost:8080"
      "/api" : "http://31.220.58.235:8081"
    }
  },
  plugins: [react()],
})
