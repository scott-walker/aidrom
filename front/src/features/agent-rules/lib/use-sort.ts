import { type SortableEvent } from "react-sortablejs"
import { useSortAgentRules } from "@entities/agent/api/agent-mutations"
import { useToast } from "@features/toasts"

/**
 * Хук для сортировки правил агента
 * @namespace Features.AgentRules.Lib.useSortRules
 */
export const useSortRules = (agentId: number) => {
  const { mutate: sortAgentRules, isPending: isSorting } = useSortAgentRules()
  const toast = useToast()

  const onSort = (evt: SortableEvent) => {
    requestAnimationFrame(() => {
      const sortableElement = evt.to
      const ruleIds = Array.from(sortableElement.children).map(item => {
        return parseInt(item.getAttribute("data-id") || "0")
      })

      sortAgentRules(
        {
          agentId,
          data: { ruleIds }
        },
        {
          onSuccess: () => {
            toast.success("Вы успешно поменяли приоритет правил")
          },
          onError: ({ message }) => {
            toast.error("Произошла ошика при помены приоритета правил", message)
          }
        }
      )
    })
  }

  return { onSort, isSorting }
}
