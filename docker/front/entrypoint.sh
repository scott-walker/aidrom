#!/bin/sh
set -e

# Чтобы было удобно 🙃😇
echo "alias ll='ls -lah'" >> ~/.bashrc

npm i
npm run dev -- --host
