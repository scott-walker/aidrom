#!/bin/sh
set -e

# Подставляем переменные окружения в конфигурационный файл
envsubst '
  $FRONTEND_PUBLIC_PORT
  $FRONTEND_PUBLIC_HOST
  $FRONTEND_PROXY_PASS
  $API_PUBLIC_PORT
  $API_PUBLIC_HOST
  $API_PROXY_PASS
' < /tmp/default.env.conf > /etc/nginx/conf.d/default.conf

# Чтобы было удобно 🙃😇
echo "alias ll='ls -lah'" >> ~/.bashrc

# tail -f /dev/null
nginx -g 'daemon off;'
