<img src="./etc/screen.png" alt="AIDrom" width="100%">

<div align="center">

# AIDrom

**Платформа для тестирования и интеграции AI моделей через единый интерфейс LLM провайдеров**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/Docker-20.10+-blue.svg)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-24+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19+-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6.svg)](https://www.typescriptlang.org/)

#### Frontend performance

[![Performance](https://img.shields.io/badge/Performance-A+-00C851.svg)](docs/PERFORMANCE.md)
[![LCP](https://img.shields.io/badge/LCP-492ms-00C851.svg)](docs/PERFORMANCE.md)
[![CLS](https://img.shields.io/badge/CLS-0.00-00C851.svg)](docs/PERFORMANCE.md)

</div>

## Описание проекта

**AIDrom** — система для работы с AI моделями, обеспечивающая единый интерфейс для различных LLM провайдеров. Функционал системы: создание AI агентов, ведение чатов и мониторинг запросов.

### Основные возможности

- **Мультипровайдерность**: Поддержка Gigachat, DeepSeek и других AI провайдеров
- **Управление агентами**: Создание и настройка AI агентов с индивидуальными параметрами
- **Чат-интерфейс**: Веб-интерфейс для общения с агентами в реальном времени
- **Мониторинг**: Журналирование и анализ запросов к AI сервисам

## Документация

- **[Архитектура системы](docs/ARCHITECTURE.md)** - Описание архитектуры, компонентов и их взаимодействия
- **[Бизнес-процессы](docs/BUSINESS-FLOW.md)** - Описание бизнес-процессов системы
- **[API Документация](docs/API.md)** - Полное описание REST API эндпоинтов
- **[Frontend](docs/FRONTEND.md)** - Архитектура фронтенда, FSD структура, компоненты
- **[Развертывание](docs/DEPLOYMENT.md)** - Инструкции по установке, настройке и развертыванию
- **[Производительность](docs/PERFORMANCE.md)** - Метрики производительности и анализ скорости загрузки

## Установка

![Docker](https://img.shields.io/badge/Docker-20.10+-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker%20Compose-2.0+-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![mkcert](https://img.shields.io/badge/mkcert-SSL%20certificates-FF6B6B?style=for-the-badge&logo=letsencrypt&logoColor=white)

### (DISCLAIMER: иногда не все так просто, как всегда 😅😇)

⚠️ Для подробностей всех этапов установки, обратитесь к [**"великой книге перемен"**](docs/DEPLOYMENT.md) (которая, кстати, и не всегда в актуальном состоянии 🙃, но если что, есть морально-техническая [поддержка](#-поддержка))


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

<table>
<thead>
  <tr>
    <th>Backend</th>
    <th>Frontend</th>
    <th>Infrastructure</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td valign="top">
      <ul>
        <li>Node.js 24 (TypeScript)</li>
        <li>Express.js</li>
        <li>Drizzle ORM</li>
        <li>PostgreSQL</li>
        <li>Winston</li>
      </ul>
      <br/>
    </td>
    <td valign="top">
      <ul>
        <li>React 19 (TypeScript)</li>
        <li>Vite</li>
        <li>React Router 7</li>
        <li>React Hook Form</li>
        <li>TanStack Query</li>
        <li>Zustand</li>
      </ul>
      <br/>
    </td>
    <td valign="top">
      <ul>
        <li>Docker & Docker Compose</li>
        <li>Nginx как reverse proxy</li>
        <li>SSL/TLS с mkcert</li>
      </ul>
      <br/>
    </td>
  </tr>
</tbody>
</table>

<br/>

<img src="https://skillicons.dev/icons?i=ts,nodejs,express,postgres,vite,react,docker,nginx,linux,bash&theme=dark" alt="Infrastructure Skills" width="100%">

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

## 📁 Структура проекта

```
├── api/          # Backend API сервер
├── front/        # Frontend приложение
├── gateway/      # Nginx reverse proxy
├── db/           # PostgreSQL конфигурация
├── docs/         # Документация
└── docker-compose.yaml
```

## 🧑‍🔧 Поддержка

#### Документация (/docs)

- **[Архитектура системы](docs/ARCHITECTURE.md)** - Описание архитектуры, компонентов и их взаимодействия
- **[Бизнес-процессы](docs/BUSINESS-FLOW.md)** - Описание бизнес-процессов системы
- **[API Документация](docs/API.md)** - Полное описание REST API эндпоинтов
- **[Frontend](docs/FRONTEND.md)** - Архитектура фронтенда, FSD структура, компоненты
- **[Развертывание](docs/DEPLOYMENT.md)** - Инструкции по установке, настройке и развертыванию
- **[Производительность](docs/PERFORMANCE.md)** - Метрики производительности и анализ скорости загрузки

<br/>

[![GitHub Issues](https://img.shields.io/badge/GitHub-Issues-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/scott-walker/aidrom/issues)
[![Telegram](https://img.shields.io/badge/Telegram-@scottvvalker-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/scottvvalker)

## Лицензия

Проект распространяется под лицензией [MIT](LICENSE).

<img src="./etc/footer.png" alt="AIDrom" width="100%" style="margin: 0 auto; display: block;">
