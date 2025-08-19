#!/bin/sh
set -e

npm i
npm run dev -- --host=${HOST} --port=${PORT}
