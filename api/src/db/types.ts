// /**
//  * Типы для сущностей в бд
//  * @namespace DB.Types
//  */

// /**
//  * Тип для JSON конфигурации
//  */
// export type ConfigType = Record<string, any>

// /**
//  * Драйвер - базовый компонент для работы с API
//  */
// export interface DriverSchema {
//   alias: string
//   config: ConfigType
//   description?: string
// }

// /**
//  * Драйвер со связями
//  */
// export interface DriverWithProviders extends DriverSchema {
//   providers: ProviderSchema[]
// }

// /**
//  * Провайдер - компания, предоставляющая API услуги
//  */
// export interface ProviderSchema {
//   name: string
//   description?: string
//   config: ConfigType
//   driverId: number
//   createdAt: Date
//   updatedAt: Date
// }

// /**
//  * Провайдер со связями
//  */
// export interface ProviderWithRelations extends ProviderSchema {
//   driver: DriverSchema
//   requests: RequestSchema[]
// }

// /**
//  * Агент - бот, который общается с клиентами
//  */
// export interface AgentSchema {
//   name: string
//   config: ConfigType
//   description?: string
//   providerId: number
//   createdAt: Date
//   updatedAt: Date
// }

// /**
//  * Агент со связями
//  */
// export interface AgentWithRelations extends AgentSchema {
//   provider: ProviderSchema
//   chats: ChatSchema[]
// }

// /**
//  * Клиент - пользователь, который общается с агентами
//  */
// export interface ClientSchema {
//   email: string
//   balance: number
//   createdAt: Date
//   updatedAt: Date
// }

// /**
//  * Клиент со связями
//  */
// export interface ClientWithRelations extends ClientSchema {
//   chats: ChatSchema[]
// }

// /**
//  * Чат - диалог между клиентом и агентом
//  */
// export interface ChatSchema {
//   agentId: number
//   clientId: number
//   title?: string
//   createdAt: Date
//   updatedAt: Date
// }

// /**
//  * Чат со связями
//  */
// export interface ChatWithRelations extends ChatSchema {
//   agent: AgentSchema
//   client: ClientSchema
//   messagePairs: MessagePairSchema[]
// }

// /**
//  * Запрос к провайдеру
//  */
// export interface RequestSchema {
//   providerId: number
//   providerRequestId?: string
//   requestParams?: ConfigType
//   responseData?: ConfigType
//   requestTokens?: number
//   responseTokens?: number
//   createdAt: Date
// }

// /**
//  * Запрос к провайдеру со связями
//  */
// export interface RequestWithRelations extends RequestSchema {
//   provider: ProviderSchema
//   messagePair?: MessagePairSchema
// }

// /**
//  * Сообщение от клиента
//  */
// export interface ClientMessageSchema {
//   content: string
//   createdAt: Date
//   updatedAt: Date
// }

// /**
//  * Сообщение от клиента со связями
//  */
// export interface ClientMessageWithRelations extends ClientMessageSchema {
//   messagePair: MessagePairSchema
// }

// /**
//  * Сообщение от агента
//  */
// export interface AgentMessageSchema {
//   content: string
//   isFavorite: boolean
//   createdAt: Date
//   updatedAt: Date
// }

// /**
//  * Сообщение от агента со связями
//  */
// export interface AgentMessageWithRelations extends AgentMessageSchema {
//   messagePair: MessagePairSchema
// }

// /**
//  * Пара сообщений - объединяет сообщение клиента и ответ агента
//  */
// export interface MessagePairSchema {
//   chatId: number
//   requestId: number
//   clientMessageId: number
//   agentMessageId: number
//   createdAt: Date
//   updatedAt: Date
// }

// /**
//  * Пара сообщений со связями
//  */
// export interface MessagePairWithRelations extends MessagePairSchema {
//   chat: ChatSchema
//   request: RequestSchema
//   clientMessage: ClientMessageSchema
//   agentMessage: AgentMessageSchema
// }
