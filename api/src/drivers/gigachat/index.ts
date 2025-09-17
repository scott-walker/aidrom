import crypto from "crypto"
import fs from "fs"
import path from "path"
import { getConfigParam } from "@config"
import { createApiLogger } from "@utils/logger"
import { createRestClient, RestClient } from "@utils/api"
import { Driver, DriverRequest, DriverParamsConfig, DriverResponse } from "../types"
import {
  GigachatAuthResponse,
  GigachatDriverConfig,
  GigachatDriverRequest,
  GigachatDriverResponse,
  GigachatDriverModelsResponse
} from "./types"

const AUTH_BASE_URL = "https://ngw.devices.sberbank.ru:9443/api/v2"
const CHAT_BASE_URL = "https://gigachat.devices.sberbank.ru/api/v1"
const SCOPE = "GIGACHAT_API_PERS"

/**
 * Создает драйвер для Gigachat
 * https://developers.sber.ru/studio/workspaces/01995465-af06-79a6-86ed-f4c711d7e330/gigachat-api/projects/01995465-f1dd-77e4-bc6c-8d4391f60ac5/settings
 * @param {GigachatDriverConfig} config Конфиг драйвера
 */
export const createGigachatDriver = (config: GigachatDriverConfig): Driver => {
  const dataPath = path.resolve(getConfigParam("runtimeDir") as string, "gigachat", "auth.json")
  const logger = createApiLogger("GigachatDriver")
  const authClient = createRestClient({
    baseUrl: AUTH_BASE_URL,
    authKey: config.authorizationKey,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Authorization: `Basic ${config.authorizationKey}`,
      RqUID: crypto.randomUUID()
    }
  })

  /**
   * Получает токен авторизации
   * @returns {Promise<string>} Токен авторизации
   */
  const getAuthToken = async (): Promise<string> => {
    // Проверить, есть ли токен в файле
    if (fs.existsSync(dataPath)) {
      const data = JSON.parse(fs.readFileSync(dataPath, "utf8"))

      if (data.expires_at > Date.now()) {
        logger.info("Токен получен из файла", { action: "getAuthToken" })

        return data.access_token
      }
    }

    try {
      logger.info("Получение токена из API", { action: "getAuthToken" })

      const data: GigachatAuthResponse = await authClient.post("oauth", {
        scope: SCOPE
      })

      // Запомнить токен в файл
      fs.mkdirSync(path.dirname(dataPath), { recursive: true })
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))

      return data.access_token
    } catch (error) {
      logger.error("Ошибка при получении токена из API", { action: "getAuthToken", error: error.message })

      throw error
    }
  }

  /**
   * Создает HTTP клиент для чата
   * @returns {Promise<RestClient>} Клиент для чата
   */
  const createChatClient = async (): Promise<RestClient> => {
    const authToken = await getAuthToken()

    return createRestClient({
      baseUrl: CHAT_BASE_URL,
      authKey: authToken
    })
  }

  return {
    /**
     * Получение конфигурации параметров запроса к драйверу
     * @namespace Drivers.Gigachat.getParamsConfig
     */
    getParamsConfig: async (): Promise<DriverParamsConfig> => {
      const chatClient = await createChatClient()
      const { data }: GigachatDriverModelsResponse = await chatClient.get("models")

      return {
        meta: {},
        params: [
          {
            name: "Модель",
            label: "Модель",
            type: "select",
            options: data.map((item: any) => item.id)
          },
          {
            label: "Максимальное количество токенов",
            name: "maxTokens",
            type: "range",
            step: 1,
            min: 1,
            max: 100
          },
          {
            name: "temperature",
            label: "Температура",
            type: "range",
            step: 1,
            min: 1,
            max: 100
          },
          {
            name: "topP",
            label: "Top P",
            type: "range",
            step: 0.1,
            min: 0.1,
            max: 1
          },
          {
            name: "repetitionPenalty",
            label: "Штраф за повторение",
            type: "range",
            step: 0.1,
            min: 0,
            max: 1
          }
        ]
      }
    },

    /**
     * Отправка запроса к API Gigachat
     * @namespace Drivers.Gigachat.sendRequest
     */
    sendRequest: async (request: DriverRequest): Promise<DriverResponse> => {
      const chatClient = await createChatClient()

      const driverRequest: GigachatDriverRequest = {
        messages: request.messages,
        model: request.params.model as string,
        temperature: request.params.temperature as number,
        top_p: request.params.topP as number,
        max_tokens: request.params.maxTokens as number,
        repetition_penalty: request.params.repetitionPenalty as number
      }

      const data: GigachatDriverResponse = await chatClient.post("chat/completions", driverRequest)

      return {
        content: data.choices[0].message.content,
        providerRequestId: crypto.randomUUID(),
        requestParams: driverRequest,
        responseData: data,
        requestTokens: data.usage.prompt_tokens,
        responseTokens: data.usage.completion_tokens
      }
    }
  }
}
