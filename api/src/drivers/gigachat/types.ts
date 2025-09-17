import { DriverConfig, DriverRequestMessages } from "../types"

/**
 * Интерфейс конфига драйвера Gigachat
 * @namespace Drivers.Gigachat.GigachatDriverConfig
 */
export interface GigachatDriverConfig extends DriverConfig {
  clientId: string
  scope: string
  authorizationKey: string
}

/**
 * Интерфейс ответа от API Gigachat для авторизации
 * @namespace Drivers.Gigachat.GigachatAuthResponse
 */
export interface GigachatAuthResponse {
  access_token: string
  expires_at: number
}

/**
 * Интерфейс ответа от API Gigachat для получения моделей
 * @namespace Drivers.Gigachat.GigachatDriverModelsResponse
 */
export interface GigachatDriverModelsResponse {
  object: string
  data: {
    id: string
    object: string
    owned_by: string
    type: string
  }[]
}

/**
 * Интерфейс запроса к API Gigachat
 * @namespace Drivers.Gigachat.GigachatDriverRequest
 */
export interface GigachatDriverRequest {
  messages: DriverRequestMessages
  model: string
  temperature?: number
  top_p?: number
  repetition_penalty?: number
  max_tokens?: number
  function_call?: string
}

/**
 * Интерфейс ответа от API Gigachat
 * @namespace Drivers.Gigachat.GigachatDriverResponse
 */
export interface GigachatDriverResponse {
  choices: {
    index: number
    message: {
      role: string
      content: string
      created: number
      name: string
      functions_state_id: string
      function_call: {
        name: string
        arguments: string
      }
    }
    finish_reason: string
  }[]
  created: number
  model: string
  usage: {
    prompt_tokens: number
    completion_tokens: number
    precached_prompt_tokens: number
    total_tokens: number
  }
  object: string
}
