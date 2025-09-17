import { IconButton } from "@shared/ui/icon-button"
import { ModalConfirm } from "@ui/modal-confirm"
import { type Provider } from "@entities/provider"
import { useProviderDelete } from "../lib/use-provider-delete"

/**
 * Пропсы кнопки для удаления провайдера
 * @namespace Features.ProviderDelete.UI.ProviderDeleteProps
 */
type ProviderDeleteProps = {
  provider: Provider
}

/**
 * Кнопка для удаления провайдера
 * @namespace Features.ProviderDelete.UI.ProviderDelete
 */
export const ProviderDelete = ({ provider }: ProviderDeleteProps) => {
  const { onDelete } = useProviderDelete()

  return (
    <ModalConfirm
      trigger={<IconButton schema="danger" circle icon="x" iconSize={20} />}
      title="Удаление провайдера"
      onApprove={() => onDelete(provider.id)}
      schema="danger"
      nearTrigger={false}
    >
      <div className="text-lg">
        <p>Удаление провайдера приведет к потере всех связанных данных с этим провайдером:</p>
        <ul className="pl-10 py-2 list-disc font-bold">
          <li>Запросы</li>
          <li>Агенты</li>
          <li>Чаты</li>
        </ul>
        <p>Вы уверены, что хотите удалить провайдера?</p>
      </div>
    </ModalConfirm>
  )
}
