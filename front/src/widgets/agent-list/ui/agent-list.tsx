import { useAgents, AgentCard } from "@entities/agent"
import { makeClasses } from "@lib/style-api"
import { LoaderBlock } from "@ui/loader-block"
import { ErrorBlock } from "@ui/error-block"
import { Link } from "react-router"

/**
 * Список агентов
 * @namespace Widgets.AgentList
 */
export const AgentList = () => {
  const { agents, isLoading, error } = useAgents()

  const containerClasses = makeClasses("flex items-start justify-start flex-wrap gap-8")
  const cardClasses = makeClasses(
    "border-3",
    "border-transparent",
    "hover:border-primary",
    "transition-colors duration-200",
    "w-full"
  )

  if (isLoading) return <LoaderBlock />
  if (error) return <ErrorBlock error={error} />

  return (
    <div className={containerClasses}>
      {agents.map(agent => (
        <Link key={agent.id} to={`/agents/${agent.id}`}>
          <AgentCard agent={agent} className={cardClasses} />
        </Link>
      ))}
    </div>
  )
}
