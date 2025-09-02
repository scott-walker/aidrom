import type { ProviderDTO } from "@entities/provider/model/dto"
import type { CreateProviderForm } from "./schema"

export const toCreateProviderDTO = (values: CreateProviderForm): ProviderDTO => ({
  name: values.name,
  alias: values.alias,
  base_url: values.baserUrl,
  api_key: values.apiKey
})
