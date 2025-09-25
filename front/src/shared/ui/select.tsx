import type { ReactNode } from "react"
import { useState, useRef, useEffect } from "react"
import { makeClasses, makeUiBox, makeUiClickable, makeUiHoverableAnimation, makeUiTransition } from "@lib/style-api"
import { ChevronDown } from "lucide-react"

/**
 * Значение пустого селекта
 * @namespace Shared.UI.LightweightSelect.EMPTY_SELECT_VALUE
 */
export const EMPTY_SELECT_VALUE = "__NONE__"

/**
 * Тип значения селекта
 * @namespace Shared.UI.LightweightSelect.Value
 */
export type SelectValue = string

/**
 * Тип элемента селекта
 * @namespace Shared.UI.LightweightSelect.Item
 */
export type SelectItem = { label: string; value: SelectValue }

/**
 * Пропсы
 * @namespace Shared.UI.LightweightSelect.Props
 */
export interface LightweightSelectProps {
  items: SelectItem[]
  value?: SelectValue | null
  defaultValue?: SelectValue | null
  hasEmpty?: boolean
  emptyLabel?: string
  placeholder?: string
  className?: string
  onChangeValue?: (value: SelectValue | null) => void
  renderItem?: (item: SelectItem) => ReactNode
  error?: boolean
  disabled?: boolean
}

/**
 * Легковесный компонент выбора (селект) без внешних зависимостей
 * @namespace Shared.UI.LightweightSelect
 */
export const Select = ({
  items,
  value,
  defaultValue,
  hasEmpty = false,
  emptyLabel = "Не выбрано",
  placeholder,
  onChangeValue,
  error,
  disabled,
  renderItem,
  className
}: LightweightSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<SelectValue | null>(value ?? defaultValue ?? null)
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const triggerRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Обновляем внутреннее состояние при изменении пропса value
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        triggerRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setFocusedIndex(-1)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Обработка клавиатуры
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (!isOpen) return

      const allItems = hasEmpty ? [{ label: emptyLabel, value: EMPTY_SELECT_VALUE }, ...items] : items

      switch (event.key) {
        case "Escape":
          setIsOpen(false)
          setFocusedIndex(-1)
          triggerRef.current?.focus()
          break

        case "ArrowDown":
          event.preventDefault()
          setFocusedIndex(prev => (prev < allItems.length - 1 ? prev + 1 : 0))
          break

        case "ArrowUp":
          event.preventDefault()
          setFocusedIndex(prev => (prev > 0 ? prev - 1 : allItems.length - 1))
          break

        case "Enter":
        case " ":
          event.preventDefault()
          if (focusedIndex >= 0 && focusedIndex < allItems.length) {
            handleSelect(allItems[focusedIndex].value)
          }
          break

        case "Tab":
          setIsOpen(false)
          setFocusedIndex(-1)
          break
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeydown)
    }

    return () => {
      document.removeEventListener("keydown", handleKeydown)
    }
  }, [isOpen, focusedIndex, items, hasEmpty, emptyLabel])

  /**
   * Обработчик выбора элемента
   * @param itemValue - Значение выбранного элемента
   */
  const handleSelect = (itemValue: SelectValue) => {
    const newValue = itemValue === EMPTY_SELECT_VALUE ? null : itemValue
    setSelectedValue(newValue)
    onChangeValue?.(newValue)
    setIsOpen(false)
    setFocusedIndex(-1)
    triggerRef.current?.focus()
  }

  /**
   * Обработчик клика по триггеру
   */
  const handleTriggerClick = () => {
    if (disabled) return
    setIsOpen(prev => !prev)
    setFocusedIndex(-1)
  }

  /**
   * Обработчик клавиш для триггера
   */
  const handleTriggerKeydown = (event: React.KeyboardEvent) => {
    if (disabled) return

    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault()
      setIsOpen(true)
      setFocusedIndex(0)
    }
  }

  /**
   * Получает отображаемый текст для выбранного значения
   */
  const getDisplayText = (): string => {
    if (selectedValue === null) {
      return hasEmpty ? emptyLabel : placeholder || ""
    }

    const selectedItem = items.find(item => item.value === selectedValue)
    return selectedItem ? selectedItem.label : placeholder || ""
  }

  const triggerClasses = makeClasses(
    makeUiBox(),
    makeUiClickable(),
    makeUiTransition(),
    makeUiHoverableAnimation(),

    "justify-between",
    "w-full",
    "relative",

    "bg-background",
    "text-soft-foreground",
    "fill-background",

    error ? "border-danger" : "border-background",
    error ? "hover:border-danger" : "hover:border-primary",
    isOpen ? (error ? "border-danger" : "border-primary") : "",

    disabled ? "opacity-50 cursor-not-allowed" : "",

    className
  )

  const dropdownClasses = makeClasses(
    "absolute",
    "top-full",
    "left-0",
    "mt-1.5",
    "py-2",
    "bg-background-soft",
    "dark:bg-background-hard",
    "fill-background-soft",
    "rounded-xl",
    "shadow-xs",
    "border",
    "border-background",
    "z-50",
    "min-w-full",
    "max-h-60",
    "overflow-y-auto"
  )

  const itemClasses = makeClasses(
    "px-4",
    "py-1",
    "cursor-pointer",
    "hover:bg-background",
    "hover:text-foreground-hard",
    "transition-colors"
  )

  const focusedItemClasses = makeClasses(itemClasses, "bg-background", "text-foreground-hard")

  const selectedItemClasses = makeClasses(itemClasses, "bg-primary", "text-primary-foreground")

  const allItems = hasEmpty ? [{ label: emptyLabel, value: EMPTY_SELECT_VALUE }, ...items] : items

  return (
    <div className="relative w-full">
      <button
        ref={triggerRef}
        type="button"
        className={triggerClasses}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeydown}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={placeholder}
      >
        <span className={selectedValue === null && !hasEmpty ? "text-muted-foreground" : ""}>{getDisplayText()}</span>
        <ChevronDown className={makeClasses("transition-transform", isOpen ? "rotate-180" : "")} />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={dropdownClasses}
          role="listbox"
          style={{
            width: triggerRef.current ? `${triggerRef.current.offsetWidth * 1.2}px` : "100%"
          }}
        >
          {allItems.map((item, index) => {
            const isSelected = item.value === (selectedValue || EMPTY_SELECT_VALUE)
            const isFocused = index === focusedIndex

            let itemClassName = itemClasses
            if (isSelected) {
              itemClassName = selectedItemClasses
            } else if (isFocused) {
              itemClassName = focusedItemClasses
            }

            return (
              <div
                key={item.value}
                className={itemClassName}
                onClick={() => handleSelect(item.value)}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setFocusedIndex(index)}
              >
                {renderItem ? renderItem(item) : item.label}
              </div>
            )
          })}

          {items.length === 0 && !hasEmpty && (
            <div className="px-4 py-2 text-muted-foreground">Нет доступных опций</div>
          )}
        </div>
      )}
    </div>
  )
}
