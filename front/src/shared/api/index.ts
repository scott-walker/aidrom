import { createRestClient } from "./rest-client"

// Инициализация REST-клиента
export const restClient = createRestClient({
  baseURL: process.env.VITE_API_BASE_URL || ""
})
