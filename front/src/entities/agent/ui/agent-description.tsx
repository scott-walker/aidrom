import { makeClasses } from "@lib/style-api"
import { Markdown } from "@ui/markdown"

/**
 * Пропсы для компонента AgentDescription
 * @namespace Entities.Agent.Ui.AgentDescription.Props
 */
type AgentDescriptionProps = {
  description: string
  className?: string
}

/**
 * Описание агента
 * @namespace Entities.Agent.Ui.AgentDescription
 */
export const AgentDescription = ({ description, className = "" }: AgentDescriptionProps) => {
  const containerClasses = makeClasses("flex", "flex-col", className)

  return (
    <div className={containerClasses}>
      {description ? <Markdown value={description} /> : <div className="text-foreground-soft">Нет описания</div>}
    </div>
  )
}
