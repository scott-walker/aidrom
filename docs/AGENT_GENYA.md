# Agent "Genya"

- Агент работает с провайдером **GenAPI**
- Провайдер предоставляет доступ к моделям **Gemini**
- Модель **gemini-2.5-flash-preview-04-17**
- Ссылка на документацию: [GenAPI](https://gen-api.ru/model/gemini-2-5-flash/api)

### Параметры запроса

- `is_sync` - флаг синхронного запроса
- `model` - модель
- `max_tokens` - максимальное количество токенов
- `messages` - массив сообщений

### Пример запроса

```json
{
  "is_sync": true,
  "model": "gemini-2.5-flash-preview-04-17",
  "max_tokens": 1,
  "messages": [
    {
      "role": "user",
      "content": "Привет! Как дела?"
    }
  ],
  "stream": false,
  "n": 1,
  "frequency_penalty": 0,
  "presence_penalty": 0,
  "temperature": 1,
  "top_p": 1,
  "response_format": "{\"type\":\"text\"}"
}
```

### Параметры ответа

- `request_id` - ID запроса
- `model` - модель
- `cost` - стоимость запроса
- `response` - массив сообщений

### Пример ответа

```json
{
  "request_id": 22036123,
  "model": "gemini-2-5-flash",
  "cost": 2.374,
  "response": [
    {
      "logprobs": null,
      "finish_reason": "stop",
      "native_finish_reason": "STOP",
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Привет! Хорошо)",
        "refusal": null,
        "reasoning": null
      }
    }
  ]
}
```
