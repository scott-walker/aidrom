/**
 * Агент
 * @namespace Entities.Agent.Lib.Types.Agent
 */
export type Agent = {
  id: number
  name: string
  avatar: string
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

/**
 * Тип для данных запроса создания агента
 * @namespace Entities.Agent.Lib.Types.AgentCreateData
 */
export type AgentCreateData = {
  providerId: number
  name: string
  avatar: string
  description: string
  params: Record<string, unknown>
}

/**
 * Тип для данных запроса обновления агента
 * @namespace Entities.Agent.Lib.Types.AgentUpdateData
 */
export type AgentUpdateData = Partial<AgentCreateData>
