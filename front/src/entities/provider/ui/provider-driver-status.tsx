import { makeClasses } from "@lib/style-api"
import { Tooltip } from "@ui/tooltip"
import type { Provider } from "../lib/schema"

/**
 * Пропсы для компонента ProviderDriverStatus
 * @namespace Entities.Provider.Ui.ProviderDriverStatus.Props
 */
type ProviderDriverStatusProps = {
  provider: Provider
  className?: string
}

/**
 * Статус работы драйвера провайдера
 * @namespace Entities.Provider.Ui.ProviderDriverStatus
 */
export const ProviderDriverStatus = ({ provider, className = "" }: ProviderDriverStatusProps) => {
  const isOk = provider.driverStatus === "ok"

  const tagClasses = makeClasses(
    "w-5",
    "h-5",
    "rounded-full",
    "border-3",
    "border-background-soft",
    isOk ? "bg-positive" : "bg-danger",
    className
  )
  return (
    <Tooltip text={isOk ? "Работает (инициализация прошла успешно)" : "Не работает (есть ошибка в инициализации)"}>
      <div className={tagClasses} />
    </Tooltip>
  )
}
