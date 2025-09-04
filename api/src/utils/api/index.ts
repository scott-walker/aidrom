export { RestClient, RestClientConfig, RestClientFactory } from "./types"
export { createRestClient } from "./rest-client"

/**
 * Константа для обозначения перемещенного сообщения от агента (из ответа от API)
 */
export const MOVED_AGENT_MESSAGE: string = "<look_at_agent_message>"

// /**
//  * Класс взаимодействия с API для хранения данных о запросе/ответе
//  * @param {String} provider - провайдер API
//  * @param {String} providerRequestId - id запроса от API
//  * @param {Number} cost - стоимость запроса
//  * @param {Object} clientParams - параметры запроса от клиента
//  * @param {String} clientMessage - сообщение от клиента
//  * @param {Object} agentResponse - ответ от API
//  * @param {String} agentMessage - сообщение от агента
//  */
// export class AgentInteraction {
//   constructor(provider, providerRequestId, clientParams, clientMessage, agentResponse, agentMessage, cost) {
//     this.provider = provider
//     this.providerRequestId = providerRequestId
//     this.clientParams = clientParams
//     this.clientMessage = clientMessage
//     this.agentResponse = agentResponse
//     this.agentMessage = agentMessage
//     this.cost = cost
//     this.createdAt = new Date()
//   }
// }
