# Удаление sequenceNumber: упрощение архитектуры

## Проблема с sequenceNumber

### ❌ **Проблемы:**

1. **Дублирование логики** - ID уже обеспечивает порядок
2. **Сложность** - нужно вычислять следующий номер
3. **Потенциальные ошибки** - можно получить дубли или пропуски
4. **Избыточность** - ID автоинкрементный и уникальный

### ✅ **Решение:**

Убрали `sequenceNumber` и используем сортировку по `id`:

```javascript
// ❌ Было (с sequenceNumber)
const lastPair = await db
  .select({ sequenceNumber: messagePairs.sequenceNumber })
  .from(messagePairs)
  .where(eq(messagePairs.chatId, chatId))
  .orderBy(desc(messagePairs.sequenceNumber))
  .limit(1)

const nextSequenceNumber = (lastPair[0]?.sequenceNumber || 0) + 1

const [messagePair] = await db.insert(messagePairs).values({
  chatId,
  sequenceNumber: nextSequenceNumber,
  title: "Вопрос"
}).returning()

// ✅ Стало (без sequenceNumber)
const [messagePair] = await db.insert(messagePairs).values({
  chatId,
  title: "Вопрос"
}).returning()
```

## Ключевые изменения:

### 1. **Упрощенная схема messagePairs**

```javascript
// ❌ Было
export const messagePairs = pgTable(
  "message_pairs",
  {
    id: serial("id").primaryKey(),
    chatId: integer("chat_id"),
    requestId: integer("request_id"),
    clientMessageId: integer("client_message_id"),
    agentMessageId: integer("agent_message_id"),
    title: varchar("title"),
    sequenceNumber: bigint("sequence_number"), // ← УБРАЛИ
    status: varchar("status"),                 // ← УБРАЛИ
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at")
  }
)

// ✅ Стало
export const messagePairs = pgTable(
  "message_pairs",
  {
    id: serial("id").primaryKey(),
    chatId: integer("chat_id"),
    requestId: integer("request_id"),
    clientMessageId: integer("client_message_id"),
    agentMessageId: integer("agent_message_id"),
    title: varchar("title"),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at")
  }
)
```

### 2. **Упрощенные индексы**

```javascript
// ❌ Было (много индексов)
{
  chatSequenceIdx: table.chatId.index("chat_sequence_idx"),
  sequenceIdx: table.sequenceNumber.index("sequence_idx"),
  statusIdx: table.status.index("status_idx"),
  requestIdIdx: table.requestId.index("request_idx"),
  clientMessageIdIdx: table.clientMessageId.index("client_message_idx"),
  agentMessageIdIdx: table.agentMessageId.index("agent_message_idx"),
  chatSequenceUniqueIdx: table.chatId.index("chat_sequence_unique_idx")
}

// ✅ Стало (только нужные индексы)
{
  chatIdIdx: table.chatId.index("chat_id_idx"),
  requestIdIdx: table.requestId.index("request_idx"),
  clientMessageIdIdx: table.clientMessageId.index("client_message_idx"),
  agentMessageIdIdx: table.agentMessageId.index("agent_message_idx")
}
```

### 3. **Упрощенная сортировка**

```javascript
// ❌ Было
.orderBy(asc(messagePairs.sequenceNumber))

// ✅ Стало
.orderBy(asc(messagePairs.id))
```

## Преимущества удаления sequenceNumber:

### ✅ **Простота**
- Не нужно вычислять порядковые номера
- Меньше кода для поддержки
- Нет риска дублирования номеров

### ✅ **Производительность**
- Меньше индексов в БД
- Быстрее создание записей
- Эффективная сортировка по первичному ключу

### ✅ **Надежность**
- ID всегда уникален и последователен
- Нет возможности получить дубли
- Автоматическое управление порядком

### ✅ **Меньше данных**
- Меньше полей в таблице
- Меньше места на диске
- Проще миграции

## Примеры использования:

### Создание пары сообщений:

```javascript
// ✅ Простое создание без sequenceNumber
const [messagePair] = await db.insert(messagePairs).values({
  chatId: 1,
  title: "Вопрос о погоде"
}).returning()

// ID автоматически присваивается и обеспечивает порядок
console.log(messagePair.id) // 1, 2, 3, 4...
```

### Получение истории чата:

```javascript
// ✅ Сортировка по ID (автоматически по порядку создания)
const messagePairs = await db
  .select(complexSelectors.messagePairWithDetails)
  .from(messagePairs)
  .leftJoin(requests, eq(messagePairs.requestId, requests.id))
  .leftJoin(clientMessages, eq(messagePairs.clientMessageId, clientMessages.id))
  .leftJoin(agentMessages, eq(messagePairs.agentMessageId, agentMessages.id))
  .where(eq(messagePairs.chatId, chatId))
  .orderBy(asc(messagePairs.id)) // ← Сортировка по ID
```

### GraphQL схема:

```graphql
# ❌ Было
type MessagePair {
  id: ID!
  title: String
  sequenceNumber: Int!
  status: String!
  createdAt: DateTime!
  request: Request!
  clientMessage: ClientMessage!
  agentMessage: AgentMessage!
}

# ✅ Стало
type MessagePair {
  id: ID!
  title: String
  createdAt: DateTime!
  request: Request!
  clientMessage: ClientMessage!
  agentMessage: AgentMessage!
}
```

## Сравнение подходов:

| Аспект | С sequenceNumber | Без sequenceNumber |
|--------|------------------|-------------------|
| Сложность | Высокая | Низкая |
| Производительность | Ниже | Выше |
| Надежность | Средняя | Высокая |
| Размер БД | Больше | Меньше |
| Код | Больше | Меньше |

## Заключение:

**Удаление sequenceNumber дает:**
- Упрощение архитектуры
- Улучшение производительности
- Повышение надежности
- Меньше кода для поддержки

**Принцип:** Используй существующие возможности БД (автоинкрементный ID) вместо создания собственных решений.
