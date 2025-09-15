/**
 * Склонение слова в зависимости от числа
 * @namespace Shared.Utils.pluralize
 * @param {number} count - Число
 * @param {string[]} forms - Формы слова ["час", "часа", "часов"]
 */
export const pluralize = (count: number, forms: [string, string, string]): string => {
  const cases = [2, 0, 1, 1, 1, 2]

  return forms[count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]]
}
