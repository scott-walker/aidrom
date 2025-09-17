import { Link } from "react-router"
import { makeClasses } from "@lib/style-api"
import { Icon, type IconName } from "@ui/icon"

/**
 * Пропсы для компонента AgentInfoLink
 * @namespace Features.AgentInfoLink.UI.AgentInfoLink.Props
 */
type AgentInfoLinkProps = {
  agentId: number
  icon?: IconName
  text?: string
  className?: string
}

/**
 * Ссылка на информацию об агенте
 * @namespace Features.AgentInfoLink.UI.AgentInfoLink
 */
export const AgentInfoLink = ({
  agentId,
  icon = "info",
  text = "Информация об агенте",
  className = ""
}: AgentInfoLinkProps) => {
  const linkClasses = makeClasses(
    "flex",
    "items-center",
    "gap-2",
    "border",
    "border-background-hard",
    "rounded-xl",
    "px-3",
    "py-1",
    // "bg-primary",
    // "text-primary-foreground",
    "hover:text-primary",
    "hover:border-primary",
    className
  )

  return (
    <Link to={`/agents/${agentId}`} className={linkClasses}>
      <Icon name={icon} size={20} />
      {text}
    </Link>
  )
}
