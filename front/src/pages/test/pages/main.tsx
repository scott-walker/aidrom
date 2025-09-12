import type { ReactNode } from "react"
import { useSubtitle } from "@lib/layout-api/utils"
import { Card } from "@ui/card"
import { Container } from "@ui/container"
import { Heading } from "@ui/heading"
import { Modal } from "@ui/modal"
import { Button } from "@ui/button"

/**
 * Главная страница инструментов
 * @namespace Pages.Test.Main
 * @returns {ReactNode}
 */
export const Main = (): ReactNode => {
  useSubtitle("Главная")

  return (
    <Card>
      <Card.Body>
        <Container>
          <Heading>Разработка</Heading>
          <Modal trigger={<Button>Открыть модальное окно</Button>} title="Модальное окно">
            <div>
              <p>Это модальное окно</p>
              <p>Еще очередной текст для проверки работы модального окна</p>
            </div>
          </Modal>
        </Container>
      </Card.Body>
    </Card>
  )
}
