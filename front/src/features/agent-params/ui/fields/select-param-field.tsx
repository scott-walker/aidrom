import { useState } from "react"
import { FormField } from "@ui/form-field"
import { Select } from "@shared/ui/select-old"
import type { DriverParamsConfigParameterSelect } from "@entities/provider"

/**
 * Пропсы
 * @namespace Features.AgentParams.Ui.Fields.Select.Props
 */
type SelectParamFieldProps = {
  param: DriverParamsConfigParameterSelect
  value: string
  onChange: (value: string) => void
}

/**
 * Компонент параметра типа "select"
 * @namespace Features.AgentParams.Ui.Fields.Select
 */
export const SelectParamField = ({ param, value, onChange }: SelectParamFieldProps) => {
  const [innerValue, setInnerValue] = useState<string>(value ?? param.options[0] ?? "")

  const handleChange = (value: string) => {
    setInnerValue(value)
    onChange(value)
  }

  return (
    <FormField label={param.label} className="flex-1">
      <Select
        items={param.options.map((value: string) => ({ label: value, value }))}
        value={innerValue}
        onChangeValue={handleChange}
        placeholder={param.label}
      />
    </FormField>
  )
}
