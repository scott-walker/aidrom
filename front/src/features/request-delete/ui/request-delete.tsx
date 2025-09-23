import { ModalConfirm } from "@shared/ui/modal-confirm"
import { IconButton } from "@shared/ui/icon-button"
import { Tooltip } from "@ui/tooltip"
import { useDeleteRequests, type RequestsFilterData } from "@entities/request"
import { useToast } from "@features/toasts"

/**
 * Пропсы кнопки для удаления запросов
 * @namespace Features.RequestDelete.UI.RequestDeleteProps
 */
export interface RequestDeleteProps {
  filters: RequestsFilterData
}

/**
 * Кнопка для удаления запросов
 * @namespace Features.RequestDelete.UI.RequestDelete
 */
export const RequestDelete = ({ filters }: RequestDeleteProps) => {
  const { mutate: deleteRequests, isPending } = useDeleteRequests()
  const toast = useToast()

  const trigger = (
    <div>
      <Tooltip text="Удалить запросы">
        <IconButton schema="danger" disabled={isPending} icon="trash" circle iconSize={20} className="w-9 h-9" />
      </Tooltip>
    </div>
  )

  return (
    <ModalConfirm
      trigger={trigger}
      schema="danger"
      onApprove={() => {
        deleteRequests(filters, {
          onSuccess: ({ count }) => {
            toast.success(`Запросы успешно удалены (всего запросов: ${count})`)
          },
          onError: ({ message }) => {
            toast.error("Произошла ошибка при удалении запросов", message)
          }
        })
      }}
      title="Удаление запросов"
      description="Вы уверены, что хотите удалить запросы безвозвратно?"
    />
  )
}
