import { makeClasses } from "@lib/style-api"
import { DateTag } from "@ui/date-tag"
import type { Provider } from "../lib/schema"

/**
 * Пропсы для компонента ProviderModifyInfo
 * @namespace Entities.Provider.Ui.ProviderModifyInfo.Props
 */
type ProviderModifyInfoProps = {
  provider: Provider
  className?: string
}

/**
 * Информация о модификации провайдера
 * @namespace Entities.Provider.Ui.ProviderModifyInfo
 */
export const ProviderModifyInfo = ({ provider, className = "" }: ProviderModifyInfoProps) => {
  const containerClasses = makeClasses("flex", "flex-col", "items-center", "gap-0", className)
  const sectionTitleClasses = makeClasses("text-sm", "font-bold", "text-foreground-soft")

  return (
    <div className={containerClasses}>
      <h6 className={sectionTitleClasses}>Обновлен</h6>
      <DateTag date={provider.updatedAt} />
    </div>
  )
}
