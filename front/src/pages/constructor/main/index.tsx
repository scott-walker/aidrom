import { useState, useCallback, type ReactNode } from "react"
import { createPage, type PageConfig } from "@lib/page-api"
import { RegisterProviderForm } from "@features/provider/register-provider-form/ui/form"
import type { ProviderSchema } from "@entities/provider/lib/types"
import { Card } from "@ui/card"

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
    <div className="flex items-start justify-start gap-8">
      <RegisterProviderForm values={provider} onSubmit={handleSubmit} onChange={handleChange} />
      {/* <RegisterProviderForm onSubmit={() => {}} /> */}

      <Card>
        <Card.Header> Информация о провайдере </Card.Header>
        <Card.Body>
          <Card.Section>
            <pre> {JSON.stringify(provider, null, 2)} </pre>
          </Card.Section>
        </Card.Body>
      </Card>
    </div>
  )
})
