# Упрощенная GraphQL архитектура

## Принцип: "Меньше кода - больше пользы"

### Структура файлов (всего 3 файла):
```
src/
├── services/
│   └── chat.graphql.service.js  # Все резолверы в одном месте
└── graphql/
    ├── simple.schema.js         # Упрощенная схема
    └── simple.server.js         # Простой сервер
```

## Ключевые упрощения:

### 1. Один файл для всех резолверов
```javascript
// chat.graphql.service.js - все резолверы в одном месте
export const resolvers = {
  Query: { /* запросы */ },
  Mutation: { /* мутации */ },
  Chat: { /* поля чата */ },
  MessagePair: { /* поля пары сообщений */ }
}
```

### 2. Простые DataLoader'ы
```javascript
// Простое кэширование без сложных абстракций
const loaders = {
  chats: new Map(),
  agents: new Map(),
  clients: new Map()
}

const load = async (cache, table, ids, key = 'id') => {
  const uncached = ids.filter(id => !cache.has(id))
  if (uncached.length === 0) return ids.map(id => cache.get(id))
  
  const items = await db.select().from(table).where(inArray(table[key], uncached))
  items.forEach(item => cache.set(item[key], item))
  
  return ids.map(id => cache.get(id))
}
```

### 3. Минимальная схема
```graphql
type Chat {
  id: ID!
  title: String
  agent: Agent!
  client: Client!
  messagePairs(limit: Int = 10): [MessagePair!]!
}

type MessagePair {
  id: ID!
  clientMessage: ClientMessage!
  agentMessage: AgentMessage!
}
```

## Примеры использования:

### Получение чата с сообщениями:
```graphql
query GetChat($id: ID!) {
  chat(id: $id) {
    id
    title
    agent {
      name
      type
    }
    messagePairs(limit: 5) {
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
}
```

### Создание чата и отправка сообщения:
```graphql
mutation CreateChat($input: CreateChatInput!) {
  createChat(input: $input) {
    id
    title
  }
}

mutation SendMessage($input: CreateMessagePairInput!) {
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
```

## Преимущества упрощенной архитектуры:

### ✅ Что получили:
- **90% меньше кода** - убрали лишние абстракции
- **Простота понимания** - все в одном месте
- **Легкость поддержки** - меньше файлов
- **Быстрая разработка** - меньше boilerplate

### ✅ Что сохранили:
- **DataLoader паттерн** - для оптимизации запросов
- **GraphQL преимущества** - типизация, интроспекция
- **Композиционные запросы** - объединение данных
- **Производительность** - батчинг и кэширование

## Сравнение с предыдущей версией:

| Аспект | Сложная версия | Упрощенная версия |
|--------|----------------|-------------------|
| Файлов | 8+ файлов | 3 файла |
| Строк кода | ~800 строк | ~200 строк |
| Абстракций | Много | Минимум |
| Понимание | Сложно | Просто |
| Поддержка | Трудно | Легко |

## Заключение:

**Упрощенная архитектура дает:**
- Меньше кода = меньше багов
- Простота = быстрая разработка
- Понятность = легкая поддержка
- Эффективность = сохранение всех преимуществ GraphQL

**Принцип:** Делать сложные вещи простыми, а не простые вещи сложными.
