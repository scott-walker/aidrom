import { InferSelectModel, InferInsertModel } from "drizzle-orm"
import {
  drivers,
  providers,
  agents,
  clients,
  chats,
  messagePairs,
  clientMessages,
  agentMessages,
  requests
} from "./schema"

// Типы для драйвера
export type Driver = InferSelectModel<typeof drivers>
export type CreateDriverData = InferInsertModel<typeof drivers>
export type UpdateDriverData = Partial<CreateDriverData>

// Типы для провайдера
export type Provider = InferSelectModel<typeof providers>
export type CreateProviderData = InferInsertModel<typeof providers>
export type UpdateProviderData = Partial<CreateProviderData>

// Типы для агента
export type Agent = InferSelectModel<typeof agents>
export type CreateAgentData = InferInsertModel<typeof agents>
export type UpdateAgentData = Partial<CreateAgentData>

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
