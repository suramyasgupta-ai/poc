import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_API_URL, VITE_WEB_PORT } = env;

  return {
    plugins: [react()],
    server : {
      host: true,
      port: VITE_WEB_PORT,
      strictPort: true,
      // proxy: {
      //   '/api': {
      //     target: VITE_API_URL,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // },
      watch: {
        usePolling: true,
      }
    }
  };
});
