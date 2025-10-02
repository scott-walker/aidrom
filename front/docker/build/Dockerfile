# Многоэтапная сборка для production
FROM node:current-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production образ с nginx
FROM nginx:alpine

# Установка envsubst для работы с переменными окружения
RUN apk add --no-cache gettext

# Копирование собранных файлов
COPY --from=builder /app/dist /usr/share/nginx/html

# Копирование конфигурации nginx и entrypoint
COPY ./docker/build/nginx.conf /etc/nginx/templates/default.conf.template
COPY ./docker/build/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Чтобы было удобно 🙃😇
RUN apk add --no-cache bash
RUN echo "alias ll='ls -lah'" >> /root/.bashrc

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
