import { useState, type ReactNode } from "react"
import { useSubtitle } from "@lib/layout-api/utils"
import { Card } from "@ui/card"
import { Container } from "@ui/container"
import { Heading } from "@ui/heading"
import { Modal } from "@ui/modal"
import { Button } from "@ui/button"
import { Popover } from "@ui/popover"
import { Slider } from "@ui/slider"

/**
 * Главная страница инструментов
 * @namespace Pages.Test.Main
 * @returns {ReactNode}
 */
export const Main = (): ReactNode => {
  const [sliderValue, setSliderValue] = useState<number[]>([0])

  useSubtitle("Главная")

  return (
    <Card>
      <Card.Body>
        <Container className="flex flex-col gap-6">
          <Heading>Разработка</Heading>

          <div className="flex gap-6">
            <Modal trigger={<Button>Открыть модальное окно</Button>} title="Модальное окно">
              <div>
                <p>Это модальное окно</p>
                <p>Еще очередной текст для проверки работы модального окна</p>
              </div>
            </Modal>

            <Popover trigger={<Button>Открыть поповер</Button>}>
              <div>
                <p>Это поповер</p>
                <p>Еще очередной текст для проверки работы поповера</p>
              </div>
            </Popover>
          </div>

          <div className="flex gap-6">
            <p>Температура: {sliderValue.join(", ")}</p>
            <Slider value={sliderValue} min={0} max={2} step={0.1} onChange={setSliderValue} />
          </div>
        </Container>
      </Card.Body>
    </Card>
  )
}
