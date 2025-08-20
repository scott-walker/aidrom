#!/bin/sh
set -e

# Чтобы было удобно 🙃😇
echo "\n\nalias ll='ls -lah'" >> ~/.bashrc

# Перезаписать стандартную конфигурацию
cp -f /tmp/postgresql.conf /var/lib/postgresql/data/postgresql.conf

# Использовать стандартный entrypoint PostgreSQL
exec docker-entrypoint.sh postgres
