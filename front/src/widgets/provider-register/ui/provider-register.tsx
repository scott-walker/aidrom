import { Modal } from "@ui/modal"
import { Button } from "@ui/button"
import { ProviderRegisterForm } from "@features/provider-form"

/**
 * Компонент регистрации провайдера
 * @namespace Widgets.ProviderRegister
 */
export const ProviderRegister = () => {
  return (
    <Modal trigger={<Button schema="hard">Регистрация провайдера</Button>} title="Регистрация провайдера">
      <div className="py-2 w-lg">
        <ProviderRegisterForm />
      </div>
    </Modal>
  )
}
