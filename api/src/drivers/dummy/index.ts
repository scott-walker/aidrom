import { createApiLogger } from "@utils/logger"
import { DriverAdaptedResponse } from "../types"
import { DummyDriver, DummyDriverConfig, DummyDriverRequest } from "./types"

/**
 * Фабрика драйвера "заглушка" (для тестирования)
 * @namespace Drivers.Dummy.createDummyDriver
 * @param {DummyDriverConfig} config Конфигурация драйвера
 */
export const createDummyDriver = (config: DummyDriverConfig): DummyDriver => {
  const logger = createApiLogger("DummyDriver")

  const driver: DummyDriver = {
    async sendRequest(request: DummyDriverRequest): Promise<DriverAdaptedResponse> {
      logger.info("🚀 Отправка запроса", { request })

      await new Promise(resolve => setTimeout(resolve, 1000))

      const response = {
        providerRequestId: "dummy",
        content: "dummy",
        requestParams: request,
        responseData: {},
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
