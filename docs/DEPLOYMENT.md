# Великая инициация развертывания системы AIDrom 🙌

**(в 80% случаев, это не причиняет больших проблем, но если все-таки стало больно, то есть служба поддержки 😇)**

[![Telegram](https://img.shields.io/badge/Telegram-@scottvvalker-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/scottvvalker)
[![GitHub Issues](https://img.shields.io/badge/GitHub-Issues-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/scott-walker/aidrom/issues)

## Требования к окружению

### Минимальные системные требования

- **CPU**: 2 ядра
- **RAM**: 4 GB
- **Диск**: 20 GB свободного места
- **ОС**: Linux (Ubuntu 20.04+, CentOS 8+)

### Программное обеспечение

- **Docker**: 20.10+
- **Docker Compose**: 2.0+
- **Make**: 4.2+ (опционально)
- **mkcert**: 1.4+ (для SSL сертификатов)

## Подготовка к развертыванию

### Установка зависимостей

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y docker.io docker-compose-plugin make

# CentOS/RHEL
sudo yum install -y docker docker-compose make

# Запуск Docker
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
```

### Генерация SSL сертификатов

```bash
# Установка mkcert
sudo apt install libnss3-tools
sudo apt install mkcert

# Установка корневого CA
mkcert -install

# Генерация сертификатов
mkcert aidrom.lc api.aidrom.lc

# Создание директории для сертификатов
mkdir -p ./gateway/ssl
mv aidrom.lc+1.pem ./gateway/ssl/front.cert
mv aidrom.lc+1-key.pem ./gateway/ssl/front.key
mv api.aidrom.lc.pem ./gateway/ssl/api.cert  
mv api.aidrom.lc-key.pem ./gateway/ssl/api.key
```

### Настройка DNS

```bash
# Добавить в /etc/hosts
echo "127.0.0.1 aidrom.lc api.aidrom.lc" | sudo tee -a /etc/hosts
```

## Конфигурация

### Переменные окружения

Создать файл `.env` в корне проекта:

```bash
# Сеть
NETWORK=aidrom-network

# База данных
DB_HOST=db
DB_PORT=5432
DB_NAME=aidrom
DB_USER=aidrom
DB_PASSWORD=secure_password_here

# API
API_HOST=0.0.0.0
API_PORT=3001
API_DB_CONNECTION_URL=postgresql://aidrom:secure_password_here@db:5432/aidrom

# Frontend
FRONTEND_HOST=0.0.0.0  
FRONTEND_PORT=3000
FRONTEND_BASE_URL=http://localhost:3000
FRONTEND_API_BASE_URL=http://api:3001

# Gateway (Nginx)
GATEWAY_FRONTEND_HOST=aidrom.lc
GATEWAY_API_HOST=api.aidrom.lc
GATEWAY_FRONTEND_PROXY_PASS=http://front:3000
GATEWAY_API_PROXY_PASS=http://api:3001

# SSL Сертификаты
GATEWAY_FRONTEND_SSL_CERT=./gateway/ssl/front.cert
GATEWAY_FRONTEND_SSL_KEY=./gateway/ssl/front.key
GATEWAY_API_SSL_CERT=./gateway/ssl/api.cert
GATEWAY_API_SSL_KEY=./gateway/ssl/api.key

# Внешние порты
EXTERNAL_HTTP_PORT=80
EXTERNAL_HTTPS_PORT=443
EXTERNAL_DB_PORT=5432
EXTERNAL_API_PORT=3001
EXTERNAL_FRONTEND_PORT=3000

# Пути к данным
EXTERNAL_DB_DATA=./db/data
EXTERNAL_DB_LOGS=./db/logs
EXTERNAL_DB_BACKUPS=./db/backups
EXTERNAL_API_LOGS=./api/logs
EXTERNAL_API_RUNTIME=./api/runtime
EXTERNAL_FRONTEND_LOGS=./front/logs
EXTERNAL_GATEWAY_LOGS=./gateway/logs

# Зависимости сервисов
SERVICE_DB=db
SERVICE_API=api
SERVICE_FRONTEND=front

# Registry (для продакшена)
REGISTRY_DB_IMAGE_TAG=aidrom/db:latest
REGISTRY_API_IMAGE_TAG=aidrom/api:latest
REGISTRY_FRONTEND_IMAGE_TAG=aidrom/frontend:latest
REGISTRY_GATEWAY_IMAGE_TAG=aidrom/gateway:latest
```

### Создание директорий

```bash
# Создание рабочих директорий
mkdir -p db/{data,logs,backups}
mkdir -p api/{logs,runtime}
mkdir -p front/logs
mkdir -p gateway/{logs,ssl}

# Установка прав доступа
sudo chmod 777 -R db/logs db/backups
sudo chmod 777 -R api/logs api/runtime
sudo chmod 777 -R front/logs
sudo chmod 777 -R gateway/logs
```

## Методы развертывания

### Docker Compose (рекомендуемый)

```bash
# Запуск всех сервисов
docker compose up -d

# Просмотр логов
docker compose logs -f

# Остановка
docker compose down

# Перезапуск
docker compose restart
```

### Makefile команды

```bash
# Быстрый запуск
make up

# Просмотр логов
make log

# Остановка
make down

# Перезапуск
make restart

# Сборка образов
make build

# Полная очистка
make kill
```

### Ручное развертывание

```bash
# Создание сети
make net-up

# Сборка образов
make build

# Запуск сервисов по порядку
make db-up      # База данных
make api-up     # API сервер  
make front-up   # Frontend
make gateway-up # Gateway (Nginx)
```

## Управление сервисами

### База данных

```bash
# Миграции
make db-migrate

# Создание дампа
make db-dump

# Восстановление из дампа
make db-restore FILE=backup-20250810_120000

# Сброс БД
make db-reset

# Очистка логов
make db-logs-clear
```

### API сервер

```bash
# Просмотр логов API
docker logs -f api

# Перезапуск API
docker restart api

# Очистка логов
make api-logs-clear

# Очистка runtime
make api-runtime-clear
```

### Frontend

```bash
# Просмотр логов фронтенда
docker logs -f front

# Перезапуск фронтенда  
docker restart front

# Очистка логов
make front-logs-clear
```

### Gateway (Nginx)

```bash
# Просмотр логов Nginx
docker logs -f gateway

# Перезапуск Gateway
docker restart gateway

# Очистка логов
make gateway-logs-clear
```

## Мониторинг

### Проверка состояния сервисов

```bash
# Список контейнеров
make ps

# Список образов
make images

# Список сетей
make networks

# Статистика использования ресурсов
docker stats
```

### Логи

```bash
# Все логи
make log

# Логи конкретного сервиса
docker logs -f [service_name]

# Логи с последних 100 строк
docker logs --tail=100 [service_name]

# Логи за последний час
docker logs --since=1h [service_name]
```

### Метрики

Логи находятся в следующих директориях:

```
logs/
├── db/           # PostgreSQL логи
├── api/          # API сервер логи
│   ├── api-app-* # Общие логи приложения
│   ├── api-api-* # HTTP запросы
│   ├── api-controller-* # Контроллеры
│   ├── api-service-* # Сервисы
│   └── api-database-* # База данных
├── front/        # Frontend логи
└── gateway/      # Nginx логи
    ├── access.log
    └── error.log
```

## Резервное копирование

### Автоматические дампы БД

```bash
# Создание дампа
./db/backuper.sh

# Дампы сохраняются в ./db/backups/
# Формат: backup-YYYYMMDD_HHMMSS.dump
```

### Ручное резервирование

```bash
# Полное резервирование системы
tar -czf aidrom-backup-$(date +%Y%m%d_%H%M%S).tar.gz \
  .env \
  db/data/ \
  api/runtime/ \
  gateway/ssl/ \
  db/backups/

# Резервирование только данных
tar -czf aidrom-data-$(date +%Y%m%d_%H%M%S).tar.gz \
  db/data/ \
  api/runtime/
```

### Восстановление

```bash
# Остановка сервисов
make down

# Восстановление данных
tar -xzf aidrom-backup-YYYYMMDD_HHMMSS.tar.gz

# Запуск сервисов
make up
```

## Production развертывание

### Оптимизация Docker

```yaml
# docker-compose.prod.yml
services:
  api:
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '1.0'
        reservations:
          memory: 512M
          cpus: '0.5'
    restart: unless-stopped
    
  db:
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '2.0'
    restart: unless-stopped
```

### Переменные Production

```bash
# .env.production
NODE_ENV=production
LOG_LEVEL=warn

# Безопасность
DB_PASSWORD=very_secure_password_here
JWT_SECRET=your_jwt_secret_here

# Домены
GATEWAY_FRONTEND_HOST=your-domain.com
GATEWAY_API_HOST=api.your-domain.com

# SSL сертификаты (Let's Encrypt)
GATEWAY_FRONTEND_SSL_CERT=/etc/letsencrypt/live/your-domain.com/fullchain.pem
GATEWAY_FRONTEND_SSL_KEY=/etc/letsencrypt/live/your-domain.com/privkey.pem
```

### Автозапуск

```bash
# Создание systemd сервиса
sudo tee /etc/systemd/system/aidrom.service << EOF
[Unit]
Description=AIDrom Application
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/opt/aidrom
ExecStart=/usr/bin/docker compose up -d
ExecStop=/usr/bin/docker compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

# Активация сервиса
sudo systemctl enable aidrom.service
sudo systemctl start aidrom.service
```

## Обновление

### Процедура обновления

```bash
# 1. Создание резервной копии
make db-dump

# 2. Остановка сервисов  
make down

# 3. Обновление кода
git pull origin main

# 4. Пересборка образов
make build

# 5. Запуск обновленных сервисов
make up

# 6. Применение миграций
make db-migrate
```

### Откат изменений

```bash
# Откат к предыдущей версии
git checkout HEAD~1

# Пересборка и запуск
make build
make up

# Восстановление БД при необходимости
make db-restore FILE=backup-YYYYMMDD_HHMMSS
```

## Устранение неполадок

### Общие проблемы

**Контейнер не запускается:**
```bash
# Проверка логов
docker logs [container_name]

# Проверка конфигурации
docker compose config

# Пересборка образа
docker compose build --no-cache [service_name]
```

**Проблемы с сетью:**
```bash
# Пересоздание сети
make net-down
make net-up

# Проверка DNS
nslookup aidrom.lc
```

**Проблемы с SSL:**
```bash
# Регенерация сертификатов
make ssl-gen

# Проверка сертификатов
openssl x509 -in ./gateway/ssl/front.cert -text -noout
```

**Проблемы с правами доступа:**
```bash
# Установка правильных прав
make perm

# Проверка владельца файлов
ls -la db/data/
```

### Диагностика производительности

```bash
# Мониторинг ресурсов
docker stats

# Анализ использования диска
du -sh db/data api/runtime

# Проверка сетевых соединений
docker exec api netstat -tlnp
```

### Очистка системы

```bash
# Очистка логов
make logs-clear

# Очистка неиспользуемых Docker ресурсов  
docker system prune -f

# Полная очистка Docker
docker system prune -a --volumes
```
