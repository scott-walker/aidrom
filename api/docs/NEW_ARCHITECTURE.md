# Новая архитектура MessagePair

## Изменение архитектуры

### Было (старая архитектура):
```
messagePairs (1) ←→ (1) clientMessages
                (1) ←→ (1) agentMessages
                (1) ←→ (1) requests
```

### Стало (новая архитектура):
```
messagePairs (1) ←→ (1) clientMessages
                (1) ←→ (1) agentMessages
                (1) ←→ (1) requests
```

## Ключевые изменения:

### 1. **Прямые ссылки в MessagePair**
```javascript
// messagePairs теперь содержит прямые ссылки
{
  id: serial("id").primaryKey(),
  chatId: integer("chat_id"),
  requestId: integer("request_id"),
  clientMessageId: integer("client_message_id"),  // ← НОВОЕ
  agentMessageId: integer("agent_message_id"),    // ← НОВОЕ
  title: varchar("title"),
  sequenceNumber: bigint("sequence_number"),
  status: varchar("status")
}
```

### 2. **Упрощенные схемы сообщений**
```javascript
// clientMessages - убрали messagePairId
{
  id: serial("id").primaryKey(),
  chatId: integer("chat_id"),
  content: text("content"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at")
}

// agentMessages - убрали messagePairId
{
  id: serial("id").primaryKey(),
  chatId: integer("chat_id"),
  content: text("content"),
  metadata: json("metadata"),
  isFavorite: boolean("is_favorite"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at")
}
```

## Преимущества новой архитектуры:

### ✅ **Логическая ясность**
- MessagePair явно ссылается на свои сообщения
- Понятно, какие сообщения входят в пару

### ✅ **Производительность**
- Прямые JOIN'ы вместо поиска через внешние ключи
- Меньше уровней вложенности в запросах

### ✅ **Централизованное управление**
- Вся информация о паре в одном месте
- Легче управлять статусами и метаданными

### ✅ **Совместимость с существующими паттернами**
- Аналогично тому, как MessagePair ссылается на Request

## Примеры использования:

### Создание пары сообщений:
```javascript
// 1. Создаем пару сообщений (без ссылок на сообщения)
const [messagePair] = await db.insert(messagePairs).values({
  chatId: 1,
  sequenceNumber: 1,
  title: "Вопрос о погоде"
}).returning()

// 2. Отправляем запрос к AI
const [request] = await db.insert(requests).values({
  prompt: "Какая погода?",
  response: "Сегодня солнечно!",
  metadata: { bot: "gemini" }
}).returning()

// 3. Обновляем messagePair с requestId
await db.update(messagePairs)
  .set({ requestId: request.id })
  .where(eq(messagePairs.id, messagePair.id))

// 4. Создаем сообщения
const [clientMessage] = await db.insert(clientMessages).values({
  chatId: 1,
  content: "Какая погода?"
}).returning()

const [agentMessage] = await db.insert(agentMessages).values({
  chatId: 1,
  content: "Сегодня солнечно!",
  metadata: { bot: "gemini" }
}).returning()

// 5. Обновляем messagePair с ID сообщений
await db.update(messagePairs).set({
  clientMessageId: clientMessage.id,
  agentMessageId: agentMessage.id
}).where(eq(messagePairs.id, messagePair.id))
```

### Получение истории чата:
```javascript
// ✅ Простые и эффективные JOIN'ы
const messagePairs = await db
  .select(complexSelectors.messagePairWithDetails)
  .from(messagePairs)
  .leftJoin(requests, eq(messagePairs.requestId, requests.id))
  .leftJoin(clientMessages, eq(messagePairs.clientMessageId, clientMessages.id))
  .leftJoin(agentMessages, eq(messagePairs.agentMessageId, agentMessages.id))
  .where(eq(messagePairs.chatId, chatId))
  .orderBy(asc(messagePairs.sequenceNumber))
```

### GraphQL резолверы:
```javascript
MessagePair: {
  request: async (parent) => {
    const [request] = await load(loaders.requests, requests, [parent.requestId], "id")
    return request
  },

  clientMessage: async (parent) => {
    const [message] = await load(loaders.clientMessages, clientMessages, [parent.clientMessageId], "id")
    return message
  },

  agentMessage: async (parent) => {
    const [message] = await load(loaders.agentMessages, agentMessages, [parent.agentMessageId], "id")
    return message
  }
}
```

## Сравнение архитектур:

| Аспект | Старая архитектура | Новая архитектура |
|--------|-------------------|-------------------|
| Ссылки | Сообщения → MessagePair | MessagePair → Сообщения |
| JOIN'ы | Сложные (через внешние ключи) | Простые (прямые ссылки) |
| Логика | Неявная связь | Явная связь |
| Производительность | Медленнее | Быстрее |
| Понятность | Сложнее | Проще |

## Заключение:

**Новая архитектура лучше**, потому что:
- MessagePair явно контролирует свои сообщения
- Прямые ссылки упрощают запросы
- Логика более понятна и предсказуема
- Производительность выше

**Принцип:** Централизованное управление связями через основную сущность.
