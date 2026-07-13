import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: command === 'build' ? (env.VITE_BASE_URL || '/De-ra-z-floricultura/') : '/',
    plugins: [react()],
    server: {
      watch: {
        usePolling: true,
      },
      proxy: {
        '/api': {
          target: 'http://localhost:4000',
          changeOrigin: true,
        },
      },
    },
  }
})
