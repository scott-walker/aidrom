import { useDeleteAgent as useApiDeleteAgent } from "@entities/agent"
import { useToast } from "@features/toasts"
import { useNavigate } from "react-router"

/**
 * Хук для удаления агента
 * @namespace Features.AgentDelete.Lib.useAgentDelete
 */
export const useAgentDelete = () => {
  const { mutate: deleteAgent } = useApiDeleteAgent()
  const toast = useToast()
  const navigate = useNavigate()

  const onDelete = (agentId: number) => {
    deleteAgent(agentId, {
      onSuccess: () => {
        toast.success("Агент успешно удален")
        navigate("/agents")
      },
      onError: ({ message }) => {
        toast.error("Произошла ошибка при удалении агента", message)
      }
    })
  }

  return {
    onDelete
  }
}
