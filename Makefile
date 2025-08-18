# Запуск всех контейнеров в фоновом режиме
up:
	docker compose up -d

# Остановка и удаление всех контейнеров
down:
	docker compose down --remove-orphans

# Перезапуск всех контейнеров
restart: down up

# Вывод логов для API
log-api:
	docker compose logs -f api

# Вывод логов для Фронтенда
log-front:
	docker compose logs -f front

# Вывод логов для БД
log-db:
	docker compose logs -f db

# Вывод логов для Nginx
log-nginx:
	docker compose logs -f nginx

# Вывод логов для всех сервисов
log:
	docker compose logs -f
