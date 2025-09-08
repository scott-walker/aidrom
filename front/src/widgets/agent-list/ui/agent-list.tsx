import { useAgents, AgentCard } from "@entities/agent"
import { makeClasses } from "@lib/style-api"
import { LoaderBlock } from "@ui/loader-block"
import { ErrorBlock } from "@ui/error-block"
import { Heading } from "@ui/heading"

/**
 * Список агентов
 * @namespace Widgets.AgentList
 */
export const AgentList = () => {
  const { agents, isLoading, error } = useAgents()

  const containerClasses = makeClasses("flex flex-col")

  if (isLoading) return <LoaderBlock />
  if (error) return <ErrorBlock error={error} />

  return (
    <div className={containerClasses}>
      <Heading level={5}>Агенты</Heading>
      {agents.map(agent => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  )
}
