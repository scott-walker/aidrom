import { useState, type ReactNode } from "react"
import { useLayoutSubtitle } from "@lib/layout-api"
import { Card } from "@ui/card"
import { Container } from "@ui/container"
import { Heading } from "@ui/heading"
import { Modal } from "@ui/modal"
import { Button } from "@ui/button"
import { Popover } from "@ui/popover"
import { Slider } from "@ui/slider"
import { Loader } from "@ui/loader/loader"
import { InputLight } from "@ui/input-light"
import { Switch } from "@ui/switch"
import { ModalConfirm } from "@ui/modal-confirm"
import { useToast } from "@features/toasts"

/**
 * Главная страница инструментов
 * @namespace Pages.Test.Main
 * @returns {ReactNode}
 */
export const Main = (): ReactNode => {
  useLayoutSubtitle("Главная")

  const [sliderValue, setSliderValue] = useState<number[]>([0])
  const [switchValue, setSwitchValue] = useState<boolean>(false)
  const toast = useToast()

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

            <Modal nearTrigger trigger={<Button>Меню</Button>}>
              Содержимое меню
            </Modal>

            <ModalConfirm
              trigger={<Button schema="hard">Удалить</Button>}
              title="Удаление всего и вся"
              description="Вы уверены, что хотите удалить всего и вся?"
              onApprove={() => toast.success("Вы приняли решение")}
              onReject={() => toast.error("Вы отказались от решения")}
            />

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

          <div className="flex gap-6">
            <Button onClick={() => toast.success("Все произошло успешно", "Уведомление")}>Уведомление</Button>
            <Button schema="brand" onClick={() => toast.error("Произошла ошибка", "Уведомление")}>
              Уведомление
            </Button>
            <Button schema="hard" onClick={() => toast.warning("Внимание", "Уведомление")}>
              Уведомление
            </Button>
            <Button schema="soft" onClick={() => toast.info("Информация", "Уведомление")}>
              Уведомление
            </Button>
            <Button onClick={() => toast.clear()}>Очистить уведомления</Button>
            <Button schema="danger" onClick={() => toast.error("Произошла ошибка", "Уведомление")}>
              Уведомление
            </Button>
            <Button schema="secondary" onClick={() => toast.info("Информация", "Уведомление")}>
              Уведомление
            </Button>
          </div>

          <div className="flex gap-6">
            <Loader />
          </div>

          <div className="flex gap-6">
            <InputLight autoFocus />
            <InputLight value="test" maxLength={10} />
            {/* <InputLight value="test" minLength={10} />
            <InputLight value="test" minLength={10} maxLength={10} />
            <InputLight value="test" minLength={10} maxLength={10} placeholder="test" /> */}
          </div>

          <div className="flex gap-6">
            <Switch checked={switchValue} onChange={setSwitchValue} />
            <p>Switch: {switchValue ? "true" : "false"}</p>
          </div>
        </Container>
      </Card.Body>
    </Card>
  )
}
