import { useState, useCallback, type ReactNode } from "react"
import { Card } from "@ui/card"
import { Heading } from "@ui/heading"
import type { ProviderSchema } from "@entities/provider/lib/types"
import { RegisterProviderForm } from "@features/provider/register-provider-form/ui/form"
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

  const [provider, setProvider] = useState<Partial<ProviderSchema>>({})

  const handleSubmit = (provider: Partial<ProviderSchema>) => {
    setProvider(provider)
  }
  const handleChange = useCallback((provider: Partial<ProviderSchema>) => {
    setProvider(prev => ({ ...prev, ...provider }))
  }, [])

  return (
    <Blocks>
      <Blocks.Row>
        <Blocks.Block className="w-4/12">
          <RegisterProviderForm values={provider} onSubmit={handleSubmit} onChange={handleChange} />
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
