import type { ComponentProps, FC, ReactNode } from "react"
import { Scrollbar as ScrollbarCustom } from "react-scrollbars-custom"
import { useAutoHide } from "./useAutoHide"

/**
 * Пропсы скроллбара
 * @namespace UI.Scrollbar.Props
 */
type Props = ComponentProps<typeof ScrollbarCustom>

/**
 * Скроллбар
 * @namespace UI.Scrollbar
 * @param {Props} props.children - контент
 * @returns {ReactNode}
 */
export const Scrollbar: FC<Props> = ({ children, ...props }: Props): ReactNode => {
  const { visible, onScrollStart, onScrollStop } = useAutoHide()
  const SCROLLBAR_SIZE = ".35rem"

  const wrapperProps = { className: "!inset-0" }
  const contentProps = { style: {} }
  const trackProps = {
    style: {
      background: "var(--color-scrollbar-track)",
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? "auto" : "none",
      transition: "opacity 0.15s ease"
    }
  }
  const thumbProps = {
    style: {
      background: "var(--color-scrollbar-thumb)",
      borderRadius: ".25rem"
    }
  }
  const trackXProps = { style: { ...trackProps.style, height: SCROLLBAR_SIZE } }
  const trackYProps = { style: { ...trackProps.style, width: SCROLLBAR_SIZE } }
  const thumbXProps = { style: thumbProps.style }
  const thumbYProps = { style: thumbProps.style }

  return (
    <ScrollbarCustom
      contentProps={contentProps}
      wrapperProps={wrapperProps}
      trackYProps={trackYProps}
      thumbYProps={thumbYProps}
      trackXProps={trackXProps}
      thumbXProps={thumbXProps}
      onScrollStart={onScrollStart}
      onScrollStop={onScrollStop}
      {...props}
    >
      {children}
    </ScrollbarCustom>
  )
}
