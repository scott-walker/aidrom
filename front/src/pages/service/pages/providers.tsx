import { type ReactNode } from "react"
import { useSubtitle } from "@lib/layout-api/utils"
import { Blocks } from "@ui/blocks"
import { ProviderRegisterForm } from "@features/provider-register-form"
import { ProviderList } from "@widgets/provider-list"

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
        <Blocks.Block>
          <ProviderList />
        </Blocks.Block>
        <Blocks.Block>
          <ProviderRegisterForm />
        </Blocks.Block>
      </Blocks.Row>

      {/* <Blocks.Row>
        <Blocks.Block>
          <Card>
            <Card.Header>
              <Heading>Информация</Heading>
            </Card.Header>
            <Card.Body>
              <Card.Section>
                <Json value={{}} />
              </Card.Section>
            </Card.Body>
          </Card>
        </Blocks.Block>
      </Blocks.Row> */}

      {/* <Blocks.Row>
        <Blocks.Block>
          <ProviderList />
        </Blocks.Block>
      </Blocks.Row> */}
    </Blocks>
  )
}
