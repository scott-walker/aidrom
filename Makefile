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
		-v ${EXTERNAL_DB_LOGS}:/var/lib/postgresql/data/log \
		${REGISTRY_DB_IMAGE_TAG}
	echo "Подожди, плиз, пока БД запустится и мы сможем дать права на просматр логов (4 сек.) 🙏"
	sleep 4
	sudo chmod -R 0777 ./db/logs/*.log

# Запуск контейнера с API
api-up:
	docker run -d --rm --name api \
		-e HOST=${API_HOST} \
		-e PORT=${API_PORT} \
		-e DB_CONNECTION_URL=${API_DB_CONNECTION_URL} \
		-e INTEGRATION_GEN_API_BASE_URL=${API_INTEGRATION_GEN_API_BASE_URL} \
		-e INTEGRATION_GEN_API_KEY=${API_INTEGRATION_GEN_API_KEY} \
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
		-e API_BASE_URL=${FRONTEND_API_BASE_URL} \
		--network ${NETWORK} \
		-p ${EXTERNAL_FRONTEND_PORT}:${FRONTEND_PORT} \
		-v ${EXTERNAL_FRONTEND_LOGS}:/app/logs \
		${REGISTRY_FRONTEND_IMAGE_TAG}

# Запуск контейнера со шлюзом (переопределяем порты чтобы не конфликтовать... ну типа ты понял 😎)
gateway-up:
	EXTERNAL_GATEWAY_FRONTEND_PORT=8012 \
	EXTERNAL_GATEWAY_API_PORT=8011 \
	\
	docker run -d --rm --name gateway \
		-e API_PUBLIC_HOST=${GATEWAY_API_PUBLIC_HOST} \
		-e API_PUBLIC_PORT=${GATEWAY_API_PUBLIC_PORT} \
		-e API_PROXY_PASS=${GATEWAY_API_PROXY_PASS} \
		-e FRONTEND_PUBLIC_HOST=${GATEWAY_FRONTEND_PUBLIC_HOST} \
		-e FRONTEND_PUBLIC_PORT=${GATEWAY_FRONTEND_PUBLIC_PORT} \
		-e FRONTEND_PROXY_PASS=${GATEWAY_FRONTEND_PROXY_PASS} \
		--network ${NETWORK} \
		-p ${EXTERNAL_GATEWAY_FRONTEND_PORT}:${GATEWAY_FRONTEND_PUBLIC_PORT} \
		-p ${EXTERNAL_GATEWAY_API_PORT}:${GATEWAY_API_PUBLIC_PORT} \
		-v ./gateway/docker/default.env.conf:/tmp/default.env.conf:ro \
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

# Дать полные права на все служебные файлы
perm:
	sudo chmod -R 0777 \
		./db/data \
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
