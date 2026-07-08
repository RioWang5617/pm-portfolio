# Stage 1: 前端构建
FROM node:22-alpine AS frontend
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile --ignore-scripts

# 手动跑 esbuild postinstall
RUN for v in esbuild@0.21.3 esbuild@0.28.1; do \
      dir=$(find .pnpm -maxdepth 3 -type d -name "$v" 2>/dev/null | head -1) && \
      if [ -n "$dir" ] && [ -f "$dir/node_modules/esbuild/install.js" ]; then \
        echo "Running esbuild postinstall for $v"; \
        cd "$dir/node_modules/esbuild" && node install.js && cd /app; \
      fi; \
    done

COPY src ./src
COPY tsconfig.json tsconfig.node.json vite.config.ts tailwind.config.js postcss.config.js index.html ./
RUN pnpm run export-data || true
# API Key 用占位符，运行时通过环境变量注入
RUN VITE_MINIMAX_API_KEY=__API_KEY__ pnpm build

# Stage 2: 纯静态 Nginx
FROM nginx:stable-alpine AS runtime

RUN apk add --no-cache curl bash

COPY --from=frontend /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY scripts/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 7860

HEALTHCHECK --interval=60s --timeout=5s --start-period=15s --retries=3 \
  CMD curl -fsS http://localhost:7860/health || exit 1

CMD ["/start.sh"]
