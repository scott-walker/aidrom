#!/bin/sh
set -e

export NGINX_PORT=${NGINX_PORT:-80}

envsubst '
  $NGINX_PORT
' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

echo "Запуск nginx на порту ${NGINX_PORT}..."
exec nginx -g "daemon off;"
