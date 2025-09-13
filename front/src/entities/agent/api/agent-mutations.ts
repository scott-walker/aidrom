import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query"
import { queryKeys } from "./agent-queries"
import { addAgentRule, createAgent, deleteAgentRule, updateAgent } from "./agent-api"
import type { Agent, AgentCreateData, AgentRule, AgentRuleCreateData, AgentUpdateData } from "../lib/types"

/**
 * Хук для создания агента
 * @namespace Entities.Agent.Api.useCreateAgent
 */
export const useCreateAgent = (): UseMutationResult<Agent, Error, AgentCreateData> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AgentCreateData) => createAgent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list({}) })
    }
  })
}

/**
 * Хук для обновления агента
 * @namespace Entities.Agent.Api.useUpdateAgent
 */
export const useUpdateAgent = (): UseMutationResult<Agent, Error, { agentId: number; data: AgentUpdateData }> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ agentId, data }: { agentId: number; data: AgentUpdateData }) => {
      return updateAgent(agentId, data)
    },
    onSuccess: (updatedAgent: Agent) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list({}) })
      queryClient.invalidateQueries({ queryKey: queryKeys.details(updatedAgent.id) })
    }
  })
}

/**
 * Хук для добавления правила агента
 * @namespace Entities.Agent.Api.useAddAgentRule
 */
export const useAddAgentRule = (): UseMutationResult<
  AgentRule,
  Error,
  { agentId: number; data: AgentRuleCreateData }
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ agentId, data }: { agentId: number; data: AgentRuleCreateData }) => addAgentRule(agentId, data),
    onSuccess: (data: AgentRule) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.details(data.agentId) })
    }
  })
}

/**
 * Хук для удаления правила агента
 * @namespace Entities.Agent.Api.useDeleteAgentRule
 */
export const useDeleteAgentRule = (): UseMutationResult<AgentRule, Error, { ruleId: number }> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ ruleId }: { ruleId: number }) => deleteAgentRule(ruleId),
    onSuccess: (data: AgentRule) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.details(data.agentId) })
    }
  })
}
