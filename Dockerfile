# Stage 1: 前端构建
FROM node:22-alpine AS frontend
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# 用 --ignore-scripts 跳过 esbuild postinstall（因为 pnpm 10+ 阻止 esbuild build scripts）
# 我们手动跑 esbuild postinstall
RUN pnpm install --frozen-lockfile --ignore-scripts

# 手动跑 esbuild postinstall（pnpm 虚拟目录 .pnpm/esbuild@x/node_modules/esbuild/）
RUN for v in esbuild@0.21.3 esbuild@0.28.1; do \
      dir=$(find .pnpm -maxdepth 3 -type d -name "$v" 2>/dev/null | head -1) && \
      if [ -n "$dir" ] && [ -f "$dir/node_modules/esbuild/install.js" ]; then \
        echo "Running esbuild postinstall for $v"; \
        cd "$dir/node_modules/esbuild" && node install.js && cd /app; \
      fi; \
    done

COPY src ./src
COPY tsconfig.json tsconfig.node.json vite.config.ts tailwind.config.js postcss.config.js index.html ./
RUN pnpm run export-data || pnpm build
RUN pnpm build

# Stage 2: 后端 + 运行
FROM python:3.11-slim AS runtime

RUN apt-get update && apt-get install -y --no-install-recommends nginx curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app/backend

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .
COPY --from=frontend /app/dist /app/frontend_dist
COPY --from=frontend /app/src/data.json /app/src/data.json || true
COPY public /app/public

COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -f /etc/nginx/sites-enabled/default
COPY scripts/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 7860

HEALTHCHECK --interval=60s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -fsS http://localhost:7860/health || exit 1

CMD ["/start.sh"]
