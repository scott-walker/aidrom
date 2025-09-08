import { makeClasses } from "@lib/style-api"
import { Loader } from "@ui/loader"

/**
 * Пропсы для компонента
 * @namespace Shared.UI.LoaderBlock.Props
 */
type LoaderBlockProps = {
  className?: string
}

/**
 * Лоадер (блочное отображение)
 * @namespace Shared.UI.LoaderBlock
 */
export const LoaderBlock = ({ className = "" }: LoaderBlockProps) => {
  const containerClasses = makeClasses("flex", "items-center", "justify-center", "h-full", "w-full", className)

  return (
    <div className={containerClasses}>
      <Loader />
    </div>
  )
}
