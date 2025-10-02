#!/bin/sh
set -e

export PORT=${PORT:-80}

echo "Запуск nginx на порту ${PORT}..."
exec nginx -g "daemon off;"
