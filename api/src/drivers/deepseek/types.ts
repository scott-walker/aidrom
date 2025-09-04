/**
 * Интерфейсы драйвера Deepseek
 * @namespace Drivers.Deepseek
 * https://api-docs.deepseek.com/api/create-chat-completion
 */

import {
  Driver,
  DriverConfig,
  DriverRequest,
  DriverResponse,
  DriverAdaptedResponse,
  DriverSendRequestMethod
} from "../types"

/**
 * Интерфейс запроса к Deepseek
 * @namespace Drivers.Deepseek.DeepseekDriverRequest
 */
export interface DeepseekDriverRequest extends DriverRequest {
  messages: {
    content: string
    role: "system" | "user"
  }[]
  model: "deepseek-chat" | "deepseek-reasoner"
  frequency_penalty: number
  max_tokens: number
  presence_penalty: number
  response_format: {
    type: "text" | "json_object"
  }
  stop: string | null
  stream: boolean
  stream_options: string | null
  temperature: number
  top_p: number
  tools: string | null
  tool_choice: string | null
  logprobs: boolean
  top_logprobs: string | null
}

/**
 * Интерфейс ответа от Deepseek
 * @namespace Drivers.Deepseek.DeepseekDriverResponse
 */
export interface DeepseekDriverResponse extends DriverResponse {
  id: string
  // Тип объекта, который всегда является chat.completion
  object: "chat.completion"
  created: number
  model: "deepseek-chat" | "deepseek-reasoner"
  choices: {
    index: number
    message: {
      // Роль автора этого сообщения
      role: "assistant"
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
    finish_reason: "stop" | "length" | "content_filter" | "tool_calls" | "insufficient_system_resource"
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
export interface DeepseekDriverConfig extends DriverConfig {}

/**
 * Интерфейс метода отправки запроса к API драйвера Deepseek
 * @namespace Drivers.Deepseek.DeepseekDriverSendRequestMethod
 */
export interface DeepseekDriverSendRequestMethod extends DriverSendRequestMethod {
  (request: DeepseekDriverRequest): Promise<DriverAdaptedResponse>
}

/**
 * Интерфейс драйвера Deepseek
 * @namespace Drivers.Deepseek.DeepseekDriver
 */
export interface DeepseekDriver extends Driver {
  sendRequest: DeepseekDriverSendRequestMethod
}
