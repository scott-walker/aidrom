import { useState, useCallback, type ReactNode } from "react"
import { Card } from "@ui/card"
import { Heading } from "@ui/heading"
import type { Provider } from "@entities/provider/lib/types"
import { ProviderRegisterForm } from "@features/provider-register-form"
import { ProvidersDataTable } from "@widgets/providers-data-table/ui/table"
import { Blocks } from "@shared/ui/blocks"
import { useSubtitle } from "@shared/lib/layout-api/utils"

/**
 * Страница сервиса - провайдеры
 * @namespace Pages.Service.Providers
 * @returns {ReactNode}
 */
export const Providers = (): ReactNode => {
  useSubtitle("Провайдеры")

  const [provider, setProvider] = useState<Partial<Provider>>({})

  const handleSubmit = (provider: Partial<Provider>) => {
    setProvider(provider)
  }
  const handleChange = useCallback((provider: Partial<Provider>) => {
    setProvider(prev => ({ ...prev, ...provider }))
  }, [])

  return (
    <Blocks>
      <Blocks.Row>
        <Blocks.Block className="w-4/12">
          <ProviderRegisterForm values={provider} onSubmit={handleSubmit} onChange={handleChange} />
        </Blocks.Block>

        <Blocks.Block className="w-8/12">
          <Card>
            <Card.Header>
              <Heading>Информация</Heading>
            </Card.Header>
            <Card.Body>
              <Card.Section>
                <pre> {JSON.stringify(provider, null, 2)} </pre>
              </Card.Section>
            </Card.Body>
          </Card>
        </Blocks.Block>
      </Blocks.Row>

      <Blocks.Row>
        <Blocks.Block>
          <ProvidersDataTable />
        </Blocks.Block>
      </Blocks.Row>
    </Blocks>
  )
}
