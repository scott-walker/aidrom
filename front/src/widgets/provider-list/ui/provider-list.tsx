import { makeClasses } from "@lib/style-api"
import { LoaderBlock } from "@ui/loader-block"
import { ErrorBlock } from "@ui/error-block"
import { useProviders } from "@entities/provider"
import { ProviderCard } from "@features/provider-card"

/**
 * Список провайдеров
 * @namespace Widgets.ProviderList.Ui.ProviderList
 */
export const ProviderList = () => {
  const { providers, isLoading, error } = useProviders()

  if (isLoading) return <LoaderBlock />
  if (error) return <ErrorBlock error={error} />

  const cardClasses = makeClasses(
    "border-3",
    "border-transparent",
    "hover:border-primary",
    "transition-colors duration-200",
    "cursor-pointer"
  )

  return (
    <div className="flex flex-col gap-4">
      {providers?.map(provider => (
        <ProviderCard key={provider.id} provider={provider} className={cardClasses} />
      ))}
    </div>
  )
}
