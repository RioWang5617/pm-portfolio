import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
    },
    define: {
      'import.meta.env.VITE_MINIMAX_API_KEY': JSON.stringify(env.VITE_MINIMAX_API_KEY || ''),
      'import.meta.env.VITE_MINIMAX_API_BASE': JSON.stringify(env.VITE_MINIMAX_API_BASE || 'https://api.minimaxi.com/v1'),
      'import.meta.env.VITE_MINIMAX_CHAT_MODEL': JSON.stringify(env.VITE_MINIMAX_CHAT_MODEL || 'MiniMax-M3'),
    },
  }
})
