# Чистый nginx-реверспрокси: не содержит сборки, пересобирается мгновенно.
# Статика и HTML отдаёт SSR-сервер frontend:3000 (nitro), /cms — Strapi.
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
