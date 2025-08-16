# Agent "Clavdiya"

- Агент работает с провайдером **GenAPI**
- Провайдер предоставляет доступ к моделям **Claude**
- Модель **claude-sonnet-4-20250522**
- Ссылка на документацию: [GenAPI Claude](https://gen-api.ru/model/claude-4/api)

### Параметры запроса

- `is_sync` - флаг синхронного запроса
- `model` - модель
- `max_tokens` - максимальное количество токенов (100)
- `temperature` - температура генерации (0.1)
- `messages` - массив сообщений

### Пример запроса

```json
{
  "is_sync": true,
  "model": "claude-sonnet-4-20250522",
  "max_tokens": 100,
  "temperature": 0.1,
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Привет! Как дела?"
        }
      ]
    }
  ]
}
```

### Параметры ответа

- `request_id` - ID запроса
- `cost` - стоимость запроса
- `response` - массив сообщений с ответом от Claude

### Пример ответа

```json
{
  "request_id": 22057485,
  "model": "claude-4",
  "cost": 0.071,
  "response": [
    {
      "id": "gen-1755290330-0oNZNHDTsCDu3flmEWGi",
      "model": "anthropic/claude-sonnet-4",
      "object": "chat.completion",
      "created": 1755290332,
      "choices": [
        {
          "index": 0,
          "message": {
            "role": "assistant",
            "content": "Привет! Нормально, спасибо что спросили. Как дела у тебя?"
          },
          "logprobs": null,
          "finish_reason": "stop"
        }
      ],
      "usage": {
        "prompt_tokens": 10,
        "completion_tokens": 21,
        "total_tokens": 31,
        "prompt_tokens_details": { "cached_tokens": 0, "audio_tokens": 0 },
        "completion_tokens_details": {
          "reasoning_tokens": 0,
          "audio_tokens": 0,
          "accepted_prediction_tokens": 0,
          "rejected_prediction_tokens": 0
        }
      },
      "system_fingerprint": null
    }
  ]
}
```

### Особенности агента

- Использует модель Claude Sonnet 4 с датой 2025-05-22
- Низкая температура (0.1) для более предсказуемых ответов
- Ограничение в 100 токенов на ответ
- Поддерживает структурированный формат сообщений с типом "text"
