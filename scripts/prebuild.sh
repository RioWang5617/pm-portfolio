#!/bin/bash
# HF Static Spaces 构建时注入 API Key
# 如果设置了 HF_MINIMAX_KEY 环境变量，写入 .env
if [ -n "$HF_MINIMAX_KEY" ]; then
  echo "VITE_MINIMAX_API_KEY=$HF_MINIMAX_KEY" > .env
  echo "✅ API key injected from HF secret"
fi
# 如果没有设置，检查 .env.local 是否存在（本地开发）
if [ ! -f .env ] && [ -f .env.local ]; then
  cp .env.local .env
  echo "✅ API key loaded from .env.local"
fi
