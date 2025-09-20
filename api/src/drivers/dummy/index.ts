import { createApiLogger } from "@utils/logger"
import { Driver, DriverRequest } from "../types"
import { DummyDriverConfig } from "./types"
import { createSender, ISender, SenderEvents } from "@utils/sender"

/**
 * Фабрика драйвера "заглушка" (для тестирования)
 * @namespace Drivers.Dummy.createDummyDriver
 * @param {DummyDriverConfig} config Конфигурация драйвера
 */
export const createDummyDriver = (config: DummyDriverConfig): Driver => {
  const logger = createApiLogger("DummyDriver")

  const driver: Driver = {
    /**
     * Получение информации о драйвере "заглушка"
     * @namespace Drivers.Dummy.getInfo
     */
    getInfo: async () => ({
      name: "dummy",
      description: "Драйвер для тестирования",
      version: "1.0.0",
      balance: 0
    }),

    /**
     * Получение конфигурации параметров запроса к драйверу "заглушка"
     * @namespace Drivers.Dummy.getModels
     */
    getParamsConfig: async () => ({
      meta: {},
      params: [
        {
          name: "dummyModel",
          label: "Модель",
          type: "select",
          options: ["dummy1", "dummy2"]
        },
        {
          name: "dummyMaxTokens",
          label: "Максимальное количество токенов",
          type: "range",
          min: 0,
          max: 100,
          step: 1
        },
        {
          name: "dummyTemperature",
          label: "Температура (ура-ура)",
          type: "range",
          min: 0,
          max: 100,
          step: 0.1
        }
      ]
    }),

    /**
     * Отправка запроса к API драйвера "заглушка"
     * @namespace Drivers.Dummy.sendRequest
     */
    sendRequest(request: DriverRequest): ISender {
      logger.info("🚀 Отправка запроса", { action: "sendRequest", request })

      return createSender(async sender => {
        await new Promise(resolve => setTimeout(resolve, 1000))

        const responseContent = "Отличный выбор! Next.js — это один из самых"

        let content = ""
        for (const chunk of responseContent.split("")) {
          content += chunk
          sender.emit(SenderEvents.CHUNK, { content })

          await new Promise(resolve => setTimeout(resolve, 100))
        }

        sender.emit(SenderEvents.COMPLETE, {
          providerRequestId: "dummy",
          content,
          requestParams: request,
          responseData: {
            request,
            config
          },
          requestTokens: 0,
          responseTokens: 0
        })

        logger.info("🚀 Получен ответ", { action: "sendRequest" })
      })
    }
  }

  logger.info("Драйвер инициализирован")

  return driver
}
