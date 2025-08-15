# Agent "Genya"

Агент работает с провайдером **GenAPI**

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
