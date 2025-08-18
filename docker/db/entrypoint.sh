#!/bin/sh
set -e

# Чтобы было удобно 🙃😇
echo "alias ll='ls -lah'" >> ~/.bashrc

POSTGRES_PATH=$(which postgres)
POSTGRES_INIT="$POSTGRES_PATH -D /var/lib/postgresql/data"

# tail -f /dev/null
su - postgres -c "$POSTGRES_INIT"
