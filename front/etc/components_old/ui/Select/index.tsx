import type { FC, JSX, ComponentProps } from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { mergeClasses } from "@utils/jsxtools"
import { variants, contentVariants, itemVariants } from "./assets"

/**
 * Пропсы для компонента Select
 * @namespace Ui.Select.Props
 */
type SelectProps = ComponentProps<typeof SelectPrimitive.Root>

/**
 * Пропсы для компонента SelectGroup
 * @namespace Ui.Select.GroupProps
 */
type SelectGroupProps = ComponentProps<typeof SelectPrimitive.Group>

/**
 * Пропсы для компонента SelectValue
 * @namespace Ui.Select.ValueProps
 */
type SelectValueProps = ComponentProps<typeof SelectPrimitive.Value>

/**
 * Пропсы для компонента SelectTrigger
 * @namespace Ui.Select.TriggerProps
 */
type SelectTriggerProps = ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "default" | "sm"
}

/**
 * Пропсы для компонента SelectContent
 * @namespace Ui.Select.ContentProps
 */
type SelectContentProps = ComponentProps<typeof SelectPrimitive.Content> & {
  position?: "popper" | "item"
}

/**
 * Пропсы для компонента SelectLabel
 * @namespace Ui.Select.LabelProps
 */
type SelectLabelProps = ComponentProps<typeof SelectPrimitive.Label>

/**
 * Пропсы для компонента SelectItem
 * @namespace Ui.Select.ItemProps
 */
type SelectItemProps = ComponentProps<typeof SelectPrimitive.Item>

/**
 * Пропсы для компонента SelectSeparator
 * @namespace Ui.Select.SeparatorProps
 */
type SelectSeparatorProps = ComponentProps<typeof SelectPrimitive.Separator>

/**
 * Пропсы для компонента SelectScrollUpButton
 * @namespace Ui.Select.ScrollUpButtonProps
 */
type SelectScrollUpButtonProps = ComponentProps<typeof SelectPrimitive.ScrollUpButton>

/**
 * Пропсы для компонента SelectScrollDownButton
 * @namespace Ui.Select.ScrollDownButtonProps
 */
type SelectScrollDownButtonProps = ComponentProps<typeof SelectPrimitive.ScrollDownButton>

/**
 * Конструкторы компонентов
 * @namespace Ui.Select.Constructors
 */
type SelectConstructor = FC<SelectProps>
type SelectGroupConstructor = FC<SelectGroupProps>
type SelectValueConstructor = FC<SelectValueProps>
type SelectTriggerConstructor = FC<SelectTriggerProps>
type SelectContentConstructor = FC<SelectContentProps>
type SelectLabelConstructor = FC<SelectLabelProps>
type SelectItemConstructor = FC<SelectItemProps>
type SelectSeparatorConstructor = FC<SelectSeparatorProps>
type SelectScrollUpButtonConstructor = FC<SelectScrollUpButtonProps>
type SelectScrollDownButtonConstructor = FC<SelectScrollDownButtonProps>

/**
 * Компоненты
 * @namespace Ui.Select.Component
 */
type Component = JSX.Element

/**
 * UI компонент "Select" - корневой элемент
 * @namespace Ui.Select
 * @type {SelectConstructor}
 * @param SelectProps.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента Select
 */
const Select: SelectConstructor = ({ ...props }: SelectProps): Component => {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

/**
 * UI компонент "SelectGroup" - группа элементов
 * @namespace Ui.Select.Group
 * @type {SelectGroupConstructor}
 * @param SelectGroupProps.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента SelectGroup
 */
const SelectGroup: SelectGroupConstructor = ({ ...props }: SelectGroupProps): Component => {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

/**
 * UI компонент "SelectValue" - отображение выбранного значения
 * @namespace Ui.Select.Value
 * @type {SelectValueConstructor}
 * @param SelectValueProps.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента SelectValue
 */
const SelectValue: SelectValueConstructor = ({ ...props }: SelectValueProps): Component => {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

/**
 * UI компонент "SelectTrigger" - триггер для открытия списка
 * @namespace Ui.Select.Trigger
 * @type {SelectTriggerConstructor}
 * @param SelectTriggerProps.className - классы для компонента
 * @param SelectTriggerProps.size - размер компонента
 * @param SelectTriggerProps.children - дочерние элементы
 * @param SelectTriggerProps.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента SelectTrigger
 */
const SelectTrigger: SelectTriggerConstructor = ({
  className,
  size,
  children,
  ...props
}: SelectTriggerProps): Component => {
  const classes = mergeClasses(variants({ size: size || "default" }), className)

  return (
    <SelectPrimitive.Trigger data-slot="select-trigger" data-size={size} className={classes} {...props}>
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

/**
 * UI компонент "SelectContent" - контент выпадающего списка
 * @namespace Ui.Select.Content
 * @type {SelectContentConstructor}
 * @param SelectContentProps.className - классы для компонента
 * @param SelectContentProps.children - дочерние элементы
 * @param SelectContentProps.position - позиция контента
 * @param SelectContentProps.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента SelectContent
 */
const SelectContent: SelectContentConstructor = ({
  className,
  children,
  position,
  ...props
}: SelectContentProps): Component => {
  const classes = mergeClasses(contentVariants({ position } as any), className)

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content data-slot="select-content" className={classes} position={position} {...props}>
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={mergeClasses(
            "p-1",
            position === "popper" && [
              "h-[var(--radix-select-trigger-height)]",
              "w-full",
              "min-w-[var(--radix-select-trigger-width)]",
              "scroll-my-1"
            ]
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

/**
 * UI компонент "SelectLabel" - метка для группы элементов
 * @namespace Ui.Select.Label
 * @type {SelectLabelConstructor}
 * @param SelectLabelProps.className - классы для компонента
 * @param SelectLabelProps.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента SelectLabel
 */
const SelectLabel: SelectLabelConstructor = ({ className, ...props }: SelectLabelProps): Component => {
  const classes = mergeClasses("text-muted-foreground", "px-2", "py-1.5", "text-xs", className)

  return <SelectPrimitive.Label data-slot="select-label" className={classes} {...props} />
}

/**
 * UI компонент "SelectItem" - элемент списка
 * @namespace Ui.Select.Item
 * @type {SelectItemConstructor}
 * @param SelectItemProps.className - классы для компонента
 * @param SelectItemProps.children - дочерние элементы
 * @param SelectItemProps.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента SelectItem
 */
const SelectItem: SelectItemConstructor = ({ className, children, ...props }: SelectItemProps): Component => {
  const classes = mergeClasses(itemVariants(), className)

  return (
    <SelectPrimitive.Item data-slot="select-item" className={classes} {...props}>
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

/**
 * UI компонент "SelectSeparator" - разделитель элементов
 * @namespace Ui.Select.Separator
 * @type {SelectSeparatorConstructor}
 * @param SelectSeparatorProps.className - классы для компонента
 * @param SelectSeparatorProps.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента SelectSeparator
 */
const SelectSeparator: SelectSeparatorConstructor = ({ className, ...props }: SelectSeparatorProps): Component => {
  const classes = mergeClasses("bg-border", "pointer-events-none", "-mx-1", "my-1", "h-px", className)

  return <SelectPrimitive.Separator data-slot="select-separator" className={classes} {...props} />
}

/**
 * UI компонент "SelectScrollUpButton" - кнопка прокрутки вверх
 * @namespace Ui.Select.ScrollUpButton
 * @type {SelectScrollUpButtonConstructor}
 * @param SelectScrollUpButtonProps.className - классы для компонента
 * @param SelectScrollUpButtonProps.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента SelectScrollUpButton
 */
const SelectScrollUpButton: SelectScrollUpButtonConstructor = ({
  className,
  ...props
}: SelectScrollUpButtonProps): Component => {
  const classes = mergeClasses("flex", "cursor-default", "items-center", "justify-center", "py-1", className)

  return (
    <SelectPrimitive.ScrollUpButton data-slot="select-scroll-up-button" className={classes} {...props}>
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

/**
 * UI компонент "SelectScrollDownButton" - кнопка прокрутки вниз
 * @namespace Ui.Select.ScrollDownButton
 * @type {SelectScrollDownButtonConstructor}
 * @param SelectScrollDownButtonProps.className - классы для компонента
 * @param SelectScrollDownButtonProps.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента SelectScrollDownButton
 */
const SelectScrollDownButton: SelectScrollDownButtonConstructor = ({
  className,
  ...props
}: SelectScrollDownButtonProps): Component => {
  const classes = mergeClasses("flex", "cursor-default", "items-center", "justify-center", "py-1", className)

  return (
    <SelectPrimitive.ScrollDownButton data-slot="select-scroll-down-button" className={classes} {...props}>
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  type SelectProps,
  type SelectGroupProps,
  type SelectValueProps,
  type SelectTriggerProps,
  type SelectContentProps,
  type SelectLabelProps,
  type SelectItemProps,
  type SelectSeparatorProps,
  type SelectScrollUpButtonProps,
  type SelectScrollDownButtonProps
}
