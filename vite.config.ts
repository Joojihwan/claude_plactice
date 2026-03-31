import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/groq': {
          target: 'https://api.groq.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/groq/, ''),
        },
        '/api/supabase': {
          target: env.VITE_SUPABASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/supabase/, ''),
        },
      },
    },
  }
})
