import { makeClasses } from "@lib/style-api"
import { Tag } from "@ui/tag"
import type { Provider } from "../lib/schema"

/**
 * Пропсы для компонента ProviderFaceInfo
 * @namespace Entities.Provider.Ui.ProviderFaceInfo.Props
 */
type ProviderFaceInfoProps = {
  provider: Provider
  className?: string
}

/**
 * Лицо провайдера
 * @namespace Entities.Provider.Ui.ProviderFaceInfo
 */
export const ProviderFaceInfo = ({ provider, className = "" }: ProviderFaceInfoProps) => {
  const containerClasses = makeClasses("flex", "flex-col", "items-center", "gap-3", className)
  const sectionClasses = makeClasses("flex", "flex-col", "items-center", "gap-2", "text-center")
  const nameClasses = makeClasses("text-lg", "font-bold", "text-center")

  return (
    <div className={containerClasses}>
      <div className="flex items-center gap-2 text-sm text-foreground-soft font-bold">
        <div>ID:</div>
        <div>{provider.id}</div>
      </div>
      <section className={sectionClasses}>
        <div className={nameClasses}>{provider.name}</div>
        <Tag>{provider.driver}</Tag>
      </section>
    </div>
  )
}
