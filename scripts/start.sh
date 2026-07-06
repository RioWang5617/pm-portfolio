#!/bin/sh
set -e

echo "🚀 Starting PM Portfolio..."

# 后端
cd /app/backend
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 1 &
BACKEND_PID=$!

# 前端（Nginx 在前台）
nginx -g "daemon off;"

# 如果 nginx 退出，关闭后端
kill $BACKEND_PID 2>/dev/null || true
