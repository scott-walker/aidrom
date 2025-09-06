/**
 * Агент
 * @namespace Entities.Agent.Lib.Types.Agent
 */
export type Agent = {
  id: number
  name: string
  params: Record<string, unknown>
  description: string
  providerId: number
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
