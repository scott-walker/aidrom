import { Label } from "@ui/label"
import { Select, type SelectItem } from "@shared/ui/select-old"

export const SORT_ORDER_ASC = "asc"
export const SORT_ORDER_DESC = "desc"

/**
 * Тип сортировки
 * @namespace Features.DataManager.Ui.SorterOrder
 */
export type SorterOrder = typeof SORT_ORDER_ASC | typeof SORT_ORDER_DESC

/**
 * Пропсы
 * @namespace Features.DataManager.Ui.SorterProps
 */
export interface SorterProps {
  placeholder?: string
  items: SelectItem[]
  label?: string
  field?: string | null
  order?: SorterOrder | null
  onChangeField: (value: string | null) => void
  onChangeOrder: (value: SorterOrder) => void
}

/**
 * Сортировка по полям
 * @namespace Features.DataManager.Ui.Sorter
 */
export const Sorter = ({
  items,
  field,
  order,
  onChangeField,
  onChangeOrder,
  placeholder = "Выберите сортировку",
  label = "Сортировка"
}: SorterProps) => {
  order = order ?? SORT_ORDER_ASC

  const orderItems: SelectItem[] = [
    { label: "По возрастанию", value: SORT_ORDER_ASC },
    { label: "По убыванию", value: SORT_ORDER_DESC }
  ]

  return (
    <div className="flex items-center gap-2">
      <Label text={label} className="min-w-fit">
        <Select
          // hasEmpty
          // emptyLabel="По умолчанию"
          items={items}
          value={field}
          onChangeValue={onChangeField}
          placeholder={placeholder}
        />
      </Label>
      <Select
        items={orderItems}
        value={order}
        onChangeValue={value => onChangeOrder(value as SorterOrder)}
        placeholder={placeholder}
      />
    </div>
  )
}
