import _ from "lodash"

export const useHelper = () => {
  const delay = (min, max) => {
    return new Promise((res) => setTimeout(res, _.random(min, max)))
  }

  const moveMouseSmoothly = async (page, startX, startY, endX, endY) => {
    const steps = _.random(20, 100)

    let x = startX
    let y = startY

    const dx = (endX - startX) / steps
    const dy = (endY - startY) / steps

    for (let i = 0; i < steps; i++) {
      x += dx
      y += dy
      await page.mouse.move(x, y)
      await delay(5, 20)
    }
  }

  return {
    delay,
    moveMouseSmoothly
  }
}
