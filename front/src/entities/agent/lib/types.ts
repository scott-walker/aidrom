import type { RestError } from "@features/provider-form/model/api"
import type { Agent, AgentParams } from "./schema"

/**
 * Тип данных для запроса списка агентов
 * @namespace Entities.Agent.Lib.Types.AgentsQueryData
 */
export type AgentListQueryData = {
  agents: Agent[]
  isLoading: boolean
  error: RestError | null
}

/**
 * Тип данных для запроса агента по ID
 * @namespace Entities.Agent.Lib.Types.AgentQueryData
 */
export type AgentDetailQueryData = {
  agent: Agent | null
  isLoading: boolean
  error: RestError | null
}

/**
 * Тип данных для запроса на создание агента
 * @namespace Entities.Agent.Lib.Types.AgentCreateData
 */
export type AgentCreateData = {
  avatar: string
  name: string
  providerId: number
}

/**
 * Тип данных для запроса на обновление агента
 * @namespace Entities.Agent.Lib.Types.AgentUpdateData
 */
export type AgentUpdateData = {
  name?: string
  params?: AgentParams
  description?: string
}

/**
 * Тип данных для запроса на добавление правила агента
 * @namespace Entities.Agent.Lib.Types.AgentRuleCreateData
 */
export type AgentRuleCreateData = {
  content: string
}

/**
 * Тип для данных запроса сортировки правил агента
 * @namespace Entities.Agent.Lib.Types.AgentRuleSortData
 */
export type AgentRuleSortData = {
  ruleIds: number[]
}
