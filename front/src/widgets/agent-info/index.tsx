import { makeClasses } from "@lib/style-api"
import { AgentInfo as AgentInfoComponent, type Agent } from "@entities/agent"
import { Heading } from "@shared/ui/heading"
import { useState } from "react"
import { IconButton } from "@shared/ui/icon-button"
import { Tooltip } from "@shared/ui/tooltip"

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
  const LS_KEY = "agentInfoOpen"

  const [isOpen, setIsOpen] = useState(localStorage.getItem(LS_KEY) === "true" || false)

  const containerClasses = makeClasses(
    "flex",
    "flex-col",
    "h-full",
    "bg-background-soft",
    // isOpen
    isOpen && "w-[300px]",
    !isOpen && "w-fit"
  )
  const headerClasses = makeClasses("flex", "justify-between", "items-center", "px-6", "py-4")
  const contentClasses = makeClasses("flex", "flex-col", "overflow-y-auto", "scrollbar-hide")

  const toggleOpen = () => {
    localStorage.setItem(LS_KEY, isOpen ? "false" : "true")
    setIsOpen(!isOpen)
  }

  return (
    <div className={containerClasses}>
      <header className={headerClasses}>
        {isOpen && <Heading level={5}>Агент</Heading>}

        <Tooltip text={isOpen ? "Свернуть" : "Развернуть информацию об агенте"} side="left" delay={500}>
          <IconButton icon={isOpen ? "panel-left-open" : "panel-right-open"} iconSize={24} onClick={toggleOpen} />
        </Tooltip>
      </header>

      <div className={contentClasses}>
        <AgentInfoComponent agent={agent} className={isOpen ? "" : "hidden"} />
      </div>
    </div>
  )
}
