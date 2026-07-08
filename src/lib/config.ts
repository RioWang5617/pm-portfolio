/**
 * 前端环境变量 — 通过 VITE_* 前缀注入
 */
export const config = {
  minimaxApiKey: import.meta.env.VITE_MINIMAX_API_KEY || '',
  minimaxApiBase: import.meta.env.VITE_MINIMAX_API_BASE || 'https://api.minimaxi.com/v1',
  minimaxChatModel: import.meta.env.VITE_MINIMAX_CHAT_MODEL || 'MiniMax-M3',
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'https://ivlrszbwekymbydhnlre.supabase.co',
} as const
