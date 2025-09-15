import { makeClasses } from "@lib/style-api"
import { DateTag } from "@ui/date-tag"
import { Tag } from "@ui/tag"
import type { Agent } from "../lib/schema"
import { AgentStatusAvatar } from "./agent-status-avatar"

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
    "relative",
    "flex",
    "items-center",
    "flex-nowrap",
    "gap-6",
    "px-4",
    "py-3",
    "w-full",
    "bg-background-soft",
    "rounded-lg",
    "shadow-md/5",
    className
  )
  const nameClasses = makeClasses("text-lg", "leading-5", "font-bold")
  const providerTagClasses = makeClasses("absolute", "-top-3", "-right-3")

  return (
    <div className={containerClasses}>
      <Tag schema="hard" className={providerTagClasses}>
        {agent.provider.name}
      </Tag>
      <section className="relative">
        <AgentStatusAvatar agent={agent} size="xl" />
      </section>
      <section>
        <div className="flex items-center gap-2 text-sm text-foreground-soft font-bold">
          <div>ID:</div>
          <div>{agent.id}</div>
        </div>
        <div className={nameClasses}>{agent.name}</div>
        <div className="flex items-center flex-wrap gap-2 text-sm leading-none mt-2">
          <DateTag label="Обновлен" date={agent.updatedAt} month="numeric" />
        </div>
      </section>
    </div>
  )
}
