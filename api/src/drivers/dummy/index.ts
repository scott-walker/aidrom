import { createApiLogger } from "@utils/logger"
import { Driver, DriverRequest, DriverResponse } from "../types"
import { DummyDriverConfig } from "./types"

/**
 * Фабрика драйвера "заглушка" (для тестирования)
 * @namespace Drivers.Dummy.createDummyDriver
 * @param {DummyDriverConfig} config Конфигурация драйвера
 */
export const createDummyDriver = (config: DummyDriverConfig): Driver => {
  const logger = createApiLogger("DummyDriver")

  const driver: Driver = {
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
    async sendRequest(request: DriverRequest): Promise<DriverResponse> {
      logger.info("🚀 Отправка запроса", { request })

      await new Promise(resolve => setTimeout(resolve, 1000))

      const content = request.messages
        .map(message => {
          return `${message.role}: ${message.content}`
        })
        .join("\n")

      const response = {
        providerRequestId: "dummy",
        content,
        requestParams: request,
        responseData: {
          request,
          config
        },
        requestTokens: 0,
        responseTokens: 0
      }

      logger.info("🚀 Получен ответ", response)

      return response
    }
  }

  logger.info("Драйвер инициализирован")

  return driver
}
