#!/bin/sh
set -e

# Подставляем переменные окружения в конфигурационный файл
envsubst '
  $API_HOST
  $API_PROXY_PASS
  $FRONTEND_HOST
  $FRONTEND_PROXY_PASS
' < /tmp/default.env.conf > /etc/nginx/conf.d/default.conf

# Чтобы было удобно 🙃😇
echo "\n\nalias ll='ls -lah'" >> ~/.bashrc

# tail -f /dev/null
nginx -g 'daemon off;'
