# Система обработки ошибок

## Обзор

Проект использует централизованную систему обработки ошибок с кастомными классами ошибок, которые автоматически преобразуются в соответствующие HTTP статус коды и структурированные JSON ответы.

## Архитектура ошибок

### Базовый класс AppError

Все кастомные ошибки наследуются от базового класса `AppError`:

```javascript
export class AppError extends Error {
  constructor(message, statusCode = 500, code = "INTERNAL_ERROR") {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.code = code
    this.isOperational = true
  }
}
```

### Доступные типы ошибок

| Класс ошибки | Статус код | Код ошибки | Описание |
|-------------|------------|------------|----------|
| `NotFoundError` | 404 | `NOT_FOUND` | Ресурс не найден |
| `ValidationError` | 400 | `VALIDATION_ERROR` | Неверные данные запроса |
| `UnauthorizedError` | 401 | `UNAUTHORIZED` | Неавторизованный доступ |
| `ForbiddenError` | 403 | `FORBIDDEN` | Доступ запрещен |
| `ConflictError` | 409 | `CONFLICT` | Конфликт данных |
| `RateLimitError` | 429 | `RATE_LIMIT` | Превышен лимит запросов |

## Использование в коде

### Создание ошибок

```javascript
import { NotFoundError, ValidationError } from "#utils/errors.js"

// Ошибка 404
throw new NotFoundError("Пользователь с ID 123 не найден")

// Ошибка валидации
throw new ValidationError("Email должен быть валидным")

// Кастомное сообщение
throw new NotFoundError("Запрос с ID #456 не найден", "REQUEST_NOT_FOUND")
```

### В сервисах

```javascript
export const getRequestById = async (requestId) => {
  const items = await db.select().from(requests).where(eq(requests.id, requestId))
  const item = items[0] || null

  if (!item) {
    throw new NotFoundError(`Запрос с ID #${requestId} не найден`)
  }

  return item
}
```

### В контроллерах

```javascript
export const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id)
    res.json(user)
  } catch (error) {
    next(error) // Ошибка автоматически обработается middleware
  }
}
```

## Обработка ошибок

### Middleware errorHandler

Все ошибки автоматически обрабатываются middleware `errorHandler`, который:

1. **Определяет тип ошибки** - кастомная или стандартная
2. **Устанавливает статус код** - на основе типа ошибки
3. **Логирует ошибку** - с полной информацией
4. **Отправляет ответ** - структурированный JSON

### Middleware notFoundHandler

Обрабатывает случаи, когда маршрут не найден (404 ошибки):

1. **Перехватывает все несуществующие маршруты**
2. **Создает NotFoundError** с информацией о запросе
3. **Передает ошибку в errorHandler** для обработки

**Важно:** `notFoundHandler` должен быть размещен ПОСЛЕ всех маршрутов, но ПЕРЕД `errorHandler`.

### Формат ответа

```json
{
  "error": {
    "message": "Запрос с ID #123 не найден",
    "code": "NOT_FOUND",
    "statusCode": 404
  }
}
```

### Логирование ошибок

```javascript
logger.error("Ошибка приложения", {
  error: err.message,
  statusCode: 404,
  code: "NOT_FOUND",
  method: "GET",
  url: "/api/requests/123",
  ip: "192.168.1.1",
  userAgent: "Mozilla/5.0...",
  stack: err.stack
})
```

## Обработка стандартных ошибок

Система также обрабатывает стандартные ошибки Node.js:

| Тип ошибки | Статус код | Описание |
|------------|------------|----------|
| `ValidationError` | 400 | Ошибка валидации данных |
| `CastError` | 400 | Неверный формат данных |
| `ENOENT` | 404 | Файл или ресурс не найден |

## Примеры использования

### Получение несуществующего ресурса

```bash
curl http://localhost:3000/api/requests/999
```

**Ответ:**
```json
{
  "error": {
    "message": "Запрос с ID #999 не найден",
    "code": "NOT_FOUND",
    "statusCode": 404
  }
}
```

### Несуществующий маршрут

```bash
curl http://localhost:3000/api/nonexistent
```

**Ответ:**
```json
{
  "error": {
    "message": "Маршрут GET /api/nonexistent не найден",
    "code": "NOT_FOUND",
    "statusCode": 404
  }
}
```

### Неверные данные запроса

```bash
curl -X POST http://localhost:3000/api/requests \
  -H "Content-Type: application/json" \
  -d '{"bot": "", "prompt": ""}'
```

**Ответ:**
```json
{
  "error": {
    "message": "Email должен быть валидным",
    "code": "VALIDATION_ERROR",
    "statusCode": 400
  }
}
```

## Тестирование

Запустите тестовый сервер для проверки обработки ошибок:

```bash
node test-errors.js
```

Доступные тестовые маршруты:
- `GET /test/not-found` - 404 ошибка
- `GET /test/validation` - 400 ошибка
- `GET /test/unauthorized` - 401 ошибка
- `GET /test/internal` - 500 ошибка

**Тестирование 404 ошибок (несуществующие маршруты):**
- `GET /api/nonexistent` - 404 ошибка
- `POST /unknown/route` - 404 ошибка
- `PUT /test/missing` - 404 ошибка

## Лучшие практики

1. **Используйте кастомные ошибки** вместо стандартных `Error`
2. **Предоставляйте понятные сообщения** для пользователей
3. **Логируйте все ошибки** с контекстной информацией
4. **Не раскрывайте внутренние детали** в продакшене
5. **Используйте соответствующие коды ошибок** для клиентов

## Расширение системы

Для добавления нового типа ошибки:

```javascript
export class CustomError extends AppError {
  constructor(message = "Кастомная ошибка", code = "CUSTOM_ERROR") {
    super(message, 422, code) // 422 - Unprocessable Entity
  }
}
```
