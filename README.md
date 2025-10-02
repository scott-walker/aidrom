<img src="./etc/screen.png" alt="AIDrom" width="100%">

<div align="center">

# 🤖 AIDrom

**Платформа для тестирования и интеграции AI моделей различных провайдеров**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/Docker-20.10+-blue.svg)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-24+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19+-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6.svg)](https://www.typescriptlang.org/)

</div>

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
- **[Бизнес-процессы](docs/BUSINESS-FLOW.md)** - Описание бизнес-процессов системы
- **[API Документация](docs/API.md)** - Полное описание REST API эндпоинтов
- **[Frontend](docs/FRONTEND.md)** - Архитектура фронтенда, FSD структура, компоненты
- **[Развертывание](docs/DEPLOYMENT.md)** - Инструкции по установке, настройке и развертыванию

## Быстрый старт

### Требования

- Docker 20.10+
- Docker Compose 2.0+
- mkcert (для SSL сертификатов)

### Установка
#### (на самом деле не все так просто, как всегда 😅😇)

⚠️ Для подробностей всех этапов установки, обратитесь к [**"великой книге перемен"**](docs/DEPLOYMENT.md) (которая, кстати, и не всегда в актуальном состоянии 🙃, но если что, есть issues и телега

[![Telegram](https://img.shields.io/badge/Telegram-@scottvvalker-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/scottvvalker)
[![GitHub Issues](https://img.shields.io/badge/GitHub-Issues-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/scott-walker/aidrom/issues)


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

### 🌐 Доступ к системе

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


## Backend:
[![Backend Skills](https://skillicons.dev/icons?i=nodejs,ts,express,postgres,winston&theme=dark)](https://skillicons.dev)
- Node.js 24 (TypeScript)
- Express.js
- Drizzle ORM
- PostgreSQL
- Winston

## Frontend:
[![Frontend Skills](https://skillicons.dev/icons?i=react,ts,vite,tailwind,axios,zod&theme=dark)](https://skillicons.dev)
- React 19 (TypeScript)
- Vite
- React Router 7
- React Hook Form
- TanStack Query
- Zustand
- Axios
- Zod
- Tailwind CSS
- Radix UI
- Lucide React
- FSD архитектура

## Infrastructure:
[![Infrastructure Skills](https://skillicons.dev/icons?i=docker,nginx,linux,bash&theme=dark)](https://skillicons.dev)
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

### 📁 Структура проекта

```
├── api/          # Backend API сервер
├── front/        # Frontend приложение
├── gateway/      # Nginx reverse proxy
├── db/           # PostgreSQL конфигурация
├── docs/         # Документация
└── docker-compose.yaml
```

## 📚 Поддержка

- **Документация**: Подробная документация в папке `docs/`
- **API Reference**: Автогенерируемая документация API

## Лицензия

Проект распространяется под лицензией [MIT](LICENSE).

<img src="./etc/stack.png" alt="AIDrom Backend" width="100%" style="margin: 0 auto; display: block;">

