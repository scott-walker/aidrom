import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query"
import { queryKeys } from "./agent-queries"
import { addAgentRule, createAgent, deleteAgentRule, deleteAgent, sortAgentRules, updateAgent } from "./agent-api"
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
 * Хук для удаления агента
 * @namespace Entities.Agent.Api.useDeleteAgent
 */
export const useDeleteAgent = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (agentId: number) => deleteAgent(agentId),
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
    onMutate: ({ agentId, data }) => {
      const previousAgent = queryClient.getQueryData(queryKeys.details(agentId)) as Agent

      if (previousAgent) {
        const lastPriority = previousAgent.rules[previousAgent.rules.length - 1].priority
        const newRule = { ...data, id: 0, agentId, priority: lastPriority + 1 }
        const updatedAgent = { ...previousAgent, rules: [...previousAgent.rules, newRule] }

        queryClient.setQueryData(queryKeys.details(agentId), updatedAgent)
      }

      return { previousAgent }
    },
    onSuccess: ({ agentId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.details(agentId) })
    }
  })
}

/**
 * Хук для удаления правила агента
 * @namespace Entities.Agent.Api.useDeleteAgentRule
 */
export const useDeleteAgentRule = (): UseMutationResult<void, Error, { agentId: number; ruleId: number }> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ agentId, ruleId }: { agentId: number; ruleId: number }) => deleteAgentRule(agentId, ruleId),
    onMutate: ({ agentId, ruleId }) => {
      const previousAgent = queryClient.getQueryData(queryKeys.details(agentId)) as Agent

      if (previousAgent) {
        const newRules = previousAgent.rules
          .filter(rule => rule.id !== ruleId)
          .map((rule, index) => ({ ...rule, priority: index + 1 }))
        const updatedAgent = { ...previousAgent, rules: newRules }

        queryClient.setQueryData(queryKeys.details(agentId), updatedAgent)
      }

      return { previousAgent }
    },
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
    onMutate: ({ agentId, data }) => {
      const previousAgent = queryClient.getQueryData(queryKeys.details(agentId)) as Agent

      if (previousAgent) {
        const newRules = data.ruleIds.map((ruleId, index) => {
          const rule = previousAgent.rules.find(rule => rule.id === ruleId)

          return { ...rule, priority: index + 1 }
        })
        const updatedAgent = { ...previousAgent, rules: newRules }

        queryClient.setQueryData(queryKeys.details(agentId), updatedAgent)
      }

      return { previousAgent }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    }
  })
}
