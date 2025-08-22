import type { ComponentProps, FC, ReactNode } from "react"
import { Scrollbar as ScrollbarComponent } from "react-scrollbars-custom"

/**
 * Пропсы скроллбара
 * @namespace UI.Scrollbar.Props
 */
type Props = ComponentProps<typeof ScrollbarComponent>

/**
 * Скроллбар
 * @namespace UI.Scrollbar
 * @param {Props} props.children - контент
 * @returns {ReactNode}
 */
export const Scrollbar: FC<Props> = ({ children, ...props }: Props): ReactNode => {
  const trackProps = {
    style: { background: "transparent", borderRadius: "4px" }
  }
  const thumbProps = {
    style: { background: "var(--color-background-farther)", borderRadius: "4px" }
  }
  return (
    <ScrollbarComponent
      // style={{ width: "100%", height: "100%" }}
      trackYProps={trackProps}
      thumbYProps={thumbProps}
      trackXProps={trackProps}
      thumbXProps={thumbProps}
      {...props}
    >
      {children}
    </ScrollbarComponent>
  )
}
