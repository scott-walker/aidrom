#!/bin/sh
set -e

# Чтобы было удобно 🙃😇
echo "\n\nalias ll='ls -lah'" >> ~/.bashrc

# USER=$(whoami)
# GROUPS=$(groups)
# echo "I AM '$USER' AND MY GROUPS IS '$GROUPS'"
# find /var/lib/postgresql/data -maxdepth 1 -type f -exec chmod 0744 {} \;

chmod -R 0750 /var/lib/postgresql/data
chmod -R 0777 /var/lib/postgresql/data/*

POSTGRES_PATH=$(which postgres)
POSTGRES_INIT="$POSTGRES_PATH -D /var/lib/postgresql/data"

su - postgres -c "$POSTGRES_INIT"
