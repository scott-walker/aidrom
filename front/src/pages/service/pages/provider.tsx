import { type ReactNode } from "react"
import { useParams } from "react-router"
import { useLayoutSubtitle } from "@lib/layout-api"
import { Blocks } from "@ui/blocks"
import { Card } from "@ui/card"
import { Heading } from "@ui/heading"
import { LoaderBlock } from "@ui/loader-block"
import { ErrorBlock } from "@ui/error-block"
import {
  type Provider as ProviderType,
  useProviderById,
  ProviderFaceInfo,
  ProviderModifyInfo,
  ProviderDriverInfo,
  ProviderDriverStatus
} from "@entities/provider"
import { ProviderDescription } from "@features/provider-description"
import { ProviderConfig } from "@features/provider-config"
import { ProviderUpdateForm } from "@features/provider-form"
import { ProviderDelete } from "@features/provider-delete"

/**
 * Страница сервиса - провайдер
 * @namespace Pages.Service.Provider
 * @returns {ReactNode}
 */
export const Provider = (): ReactNode => {
  const providerId = parseInt(useParams().providerId as string)
  const { provider, isLoading, error } = useProviderById(providerId)

  useLayoutSubtitle().setSubtitle(provider?.name ?? "")

  if (isLoading) return <LoaderBlock />
  if (error) return <ErrorBlock error={error} />

  return (
    <Blocks>
      <Blocks.Row>
        <Blocks.Block className="w-1/3 flex flex-col gap-8">
          <Card>
            <Card.Header>
              <Heading>Основная информация</Heading>
              <ProviderDriverStatus provider={provider as ProviderType} />
            </Card.Header>
            <Card.Body className="flex flex-col items-center gap-6">
              <ProviderFaceInfo provider={provider as ProviderType} />
              <ProviderModifyInfo provider={provider as ProviderType} />
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <Heading>Регистрация</Heading>
              <ProviderDelete provider={provider as ProviderType} />
            </Card.Header>
            <Card.Body className="flex flex-col items-center gap-6">
              <ProviderUpdateForm providerId={providerId} />
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <Heading>Информация от драйвера</Heading>
            </Card.Header>
            <Card.Body className="flex flex-col items-center gap-6">
              <ProviderDriverInfo provider={provider as ProviderType} />
            </Card.Body>
          </Card>
        </Blocks.Block>

        <Blocks.Block className="w-2/3 flex flex-col gap-8">
          <ProviderConfig provider={provider as ProviderType} />
          <ProviderDescription provider={provider as ProviderType} />
        </Blocks.Block>
      </Blocks.Row>
    </Blocks>
  )
}
