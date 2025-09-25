import { Select, type SelectProps } from "@shared/ui/select-old"

/**
 * Пропсы
 * @namespace Shared.UI.Select.Props
 */
export type SelectColorProps = Omit<SelectProps, "items"> & {
  withLabel?: boolean
}

/**
 * Компонент выбора (селект)
 * @namespace Shared.UI.Select
 */
export const SelectColor = ({ withLabel = false, ...props }: SelectColorProps) => {
  const colorList = [
    { label: "Красный", value: "#ff1c47" },
    { label: "Зелёный", value: "#80cd00" },
    { label: "Синий", value: "#00d2ff" },
    { label: "Жёлтый", value: "#ffdd00" },
    { label: "Оранжевый", value: "#ffa500" },
    { label: "Белый", value: "#ffffff" }
  ]

  return (
    <Select
      {...props}
      items={colorList}
      renderItem={({ label, value }) => (
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded-full border-2 border-foreground-soft" style={{ backgroundColor: value }} />
          {withLabel && label}
        </div>
      )}
    />
  )
}
