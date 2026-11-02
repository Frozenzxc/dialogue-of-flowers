# ---------- Сборка статки Nuxt (ssr: false) ----------
FROM node:22-bookworm-slim AS builder

RUN corepack enable

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

# публичные значения runtimeConfig запекаются в бандл в момент generate
ARG NUXT_PUBLIC_STRAPI_API_URL=/cms
ARG NUXT_PUBLIC_YANDEX_METRIKA_ID=103571975
ENV NUXT_PUBLIC_STRAPI_API_URL=$NUXT_PUBLIC_STRAPI_API_URL \
    NUXT_PUBLIC_YANDEX_METRIKA_ID=$NUXT_PUBLIC_YANDEX_METRIKA_ID

RUN yarn generate

# ---------- nginx ----------
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/.output/public /usr/share/nginx/html

EXPOSE 80
