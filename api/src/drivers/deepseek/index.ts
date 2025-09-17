import { createRestClient } from "@utils/api"
import { Driver, DriverRequest, DriverParamsConfig, DriverResponse } from "../types"
import { DeepseekDriverConfig, DeepseekDriverModel, DeepseekDriverRequest, DeepseekDriverResponse } from "./types"
import { createApiLogger } from "@utils/logger"

/**
 * Фабрика драйвера Deepseek
 * @namespace Drivers.Deepseek.createDeepseekDriver
 * @param {DeepseekDriverConfig} config Конфигурация драйвера
 */
export const createDeepseekDriver = (config: DeepseekDriverConfig): Driver => {
  const logger = createApiLogger("DeepseekDriver")

  const restClient = createRestClient({
    baseUrl: config.baseUrl,
    authKey: config.apiKey
  })

  const driver: Driver = {
    /**
     * Получение информации о драйвере Deepseek
     * @namespace Drivers.Deepseek.getInfo
     */
    getInfo: async () => ({
      name: "deepseek",
      description: "Драйвер для Deepseek",
      account: await restClient.get("user/balance")
    }),

    /**
     * Получение конфигурации параметров запроса к драйверу
     * @namespace Drivers.Deepseek.getParamsConfig
     */
    getParamsConfig: async (): Promise<DriverParamsConfig> => {
      return {
        // model: await restClient.get("models").then(res => res.data.map((item: any) => item.id)),
        meta: {},
        params: [
          {
            name: "model",
            label: "Модель",
            type: "select",
            options: [DeepseekDriverModel.DEEPSEEK_CHAT, DeepseekDriverModel.DEEPSEEK_REASONER]
          },
          {
            name: "maxTokens",
            label: "Максимальное количество токенов",
            type: "range",
            step: 1,
            min: 1,
            max: 4000
          },
          {
            name: "temperature",
            label: "Температура",
            type: "range",
            step: 0.1,
            min: 0,
            max: 2
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
            name: "frequencyPenalty",
            label: "Частотная штрафность",
            type: "range",
            step: 0.1,
            min: -2,
            max: 2
          },
          {
            name: "presencePenalty",
            label: "Штраф за присутствие",
            type: "range",
            step: 0.1,
            min: -2,
            max: 2
          }
        ]
      }
    },

    /**
     * Отправка запроса к API Deepseek
     * @namespace Drivers.Deepseek.sendRequest
     */
    async sendRequest(request: DriverRequest): Promise<DriverResponse> {
      logger.info("🚀 Отправка запроса", { action: "sendRequest", request })

      try {
        // Сформировать запрос к API
        const driverRequest: DeepseekDriverRequest = {
          model: request.params.model as DeepseekDriverModel,
          messages: request.messages,
          frequency_penalty: request.params.frequencyPenalty as number,
          presence_penalty: request.params.presencePenalty as number,
          max_tokens: request.params.maxTokens as number,
          temperature: request.params.temperature as number,
          top_p: request.params.topP as number
        }

        const data: DeepseekDriverResponse = await restClient.post("chat/completions", driverRequest)

        logger.info("Получен ответ", {
          action: "sendRequest",
          id: data.id,
          model: data.model,
          usage: data.usage
        })

        return {
          providerRequestId: data.id,
          requestParams: driverRequest,
          responseData: data,
          requestTokens: data.usage.prompt_tokens,
          responseTokens: data.usage.completion_tokens,
          content: data.choices[0].message.content
        }
      } catch (error) {
        logger.error("Ошибка при обработке запроса", { action: "sendRequest", error })

        throw error
      }
    }
  }

  logger.info("Драйвер инициализирован")

  return driver
}
