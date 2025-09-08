import { makeClasses } from "@lib/style-api"
import { AgentInfo as AgentInfoComponent, type Agent } from "@entities/agent"
import { Heading } from "@shared/ui/heading"

/**
 * Пропсы для компонента AgentInfo
 * @namespace Widgets.AgentInfo.Props
 */
type AgentInfoProps = {
  agent: Agent
}

/**
 * Информация об агенте
 * @namespace Widgets.AgentInfo
 */
export const AgentInfo = ({ agent }: AgentInfoProps) => {
  const classes = makeClasses("flex flex-col")

  return (
    <div className={classes}>
      <Heading level={5}>Агент</Heading>
      <AgentInfoComponent agent={agent} />
    </div>
  )
}
