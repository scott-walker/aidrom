import { type ReactNode } from "react"
import { useSubtitle } from "@lib/layout-api/utils"
import { Blocks } from "@ui/blocks"
import { ProviderList } from "@widgets/provider-list"
import { Heading } from "@shared/ui/heading"
import { ProviderRegisterForm } from "@features/provider-form"
import { Card } from "@shared/ui/card"

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
        <Blocks.Block className="w-3/6">
          <ProviderList />
        </Blocks.Block>
        <Blocks.Block className="w-3/6">
          <Card>
            <Card.Header>
              <Heading>Зарегистрировать провайдера</Heading>
            </Card.Header>
            <Card.Body>
              <ProviderRegisterForm />
            </Card.Body>
          </Card>
        </Blocks.Block>
      </Blocks.Row>
    </Blocks>
  )
}
