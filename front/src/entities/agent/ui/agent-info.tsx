import { makeClasses } from "@lib/style-api"
import { DateTag } from "@ui/date-tag"
import { Avatar } from "@ui/avatar"
import { Code } from "@ui/code"
import { Separator } from "@ui/separator"
import { Tag } from "@ui/tag"
import type { Agent } from "../lib/types"

/**
 * Информация о агенте
 * @namespace Entities.Agent.Ui.AgentInfo
 */
export const AgentInfo = ({ agent }: { agent: Agent }) => {
  const containerClasses = makeClasses("flex", "flex-col", "items-center", "gap-6")
  const nameClasses = makeClasses("text-lg", "font-bold", "text-center")
  const avatarClasses = makeClasses()
  const sectionClasses = makeClasses("px-6", "w-full", "text-sm", "text-gray-500")
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
        <Code data={agent.params} className={sectionContentClasses} />
      </section>
      <Separator className="bg-background-hard" />
      <section className={sectionClasses}>
        <h6 className={sectionTitleClasses}>Обновлен</h6>
        <DateTag date={agent.updatedAt} className={sectionContentClasses} />
      </section>
    </div>
  )
}
