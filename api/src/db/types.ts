import { InferSelectModel, InferInsertModel } from "drizzle-orm"
import { providers, agents, agentRules, clients, chats, messagePairs, requests, RequestStatus } from "./schema"
import { DriverParamsConfig, DriverInfo, DriverStatus, Driver } from "@drivers"

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
  driverInstance: Driver
  driverInfo: DriverInfo
  driverParamsConfig: DriverParamsConfig
  driverStatus: DriverStatus
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
export type AgentParams = {
  [key: string]: any
}
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
  messagePairs: MessagePair[]
}
export type CreateChatData = InferInsertModel<typeof chats>
export type UpdateChatData = Partial<CreateChatData>
export type MessagePair = InferSelectModel<typeof messagePairs>
export type ChatContext = {
  role: CommunicationRoles
  content: string
}[]
export type Message = {
  id: string
  chatId: number
  role: CommunicationRoles
  content: string
  createdAt: string
}

// Типы для запроса

/**
 * Имена статусов запроса
 * @namespace Db.Types.RequestStatusName
 */
export { RequestStatus }
export type Request = InferSelectModel<typeof requests>
export type RequestWithProvider = Request & {
  provider: Provider
}
export type RequestWithResponseContent = Request & {
  responseContent: string
}
export type CreateRequestData = InferInsertModel<typeof requests>
