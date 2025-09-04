import { createRestClient } from "@utils/api"
import { DriverAdaptedResponse } from "../types"
import { DeepseekDriver, DeepseekDriverConfig, DeepseekDriverRequest, DeepseekDriverResponse } from "./types"

/**
 * Фабрика драйвера Deepseek
 * @namespace Drivers.Deepseek.createDeepseekDriver
 * @param {DeepseekDriverConfig} config Конфигурация драйвера
 */
export const createDeepseekDriver = (config: DeepseekDriverConfig): DeepseekDriver => {
  const restClient = createRestClient({
    baseUrl: config.baseUrl,
    apiKey: config.apiKey
  })

  const driver: DeepseekDriver = {
    alias: "deepseek",
    async sendRequest(request: DeepseekDriverRequest): Promise<DriverAdaptedResponse> {
      const { data } = await restClient.post("chat/completions", request)

      return {
        content: data.choices[0].message.content,
        data: data
      }
    }
  }

  return driver
}
