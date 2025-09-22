import { createRestClient } from "@utils/api"
import { Driver, DriverRequest, DriverParamsConfig } from "../types"
import {
  DeepseekDriverConfig,
  DeepseekDriverModel,
  DeepseekDriverRequest,
  DeepseekDriverResponse,
  DeepseekDriverChunkResponse
} from "./types"
import { createApiLogger } from "@utils/logger"
import { ISender, SenderEvents, createSender } from "@utils/sender"
import { handleStream } from "@utils/helpers"

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
        logger.info("🚀 Отправка запроса", { action: "sendRequest" })

        try {
          const asStream = true // request.stream as boolean

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

          let content = ""
          let data = {} as DeepseekDriverResponse | DeepseekDriverChunkResponse
          const response = await restClient.post("chat/completions", driverRequest, {
            responseType: asStream ? "stream" : "json"
          })

          // Эммитеть событие "старт отправки сообщений"
          sender.emit(SenderEvents.START, {})

          if (asStream) {
            logger.info("Получен поток ответа", { action: "sendRequest" })

            await handleStream(response.data, {
              onChunk: (chunk: DeepseekDriverChunkResponse) => {
                const deltaContent = chunk.choices?.[0]?.delta?.content

                if (deltaContent) {
                  content += deltaContent
                  sender.emit(SenderEvents.CONTENT, { content })
                }

                data = chunk
              },
              onError: error => {
                logger.error("Ошибка при обработке стрима", { error: error.message })
              }
            })
          } else {
            logger.info("Получен ответ", { action: "sendRequest" })

            content = response.data.choices[0].message.content
            data = response.data
          }

          sender.emit(SenderEvents.COMPLETE, {
            providerRequestId: data?.id,
            requestParams: driverRequest,
            responseData: data,
            requestTokens: data?.usage?.prompt_tokens,
            responseTokens: data?.usage?.completion_tokens,
            content
          })
        } catch (error) {
          logger.error("Ошибка при обработке запроса", { action: "sendRequest", error })

          sender.emit(SenderEvents.ERROR, { error })
        }
      })
    }
  }

  logger.info("Драйвер инициализирован")

  return driver
}
