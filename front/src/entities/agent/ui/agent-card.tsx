import { makeClasses } from "@lib/style-api"
import { DateTag } from "@ui/date-tag"
import { Tag } from "@ui/tag"
import type { Agent } from "../lib/types"
import { AgentAvatar } from "./agent-avatar"

/**
 * Пропсы для компонента
 * @namespace Entities.Agent.Ui.AgentInfo.Props
 */
type AgentCardProps = {
  agent: Agent
  className?: string
}

/**
 * Карточка агента
 * @namespace Entities.Agent.Ui.AgentInfo
 */
export const AgentCard = ({ agent, className = "" }: AgentCardProps) => {
  const containerClasses = makeClasses(
    "flex",
    "items-center",
    "gap-6",
    "p-6",
    "w-fit",
    "bg-background-soft",
    "rounded-lg",
    "shadow-md/5",
    className
  )
  const nameClasses = makeClasses("text-lg", "font-bold", "text-center")
  const avatarClasses = makeClasses()
  const sectionClasses = makeClasses("px-6", "w-full", "text-sm")
  const sectionTitleClasses = makeClasses("text-lg", "font-bold")
  const sectionContentClasses = makeClasses("mt-2", "text-sm")

  return (
    <div className={containerClasses}>
      <section className={avatarClasses}>
        <AgentAvatar agent={agent} size="xl" />
      </section>
      <section>
        <div className={nameClasses}>{agent.name}</div>
        <Tag>{agent.provider.name}</Tag>
      </section>
      <section className={sectionClasses}>
        <h6 className={sectionTitleClasses}>Обновлен</h6>
        <DateTag date={agent.updatedAt} className={sectionContentClasses} />
      </section>
    </div>
  )
}
