import type { DriverParamsConfig } from "@entities/provider"

/**
 * Хук для параметров агента
 * @namespace Features.AgentParams.Lib.useParams
 */
export const useParams = () => {
  const parseParams = (paramsConfig: DriverParamsConfig) => {
    const models = paramsConfig.model.map(model => ({ label: model, value: model }))
    const maxTokens = paramsConfig.maxTokens
    const topP = paramsConfig.topP
    const temperature = paramsConfig.temperature
    const frequencyPenalty = paramsConfig.frequencyPenalty
    const presencePenalty = paramsConfig.presencePenalty

    return {
      models,
      maxTokens,
      topP,
      temperature,
      frequencyPenalty,
      presencePenalty
    }
  }

  return { parseParams }
}
