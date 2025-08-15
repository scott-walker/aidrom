# Система логгирования

## Обзор

Проект использует многоуровневую систему логгирования на основе **Winston** с автоматической ротацией файлов и специализированными логгерами для разных слоев приложения.

## Архитектура логгирования

### Основные логгеры

1. **Основной логгер** (`logger`) - для общих сообщений приложения
2. **HTTP логгер** (`httpLogger`) - для HTTP запросов и ответов
3. **DB логгер** (`dbLogger`) - для операций с базой данных
4. **AI логгер** (`apiLogger`) - для работы с AI API

### Специализированные логгеры

#### Controller Logger
```javascript
import { createControllerLogger } from "#utils/logger.js"

const logger = createControllerLogger("UserController")

// Автоматически определяет название метода из стека вызовов
const loginUser = () => {
  logger.info("Пользователь авторизовался", { userId: 123 })
  logger.warn("Попытка доступа к защищенному ресурсу", { resource: "/admin" })
  logger.error("Ошибка при создании пользователя", { error: "Email уже существует" })
}

loginUser()
```

**Вывод:**
```
2024-01-15 10:30:45 [INFO]: [UserController.loginUser] Пользователь авторизовался {"userId":123}
2024-01-15 10:30:46 [WARN]: [UserController.loginUser] Попытка доступа к защищенному ресурсу {"resource":"/admin"}
2024-01-15 10:30:47 [ERROR]: [UserController.loginUser] Ошибка при создании пользователя {"error":"Email уже существует"}
```

#### Service Logger
```javascript
import { createServiceLogger } from "#utils/logger.js"

const logger = createServiceLogger("UserService")

// Автоматически определяет название метода из стека вызовов
const createUser = () => {
  logger.info("Создание нового пользователя", { email: "user@example.com" })
  logger.warn("Пользователь не найден", { email: "unknown@example.com" })
  logger.error("Ошибка БД", { query: "INSERT INTO users", error: "Duplicate key" })
}

createUser()
```

**Вывод:**
```
2024-01-15 10:30:45 [INFO]: [UserService.createUser] Создание нового пользователя {"email":"user@example.com"}
2024-01-15 10:30:46 [WARN]: [UserService.createUser] Пользователь не найден {"email":"unknown@example.com"}
2024-01-15 10:30:47 [ERROR]: [UserService.createUser] Ошибка БД {"query":"INSERT INTO users","error":"Duplicate key"}
```

## Конфигурация

### Переменные окружения

```bash
# Уровень логирования (debug, info, warn, error)
LOG_LEVEL=info

# Путь к файлу логов
LOG_FILE=./logs/app.log

# Путь к директории метаданных (опционально)
LOG_META_DIR=./logs/meta
```

### Настройки ротации

- **Частота**: Ежедневно
- **Максимальный размер файла**: 20MB
- **Время хранения**: 14 дней
- **Формат файлов**: `app-YYYY-MM-DD.log`
- **Сжатие архивов**: Включено
- **Метаданные**: Отдельная директория

### Структура директорий

```
api/
├── logs/
│   ├── app-2024-01-15.log     # Файлы логов
│   ├── app-2024-01-16.log
│   └── meta/
│       └── audit.json         # Метаданные ротации
└── src/
```

## Использование в коде

### Контроллеры

```javascript
import { createControllerLogger } from "#utils/logger.js"

const logger = createControllerLogger("RequestController")

export const getRequests = async (req, res, next) => {
  try {
    logger.info("Получение списка всех запросов")
    
    const requests = await userService.getRequests()
    
    logger.info("Список запросов успешно получен", {
      count: requests.length
    })
    
    res.json(requests)
  } catch (err) {
    logger.error("Ошибка при получении списка запросов", {
      error: err.message
    })
    next(err)
  }
}
```

**Вывод:**
```
2024-01-15 10:30:45 [INFO]: [RequestController.getRequests] Получение списка всех запросов
2024-01-15 10:30:46 [INFO]: [RequestController.getRequests] Список запросов успешно получен {"count":5}
```

### Сервисы

```javascript
import { createServiceLogger } from "#utils/logger.js"

const logger = createServiceLogger("RequestService")

export const createRequest = async (bot, prompt) => {
  logger.info("Создание нового запроса в БД", {
    bot,
    prompt
  })
  
  // ... бизнес-логика
  
  logger.info("Запрос успешно сохранен в БД", {
    requestId: request[0].id,
    model: request[0].model
  })
  
  return request
}
```

**Вывод:**
```
2024-01-15 10:30:45 [INFO]: [RequestService.createRequest] Создание нового запроса в БД {"bot":"gemini","prompt":"Привет"}
2024-01-15 10:30:46 [INFO]: [RequestService.createRequest] Запрос успешно сохранен в БД {"requestId":123,"model":"gemini-2.5-flash"}
```

### HTTP Middleware

```javascript
import { httpLogger } from "#utils/logger.js"

export const requestLogger = (req, res, next) => {
  const startTime = Date.now()
  
  httpLogger.info("Входящий HTTP запрос", {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get("User-Agent")
  })
  
  // ... логика
  
  httpLogger.info("Исходящий HTTP ответ", {
    method: req.method,
    url: req.url,
    statusCode: res.statusCode,
    duration: `${duration}ms`
  })
}
```

## Уровни логирования

- **debug** - Детальная отладочная информация
- **info** - Общая информация о работе приложения
- **warn** - Предупреждения, не критичные ошибки
- **error** - Критические ошибки

## Форматы логов

### Консоль
```
2024-01-15 10:30:45 [INFO]: [UserController.loginUser] Пользователь авторизовался {"userId":123}
```

### Файл (JSON)
```json
{
  "timestamp": "2024-01-15 10:30:45",
  "level": "info",
  "message": "[UserController.loginUser] Пользователь авторизовался",
  "service": "controller",
  "controller": "UserController",
  "userId": 123
}
```

## Мониторинг и анализ

### Просмотр логов в реальном времени
```bash
tail -f api/logs/app-2024-01-15.log
```

### Поиск ошибок
```bash
grep "ERROR" api/logs/app-2024-01-15.log
```

### Фильтрация по контроллеру
```bash
grep "UserController" api/logs/app-2024-01-15.log
```

### Фильтрация по методу
```bash
grep "UserController.loginUser" api/logs/app-2024-01-15.log
```

## Лучшие практики

1. **Используйте контекстные метаданные** для облегчения поиска
2. **Логируйте входы и выходы** из важных функций
3. **Не логируйте чувствительные данные** (пароли, токены)
4. **Используйте соответствующие уровни** логирования
5. **Добавляйте уникальные идентификаторы** для отслеживания запросов

## Примеры использования

### Отслеживание запроса пользователя
```javascript
// Контроллер
logger.info("Начало обработки запроса", { requestId: "req_123", userId: 456 })

// Сервис
logger.info("Выполнение бизнес-логики", { requestId: "req_123", operation: "create" })

// Результат
logger.info("Запрос успешно обработан", { requestId: "req_123", duration: "150ms" })
```

### Обработка ошибок
```javascript
try {
  // ... код
} catch (err) {
  logger.error("Критическая ошибка", {
    error: err.message,
    stack: err.stack,
    context: "user creation",
    userId: 123
  })
  throw err
}
```
