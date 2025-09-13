import { useState } from "react"
import { Modal } from "@ui/modal"
import { Button } from "@ui/button"
import { AgentCreateForm } from "@features/agent-form"

/**
 * Компонент создания агента
 * @namespace Widgets.AgentCreate
 */
export const AgentCreate = () => {
  const [open, setOpen] = useState(false)

  return (
    <Modal
      trigger={<Button schema="hard">Создать агента</Button>}
      title="Создание агента"
      open={open}
      onOpenChange={setOpen}
    >
      <div className="py-2 w-lg">
        <AgentCreateForm onCreated={() => setOpen(false)} />
      </div>
    </Modal>
  )
}
