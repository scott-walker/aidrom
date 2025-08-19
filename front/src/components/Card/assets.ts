import { mergeClasses } from "@utils/jsxtools"

/**
 * Классы для основного контейнера карточки
 * @namespace UI.Card.Assets.CardClasses
 * @type {string}
 */
export const cardClasses: string = mergeClasses(
  "bg-card",
  "text-card-foreground",
  "flex",
  "flex-col",
  "gap-6",
  "rounded-xl",
  "border",
  "py-6",
  "shadow-sm"
)

/**
 * Классы для заголовка карточки
 * @namespace UI.Card.Assets.CardHeaderClasses
 * @type {string}
 */
export const cardHeaderClasses: string = mergeClasses(
  "@container/card-header",
  "grid",
  "auto-rows-min",
  "grid-rows-[auto_auto]",
  "items-start",
  "gap-1.5",
  "px-6",
  "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
  "[.border-b]:pb-6"
)

/**
 * Классы для заголовка карточки
 * @namespace UI.Card.Assets.CardTitleClasses
 * @type {string}
 */
export const cardTitleClasses: string = mergeClasses("leading-none", "font-semibold")

/**
 * Классы для описания карточки
 * @namespace UI.Card.Assets.CardDescriptionClasses
 * @type {string}
 */
export const cardDescriptionClasses: string = mergeClasses("text-muted-foreground", "text-sm")

/**
 * Классы для действия карточки
 * @namespace UI.Card.Assets.CardActionClasses
 * @type {string}
 */
export const cardActionClasses: string = mergeClasses(
  "col-start-2",
  "row-span-2",
  "row-start-1",
  "self-start",
  "justify-self-end"
)

/**
 * Классы для содержимого карточки
 * @namespace UI.Card.Assets.CardContentClasses
 * @type {string}
 */
export const cardContentClasses: string = mergeClasses("px-6")

/**
 * Классы для подвала карточки
 * @namespace UI.Card.Assets.CardFooterClasses
 * @type {string}
 */
export const cardFooterClasses: string = mergeClasses("flex", "items-center", "px-6", "[.border-t]:pt-6")
