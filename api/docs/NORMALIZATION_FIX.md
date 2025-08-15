# Исправление нормализации: убираем chatId из сообщений

## Проблема

В предыдущей версии архитектуры сообщения содержали `chatId`, что нарушало нормализацию:

```sql
-- ❌ Нарушение нормализации
client_messages: { id, chat_id, content }
agent_messages: { id, chat_id, content }
message_pairs: { id, chat_id, request_id, client_message_id, agent_message_id }
```

**Проблема:** Связь с чатом дублировалась в трех таблицах.

## Решение

Убрали `chatId` из сообщений, оставив связь только через `messagePairs`:

```sql
-- ✅ Правильная нормализация
client_messages: { id, content }
agent_messages: { id, content, metadata, is_favorite }
message_pairs: { id, chat_id, request_id, client_message_id, agent_message_id }
```

## Ключевые изменения:

### 1. **Упрощенные схемы сообщений**

```javascript
// clientMessages - убрали chatId
export const clientMessages = pgTable(
  "client_messages",
  {
    id: serial("id").primaryKey(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow()
  }
)

// agentMessages - убрали chatId
export const agentMessages = pgTable(
  "agent_messages",
  {
    id: serial("id").primaryKey(),
    content: text("content").notNull(),
    metadata: json("metadata"),
    isFavorite: boolean("is_favorite").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow()
  }
)
```

### 2. **Обновленные отношения**

```javascript
// clientMessages - связь только с messagePairs
export const clientMessagesRelations = relations(clientMessages, ({ many }) => ({
  messagePairs: many(messagePairs)
}))

// agentMessages - связь только с messagePairs
export const agentMessagesRelations = relations(agentMessages, ({ many }) => ({
  messagePairs: many(messagePairs)
}))
```

### 3. **Упрощенное создание сообщений**

```javascript
// ✅ Было (с chatId)
const [clientMessage] = await db.insert(clientMessages).values({
  chatId: 1,
  content: "Привет!"
}).returning()

// ✅ Стало (без chatId)
const [clientMessage] = await db.insert(clientMessages).values({
  content: "Привет!"
}).returning()
```

## Преимущества исправления:

### ✅ **Нормализация**
- Устранено дублирование `chatId`
- Связь с чатом только через `messagePairs`
- Соответствие принципам нормализации БД

### ✅ **Целостность данных**
- Невозможно создать сообщение без пары
- Централизованное управление связями
- Меньше возможностей для ошибок

### ✅ **Производительность**
- Меньше индексов
- Меньше данных для хранения
- Более эффективные запросы

### ✅ **Логическая ясность**
- Сообщения не знают о чатах
- Четкая иерархия: Чат → Пары → Сообщения
- Понятная структура данных

## Примеры использования:

### Создание пары сообщений:

```javascript
// 1. Создаем пару сообщений
const [messagePair] = await db.insert(messagePairs).values({
  chatId: 1,
  sequenceNumber: 1,
  title: "Вопрос о погоде"
}).returning()

// 2. Создаем сообщения (без chatId)
const [clientMessage] = await db.insert(clientMessages).values({
  content: "Какая погода?"
}).returning()

const [agentMessage] = await db.insert(agentMessages).values({
  content: "Сегодня солнечно!",
  metadata: { bot: "gemini" }
}).returning()

// 3. Связываем через messagePair
await db.update(messagePairs).set({
  clientMessageId: clientMessage.id,
  agentMessageId: agentMessage.id
}).where(eq(messagePairs.id, messagePair.id))
```

### Получение сообщений чата:

```javascript
// ✅ Получаем сообщения через messagePairs
const messagePairs = await db
  .select(complexSelectors.messagePairWithDetails)
  .from(messagePairs)
  .leftJoin(requests, eq(messagePairs.requestId, requests.id))
  .leftJoin(clientMessages, eq(messagePairs.clientMessageId, clientMessages.id))
  .leftJoin(agentMessages, eq(messagePairs.agentMessageId, agentMessages.id))
  .where(eq(messagePairs.chatId, chatId))
  .orderBy(asc(messagePairs.sequenceNumber))
```

## Сравнение архитектур:

| Аспект | Было (с chatId) | Стало (без chatId) |
|--------|-----------------|-------------------|
| Нормализация | Нарушена | Правильная |
| Дублирование | chatId в 3 таблицах | chatId только в messagePairs |
| Целостность | Слабая | Сильная |
| Производительность | Ниже | Выше |
| Логика | Запутанная | Четкая |

## Заключение:

**Исправление нормализации дает:**
- Правильную структуру БД
- Устранение дублирования данных
- Улучшение производительности
- Более понятную архитектуру

**Принцип:** Связь с родительской сущностью должна быть только через промежуточную таблицу.
