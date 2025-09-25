<img src="./etc/screen.png" alt="AIDrom" width="100%" style="margin-bottom: 30px;">

# AIDrom

Платформа для тестирования и интеграции AI моделей различных провайдеров.

## Описание проекта

AIDrom - микросервисная система для работы с AI моделями, обеспечивающая единый интерфейс для различных провайдеров искусственного интеллекта. Система поддерживает создание AI агентов, ведение чатов и мониторинг запросов.

### Основные возможности

- **Мультипровайдерность**: Поддержка Gigachat, DeepSeek и других AI провайдеров
- **Управление агентами**: Создание и настройка AI агентов с индивидуальными параметрами
- **Чат-интерфейс**: Веб-интерфейс для общения с агентами в реальном времени
- **Мониторинг**: Журналирование и анализ запросов к AI сервисам
- **Масштабируемость**: Контейнеризованная архитектура с Docker

## Документация

- **[Архитектура системы](docs/ARCHITECTURE.md)** - Описание архитектуры, компонентов и их взаимодействия
- **[API Документация](docs/API.md)** - Полное описание REST API эндпоинтов
- **[Frontend](docs/FRONTEND.md)** - Архитектура фронтенда, FSD структура, компоненты
- **[Развертывание](docs/DEPLOYMENT.md)** - Инструкции по установке, настройке и развертыванию

## Быстрый старт

### Требования

- Docker 20.10+
- Docker Compose 2.0+
- mkcert (для SSL сертификатов)

### Установка

```bash
# Клонирование репозитория
git clone https://github.com/your-org/aidrom.tech.git
cd aidrom.tech

# Генерация SSL сертификатов
sudo apt install libnss3-tools mkcert
mkcert -install
mkcert aidrom.lc api.aidrom.lc
mkdir -p gateway/ssl
mv aidrom.lc+1.pem gateway/ssl/front.cert
mv aidrom.lc+1-key.pem gateway/ssl/front.key

# Настройка DNS
echo "127.0.0.1 aidrom.lc api.aidrom.lc" | sudo tee -a /etc/hosts

# Создание .env файла
cp .env.example .env
# Отредактировать .env под ваши нужды

# Запуск системы
make up
```

### Доступ к системе

- **Frontend**: https://aidrom.lc
- **API**: https://api.aidrom.lc
- **Документация API**: https://api.aidrom.lc/docs

## Архитектура

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Gateway   │    │  Frontend   │    │     API     │    │  Database   │
│   (Nginx)   │────│   (React)   │────│  (Node.js)  │────│ (PostgreSQL)│
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### Технологический стек

**Backend:**
- Node.js 18+ (TypeScript)
- Express.js
- Drizzle ORM
- PostgreSQL
- Winston

**Frontend:**
- React 19 (TypeScript)
- Vite
- TanStack Query
- Zustand
- Tailwind CSS
- Feature Sliced Design архитектура

**Infrastructure:**
- Docker & Docker Compose
- Nginx как reverse proxy
- SSL/TLS с mkcert

## Управление

### Команды Make

```bash
make up      # Запуск всех сервисов
make down    # Остановка всех сервисов  
make restart # Перезапуск системы
make log     # Просмотр логов
make build   # Сборка всех образов
```

### Управление базой данных

```bash
make db-migrate  # Применение миграций
make db-dump     # Создание резервной копии
make db-reset    # Сброс базы данных
```

## Разработка

### Структура проекта

```
├── api/          # Backend API сервер
├── front/        # Frontend приложение
├── gateway/      # Nginx reverse proxy
├── db/           # PostgreSQL конфигурация
├── docs/         # Документация
└── docker-compose.yaml
```

## Roadmap

### Текущие задачи
- Добавить TraceID для логирования `NGINX -> API -> Response`
- Добавить валидацию тела запроса
- Логирование фронтенда по API

### Планируемые функции
- Поддержка дополнительных AI провайдеров
- Аналитика использования агентов
- API для интеграции с внешними системами

## Поддержка

- **Документация**: Подробная документация в папке `docs/`
- **API Reference**: Автогенерируемая документация API

## Лицензия

Проект распространяется под лицензией [MIT](LICENSE).
