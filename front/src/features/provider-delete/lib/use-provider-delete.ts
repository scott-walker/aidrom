import { useDeleteProvider as useApiDeleteProvider } from "@entities/provider"
import { useToast } from "@features/toasts"
import { useNavigate } from "react-router"

/**
 * Хук для удаления провайдера
 * @namespace Features.ProviderDelete.Lib.useProviderDelete
 */
export const useProviderDelete = () => {
  const { mutate: deleteProvider } = useApiDeleteProvider()
  const toast = useToast()
  const navigate = useNavigate()

  const onDelete = (providerId: number) => {
    deleteProvider(providerId, {
      onSuccess: () => {
        toast.success("Провайдер успешно удален")
        navigate("/service/providers")
      },
      onError: ({ message }) => {
        toast.error("Произошла ошибка при удалении провайдера", message)
      }
    })
  }

  return {
    onDelete
  }
}
