/**
 * Агент
 * @namespace Entities.Agent.Lib.Types.Agent
 */
export type Agent = {
  id: number
  name: string
  avatar: string
  params: AgentParams
  description: string
  provider: {
    id: number
    name: string
  }
  rules: AgentRule[]
  createdAt: Date
  updatedAt: Date
}

/**
 * Параметры агента
 * @namespace Entities.Agent.Lib.Types.AgentParams
 */
export type AgentParams = {
  model: string
  maxTokens: number
  topP: number
  temperature: number
  frequencyPenalty: number
  presencePenalty: number
}

/**
 * Тип для правила агента
 * @namespace Entities.Agent.Lib.Types.AgentRule
 */
export type AgentRule = {
  id: number
  content: string
  priority: number
  agentId: number
}

/**
 * Данные запроса списка агентов
 * @namespace Entities.Agent.Lib.Types.AgentsQueryData
 */
export type AgentsQueryData = {
  agents: Agent[]
  isLoading: boolean
  error: Error | null
}

/**
 * Данные запроса агента по ID
 * @namespace Entities.Agent.Lib.Types.AgentQueryData
 */
export type AgentQueryData = {
  agent: Agent | null
  isLoading: boolean
  error: Error | null
}

/**
 * Тип для данных запроса создания агента
 * @namespace Entities.Agent.Lib.Types.AgentCreateData
 */
export type AgentCreateData = {
  providerId: number
  name: string
  avatar: string
  description: string
  params: AgentParams
}

/**
 * Тип для данных запроса обновления агента
 * @namespace Entities.Agent.Lib.Types.AgentUpdateData
 */
export type AgentUpdateData = Partial<AgentCreateData>

/**
 * Тип для данных запроса добавления правила агента
 * @namespace Entities.Agent.Lib.Types.AgentRuleCreateData
 */
export type AgentRuleCreateData = {
  content: string
  priority?: number
}

/**
 * Тип для данных запроса сортировки правил агента
 * @namespace Entities.Agent.Lib.Types.AgentRuleSortData
 */
export type AgentRuleSortData = {
  agentId: number
  ruleIds: number[]
}
