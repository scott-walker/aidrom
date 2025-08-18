#!/bin/sh
set -e

# Чтобы было удобно 🙃😇
echo "alias ll='ls -lah'" >> ~/.bashrc

nginx -g 'daemon off;'
