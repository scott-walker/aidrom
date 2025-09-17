import { useState } from "react"
import type { DriverParamsConfigParameterRange } from "@entities/provider"
import { FormField } from "@ui/form-field"
import { Slider } from "@ui/slider"

/**
 * Пропсы
 * @namespace Features.AgentParams.Ui.Fields.Range.Props
 */
type RangeParamFieldProps = {
  param: DriverParamsConfigParameterRange
  value: number
  onChange: (value: number) => void
}

/**
 * Компонент параметра типа "range"
 * @namespace Features.AgentParams.Ui.Fields.Range
 */
export const RangeParamField = ({ param, value, onChange }: RangeParamFieldProps) => {
  const [innerValue, setInnerValue] = useState<number>(value ?? param.min)

  const handleChange = (value: number[]) => {
    setInnerValue(value[0])
    onChange(value[0])
  }

  return (
    <FormField label={param.label} className="flex flex-col gap-2">
      <Slider
        value={[innerValue]}
        min={param.min}
        max={param.max}
        step={param.step}
        onChange={handleChange}
        className="px-3"
      />
    </FormField>
  )
}
