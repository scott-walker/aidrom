# Архитектура чата с сущностью MessagePair

## Обзор

Реализована полноценная архитектура чата с использованием сущности `MessagePair`, которая объединяет сообщение клиента и ответ агента в единую логическую пару.

## Структура базы данных

### Основные сущности:

1. **chats** - Чаты между клиентом и агентом
2. **messagePairs** - Пары сообщений (сообщение клиента + ответ агента)
3. **clientMessages** - Сообщения клиента
4. **agentMessages** - Ответы агентов
5. **requests** - Запросы к API AI ботов

### Связи между сущностями:

```
chats (1) ←→ (N) messagePairs (1) ←→ (1) clientMessages
                (1) ←→ (1) requests
                (1) ←→ (1) agentMessages
```

## API Endpoints

### Чаты (`/api/chats`)

- `GET /api/chats` - Получить список всех чатов
- `GET /api/chats/:chatId` - Получить чат по ID
- `POST /api/chats` - Создать новый чат
- `PUT /api/chats/:chatId` - Обновить чат
- `DELETE /api/chats/:chatId` - Удалить чат

### Пары сообщений (`/api/chats/:chatId/message-pairs`)

- `GET /api/chats/:chatId/message-pairs` - Получить все пары сообщений чата
- `GET /api/chats/:chatId/message-pairs/:messagePairId` - Получить пару сообщений по ID
- `POST /api/chats/:chatId/message-pairs` - Создать новую пару сообщений
- `PUT /api/chats/:chatId/message-pairs/:messagePairId` - Обновить пару сообщений
- `DELETE /api/chats/:chatId/message-pairs/:messagePairId` - Удалить пару сообщений
- `PATCH /api/chats/:chatId/message-pairs/:messagePairId/favorite` - Переключить избранное

## Функциональность

### 1. Создание чата
```javascript
POST /api/chats
{
  "agentId": 1,
  "clientId": 1,
  "title": "Название чата"
}
```

### 2. Отправка сообщения в чат
```javascript
POST /api/chats/:chatId/message-pairs
{
  "content": "Текст сообщения",
  "bot": "gemini"
}
```

### 3. Получение истории чата
```javascript
GET /api/chats/:chatId/message-pairs
```

### 4. Добавление в избранное
```javascript
PATCH /api/chats/:chatId/message-pairs/:messagePairId/favorite
```

## Архитектурные принципы

### 1. Нормализация данных
- **MessagePair** содержит ссылку на **request** (запрос к API)
- **clientMessages** и **agentMessages** ссылаются на **messagePair**
- Устранено дублирование **requestId** в сообщениях
- Сохранена логическая группировка сообщений

### 2. SOLID принципы
- **Single Responsibility**: Каждый сервис отвечает за свою область
- **Open/Closed**: Легко расширяется без изменения существующего кода
- **Liskov Substitution**: Интерфейсы совместимы
- **Interface Segregation**: Четкое разделение интерфейсов
- **Dependency Inversion**: Зависимости от абстракций

### 2. Логирование
- Все операции логируются с контекстом
- Разделение логгеров по уровням (контроллер, сервис)
- Структурированные логи с метаданными

### 3. Обработка ошибок
- Централизованная обработка ошибок
- Кастомные классы ошибок
- Информативные сообщения об ошибках

## Структура кода

### Контроллеры
- `chat.controller.js` - Управление чатами
- `messagePair.controller.js` - Управление парами сообщений

### Сервисы
- `chat.service.js` - Бизнес-логика чатов
- `messagePair.service.js` - Бизнес-логика пар сообщений

### Роуты
- `chat.routes.js` - Роуты для чатов
- `messagePair.routes.js` - Роуты для пар сообщений

## Преимущества архитектуры

1. **Масштабируемость**: Легко добавлять новые функции
2. **Поддерживаемость**: Четкое разделение ответственности
3. **Тестируемость**: Изолированные компоненты
4. **Производительность**: Оптимизированные запросы к БД
5. **Гибкость**: Возможность изменения логики без влияния на другие части

## Примеры использования

### Создание чата и отправка сообщения:

```javascript
// 1. Создаем чат
const chat = await fetch('/api/chats', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    agentId: 1,
    clientId: 1,
    title: 'Новый чат'
  })
});

// 2. Отправляем сообщение
const messagePair = await fetch(`/api/chats/${chat.id}/message-pairs`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    content: 'Привет, как дела?',
    bot: 'gemini'
  })
});

// 3. Получаем историю
const history = await fetch(`/api/chats/${chat.id}/message-pairs`);
```
