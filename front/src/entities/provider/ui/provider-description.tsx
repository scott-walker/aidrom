import { makeClasses } from "@lib/style-api"
import { Markdown } from "@ui/markdown"

/**
 * Пропсы для компонента ProviderDescription
 * @namespace Entities.Provider.Ui.ProviderDescription.Props
 */
type ProviderDescriptionProps = {
  description: string
  className?: string
}

/**
 * Описание провайдера
 * @namespace Entities.Provider.Ui.ProviderDescription
 */
export const ProviderDescription = ({ description, className = "" }: ProviderDescriptionProps) => {
  const containerClasses = makeClasses("flex", "flex-col", className)

  return (
    <div className={containerClasses}>
      {description ? <Markdown value={description} /> : <div className="text-foreground-soft">Нет описания</div>}
    </div>
  )
}
