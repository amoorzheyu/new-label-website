import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(), 
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/getIcon': {
        target: 'https://service.yijun.fun/api/favicon',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/getIcon/, '')
      }
    }
  }
})
