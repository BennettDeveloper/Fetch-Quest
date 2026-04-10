import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/cheapshark': {
        target: 'https://www.cheapshark.com/api/1.0',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cheapshark/, ''),
      },
      '/api/rawg': {
        target: 'https://api.rawg.io/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/rawg/, ''),
      },
    },
  },
})
