import type { ReactNode } from "react"
import { useParams } from "react-router"

import { useSubtitle } from "@lib/layout-api"
import { Blocks } from "@ui/blocks"
import { LoaderBlock } from "@ui/loader-block"
import { ErrorBlock } from "@ui/error-block"
import { Card } from "@ui/card"
import { Heading } from "@ui/heading"

import { type Agent as AgentType, useAgentById, AgentFaceInfo, AgentModifyInfo } from "@entities/agent"
import { AgentRules } from "@widgets/agent-rules"
import { AgentDescription } from "@features/agent-description"
import { AgentParams } from "@features/agent-params"
import { ChatCreateRegularButton } from "@features/chat-create"

/**
 * Страница агента
 * @namespace Pages.Agents.Agent
 */
export const Agent = (): ReactNode => {
  const agentId = parseInt(useParams().agentId as string)
  const { agent, isLoading, error } = useAgentById(agentId)

  useSubtitle(agent?.name ?? "")

  if (isLoading) return <LoaderBlock />
  if (error) return <ErrorBlock error={error} />

  return (
    <Blocks>
      <Blocks.Row>
        <Blocks.Block className="w-1/3 flex flex-col gap-8">
          <Card>
            <Card.Header>
              <Heading>Основная информация</Heading>
            </Card.Header>
            <Card.Body className="flex flex-col items-center gap-6">
              <AgentFaceInfo agent={agent as AgentType} />
              <ChatCreateRegularButton agentId={agentId} icon="messages-square" className="px-4 py-1.5" />
              <AgentModifyInfo agent={agent as AgentType} />
            </Card.Body>
          </Card>

          <AgentParams agent={agent as AgentType} />
        </Blocks.Block>
        <Blocks.Block className="w-2/3 flex flex-col gap-8">
          <AgentRules agent={agent as AgentType} />
          <AgentDescription agent={agent as AgentType} />
        </Blocks.Block>
      </Blocks.Row>
    </Blocks>
  )
}
