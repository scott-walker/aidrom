import { createRestClient } from "@utils/api"
import {
  Driver,
  DriverRequest,
  DriverRequestMessages,
  DriverRequestMessageRole,
  DriverRequestParamsConfig,
  DriverResponse
} from "../types"
import {
  DeepseekDriverConfig,
  DeepseekDriverModel,
  DeepseekDriverRequest,
  DeepseekDriverResponse,
  DeepseekDriverRole
} from "./types"
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
    apiKey: config.apiKey
  })

  /**
   * Преобразует контекст запроса в контекст драйвера
   * @namespace Drivers.Deepseek.convertContext
   * @param {DriverRequestMessages} context Контекст запроса
   * @returns {DeepseekDriverRequestContext} Контекст драйвера
   */
  const convertContext = (context: DriverRequestMessages): { role: DeepseekDriverRole; content: string }[] => {
    const rolesMap = {
      [DriverRequestMessageRole.System]: DeepseekDriverRole.SYSTEM,
      [DriverRequestMessageRole.Client]: DeepseekDriverRole.USER,
      [DriverRequestMessageRole.Agent]: DeepseekDriverRole.ASSISTANT
    }

    return context.map(item => ({
      role: rolesMap[item.role],
      content: item.content
    }))
  }

  const driver: Driver = {
    /**
     * Получение конфигурации параметров запроса к драйверу
     * @namespace Drivers.Deepseek.getParams
     */
    getParamsConfig: async (): Promise<DriverRequestParamsConfig> => {
      return {
        // model: await restClient.get("models").then(res => res.data.map((item: any) => item.id)),
        model: [DeepseekDriverModel.DEEPSEEK_CHAT, DeepseekDriverModel.DEEPSEEK_REASONER],
        maxTokens: {
          min: 1,
          max: 4000
        },
        temperature: {
          min: 0,
          max: 2
        },
        topP: {
          min: 0.1,
          max: 1
        },
        frequencyPenalty: {
          min: -2,
          max: 2
        },
        presencePenalty: {
          min: -2,
          max: 2
        }
      }
    },

    /**
     * Отправка запроса к API Deepseek
     * @namespace Drivers.Deepseek.sendRequest
     */
    async sendRequest(request: DriverRequest): Promise<DriverResponse> {
      logger.info("🚀 Отправка запроса", { action: "sendRequest", request })

      try {
        // Сформировать контекстные сообщения
        const messages = convertContext(request.messages)

        // Сформировать запрос к API
        const driverRequest: DeepseekDriverRequest = {
          model: request.params.model as DeepseekDriverModel,
          messages,
          frequency_penalty: request.params.frequencyPenalty,
          presence_penalty: request.params.presencePenalty,
          max_tokens: request.params.maxTokens,
          temperature: request.params.temperature,
          top_p: request.params.topP
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
