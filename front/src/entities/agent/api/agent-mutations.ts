import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query"
import { queryKeys } from "./agent-queries"
import { addAgentRule, createAgent, deleteAgentRule, sortAgentRules, updateAgent } from "./agent-api"
import type { Agent, AgentRule } from "../lib/schema"
import type { AgentCreateData, AgentRuleCreateData, AgentRuleSortData, AgentUpdateData } from "../lib/types"

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    }
  })
}

/**
 * Хук для удаления правила агента
 * @namespace Entities.Agent.Api.useDeleteAgentRule
 */
export const useDeleteAgentRule = (): UseMutationResult<void, Error, { ruleId: number }> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ ruleId }: { ruleId: number }) => deleteAgentRule(ruleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    }
  })
}

/**
 * Хук для сортировки правил агента
 * @namespace Entities.Agent.Api.useSortAgentRules
 */
export const useSortAgentRules = (): UseMutationResult<void, Error, { agentId: number; data: AgentRuleSortData }> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ agentId, data }: { agentId: number; data: AgentRuleSortData }) => sortAgentRules(agentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    }
  })
}
