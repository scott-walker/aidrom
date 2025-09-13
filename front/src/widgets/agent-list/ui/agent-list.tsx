import { useAgents, AgentCard } from "@entities/agent"
import { makeClasses } from "@lib/style-api"
import { LoaderBlock } from "@ui/loader-block"
import { ErrorBlock } from "@ui/error-block"

/**
 * Список агентов
 * @namespace Widgets.AgentList
 */
export const AgentList = () => {
  const { agents, isLoading, error } = useAgents()

  const containerClasses = makeClasses("flex flex-col gap-4")

  if (isLoading) return <LoaderBlock />
  if (error) return <ErrorBlock error={error} />

  return (
    <div className={containerClasses}>
      {agents.map(agent => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  )
}
