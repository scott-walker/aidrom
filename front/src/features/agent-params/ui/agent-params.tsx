import { Fragment, type FormEvent } from "react"

import { Card } from "@ui/card"
import { Heading } from "@ui/heading"
import { IconButton } from "@ui/icon-button"

import { type Agent, useUpdateAgent } from "@entities/agent"
import { type DriverParamsConfigParameterSelect, type DriverParamsConfigParameterRange } from "@entities/provider"
import { useToast } from "@features/toasts"

import { useParams } from "../lib/use-params"
import { SelectParamField } from "./fields/select-param-field"
import { RangeParamField } from "./fields/range-param-field"

/**
 * Пропсы для компонента AgentParams
 * @namespace Features.AgentParams.Ui.AgentParams.Props
 */
type AgentParamsProps = {
  agent: Agent
}

/**
 * Параметры агента
 * @namespace Features.AgentParams.Ui.AgentParams
 */
export const AgentParams = ({ agent }: AgentParamsProps) => {
  const { params, getValues, getValue, setValue } = useParams(agent)
  const { mutate: updateAgent } = useUpdateAgent()
  const toast = useToast()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    updateAgent(
      { agentId: agent.id, data: { params: getValues() } },
      {
        onSuccess: () => {
          toast.success("Параметры успешно сохранены")
        },
        onError: ({ message }) => {
          toast.error("Произошла ошибка при сохранении параметров", message)
        }
      }
    )
  }

  /**
   * Создать диномический компонент для поля
   * @namespace Features.AgentParams.Ui.AgentParams.createField
   */
  const createField = (param: DriverParamsConfigParameterSelect | DriverParamsConfigParameterRange) => {
    switch (param.type) {
      case "select":
        return (
          <SelectParamField
            param={param}
            value={getValue(param.name) as string}
            onChange={value => setValue(param.name, value)}
          />
        )
      case "range":
        return (
          <RangeParamField
            param={param}
            value={getValue(param.name) as number}
            onChange={value => setValue(param.name, value)}
          />
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <Card.Header>
          <Heading>Параметры</Heading>
          <IconButton type="submit" schema="primary" circle icon="check" iconSize={20} />
        </Card.Header>
        <Card.Body className="flex flex-col gap-4 pt-4 pb-8">
          {params.map(param => (
            <Fragment key={param.name}>{createField(param)}</Fragment>
          ))}
        </Card.Body>
      </form>
    </Card>
  )
}
