# Объяснение архитектуры MessagePair

## Вопрос: Почему MessagePair ссылается на сообщения, а не наоборот?

### Текущая архитектура (правильная):

```
messagePairs (1) ←→ (1) clientMessages
                (1) ←→ (1) agentMessages
                (1) ←→ (1) requests
```

### Альтернативная архитектура (неправильная):

```
clientMessages (1) ←→ (1) messagePairs (1) ←→ (1) agentMessages
requests (1) ←→ (1) messagePairs
```

## Почему первая архитектура лучше:

### 1. **Логическая группировка**
MessagePair представляет собой **единую транзакцию** - один обмен сообщениями:
- Пользователь отправляет сообщение
- AI бот отвечает
- Это одна логическая пара

### 2. **Централизованное управление**
MessagePair содержит метаданные, относящиеся к паре в целом:
- `sequenceNumber` - порядковый номер в чате
- `title` - название пары (например, "Вопрос о погоде")
- `status` - статус пары (`active`, `archived`, `deleted`)

### 3. **Нормализация данных**
- `requestId` хранится только в `messagePairs`, а не дублируется в сообщениях
- Устранено дублирование информации о запросе к API

### 4. **Упрощение запросов**
```sql
-- Легко получить полную пару сообщений
SELECT * FROM message_pairs mp
LEFT JOIN client_messages cm ON mp.id = cm.message_pair_id
LEFT JOIN agent_messages am ON mp.id = am.message_pair_id
LEFT JOIN requests r ON mp.request_id = r.id
WHERE mp.chat_id = ?
ORDER BY mp.sequence_number
```

## Проблемы альтернативной архитектуры:

### 1. **Дублирование данных**
```sql
-- ❌ Плохо: requestId дублируется
client_messages: { id, chat_id, message_pair_id, request_id, content }
agent_messages: { id, chat_id, message_pair_id, request_id, content }
```

### 2. **Нарушение нормализации**
- Один запрос к API = два `requestId` в базе
- Сложнее поддерживать целостность данных

### 3. **Сложность запросов**
```sql
-- ❌ Сложно: нужно искать пару через сообщения
SELECT * FROM client_messages cm
JOIN message_pairs mp ON cm.message_pair_id = mp.id
JOIN agent_messages am ON mp.id = am.message_pair_id
WHERE cm.chat_id = ?
```

## Практический пример:

### Создание пары сообщений:

```javascript
// 1. Создаем пару сообщений
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

// 3. Обновляем пару с requestId
await db.update(messagePairs)
  .set({ requestId: request.id })
  .where(eq(messagePairs.id, messagePair.id))

// 4. Создаем сообщения
await db.insert(clientMessages).values({
  chatId: 1,
  messagePairId: messagePair.id,
  content: "Какая погода?"
})

await db.insert(agentMessages).values({
  chatId: 1,
  messagePairId: messagePair.id,
  content: "Сегодня солнечно!",
  metadata: { bot: "gemini" }
})
```

### Получение истории чата:

```javascript
// ✅ Просто и эффективно
const messagePairs = await db
  .select(complexSelectors.messagePairWithDetails)
  .from(messagePairs)
  .leftJoin(requests, eq(messagePairs.requestId, requests.id))
  .leftJoin(clientMessages, eq(messagePairs.id, clientMessages.messagePairId))
  .leftJoin(agentMessages, eq(messagePairs.id, agentMessages.messagePairId))
  .where(eq(messagePairs.chatId, chatId))
  .orderBy(asc(messagePairs.sequenceNumber))
```

## Преимущества текущей архитектуры:

### ✅ **Нормализация**
- Нет дублирования `requestId`
- Централизованное хранение метаданных

### ✅ **Производительность**
- Оптимизированные индексы
- Эффективные JOIN'ы

### ✅ **Логичность**
- MessagePair = единая транзакция
- Понятная структура данных

### ✅ **Масштабируемость**
- Легко добавлять новые поля в MessagePair
- Простое управление статусами

## Заключение:

**Текущая архитектура правильная**, потому что:
- MessagePair представляет логическую единицу (обмен сообщениями)
- Устранено дублирование данных
- Упрощены запросы к базе данных
- Сохранена нормализация

**Принцип:** Делать архитектуру, которая отражает бизнес-логику, а не технические ограничения.
