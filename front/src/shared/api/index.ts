import { createRestClient } from "./rest-client"

export { RestError } from "./rest-error"

// Инициализация REST-клиента
export const restClient = createRestClient({
  baseURL: import.meta.env.VITE_API_BASE_URL || ""
})
