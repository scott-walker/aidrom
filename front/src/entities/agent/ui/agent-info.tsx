import { makeClasses } from "@lib/style-api"
import { DateTag } from "@ui/date-tag"
import { Avatar } from "@ui/avatar"
import { Json } from "@shared/ui/json"
import { Separator } from "@ui/separator"
import { Tag } from "@ui/tag"
import type { Agent } from "../lib/types"

/**
 * Пропсы для компонента AgentInfo
 * @namespace Entities.Agent.Ui.AgentInfo.Props
 */
type AgentInfoProps = {
  agent: Agent
  className?: string
}

/**
 * Информация о агенте
 * @namespace Entities.Agent.Ui.AgentInfo
 */
export const AgentInfo = ({ agent, className = "" }: AgentInfoProps) => {
  const containerClasses = makeClasses("flex", "flex-col", "items-center", "gap-6", className)
  const nameClasses = makeClasses("text-lg", "font-bold", "text-center")
  const avatarClasses = makeClasses()
  const sectionClasses = makeClasses("px-6", "w-full", "text-sm")
  const sectionTitleClasses = makeClasses("text-lg", "font-bold")
  const sectionContentClasses = makeClasses("mt-2", "text-sm")

  return (
    <div className={containerClasses}>
      <section className={avatarClasses}>
        <Avatar initials={agent.name} size="xl" />
      </section>
      <section>
        <div className={nameClasses}>{agent.name}</div>
        <Tag>{agent.provider.name}</Tag>
      </section>
      <Separator className="bg-background-hard" />
      <section className={sectionClasses}>
        <h6 className={sectionTitleClasses}>Описание</h6>
        <div className={sectionContentClasses}>{agent.description || "Описание отсутствует"}</div>
      </section>
      <Separator className="bg-background-hard" />
      <section className={sectionClasses}>
        <h6 className={sectionTitleClasses}>Параметры</h6>
        <Json value={agent.params} className={sectionContentClasses} />
      </section>
      <Separator className="bg-background-hard" />
      <section className={sectionClasses}>
        <h6 className={sectionTitleClasses}>Обновлен</h6>
        <DateTag date={agent.updatedAt} className={sectionContentClasses} />
      </section>
    </div>
  )
}
