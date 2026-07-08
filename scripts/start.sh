#!/bin/bash
set -e

# HF Spaces 通过 VITE_MINIMAX_API_KEY 环境变量注入 API Key
# 替换构建时写入的占位符 __API_KEY__
if [ -n "$VITE_MINIMAX_API_KEY" ]; then
  echo "🔑 Injecting MiniMax API key..."
  find /usr/share/nginx/html -name '*.js' -exec \
    sed -i "s|__API_KEY__|${VITE_MINIMAX_API_KEY}|g" {} +
fi

echo "🚀 Starting PM Portfolio (static)..."
nginx -g "daemon off;"
