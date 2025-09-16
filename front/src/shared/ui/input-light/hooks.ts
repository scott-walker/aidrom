import { useEffect, type RefObject } from "react"

/**
 * Хук для автоматического фокуса
 * @namespace Shared.UI.InputLight.Hooks.useAutoFocus
 */
export const useAutoFocus = (autoFocus: boolean, editableRef: RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (autoFocus && editableRef.current) {
      editableRef.current.focus()
    }
  }, [autoFocus])
}
