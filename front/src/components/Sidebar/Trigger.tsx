import type { ComponentProps, FC, JSX, MouseEvent } from "react"
import { PanelLeftIcon } from "lucide-react"
import { useSidebar } from "./hooks"
import { Button } from "@ui/Button"
import { mergeClasses } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Sidebar.Trigger.Props
 */
type Props = ComponentProps<typeof Button>

/**
 * Конструктор
 * @namespace Sidebar.Trigger.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.Trigger.Component
 */
type Component = JSX.Element


/**
 * Функция для создания класса для триггера
 * @namespace Sidebar.Trigger.makeTriggerClass
 * @param className - CSS классы
 * @returns {string} классы для триггера
 */
const makeTriggerClass = (className: string = ""): string => {
  return mergeClasses(
    "size-7",
    className
  )
}

/**
 * Функция для создания класса для внутреннего контейнера
 * @namespace Sidebar.Trigger.makeTriggerInnerClass
 * @param className - CSS классы
 * @returns {string} классы для внутреннего контейнера
 */
const makeTriggerInnerClass = (className: string = ""): string => {
  return mergeClasses(
    "sr-only",
    className
  )
}

/**
 * Компонент SidebarTrigger
 * @namespace Sidebar.Trigger
 * @param Props.className - CSS классы
 * @param Props.onClick - обработчик клика
 * @param Props.props - пропсы для компонента */
const SidebarTrigger: Constructor = ({ className, onClick, ...props }: Props): Component => {
  const sidebarTriggerClass = makeTriggerClass(className || "")
  const sidebarTriggerInnerClass = makeTriggerInnerClass()
  const { toggleSidebar } = useSidebar()

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    toggleSidebar()
  }

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={sidebarTriggerClass}
      onClick={handleClick}
      {...props}
    >
      <PanelLeftIcon />
      <span className={sidebarTriggerInnerClass}>Toggle Sidebar</span>
    </Button>
  )
}

export default SidebarTrigger
