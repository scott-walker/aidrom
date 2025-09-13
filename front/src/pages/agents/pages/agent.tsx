import type { ReactNode } from "react"
import { useParams } from "react-router"

import { useSubtitle } from "@lib/layout-api"
import { Blocks } from "@ui/blocks"
import { LoaderBlock } from "@ui/loader-block"
import { ErrorBlock } from "@ui/error-block"
import { Card } from "@ui/card"
import { Heading } from "@ui/heading"

import {
  type Agent as AgentType,
  useAgentById,
  AgentParamsInfo,
  AgentDescriptionInfo,
  AgentFaceInfo,
  AgentModifyInfo
} from "@entities/agent"

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
            <Card.Body className="flex flex-col gap-6">
              <AgentFaceInfo agent={agent as AgentType} />
              <AgentModifyInfo agent={agent as AgentType} />
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <Heading>Параметры</Heading>
            </Card.Header>
            <Card.Body>
              <AgentParamsInfo agent={agent as AgentType} />
            </Card.Body>
          </Card>
        </Blocks.Block>
        <Blocks.Block className="w-2/3 flex flex-col gap-8">
          <Card>
            <Card.Header>
              <Heading>Описание</Heading>
            </Card.Header>
            <Card.Body>
              <AgentDescriptionInfo agent={agent as AgentType} />
            </Card.Body>
          </Card>
        </Blocks.Block>
      </Blocks.Row>
    </Blocks>
  )
}
