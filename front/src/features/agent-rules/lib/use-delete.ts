import { useDeleteAgentRule } from "@entities/agent/api/agent-mutations"
import { useToast } from "@features/toasts"

/**
 * Хук для удаления правила агента
 * @namespace Features.AgentRules.Lib.useDeleteRule
 */
export const useDeleteRule = (agentId: number) => {
  const { mutate: deleteAgentRule, isPending: isDeleting } = useDeleteAgentRule()
  const toast = useToast()
  const onDelete = (ruleId: number) => {
    deleteAgentRule(
      { agentId, ruleId },
      {
        onSuccess: () => {
          toast.success("Правило успешно удалено")
        },
        onError: ({ message }) => {
          toast.error("Произошла ошика при удалении правила", message)
        }
      }
    )
  }

  return { onDelete, isDeleting }
}
