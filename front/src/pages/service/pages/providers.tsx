import { type ReactNode } from "react"
import { useSubtitle } from "@lib/layout-api/utils"
import { Blocks } from "@ui/blocks"
import { ProviderRegisterForm } from "@features/provider-register-form"
import { ProvidersDataTable } from "@widgets/providers-data-table/ui/table"

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

      <Blocks.Row>
        <Blocks.Block>
          <ProvidersDataTable />
        </Blocks.Block>
      </Blocks.Row>
    </Blocks>
  )
}
