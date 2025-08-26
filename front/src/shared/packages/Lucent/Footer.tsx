import { useContext, type ComponentProps, type FC, type ReactNode } from "react"
import { cn } from "@utils/jsxtools"
import { Icon } from "@ui/Icon"
import { LayoutContext, type ILayoutContext } from "./context"
import styles from "./Lucent.module.css"

/**
 * Пропсы футера макета
 * @namespace Layouts.Lucent.Footer.Props
 */
type Props = ComponentProps<"footer">

/**
 * Футер макета
 * @namespace Layouts.Lucent.Footer
 * @param {Props} props.children - контент
 * @returns {ReactNode}
 */
export const Footer: FC<Props> = ({ children, ...props }: Props): ReactNode => {
  const { isFooterVisible } = useContext(LayoutContext) as ILayoutContext
  const hidden = !isFooterVisible()
  const footerClasses = cn(styles.layoutFooter, hidden && styles.footerHidden)
  const footerInnerClasses = cn(styles.layoutFooterInner, hidden && styles.footerHidden)

  return (
    <footer className={footerClasses} {...props}>
      <div className={footerInnerClasses}>
        <div className="flex items-center gap-2">
          <Icon name="copyright" size={25} strokeWidth={3} />
          <span>Информационная панель</span>

          <div className="flex items-center gap-2">
            <span>API: 1.0.0</span>
            <span>Fetching provider data... (78.9%)</span>
          </div>
        </div>

        {children}
      </div>
    </footer>
  )
}
