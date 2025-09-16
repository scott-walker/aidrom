import { AxiosInstance } from "axios"

/**
 * Интерфейс конфига для REST клиента
 * @namespace Utils.Api.RestClientConfig
 */
export interface RestClientConfig {
  baseUrl: string
  authKey: string
  headers?: Record<string, string>
}

/**
 * Интерфейс REST клиента
 * @namespace Utils.Api.RestClient
 */
export interface RestClient extends AxiosInstance {}

/**
 * Интерфейс фабрики REST клиента
 * @namespace Utils.Api.RestClientFactory
 */
export interface RestClientFactory {
  (config: RestClientConfig): RestClient
}
