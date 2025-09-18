import https from "https"
import { GigaChat, detectImage } from "gigachat"
import { createApiLogger } from "@utils/logger"
import * as imager from "@utils/imager"
import { Driver, DriverRequest, DriverParamsConfig, DriverResponse } from "../types"
import { GigachatDriverConfig, GigachatDriverRequest } from "./types"

/**
 * Область видимости для Gigachat
 * @namespace Drivers.Gigachat.SCOPE
 */
const SCOPE = "GIGACHAT_API_PERS"

/**
 * Таймаут запроса (в секундах)
 * @namespace Drivers.Gigachat.REQUEST_TIMEOUT
 */
const REQUEST_TIMEOUT = 60

/**
 * Создает драйвер для Gigachat
 * https://developers.sber.ru/studio/workspaces/01995465-af06-79a6-86ed-f4c711d7e330/gigachat-api/projects/01995465-f1dd-77e4-bc6c-8d4391f60ac5/settings
 * @param {GigachatDriverConfig} config Конфиг драйвера
 */
export const createGigachatDriver = (config: GigachatDriverConfig): Driver => {
  const logger = createApiLogger("GigachatDriver")

  const giga = new GigaChat({
    credentials: config.authorizationKey,
    scope: SCOPE,
    timeout: REQUEST_TIMEOUT,
    httpsAgent: new https.Agent({
      rejectUnauthorized: false // ⚠️ игнорирует self-signed cert
    })
  })

  const driver: Driver = {
    /**
     * Получение информации о драйвере Gigachat
     * @namespace Drivers.Gigachat.getInfo
     */
    getInfo: async () => ({
      name: "gigachat",
      description: "Драйвер для Gigachat",
      account: await giga.balance()
    }),

    /**
     * Получение конфигурации параметров запроса к драйверу
     * @namespace Drivers.Gigachat.getParamsConfig
     */
    getParamsConfig: async (): Promise<DriverParamsConfig> => {
      const { data } = await giga.getModels()

      return {
        meta: {},
        params: [
          {
            name: "model",
            label: "Модель",
            type: "select",
            options: data.map((item: any) => item.id)
          },
          {
            name: "maxTokens",
            label: "Максимальное количество токенов",
            type: "range",
            step: 1,
            min: 10,
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
            name: "repetitionPenalty",
            label: "Количество повторений слов",
            type: "range",
            step: 0.1,
            min: 0,
            max: 2
          }
        ]
      }
    },

    /**
     * Отправка запроса к API Gigachat для генерации изображения
     * @namespace Drivers.Gigachat.sendGenerateImage
     */
    sendRequest: async (request: DriverRequest): Promise<DriverResponse> => {
      logger.info("🚀 Отправка запроса", { action: "sendRequest", request })

      try {
        const driverRequest: GigachatDriverRequest = {
          messages: request.messages,
          model: request.params.model as string,
          temperature: request.params.temperature as number,
          top_p: request.params.topP as number,
          max_tokens: request.params.maxTokens as number,
          repetition_penalty: request.params.repetitionPenalty as number,
          function_call: "auto"
        }

        const data = await giga.chat(driverRequest)
        let content = data.choices[0]?.message.content ?? ""

        logger.info("Получен ответ", { action: "sendRequest", data })

        // Получение изображения по идентификатору
        const detectedImage = detectImage(content)

        // Если в содержимом есть изображение
        if (detectedImage) {
          logger.info("Запрос на получение изображения", { action: "sendRequest" })

          const image = await giga.getImage(detectedImage.uuid)
          const fileName = `${detectedImage.uuid}.jpeg`
          content = content.replace(detectedImage.uuid, `/static/${fileName}`)

          const filePath = imager.save(fileName, image.content)
          logger.info("Изображение сохранено в файл", { action: "sendRequest", filePath })
        }

        return {
          content,
          providerRequestId: data.xHeaders.xRequestID,
          requestParams: driverRequest,
          responseData: data,
          requestTokens: data.usage.prompt_tokens,
          responseTokens: data.usage.completion_tokens
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
