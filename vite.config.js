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
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
