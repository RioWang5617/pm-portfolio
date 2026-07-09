# 多阶段构建：先用 Node 构建前端，再用 nginx 提供服务
FROM node:22-alpine AS builder

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --no-frozen-lockfile

COPY index.html vite.config.ts tsconfig*.json tailwind.config.js postcss.config.js ./
COPY scripts/ scripts/
COPY src/ src/
COPY public/ public/

RUN pnpm build

# 生产阶段：nginx 提供静态文件
FROM nginx:stable-alpine

RUN apk add --no-cache curl

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/ /usr/share/nginx/html/

EXPOSE 7860

HEALTHCHECK --interval=60s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -fsS http://localhost:7860/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
