import { useRef, useEffect, useState, type ComponentProps, type KeyboardEvent, type RefObject } from "react"
import { makeClasses } from "@lib/style-api"
import { useAutoFocus, useAutoSelect } from "./hooks"

/**
 * Сдвиг ширины поля
 */
const WIDTH_OFFSET = 8

/**
 * Ключи, которые не должны блокироваться
 */
const EXCLUDE_KEYS = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"]

/**
 * Пропсы легкого текстового поля
 * @namespace Shared.UI.InputLight.Props
 */
export type InputLightProps = Omit<ComponentProps<"div">, "onChange" | "onInput"> & {
  value?: string
  minLength?: number
  maxLength?: number
  placeholder?: string
  onChange?: (value: string) => void
  onBlur?: (value: string) => void
  onEnter?: (value: string) => void
  autoFocus?: boolean
  autoSelect?: boolean
  disabled?: boolean
}

/**
 * Легкое текстовое поле
 * @namespace Shared.UI.InputLight.InputLight
 */
export const InputLight = ({
  value = "",
  minLength = 10,
  placeholder = "Введите текст",
  onChange,
  onBlur,
  onEnter,
  autoFocus = false,
  autoSelect = false,
  disabled = false,
  maxLength,
  className = "",
  ...props
}: InputLightProps) => {
  const measureRef = useRef<HTMLSpanElement>(null)
  const editableRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number>(0)
  const [currentValue, setCurrentValue] = useState(value)

  /**
   * Обновляет ширину поля на основе содержимого
   */
  const updateWidth = (text: string) => {
    if (measureRef.current) {
      const textToMeasure = text.length < minLength ? "A".repeat(minLength) : text

      measureRef.current.textContent = textToMeasure || placeholder

      const newWidth = Math.max(
        measureRef.current.offsetWidth + WIDTH_OFFSET,
        // Минимальная ширина
        minLength * WIDTH_OFFSET
      )

      setWidth(newWidth)
    }
  }

  /**
   * Обработчик ввода текста
   */
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const element = e.currentTarget
    let newValue = element.textContent || ""

    // Удалить автоматически вставленные <br> элементы
    if (element.innerHTML === "<br>" || element.innerHTML === "<br/>") {
      element.innerHTML = ""
      newValue = ""
    }

    // Проверить максимальную длину
    if (maxLength && newValue.length > maxLength) {
      return
    }

    setCurrentValue(newValue)
    updateWidth(newValue)
    onChange?.(newValue)
  }

  /**
   * Обработчик потери фокуса
   */
  const handleBlur = () => {
    onBlur?.(currentValue)
  }

  /**
   * Обработчик нажатия клавиш
   */
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      // editableRef.current?.blur()
      onEnter?.(currentValue)
    }
    if (maxLength && currentValue.length >= maxLength && !EXCLUDE_KEYS.includes(e.key)) {
      e.preventDefault()
    }
  }

  useEffect(() => {
    if (value !== currentValue) {
      setCurrentValue(value)
      updateWidth(value)

      if (editableRef.current) {
        editableRef.current.textContent = value
      }
    }
  }, [value])
  useEffect(() => updateWidth(currentValue), [minLength])
  useAutoFocus(autoFocus, editableRef as RefObject<HTMLDivElement>)
  useAutoSelect(autoSelect, editableRef as RefObject<HTMLDivElement>)

  const classes = makeClasses(
    "inline-block",
    "min-w-0",
    "px-3",
    "py-1",
    "text-foreground-hard",
    "bg-transparent",
    "border-b-2",
    "border-background-hard",
    "hover:border-primary",
    "focus:border-primary",
    "transition-all",
    "duration-200",
    "ease-in-out",
    "cursor-text",
    "whitespace-nowrap",
    "overflow-hidden",
    disabled && "cursor-not-allowed",
    disabled && "opacity-50",
    "[&:empty]:before:content-[attr(data-placeholder)]",
    "[&:empty]:before:text-foreground-soft",
    "[&:empty]:before:pointer-events-none",
    className
  )

  return (
    <>
      {/* Скрытый элемент для измерения ширины текста */}
      <span
        ref={measureRef}
        className="invisible fixed top-0 left-0 whitespace-nowrap px-3 text-transparent"
        style={{
          fontFamily: "inherit",
          fontSize: "inherit",
          fontWeight: "inherit",
          letterSpacing: "inherit"
        }}
        aria-hidden="true"
      />
      <div
        {...props}
        ref={editableRef}
        className={classes}
        style={{ width: `${width}px`, ...props.style }}
        contentEditable={!disabled}
        suppressContentEditableWarning={true}
        data-placeholder={placeholder}
        onInput={handleInput}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        aria-multiline="false"
      >
        {value}
      </div>
    </>
  )
}
