import { Tooltip } from "@ui/tooltip"
import { IconButton } from "@ui/icon-button"
import { ModalConfirm } from "@ui/modal-confirm"
import { useClearBrokenRequests } from "@entities/request"
import { useToast } from "@features/toasts"

/**
 * Кнопка для очистки битых запросов
 * @namespace Features.RequestClear.UI.RequestClear
 */
export const RequestClear = () => {
  const { mutate: cleanBrokenRequests, isPending } = useClearBrokenRequests()
  const toast = useToast()

  const trigger = (
    <div>
      <Tooltip text="Очистить битые запросы">
        <IconButton schema="hard" disabled={isPending} icon="brush-cleaning" circle iconSize={20} className="w-9 h-9" />
      </Tooltip>
    </div>
  )

  return (
    <ModalConfirm
      trigger={trigger}
      onApprove={() => {
        cleanBrokenRequests(undefined, {
          onSuccess: () => {
            toast.success("Запросы успешно очищены")
          },
          onError: () => {
            toast.error("Произошла ошибка при очистке запросов")
          }
        })
      }}
      title="Очистка битых запросов"
      description="Вы уверены, что хотите очистить систему от битых запросов?"
    />
  )
}
