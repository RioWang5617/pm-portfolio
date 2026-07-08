# 纯静态 nginx：直接提供预构建文件
FROM nginx:stable-alpine

RUN apk add --no-cache curl

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY index.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/
COPY favicon.svg /usr/share/nginx/html/
COPY avatar.png /usr/share/nginx/html/ 2>/dev/null || true

EXPOSE 7860

HEALTHCHECK --interval=60s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -fsS http://localhost:7860/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
