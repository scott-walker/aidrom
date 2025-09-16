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

/**
 * Хук для автоматического выделения текста
 * @namespace Shared.UI.InputLight.Hooks.useAutoSelect
 */
export const useAutoSelect = (autoSelect: boolean, editableRef: RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (autoSelect && editableRef.current) {
      const element = editableRef.current

      setTimeout(() => {
        element.focus()

        const selection = window.getSelection()
        if (selection) {
          const range = document.createRange()
          range.selectNodeContents(element)
          selection.removeAllRanges()
          selection.addRange(range)
        }
      }, 0)
    }
  }, [autoSelect])
}
