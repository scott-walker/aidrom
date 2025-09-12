import { type ReactNode } from "react"
import { useSubtitle } from "@lib/layout-api/utils"
import { Blocks } from "@ui/blocks"
import { ProviderList } from "@widgets/provider-list"
import { ProviderRegister } from "@widgets/provider-register"
import { Heading } from "@shared/ui/heading"

/**
 * Страница сервиса - провайдеры
 * @namespace Pages.Service.Providers
 * @returns {ReactNode}
 */
export const Providers = (): ReactNode => {
  useSubtitle("Провайдеры")

  return (
    <Blocks>
      <Blocks.Row>
        <Blocks.Block className="w-full">
          <ProviderRegister />
        </Blocks.Block>
      </Blocks.Row>
      <Blocks.Row>
        <Blocks.Block className="w-1/2">
          <Heading level={3}>Зарегистрированные провайдеры</Heading>
          <div className="mt-6">
            <ProviderList />
          </div>
        </Blocks.Block>
        {/* <Blocks.Block className="w-1/2">
          <Heading level={3}>Зарегистрированные провайдеры</Heading>
          <div className="mt-6">
            <ProviderList />
          </div>
        </Blocks.Block> */}
      </Blocks.Row>
    </Blocks>
  )
}
