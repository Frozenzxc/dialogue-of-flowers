# ---------- Сборка ----------
FROM node:24-bookworm-slim AS builder

# python3/make/g++ нужны для сборки нативных модулей (better-sqlite3)
RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# PUBLIC_URL при сборке задаёт префикс ассетов админки (запекается в dist/build),
# должен совпадать с путём, под которым Strapi проксируется в nginx (/cms)
ARG PUBLIC_URL
ENV PUBLIC_URL=$PUBLIC_URL

RUN npm run build

# ---------- Рантайм ----------
FROM node:24-bookworm-slim AS runtime

ENV NODE_ENV=production
WORKDIR /opt/app

COPY --from=builder /opt/app/node_modules ./node_modules
COPY --from=builder /opt/app/dist ./dist
# исходники и tsconfig нужны strapi start: он компилирует TS-конфиги при старте
COPY --from=builder /opt/app/tsconfig.json ./tsconfig.json
COPY --from=builder /opt/app/config ./config
COPY --from=builder /opt/app/src ./src
COPY --from=builder /opt/app/public ./public
COPY --from=builder /opt/app/favicon.png ./favicon.png
COPY --from=builder /opt/app/package.json ./package.json

# папка загрузок прокинута volume'ом, но должна существовать
RUN mkdir -p public/uploads

EXPOSE 1337

CMD ["npm", "start"]
