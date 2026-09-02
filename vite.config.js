import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IDNcheat — Vite config
// host 0.0.0.0 + allowedHosts: true agar preview (proxy e2b.app) tetap terjawab
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: true,
    proxy: {
      // Server chat + roster user (WebSocket + HTTP API) → port 3001
      '/ws': { target: 'ws://localhost:3001', ws: true },
      '/api': { target: 'http://localhost:3001', changeOrigin: true },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
