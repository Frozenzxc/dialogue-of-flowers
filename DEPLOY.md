# Деплой «Диалог цветов» на VPS

Сайт: **диалогцветов.рф** (punycode: `xn--80aeacdjrz1ad7b6b.xn--p1ai`)

## Архитектура

```
интернет :80/:443
└── web       — nginx: статика Nuxt SPA (ssr:false, nuxi generate)
                + reverse-proxy /cms/* -> strapi:1337
    ├── strapi — Strapi 5 (Node 22), внутренний порт 1337
    │   └── ./data/uploads:/opt/app/public/uploads  (медиа на хосте)
    └── db     — postgres:17-alpine, внутренний порт 5432
        └── volume pgdata
```

Один домен, один origin: фронтенд ходит на API по относительному пути `/cms`,
поэтому CORS не настраивается вовсе. Стек целиком описан в `docker-compose.yml`
в корне репозитория.

---

## 1. Подготовка VPS

Требуется ~2 ГБ RAM для сборки Strapi (можно меньше, если добавить swap):

```bash
# swap при необходимости (VPS с 1 ГБ):
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile \
  && sudo mkswap /swapfile && sudo swapon /swapfile \
  && echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Docker + compose plugin (Ubuntu/Debian):
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER  # перелогиниться после
```

## 2. DNS

A-запись `диалогцветов.рф` (и `www`) → IP сервера.
Проверка: `dig +short xn--80aeacdjrz1ad7b6b.xn--p1ai`

## 3. Развёртывание

```bash
git clone <репозиторий> /opt/dialogue-of-flowers
cd /opt/dialogue-of-flowers

cp deploy/.env.example .env
# заполнить .env:
#   POSTGRES_PASSWORD и все секреты Strapi
#   генерация секрета:  openssl rand -base64 32
#   APP_KEYS: 4 значения через запятую
nano .env

mkdir -p data/uploads deploy/certbot/www

docker compose up -d --build
```

Первый запуск: Strapi сам создаёт схему в postgres, занимает 1–2 минуты.

Проверка:

```bash
docker compose ps                 # все services Up/healthy
curl -s localhost/ | head         # HTML фронтенда
curl -s localhost/cms/api/gallery-list?populate=*   # JSON галереи
```

Админка: `http://<домен>/cms/admin`

## 4. Перенос данных из старого SQLite

На старом окружении (или локально, где лежит `.tmp/data.db`), из корня репозитория:

```bash
cd src/admin/server
# strapi сам добавит .tar.gz к имени, файл появится в корне репозитория
npx strapi export --no-encrypt -f ../../export
cd ../..
```

Архив содержит контент, права, конфигурацию и файлы. Админ-аккаунты и
API-токены не переносятся в принципе.

**Важно:** `strapi import` с файлами (`--exclude` не указан) пытается
переименовать `public/uploads` — а это точка монтирования тома, переименовать
её нельзя. Поэтому файлы исключаем и копируем руками:

```bash
# 1. данные без файлов: контент, права public-роли, конфиги
docker compose cp export.tar.gz strapi:/opt/app/
docker compose exec strapi npm run strapi -- import -f export.tar.gz --force --exclude files

# 2. файлы — из репозитория (это те же самые загруженные картинки)
mkdir -p data/uploads
cp -r src/admin/server/public/uploads/* data/uploads/

# 3. перезапуск
docker compose restart strapi
```

Админ-аккаунт создаётся заново (пароль задаёте вы):

```bash
docker compose exec strapi npm run strapi -- admin:create-user \
  -f Aleksandr -e you@example.com -p 'СЛОЖНЫЙ_ПАРОЛЬ'
```

Проверка: `curl -s localhost/cms/api/gallery-list?populate=*` — должен вернуть
JSON с записями и картинками `/uploads/*.webp`.

## 5. SSL (Let's Encrypt)

Пока сертификата нет, сайт работает по http. Выпуск (certbot на хосте,
webroot прокинут в контейнер `web`):

```bash
sudo apt install -y certbot
sudo certbot certonly --webroot -w /opt/dialogue-of-flowers/deploy/certbot/www \
  -d xn--80aeacdjrz1ad7b6b.xn--p1ai -d www.xn--80aeacdjrz1ad7b6b.xn--p1ai
```

Затем в `docker-compose.yml` у сервиса `web` раскомментировать строки
`443:443`, том `/etc/letsencrypt` и `deploy/nginx-ssl.conf`, скопировать конфиг:

```bash
cp deploy/nginx-ssl.conf.example deploy/nginx-ssl.conf
docker compose up -d   # применит тома и порт
```

Продление — само (systemd-таймер certbot), но nginx надо перечитывать
сертификаты. Крон на хосте:

```cron
0 4 * * 1 docker exec web nginx -s reload
```

## 6. Бэкапы

Всё ценное — postgres и `data/uploads`:

```bash
# /etc/cron.d/flowers-backup
30 3 * * * cd /opt/dialogue-of-flowers && mkdir -p backups && \
  docker compose exec -T db pg_dump -U strapi strapi | gzip > backups/db_$(date +\%F).sql.gz && \
  tar -czf backups/uploads_$(date +\%F).tar.gz data/uploads && \
  find backups -mtime +14 -delete
```

## 7. Обновление

```bash
cd /opt/dialogue-of-flowers
git pull
docker compose up -d --build
```

## 8. Медиа галереи

- **Хранение**: Strapi остаётся единственным источником правды. Загруженные
  файлы лежат на хосте в `data/uploads` (bind-mount), переживают пересборку и
  удаление контейнеров. Бэкап — копия этой папки.
- **Именование**: Strapi сам создаёт `{имя}_{hash}.webp` и варианты
  `large_/medium_/small_/thumbnail_` — менять не нужно, фронтенд использует
  эти размеры.
- **Исходники**: несжатые оригиналы для заполнения БД хранятся в репозитории:
  `src/frontend/assets/img/gallery/`, `src/frontend/assets/img/souvenirs/`.
- **Рост → S3**: если объём вырастет или появится второй сервер, ставится
  `@strapi/provider-upload-aws-s3`, провайдер меняется в
  `config/plugins.ts` (endpoint'ы Yandex Object Storage / Timeweb S3 / R2
  совместимы с AWS SDK), существующие файлы копируются в бакет. На текущих
  объёмах (~3.5 МБ) это избыточно.

## 9. Локальная разработка

Без Docker всё работает как раньше — sqlite:

```bash
# CMS
cd src/admin/server && npm install && npm run dev     # :1337, DATABASE_CLIENT=sqlite
# Фронтенд
cd src/frontend && yarn install && yarn dev           # :3000, API на localhost:1337
```
