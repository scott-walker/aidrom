import type { ComponentProps, FC, JSX } from "react"
import { Content } from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import SheetPortal from "./Portal"
import SheetOverlay from "./Overlay"
import SheetClose from "./Close"
import { makeContentClass, makeCloseClass, makeCloseIconClass, makeCloseSpanClass } from "./assets"

/**
 * Пропсы
 * @namespace Ui.Sheet.Props
 */
type Props = ComponentProps<typeof Content> & {
  side?: "top" | "right" | "bottom" | "left"
}

/**
 * Конструктор
 * @namespace Ui.Input.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Ui.Input.Component
 */
type Component = JSX.Element

/**
 * Контент
 * @namespace Ui.Sheet.Content
 * @type {Constructor}
 * @param Props.className - CSS класс
 * @param Props.children - дочерние элементы
 * @param Props.side - сторона контента
 * @param Props.props - пропсы для компонента
 * @returns {JSX.Element} элемент компонента SheetContent
 */
const SheetContent: Constructor = ({ className, children, side = "right", ...props }: Props): Component => {
  const contentClasses = makeContentClass(side, className)
  const closeClasses = makeCloseClass()
  const closeIconClasses = makeCloseIconClass()
  const closeSpanClasses = makeCloseSpanClass()

  return (
    <SheetPortal>
      <SheetOverlay />
      <Content data-slot="sheet-content" className={contentClasses} {...props}>
        {children}

        <SheetClose className={closeClasses}>
          <XIcon className={closeIconClasses} />
          <span className={closeSpanClasses}>Close</span>
        </SheetClose>
      </Content>
    </SheetPortal>
  )
}

export default SheetContent
