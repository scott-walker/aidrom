# 1. Запустить Postgres
docker-compose up -d

# 2. Установить зависимости
npm install

# 3. Сгенерировать миграции
npx drizzle-kit generate

# 4. Применить миграции
npx drizzle-kit push

# 5. Запустить сервер
npm run dev