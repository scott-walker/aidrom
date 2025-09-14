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
}

/**
 * Компонент слайдера
 * @namespace Shared.UI.Slider
 */
export const Slider = ({ value, min, max, step, onChange }: SliderProps) => {
  const rootClasses = makeClasses("relative", "flex", "items-center", "select-none", "touch-none", "w-full", "h-2")
  const trackClasses = makeClasses("relative", "grow", "h-0.5", "rounded-full", "bg-background-hard")
  const rangeClasses = makeClasses("absolute", "h-full", "bg-primary")
  const thumbClasses = makeClasses("block", "h-4", "w-4", "rounded-full", "bg-primary")

  return (
    <RadixSlider.Root
      className={rootClasses}
      defaultValue={value}
      min={min}
      max={max}
      step={step}
      onValueChange={onChange}
    >
      <RadixSlider.Track className={trackClasses}>
        <RadixSlider.Range className={rangeClasses} />
      </RadixSlider.Track>
      <RadixSlider.Thumb className={thumbClasses} aria-label="Volume" />
      <RadixSlider.Thumb className={thumbClasses} aria-label="Volume" />
    </RadixSlider.Root>
  )
}
