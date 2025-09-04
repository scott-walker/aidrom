import { DriverAdaptedResponse } from "../types"
import { DummyDriver, DummyDriverConfig, DummyDriverRequest } from "./types"

/**
 * Фабрика драйвера "заглушка" (для тестирования)
 * @namespace Drivers.Dummy.createDummyDriver
 * @param {DummyDriverConfig} config Конфигурация драйвера
 */
export const createDummyDriver = (config: DummyDriverConfig): DummyDriver => {
  const driver: DummyDriver = {
    alias: "dummy",
    async sendRequest(request: DummyDriverRequest): Promise<DriverAdaptedResponse> {
      console.log("🚀 DummyDriverRequest", request)

      await new Promise(resolve => setTimeout(resolve, 1000))

      return {
        content: "dummy",
        data: {}
      }
    }
  }

  return driver
}
