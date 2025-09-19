import { createRestClient } from "@utils/api"
import { Driver, DriverRequest, DriverParamsConfig, DriverResponse } from "../types"
import { DeepseekDriverConfig, DeepseekDriverModel, DeepseekDriverRequest, DeepseekDriverResponse } from "./types"
import { createApiLogger } from "@utils/logger"
import { ISender, SenderEvents, createSender } from "@utils/sender"

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
    getInfo: async () => {
      const { data } = await restClient.get("user/balance")

      return {
        name: "deepseek",
        description: "Драйвер для Deepseek",
        account: data
      }
    },

    /**
     * Получение конфигурации параметров запроса к драйверу
     * @namespace Drivers.Deepseek.getParamsConfig
     */
    getParamsConfig: async (): Promise<DriverParamsConfig> => {
      // model: await restClient.get("models").then(res => res.data.map((item: any) => item.id)),

      return {
        meta: {},
        params: [
          {
            name: "model",
            label: "Модель",
            type: "select",
            options: [DeepseekDriverModel.DEEPSEEK_CHAT, DeepseekDriverModel.DEEPSEEK_REASONER]
          },
          {
            name: "stream",
            label: "Режим потока",
            type: "toggle"
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
    sendRequest(request: DriverRequest): ISender {
      logger.info("Инициализация отправки запроса к API", { action: "sendRequest", request })

      return createSender(async (sender: ISender) => {
        logger.info("🚀 Отправка запроса", { action: "Sender.process" })

        try {
          const asStream = request.stream as boolean

          // Сформировать запрос к API
          const driverRequest: DeepseekDriverRequest = {
            model: request.model as DeepseekDriverModel,
            messages: request.messages,
            frequency_penalty: request.frequencyPenalty as number,
            presence_penalty: request.presencePenalty as number,
            max_tokens: request.maxTokens as number,
            temperature: request.temperature as number,
            top_p: request.topP as number,
            stream: asStream
          }

          const response = await restClient.post("chat/completions", driverRequest, {
            responseType: asStream ? "stream" : "json"
          })

          // if (asStream) {
          //   for await (const chunk of response.data) {
          //   }
          // }

          logger.info("Получен ответ", {
            action: "sendRequest",
            id: response.data.id,
            model: response.data.model,
            usage: response.data.usage
          })

          sender.emit(SenderEvents.COMPLETE, {
            providerRequestId: response.data.id,
            requestParams: driverRequest,
            responseData: response.data,
            requestTokens: response.data.usage.prompt_tokens,
            responseTokens: response.data.usage.completion_tokens,
            content: response.data.choices[0].message.content
          })
        } catch (error) {
          logger.error("Ошибка при обработке запроса", { action: "Sender.process", error })

          throw error
        }
      })
    }
  }

  logger.info("Драйвер инициализирован")

  return driver
}
