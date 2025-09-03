import { createRestClient } from "./rest-client"

// Инициализация REST-клиента
export const restClient = createRestClient({
  baseURL: import.meta.env.VITE_API_BASE_URL || ""
})
