import { useState } from "react"
import { FormField } from "@ui/form-field"
import { Switch } from "@ui/switch"
import type { DriverParamsConfigParameterToggle } from "@entities/provider"

/**
 * Пропсы
 * @namespace Features.AgentParams.Ui.Fields.Toggle.Props
 */
type ToggleParamFieldProps = {
  param: DriverParamsConfigParameterToggle
  value: boolean
  onChange: (value: boolean) => void
}

/**
 * Компонент параметра типа "toggle"
 * @namespace Features.AgentParams.Ui.Fields.Toggle
 */
export const ToggleParamField = ({ param, value, onChange }: ToggleParamFieldProps) => {
  const [innerValue, setInnerValue] = useState<boolean>(value ?? false)

  const handleChange = (value: boolean) => {
    setInnerValue(value)
    onChange(value)
  }

  return (
    <FormField label={param.label} className="flex-1 flex-row items-center">
      <Switch checked={innerValue} onChange={handleChange} />
    </FormField>
  )
}
