import { Input } from "@ui/input"
import { Label } from "@ui/label"

/**
 * Пропсы
 * @namespace Features.DataManager.Ui.SearchFilterProps
 */
interface SearchFilterProps {
  placeholder?: string
  label?: string
  value?: string
  onChange: (value: string) => void
}

/**
 * Фильтр по провайдерам
 * @namespace Features.DataManager.Ui.SearchFilter
 */
export const SearchFilter = ({
  value,
  onChange,
  placeholder = "Введите строку поиска",
  label = "Поиск"
}: SearchFilterProps) => {
  return (
    <Label text={label}>
      <Input placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
    </Label>
  )
}
