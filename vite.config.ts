import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const minimaxKey = env.VITE_MINIMAX_API_KEY || 'sk-cp-w1NhrE_uyPwNBOA5kBwC8SvypRMplyYExGRJrQlO9PlV7gXfE12HfWYW8ubb_KYCieeYU2mNAHeU6RXnPigWjLvYsqBMPZuZyP3YKNSDxDcv9neK4hpuwpw'
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
    },
    define: {
      'import.meta.env.VITE_MINIMAX_API_KEY': JSON.stringify(minimaxKey),
      'import.meta.env.VITE_MINIMAX_API_BASE': JSON.stringify(env.VITE_MINIMAX_API_BASE || 'https://api.minimaxi.com/v1'),
      'import.meta.env.VITE_MINIMAX_CHAT_MODEL': JSON.stringify(env.VITE_MINIMAX_CHAT_MODEL || 'MiniMax-M3'),
    },
  }
})
