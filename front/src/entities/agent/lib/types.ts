/**
 * Агент
 * @namespace Entities.Agent.Lib.Types.Agent
 */
export type Agent = {
  id: number
  name: string
  params: Record<string, unknown>
  description: string
  provider: {
    id: number
    name: string
  }
  createdAt: Date
  updatedAt: Date
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
