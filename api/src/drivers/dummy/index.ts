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
      model: ["dummy1", "dummy2"],
      maxTokens: { min: 1, max: 100 },
      topP: { min: 0, max: 1 },
      temperature: { min: 0, max: 1 },
      frequencyPenalty: { min: 0, max: 1 },
      presencePenalty: { min: 0, max: 1 }
    }),

    /**
     * Отправка запроса к API драйвера "заглушка"
     * @namespace Drivers.Dummy.sendRequest
     */
    async sendRequest(request: DriverRequest): Promise<DriverResponse> {
      logger.info("🚀 Отправка запроса", { request })

      await new Promise(resolve => setTimeout(resolve, 1000))

      const response = {
        providerRequestId: "dummy",
        content: "dummy response",
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
