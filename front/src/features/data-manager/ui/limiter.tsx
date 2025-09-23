import { NumberInput } from "@ui/number-input"
import { Label } from "@ui/label"

/**
 * Пропсы
 * @namespace Features.DataManager.Ui.LimiterProps
 */
interface LimiterProps {
  placeholder?: string
  label?: string
  value?: number
  onChange: (value: number) => void
}

/**
 * Фильтр по количеству записей
 * @namespace Features.DataManager.Ui.Limiter
 */
export const Limiter = ({
  value,
  onChange,
  placeholder = "Введите число",
  label = "Количество записей"
}: LimiterProps) => {
  value = value ?? 100

  return (
    <Label text={label}>
      <NumberInput placeholder={placeholder} value={value} onChange={e => onChange(Number(e.target.value))} />
    </Label>
  )
}
