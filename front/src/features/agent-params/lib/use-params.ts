import { useRef } from "react"
import type { DriverParamsConfig } from "@entities/provider"
import type { Agent } from "@entities/agent"

/**
 * Интерфейс заполненных параметров
 * @namespace Features.AgentParams.Lib.FilledMap
 */
export interface FilledMap {
  [key: string]: string | number | boolean | null | undefined
}

/**
 * Хук для параметров агента
 * @namespace Features.AgentParams.Lib.useParams
 */
export const useParams = (agent: Agent) => {
  const config = useRef<DriverParamsConfig>(agent.provider.driverParamsConfig)
  const values = useRef<FilledMap>(agent.params as FilledMap)

  /**
   * Получить параметры
   * @namespace Features.AgentParams.Lib.useParams.params
   */
  const params = config.current.params ?? []

  /**
   * Получить значения параметров
   * @namespace Features.AgentParams.Lib.useParams.getValues
   */
  const getValues = () => values.current

  /**
   * Получить значение параметра
   * @namespace Features.AgentParams.Lib.useParams.getValue
   */
  const getValue = (name: string) => values.current[name]

  /**
   * Установить значение параметра
   * @namespace Features.AgentParams.Lib.useParams.setValue
   */
  const setValue = (name: string, value: string | number | boolean | null) => {
    values.current[name] = value
  }

  return { params, getValues, getValue, setValue }
}
