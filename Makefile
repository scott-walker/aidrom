include .env
export

.SILENT:


# ОСНОВНЫЕ КОМАНДЫ ДЛЯ РАБОТЫ С ДОКЕР-КОМПОЗОМ


# Запуск всех контейнеров в фоновом режиме
up:
	docker compose up -d

# Остановка и удаление всех контейнеров
down:
	docker compose down --remove-orphans

# Вывод логов для всех сервисов
log:
	docker compose logs -f

# Перезапуск всех контейнеров
restart: down up


# СБОРКА КОНТЕЙНЕРОВ


# Сборка контейнера для БД
db-build:
	docker build -D --no-cache \
		-f ./db/docker/Dockerfile \
		-t ${REGISTRY_DB_IMAGE_TAG} \
		./db

# Сборка контейнера для API
api-build:
	docker build -D --no-cache \
		-f ./api/docker/Dockerfile \
		-t ${REGISTRY_API_IMAGE_TAG} \
		./api

# Сборка контейнера для фронта
front-build:	
	docker build -D --no-cache \
		-f ./front/docker/Dockerfile \
		-t ${REGISTRY_FRONTEND_IMAGE_TAG} \
		./front

# Сборка контейнера для шлюза
gateway-build:
	docker build -D --no-cache \
		-f ./gateway/docker/Dockerfile \
		-t ${REGISTRY_GATEWAY_IMAGE_TAG} \
		./gateway

# Сборка всех контейнеров
build: db-build api-build front-build gateway-build


# ПОДНЯТИЕ КОНТЕЙНЕРОВ


# Запуск контейнера с БД
db-up:
	docker run -d --rm --name db \
		-e POSTGRES_PORT=${DB_PORT} \
		-e POSTGRES_DB=${DB_NAME} \
		-e POSTGRES_USER=${DB_USER} \
		-e POSTGRES_PASSWORD=${DB_PASSWORD} \
		--network ${NETWORK} \
		-p ${EXTERNAL_DB_PORT}:${DB_PORT} \
		-v ${EXTERNAL_DB_DATA}:/var/lib/postgresql/data \
		-v ${EXTERNAL_DB_LOGS}:/var/lib/postgresql/data/log \
		-v ${EXTERNAL_DB_BACKUPS}:/backups \
		${REGISTRY_DB_IMAGE_TAG}
	echo "Подожди, плиз, пока запустится БД, надобно дать права на просматр логов и тд (3 сек.) 🙏"
	sleep 3
	make -s db-perm

# Запуск контейнера с API
api-up:
	docker run -d --rm --name api \
		-e HOST=${API_HOST} \
		-e PORT=${API_PORT} \
		-e DB_CONNECTION_URL=${API_DB_CONNECTION_URL}
		--network ${NETWORK} \
		-p ${EXTERNAL_API_PORT}:${API_PORT} \
		-v ${EXTERNAL_API_LOGS}:/app/logs \
		-v ${EXTERNAL_API_RUNTIME}:/app/runtime \
		${REGISTRY_API_IMAGE_TAG}

# Запуск контейнера с фронтом
front-up:
	docker run -d --rm --name front \
		-e HOST=${FRONTEND_HOST} \
		-e PORT=${FRONTEND_PORT} \
		-e FRONTEND_BASE_URL=${FRONTEND_BASE_URL} \
		-e FRONTEND_PUBLIC_HOST=${FRONTEND_PUBLIC_HOST} \
		-e API_BASE_URL=${FRONTEND_API_BASE_URL} \
		-e API_PUBLIC_HOST=${FRONTEND_API_PUBLIC_HOST} \
		--network ${NETWORK} \
		-p ${EXTERNAL_FRONTEND_PORT}:${FRONTEND_PORT} \
		-v ${EXTERNAL_FRONTEND_LOGS}:/app/logs \
		${REGISTRY_FRONTEND_IMAGE_TAG}

# Запуск контейнера со шлюзом (переопределяем порты чтобы не конфликтовать... ну типа ты понял 😎)
gateway-up:
	docker run -d --rm --name gateway \
		-e API_HOST=${GATEWAY_API_HOST} \
		-e API_PROXY_PASS=${GATEWAY_API_PROXY_PASS} \
		-e FRONTEND_HOST=${GATEWAY_FRONTEND_HOST} \
		-e FRONTEND_PROXY_PASS=${GATEWAY_FRONTEND_PROXY_PASS} \
		--network ${NETWORK} \
		-p ${EXTERNAL_HTTP_PORT}:80 \
		-p ${EXTERNAL_HTTPS_PORT}:443 \
		-v ${GATEWAY_FRONTEND_SSL_CERT}:/etc/nginx/ssl/front.cert:ro \
		-v ${GATEWAY_FRONTEND_SSL_KEY}:/etc/nginx/ssl/front.key:ro \
		-v ${GATEWAY_API_SSL_CERT}:/etc/nginx/ssl/api.cert:ro \
		-v ${GATEWAY_API_SSL_KEY}:/etc/nginx/ssl/api.key:ro \
		-v ${EXTERNAL_GATEWAY_LOGS}:/var/log/nginx \
		${REGISTRY_GATEWAY_IMAGE_TAG}


# УДАЛЕНИЕ КОНТЕЙНЕРОВ


# Удалить контейнер с БД
db-down:
	docker rm -f db

# Удалить контейнер с API
api-down:
	docker rm -f api

# Удалить контейнер с фронтом
front-down:
	docker rm -f front

# Удалить контейнер со шлюзом
gateway-down:
	docker rm -f gateway


# ЧИСТКА ДАННЫХ


# Очистить логи БД
db-logs-clear:
	sudo find ./db/logs -mindepth 1 -maxdepth 1 ! -name ".gitignore" -exec rm -rf {} \;

# Очистить логи API
api-logs-clear:
	sudo find ./api/logs -mindepth 1 -maxdepth 1 ! -name ".gitignore" -exec rm -rf {} \;

# Очистить runtime API
api-runtime-clear:
	sudo find ./api/runtime -mindepth 1 -maxdepth 1 ! -name ".gitignore" -exec rm -rf {} \;

# Очистить логи фронта
front-logs-clear:
	sudo find ./front/logs -mindepth 1 -maxdepth 1 ! -name ".gitignore" -exec rm -rf {} \;

# Очистить логи шлюза
gateway-logs-clear:
	sudo find ./gateway/logs -mindepth 1 -maxdepth 1 ! -name ".gitignore" -exec rm -rf {} \;

# Очистить все логи
logs-clear: db-logs-clear api-logs-clear front-logs-clear gateway-logs-clear

# Добавить .gitignore во все рабочие директории
ignore-add:
	echo "*\n!*.gitignore" > ./gitignore.tmp
	sudo su -c "cat ./gitignore.tmp > ./db/logs/.gitignore"
	sudo su -c "cat ./gitignore.tmp > ./db/backups/.gitignore"
	sudo su -c "cat ./gitignore.tmp > ./db/data/.gitignore"
	sudo su -c "cat ./gitignore.tmp > ./api/logs/.gitignore"
	sudo su -c "cat ./gitignore.tmp > ./api/runtime/.gitignore"
	sudo su -c "cat ./gitignore.tmp > ./front/logs/.gitignore"
	sudo su -c "cat ./gitignore.tmp > ./gateway/logs/.gitignore"
	rm ./gitignore.tmp


# РАБОТА С СЕТЬЮ


# Создать сеть
net-up:
	@docker network create ${NETWORK} || true

# Удалить сеть
net-down:
	@docker network rm ${NETWORK} || true


# ОБСЛУЖИВАЮЩИЕ КОМАНДЫ


# Ручной запуск всей инфраструктуры (для прода)
hand-up: net-up	db-up	api-up front-up gateway-up

# Ручное убийство всей инфраструктуры (для прода)
hand-down: db-down api-down	front-down gateway-down	net-down

# Очистить все блокировки
# db-lock-clear:
# 	sudo rm -rf \
# 		./db/data/postmaster.pid \
# 		./db/data/postgresql.lock \
# 		./db/data/postgresql.log* \
# 		./db/data/pg_logical/replorigin_checkpoint \
# 		./db/data/pg_wal/000000010000000000000001 2>/dev/null || true

# Полная очистка данных базы (ОСТОРОЖНО!)
# db-drop:
# 	@echo "⚠️ ВНИМАНИЕ: Это удалит ВСЕ данные базы данных! ⚠️"
# 	@echo "Создание резервной копии..."
# 	@cp -r ./db/data ./db/data_backup_$(date +%Y%m%d_%H%M%S) 2>/dev/null || true
# 	@echo "Очистка данных..."
# 	@rm -rf ./db/data/*
# 	@echo "Данные очищены. Резервная копия сохранена."

# Накатить миграции
db-migrate:
	docker exec -it -w /app api npm run db:push

# Сделать дамп БД
db-dump:
	./db/backuper.sh
	make db-perm

# Восстановить БД из дампа (make db-restore FILE=backup-20250810_120000)
db-restore:
	docker exec -it db pg_restore -U ${DB_USER} -d ${DB_NAME} -Fc /backups/${FILE}.dump

# Дать права на служебные файлы БД
db-perm:
	sudo chmod 777 -R ./db/logs ./db/backups

# Удалить БД
db-drop:
	docker exec -it db dropdb ${DB_NAME} -U ${DB_USER}

# Создать БД
db-create:
	docker exec -it db createdb ${DB_NAME} -U ${DB_USER}

# Сбросить БД
db-reset: db-drop db-create db-migrate

# Дать права на все служебные файлы
perm:
	sudo chmod -R 0777 \
		./db/logs \
		./api/logs \
		./api/runtime \
		./front/logs \
		./gateway/logs

# Вывести контейнеры
ps:
	docker ps -a

# Вывести образы
images:
	docker images -a

# Вывести сети
networks:
	docker network ls -a

# Убить всех 😈
kill:
	docker rm -f db api front gateway
	docker network rm ${NETWORK}

# Сгенерить SSL сертификаты для локальной разработки
ssl-gen:
	mkcert \
		-cert-file ${GATEWAY_FRONTEND_SSL_CERT} \
		-key-file ${GATEWAY_FRONTEND_SSL_KEY} \
		${GATEWAY_FRONTEND_HOST}

	mkcert \
		-cert-file ${GATEWAY_API_SSL_CERT} \
		-key-file ${GATEWAY_API_SSL_KEY} \
		${GATEWAY_API_HOST}
