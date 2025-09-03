import { useState, useCallback, type ReactNode } from "react"
import { createPage, type PageConfig } from "@lib/page-api"
import { Card } from "@ui/card"
import { Heading } from "@ui/heading"
import type { ProviderSchema } from "@entities/provider/lib/types"
import { RegisterProviderForm } from "@features/provider/register-provider-form/ui/form"
import { ProvidersListTable } from "@features/provider/providers-list-table/ui/table"

/**
 * Конфигурация страницы
 * @namespace Pages.Constructor.ConstructorMain.PageConfig
 */
const config: PageConfig = {
  meta: {
    title: "Конструктор"
  }
}

/**
 * Главная страница конструктора
 * @namespace Pages.Constructor.ConstructorMain
 * @returns {ReactNode}
 */
export const ConstructorMain = createPage(config, (): ReactNode => {
  const [provider, setProvider] = useState<Partial<ProviderSchema>>({})

  const handleSubmit = (provider: Partial<ProviderSchema>) => {
    setProvider(provider)
  }

  const handleChange = useCallback((provider: Partial<ProviderSchema>) => {
    setProvider(prev => ({ ...prev, ...provider }))
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-start align-start gap-4">
        <RegisterProviderForm values={provider} onSubmit={handleSubmit} onChange={handleChange} />
        {/* <RegisterProviderForm onSubmit={() => {}} /> */}

        <Card>
          <Card.Header>
            <Heading level={3}>Информация</Heading>
          </Card.Header>
          <Card.Body>
            <Card.Section>
              <pre> {JSON.stringify(provider, null, 2)} </pre>
            </Card.Section>
          </Card.Body>
        </Card>
      </div>

      <div className="flex items-start justify-start align-start gap-4">
        <ProvidersListTable />
      </div>
    </div>
  )
})
