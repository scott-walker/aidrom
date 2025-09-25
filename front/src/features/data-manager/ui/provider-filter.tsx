import { Label } from "@ui/label"
import { Select, type SelectValue } from "@shared/ui/select-old"
import { useProviders } from "@entities/provider"

/**
 * Пропсы
 * @namespace Features.DataManager.Ui.ProviderFilterProps
 */
interface ProviderFilterProps {
  providerId?: string | null
  onChange: (value: SelectValue | null) => void
}

/**
 * Фильтр по провайдерам
 * @namespace Features.DataManager.Ui.ProviderFilter
 */
export const ProviderFilter = ({ providerId, onChange }: ProviderFilterProps) => {
  const { providers, isLoading } = useProviders()

  const providersItems = providers.map(provider => ({
    label: provider.name,
    value: provider.id.toString()
  }))

  return (
    <Label text="Провайдер">
      <Select
        hasEmpty
        emptyLabel="Все провайдеры"
        placeholder={isLoading ? "Загрузка..." : "Провайдер"}
        value={providerId}
        onChangeValue={onChange}
        items={providersItems}
        disabled={isLoading}
        className="min-w-64"
      />
    </Label>
  )
}
