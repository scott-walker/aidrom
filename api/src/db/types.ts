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
import { DriverRequestParamsConfig } from "@drivers"

// Типы для провайдера
export type Provider = InferSelectModel<typeof providers>
export type ProviderWithDriver = Provider & {
  driverParamsConfig: DriverRequestParamsConfig
}
export type CreateProviderData = InferInsertModel<typeof providers>
export type UpdateProviderData = Partial<CreateProviderData>

// Типы для агента
export type Agent = InferSelectModel<typeof agents>
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
export type Chat = InferSelectModel<typeof chats>
export type CreateChatData = InferInsertModel<typeof chats>
export type UpdateChatData = Partial<CreateChatData>
export type ChatWithRelations = Chat & {
  agent: any
  client: any
  messagePairs: (MessagePair & {
    clientMessage: ClientMessage
    agentMessage: AgentMessage
  })[]
}
export type ClientMessage = InferSelectModel<typeof clientMessages>
export type AgentMessage = InferSelectModel<typeof agentMessages>
export type MessagePair = InferSelectModel<typeof messagePairs>

// Типы для запроса
export type Request = InferSelectModel<typeof requests>
export type RequestWithProvider = Request & {
  provider: Provider
}
export type RequestWithResponseContent = Request & {
  responseContent: string
}
export type CreateRequestData = InferInsertModel<typeof requests>
