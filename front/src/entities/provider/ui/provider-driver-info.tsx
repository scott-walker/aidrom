import { makeClasses } from "@lib/style-api"
import { Json } from "@ui/json"
import type { Provider } from "../lib/schema"

/**
 * Пропсы для компонента ProviderDriverInfo
 * @namespace Entities.Provider.Ui.ProviderDriverInfo.Props
 */
type ProviderDriverInfoProps = {
  provider: Provider
  className?: string
}

/**
 * Информация о драйвере провайдера
 * @namespace Entities.Provider.Ui.ProviderDriverInfo
 */
export const ProviderDriverInfo = ({ provider, className = "" }: ProviderDriverInfoProps) => {
  const containerClasses = makeClasses("flex", "flex-col", "items-center", "gap-3", "w-full", className)

  return (
    <div className={containerClasses}>
      <Json value={provider.driverInfo} />
    </div>
  )
}
