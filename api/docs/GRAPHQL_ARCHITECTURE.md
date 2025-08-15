# GraphQL Архитектура для чатов

## Обзор

Реализована GraphQL архитектура с использованием Apollo Server, DataLoader паттерна и оптимизированных резолверов для эффективной работы с чатами и сообщениями.

## Ключевые принципы

### 1. DataLoader паттерн
- **Батчинг запросов** - объединение множественных запросов в один
- **Кэширование** - избежание дублирования запросов
- **N+1 решение** - устранение проблемы множественных запросов

### 2. Композиционные резолверы
- **Field-level резолверы** - загрузка только нужных полей
- **Lazy loading** - загрузка данных по требованию
- **Оптимизация запросов** - выбор только запрошенных полей

### 3. GraphQL преимущества
- **Типобезопасность** - строгая типизация данных
- **Интроспекция** - автоматическая документация API
- **Real-time** - поддержка подписок

## Архитектура

### Структура файлов:
```
src/
├── graphql/
│   ├── schema.js      # GraphQL схема
│   ├── resolvers.js   # Резолверы
│   └── server.js      # Apollo Server
├── services/
│   ├── base.service.js           # Базовые DataLoader'ы
│   ├── chat.resolver.service.js  # Резолверы для чатов
│   ├── chat.service.js           # REST API сервис
│   └── messagePair.service.js    # REST API сервис
```

### DataLoader паттерн:

```javascript
// Создание DataLoader для сущностей
const chatLoader = createEntityLoader(chats, "чатов")

// Создание DataLoader для связей
const chatMessagePairsLoader = createRelationLoader(
  messagePairs, 
  "chatId", 
  "пар сообщений чата"
)
```

## GraphQL схема

### Основные типы:

```graphql
type Chat {
  id: ID!
  title: String
  createdAt: DateTime!
  updatedAt: DateTime!
  agent: Agent!
  client: Client!
  messagePairs(limit: Int = 10, offset: Int = 0): [MessagePair!]!
}

type MessagePair {
  id: ID!
  title: String
  sequenceNumber: Int!
  status: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  request: Request!
  clientMessage: ClientMessage!
  agentMessage: AgentMessage!
}
```

### Query операции:

```graphql
# Получение чатов с пагинацией
query GetChats($limit: Int, $offset: Int) {
  chats(limit: $limit, offset: $offset) {
    id
    title
    agent {
      name
      type
    }
    messagePairs(limit: 5) {
      id
      title
      clientMessage {
        content
      }
      agentMessage {
        content
        isFavorite
      }
    }
  }
}

# Получение конкретного чата
query GetChat($id: ID!) {
  chat(id: $id) {
    id
    title
    agent {
      name
    }
    messagePairs {
      id
      clientMessage {
        content
      }
      agentMessage {
        content
      }
    }
  }
}
```

### Mutation операции:

```graphql
# Создание чата
mutation CreateChat($input: CreateChatInput!) {
  createChat(input: $input) {
    id
    title
    agent {
      name
    }
  }
}

# Отправка сообщения
mutation CreateMessagePair($input: CreateMessagePairInput!) {
  createMessagePair(input: $input) {
    id
    clientMessage {
      content
    }
    agentMessage {
      content
      isFavorite
    }
  }
}
```

## Оптимизация производительности

### 1. Field Selection
```javascript
// Выбираем только запрошенные поля
const fields = getRequestedFields(info)
return selectFields(chat, fields)
```

### 2. Батчинг запросов
```javascript
// DataLoader автоматически батчит запросы
const chats = await chatLoader([1, 2, 3, 4, 5])
// Выполняется один SQL запрос вместо пяти
```

### 3. Кэширование
```javascript
// DataLoader кэширует результаты в рамках запроса
const chat1 = await chatLoader([1]) // Загружает из БД
const chat2 = await chatLoader([1]) // Берет из кэша
```

## Примеры использования

### 1. Эффективный запрос чата:
```javascript
const query = `
  query GetChat($id: ID!) {
    chat(id: $id) {
      id
      title
      agent {
        name
        type
      }
      messagePairs(limit: 10) {
        id
        title
        clientMessage {
          content
        }
        agentMessage {
          content
          isFavorite
        }
      }
    }
  }
`
```

### 2. Создание чата и отправка сообщения:
```javascript
// 1. Создаем чат
const createChatMutation = `
  mutation CreateChat($input: CreateChatInput!) {
    createChat(input: $input) {
      id
      title
    }
  }
`

// 2. Отправляем сообщение
const createMessageMutation = `
  mutation CreateMessagePair($input: CreateMessagePairInput!) {
    createMessagePair(input: $input) {
      id
      clientMessage {
        content
      }
      agentMessage {
        content
      }
    }
  }
`
```

## Преимущества GraphQL архитектуры

### 1. Производительность
- **Меньше запросов** - DataLoader батчинг
- **Только нужные данные** - field selection
- **Кэширование** - избежание дублирования

### 2. Гибкость
- **Композиционные запросы** - объединение данных
- **Типобезопасность** - строгая типизация
- **Интроспекция** - автоматическая документация

### 3. Масштабируемость
- **Модульная архитектура** - легко добавлять поля
- **Резолверы** - изолированная логика
- **Real-time** - подписки для обновлений

## Сравнение с REST API

| Аспект | REST API | GraphQL |
|--------|----------|---------|
| Запросы | Множественные | Один запрос |
| Данные | Over-fetching/Under-fetching | Только нужные |
| Типизация | Слабая | Строгая |
| Документация | Ручная | Автоматическая |
| Версионирование | URL версии | Схема эволюция |

## Заключение

GraphQL архитектура обеспечивает:
- **Эффективность** - оптимизированные запросы
- **Гибкость** - композиционные данные
- **Производительность** - DataLoader паттерн
- **Типобезопасность** - строгая схема
- **Масштабируемость** - модульная структура
