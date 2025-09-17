import { InferSelectModel, InferInsertModel } from "drizzle-orm"
import {
  providers,
  agents,
  agentRules,
  clients,
  chats,
  messagePairs,
  clientMessages,
  agentMessages,
  requests
} from "./schema"
import { DriverRequestParams, DriverParamsConfig } from "@drivers"

/**
 * Роли коммуникации
 * @namespace CommunicationRoles
 */
export enum CommunicationRoles {
  System = "system",
  Client = "client",
  Agent = "agent"
}

// Типы для провайдера
export type Provider = InferSelectModel<typeof providers>
export type ProviderWithDriver = Provider & {
  driverParamsConfig: DriverParamsConfig
}
export type CreateProviderData = InferInsertModel<typeof providers>
export type UpdateProviderData = Partial<CreateProviderData>

// Типы для агента
export type Agent = InferSelectModel<typeof agents> & {
  params: AgentParams
  provider: Provider
  rules: AgentRule[]
  isActive: boolean
}
export type AgentParams = DriverRequestParams
export type CreateAgentData = InferInsertModel<typeof agents>
export type UpdateAgentData = Partial<CreateAgentData>

// Типы для правила агента
export type AgentRule = InferSelectModel<typeof agentRules>
export type CreateAgentRuleData = InferInsertModel<typeof agentRules>

// Типы для клиента
export type Client = InferSelectModel<typeof clients>
export type CreateClientData = InferInsertModel<typeof clients>
export type UpdateClientData = Partial<CreateClientData>

// Типы для чата
export type Chat = InferSelectModel<typeof chats> & {
  agent: Agent
  client: Client
  context: ChatContext
  messagePairs: (MessagePair & {
    clientMessage: ClientMessage
    agentMessage: AgentMessage
  })[]
}
export type CreateChatData = InferInsertModel<typeof chats>
export type UpdateChatData = Partial<CreateChatData>
export type ClientMessage = InferSelectModel<typeof clientMessages>
export type AgentMessage = InferSelectModel<typeof agentMessages>
export type MessagePair = InferSelectModel<typeof messagePairs>
export type ChatContext = {
  role: CommunicationRoles
  content: string
}[]

// Типы для запроса
export type Request = InferSelectModel<typeof requests>
export type RequestWithProvider = Request & {
  provider: Provider
}
export type RequestWithResponseContent = Request & {
  responseContent: string
}
export type CreateRequestData = InferInsertModel<typeof requests>
