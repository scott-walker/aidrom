import * as RadixSlider from "@radix-ui/react-slider"
import { makeClasses } from "@shared/lib/style-api"

/**
 * Пропсы
 * @namespace Shared.UI.Slider.Props
 */
type SliderProps = {
  value: number[]
  min: number
  max: number
  step: number
  onChange: (value: number[]) => void
  error?: boolean
  className?: string
}

/**
 * Компонент слайдера
 * @namespace Shared.UI.Slider
 */
export const Slider = ({ value, min, max, step, onChange, error = false, className }: SliderProps) => {
  const containerClasses = makeClasses("flex", "items-center", "justify-center", "w-full", "h-12", className)
  const rootClasses = makeClasses("relative", "flex", "items-center", "select-none", "touch-none", "w-full", "h-2")
  const trackClasses = makeClasses("relative", "grow", "h-0.5", "rounded-full", "bg-background-hard")
  const rangeClasses = makeClasses("absolute", "h-full", "bg-primary", error && "bg-danger")
  const thumbClasses = makeClasses("block", "h-4", "w-4", "rounded-full", "bg-primary", error && "bg-danger")
  const thumbValueClasses = makeClasses(
    "absolute",
    "-top-5",
    "left-0",
    "w-full",
    "h-full",
    "flex",
    "items-center",
    "justify-center",
    "text-sm"
  )
  const minIndicatorClasses = makeClasses("absolute", "top-2", "left-1", "text-sm")
  const maxIndicatorClasses = makeClasses("absolute", "top-2", "right-1", "text-sm")

  return (
    <div className={containerClasses}>
      <RadixSlider.Root
        className={rootClasses}
        defaultValue={value}
        min={min}
        max={max}
        step={step}
        onValueChange={onChange}
      >
        <RadixSlider.Track className={trackClasses}>
          <div className={minIndicatorClasses}>{min}</div>
          <RadixSlider.Range className={rangeClasses} />
          <div className={maxIndicatorClasses}>{max}</div>
        </RadixSlider.Track>
        <RadixSlider.Thumb className={thumbClasses} aria-label="Volume">
          <div className={thumbValueClasses}>{value[0]}</div>
        </RadixSlider.Thumb>
        <RadixSlider.Thumb className={thumbClasses} aria-label="Volume">
          <div className={thumbValueClasses}>{value[1]}</div>
        </RadixSlider.Thumb>
      </RadixSlider.Root>
    </div>
  )
}
