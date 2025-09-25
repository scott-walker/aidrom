# API Документация

## Общая информация

**Base URL**: `https://api.aidrom.lc`  
**Версия API**: v1  
**Формат данных**: JSON  

## Аутентификация

API использует идентификацию клиентов по `clientId`. Все запросы должны содержать параметр клиента.

## Общие принципы

### HTTP коды ответов

- `200` - Успешный запрос
- `201` - Ресурс создан
- `400` - Ошибка в запросе
- `404` - Ресурс не найден
- `500` - Внутренняя ошибка сервера

### Формат ошибок

```json
{
  "error": "Описание ошибки",
  "code": "ERROR_CODE",
  "details": {}
}
```

### Пагинация

Применяется для списков с большим количеством элементов:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 150,
    "pages": 3
  }
}
```

## Эндпоинты API

### Корневой эндпоинт

#### GET /
Проверка работы API

**Ответ:**
```json
{
  "message": "API is running"
}
```

---

## Провайдеры AI

### GET /providers
Получение списка всех провайдеров

**Ответ:**
```json
[
  {
    "id": 1,
    "name": "Gigachat Provider",
    "driver": "gigachat",
    "description": "Провайдер для работы с Gigachat",
    "config": {
      "authorizationKey": "..."
    },
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-01T00:00:00Z"
  }
]
```

### GET /providers/drivers
Получение списка доступных драйверов

**Ответ:**
```json
[
  {
    "name": "gigachat",
    "description": "Драйвер для Gigachat",
    "params": [
      {
        "name": "authorizationKey",
        "label": "Ключ авторизации",
        "type": "text",
        "required": true
      }
    ]
  },
  {
    "name": "deepseek",
    "description": "Драйвер для DeepSeek",
    "params": [
      {
        "name": "apiKey",
        "label": "API ключ",
        "type": "text",
        "required": true
      }
    ]
  }
]
```

### GET /providers/:providerId
Получение провайдера по ID

**Параметры:**
- `providerId` (integer) - ID провайдера

**Ответ:** Объект провайдера (см. GET /providers)

### POST /providers
Создание нового провайдера

**Тело запроса:**
```json
{
  "name": "My Gigachat",
  "driver": "gigachat",
  "description": "Описание провайдера",
  "config": {
    "authorizationKey": "your-auth-key"
  }
}
```

**Ответ:** Созданный объект провайдера

### PUT /providers/:providerId
Обновление провайдера

**Параметры:**
- `providerId` (integer) - ID провайдера

**Тело запроса:** Частичный объект провайдера

**Ответ:** Обновленный объект провайдера

### DELETE /providers/:providerId
Удаление провайдера

**Параметры:**
- `providerId` (integer) - ID провайдера

**Ответ:** `204 No Content`

---

## Агенты

### GET /agents
Получение списка всех агентов

**Ответ:**
```json
[
  {
    "id": 1,
    "name": "Помощник",
    "avatar": "path/to/avatar.jpg",
    "description": "Универсальный помощник",
    "providerId": 1,
    "params": {
      "model": "gigachat:latest",
      "temperature": 0.7,
      "maxTokens": 1000
    },
    "provider": {
      "id": 1,
      "name": "Gigachat Provider",
      "driver": "gigachat"
    },
    "rules": [
      {
        "id": 1,
        "content": "Отвечай кратко и по делу",
        "sort": 1
      }
    ],
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-01T00:00:00Z"
  }
]
```

### GET /agents/:agentId
Получение агента по ID

**Параметры:**
- `agentId` (integer) - ID агента

**Ответ:** Объект агента (см. GET /agents)

### POST /agents
Создание нового агента

**Тело запроса:**
```json
{
  "name": "Новый агент",
  "avatar": "path/to/avatar.jpg",
  "description": "Описание агента",
  "providerId": 1,
  "params": {
    "model": "gigachat:latest",
    "temperature": 0.7,
    "maxTokens": 1000
  }
}
```

**Ответ:** Созданный объект агента

### PUT /agents/:agentId
Обновление агента

**Параметры:**
- `agentId` (integer) - ID агента

**Тело запроса:** Частичный объект агента

**Ответ:** Обновленный объект агента

### DELETE /agents/:agentId
Удаление агента

**Параметры:**
- `agentId` (integer) - ID агента

**Ответ:** `204 No Content`

### POST /agents/:agentId/rules
Добавление правила агенту

**Параметры:**
- `agentId` (integer) - ID агента

**Тело запроса:**
```json
{
  "content": "Новое правило поведения"
}
```

**Ответ:** Созданное правило

### DELETE /agents/:agentId/rules/:ruleId
Удаление правила агента

**Параметры:**
- `agentId` (integer) - ID агента
- `ruleId` (integer) - ID правила

**Ответ:** `204 No Content`

### PUT /agents/:agentId/rules-sort
Сортировка правил агента

**Параметры:**
- `agentId` (integer) - ID агента

**Тело запроса:**
```json
{
  "rules": [
    { "id": 1, "sort": 1 },
    { "id": 2, "sort": 2 }
  ]
}
```

**Ответ:** Обновленный список правил

---

## Чаты

### GET /chats
Получение списка чатов

**Query параметры:**
- `clientId` (integer, required) - ID клиента
- `agentId` (integer, optional) - Фильтр по агенту
- `limit` (integer, optional) - Лимит записей
- `offset` (integer, optional) - Смещение

**Ответ:**
```json
[
  {
    "id": 1,
    "title": "Разговор с помощником",
    "agentId": 1,
    "clientId": 1,
    "context": [
      {
        "role": "user",
        "content": "Привет!"
      },
      {
        "role": "assistant", 
        "content": "Здравствуйте! Как дела?"
      }
    ],
    "agent": {
      "id": 1,
      "name": "Помощник",
      "avatar": "path/to/avatar.jpg"
    },
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-01T00:00:00Z"
  }
]
```

### GET /chats/:chatId
Получение чата по ID

**Параметры:**
- `chatId` (integer) - ID чата

**Ответ:** Объект чата (см. GET /chats)

### GET /chats/:chatId/messages
Получение сообщений чата

**Параметры:**
- `chatId` (integer) - ID чата

**Ответ:**
```json
[
  {
    "id": 1,
    "chatId": 1,
    "userMessage": "Привет!",
    "assistantMessage": "Здравствуйте! Как дела?",
    "createdAt": "2025-01-01T00:00:00Z"
  }
]
```

### POST /chats
Создание нового чата

**Тело запроса:**
```json
{
  "agentId": 1,
  "clientId": 1,
  "title": "Новый чат"
}
```

**Ответ:** Созданный объект чата

### PUT /chats/:chatId
Обновление чата

**Параметры:**
- `chatId` (integer) - ID чата

**Тело запроса:**
```json
{
  "title": "Обновленное название"
}
```

**Ответ:** Обновленный объект чата

### DELETE /chats/:chatId
Удаление чата

**Параметры:**
- `chatId` (integer) - ID чата

**Ответ:** `204 No Content`

### PUT /chats/:chatId/context-clear
Очистка контекста чата

**Параметры:**
- `chatId` (integer) - ID чата

**Ответ:** Обновленный объект чата

### PUT /chats/:chatId/context-optimize
Оптимизация контекста чата

**Параметры:**
- `chatId` (integer) - ID чата

**Ответ:** Обновленный объект чата

### POST /chats/:chatId/send
Отправка сообщения в чат

**Параметры:**
- `chatId` (integer) - ID чата

**Тело запроса:**
```json
{
  "message": "Текст сообщения пользователя"
}
```

**Ответ:**
```json
{
  "userMessage": "Текст сообщения пользователя",
  "assistantMessage": "Ответ агента",
  "context": [...],
  "requestId": 123
}
```

### GET /chats/:chatId/stream
Инициализация SSE стрима для чата

**Параметры:**
- `chatId` (integer) - ID чата

**Ответ:** SSE stream для получения сообщений в реальном времени

---

## Клиенты

### GET /clients
Получение списка клиентов

**Ответ:**
```json
[
  {
    "id": 1,
    "name": "Пользователь 1",
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-01T00:00:00Z"
  }
]
```

### GET /clients/:clientId
Получение клиента по ID

**Параметры:**
- `clientId` (integer) - ID клиента

**Ответ:** Объект клиента (см. GET /clients)

---

## Запросы

### GET /requests
Получение журнала запросов к AI

**Query параметры:**
- `providerId` (integer, optional) - Фильтр по провайдеру
- `status` (string, optional) - Фильтр по статусу (success, error)
- `limit` (integer, optional) - Лимит записей
- `offset` (integer, optional) - Смещение

**Ответ:**
```json
[
  {
    "id": 1,
    "providerId": 1,
    "request": {
      "model": "gigachat:latest",
      "messages": [...]
    },
    "response": {
      "choices": [...]
    },
    "error": null,
    "duration": 1234,
    "tokens": {
      "prompt": 100,
      "completion": 200,
      "total": 300
    },
    "createdAt": "2025-01-01T00:00:00Z"
  }
]
```

### GET /requests/:requestId
Получение запроса по ID

**Параметры:**
- `requestId` (integer) - ID запроса

**Ответ:** Объект запроса (см. GET /requests)

### DELETE /requests
Массовое удаление запросов

**Query параметры:**
- `before` (string, optional) - Удалить запросы до даты
- `status` (string, optional) - Удалить запросы со статусом

**Ответ:**
```json
{
  "deleted": 42
}
```

### POST /requests/clear-broken-requests
Очистка поломанных запросов

**Ответ:**
```json
{
  "cleared": 15
}
```

---

## Статические файлы

### GET /static/*
Получение статических файлов (изображения, документы)

**Параметры:**
- `*` - Путь к файлу

**Заголовки ответа:**
- `X-Served-By: Express-Static`

---

## Модели данных

### Provider
```typescript
interface Provider {
  id: number
  name: string
  driver: string
  description?: string
  config: Record<string, unknown>
  createdAt: string
  updatedAt: string
}
```

### Agent
```typescript
interface Agent {
  id: number
  name: string
  avatar?: string
  description?: string
  providerId: number
  params: Record<string, unknown>
  provider?: Provider
  rules?: AgentRule[]
  createdAt: string
  updatedAt: string
}
```

### Chat
```typescript
interface Chat {
  id: number
  title?: string
  agentId: number
  clientId: number
  context: Message[]
  agent?: Agent
  createdAt: string
  updatedAt: string
}
```

### Message
```typescript
interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}
```

### Request
```typescript
interface Request {
  id: number
  providerId: number
  request: Record<string, unknown>
  response?: Record<string, unknown>
  error?: string
  duration: number
  tokens?: {
    prompt: number
    completion: number
    total: number
  }
  createdAt: string
}
```

## Поддерживаемые AI драйверы

### Gigachat
- **Модели**: gigachat:latest, gigachat-pro
- **Параметры**: temperature, maxTokens, topP, repetitionPenalty
- **Особенности**: Поддержка генерации изображений

### DeepSeek  
- **Модели**: deepseek-chat, deepseek-reasoner
- **Параметры**: temperature, maxTokens, topP, frequencyPenalty
- **Особенности**: Высокая производительность reasoning

### Dummy
- **Назначение**: Тестовый драйвер для разработки
- **Поведение**: Возвращает предустановленные ответы
