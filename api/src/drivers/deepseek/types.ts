/**
 * Интерфейсы драйвера Deepseek
 * @namespace Drivers.Deepseek
 * https://api-docs.deepseek.com/api/create-chat-completion
 */

import { DriverConfig, DriverRequestMessageRole } from "../types"

/**
 * Модели Deepseek
 * @namespace Drivers.Deepseek.DeepseekDriverModel
 */
export enum DeepseekDriverModel {
  DEEPSEEK_CHAT = "deepseek-chat",
  DEEPSEEK_REASONER = "deepseek-reasoner"
}

/**
 * Причина остановки Deepseek
 * @namespace Drivers.Deepseek.DeepseekDriverFinishReason
 */
export enum DeepseekDriverFinishReason {
  STOP = "stop",
  LENGTH = "length",
  CONTENT_FILTER = "content_filter",
  TOOL_CALLS = "tool_calls",
  INSUFFICIENT_SYSTEM_RESOURCE = "insufficient_system_resource"
}

/**
 * Интерфейс запроса к Deepseek
 * @namespace Drivers.Deepseek.DeepseekDriverRequest
 */
export interface DeepseekDriverRequest {
  messages: {
    content: string
    role: DriverRequestMessageRole
    // Имя участника. Предоставляет информацию о модели, позволяющую различать участников с одинаковой ролью.
    name?: string
  }[]
  model: DeepseekDriverModel
  frequency_penalty?: number
  max_tokens?: number
  presence_penalty?: number
  response_format?: {
    type: "text" | "json_object"
  }
  stop?: string | null
  stream?: boolean
  stream_options?: string | null
  temperature?: number
  top_p?: number
  tools?: string | null
  tool_choice?: string | null
  logprobs?: boolean
  top_logprobs?: string | null
}

/**
 * Интерфейс ответа от Deepseek
 * @namespace Drivers.Deepseek.DeepseekDriverResponse
 */
export interface DeepseekDriverResponse {
  id: string
  // Тип объекта, который всегда является chat.completion
  object: "chat.completion"
  created: number
  model: DeepseekDriverModel
  choices: {
    index: number
    message: {
      // Роль автора этого сообщения
      role: DriverRequestMessageRole.ASSISTANT
      // Содержание сообщения
      content: string
      // Содержимое, сгенерированное моделью в ходе логического вывода (только для модели deepseek-reasoner)
      reasoning_content: string
      tool_calls: {
        // Идентификатор вызова инструмент
        id: string
        // Тип инструмента. В настоящее время поддерживается только одна функция
        type: "function"
        // Функция, которую вызывала модель
        function: {
          // Имя функции
          name: string
          // Аргументы для вызова функции, сгенерированные моделью в формате JSON.
          // Обратите внимание, что модель не всегда генерирует корректный JSON и может содержать параметры,
          // не определенные в схеме вашей функции.
          // Проверьте аргументы в вашем коде перед вызовом вашей функции.
          arguments: string
        }
      }[]
    }
    // Детали логистического прогнозирования
    logprobs: Record<string, any> | null
    // Причина, по которой модель перестала генерировать токены
    // stop - если модель достигнет естественной точки остановки или заданной последовательности остановок
    // length - если было достигнуто максимальное количество токенов, указанных в запросе
    // content_filter - если содержимое было пропущено из-за флага наших фильтров содержимого
    // tool_calls - если модель вызвала инструмент
    // insufficient_system_resource - если запрос не выполнен из-за недостаточного ресурса системы логического вывода
    finish_reason: DeepseekDriverFinishReason
  }[]
  usage: {
    // Количество токенов в приглашении. Оно равно prompt_cache_hit_tokens + prompt_cache_miss_tokens
    prompt_tokens: number
    // Количество токенов в сгенерированном завершении
    completion_tokens: number
    // Общее количество токенов, использованных в запросе (приглашение + завершение)
    total_tokens: number
    // Детали использования токенов в приглашении
    prompt_tokens_details: {
      // Количество токенов в приглашении, попадающем в контекстный кэш
      cached_tokens: number
    }
    // Количество токенов в приглашении, попадающем в контекстный кэш
    prompt_cache_hit_tokens: number
    // Количество токенов в приглашении, не попадающем в контекстный кэш
    prompt_cache_miss_tokens: number
  }
  // Этот отпечаток представляет собой конфигурацию серверной части, с которой работает модель
  system_fingerprint: string
}

/**
 * Интерфейс конфига драйвера Deepseek
 * @namespace Drivers.Deepseek.DeepseekDriverConfig
 */
export interface DeepseekDriverConfig extends DriverConfig {
  baseUrl: string
  apiKey: string
}
