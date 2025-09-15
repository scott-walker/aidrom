import { Controller } from "react-hook-form"
import { makeClasses } from "@lib/style-api"
import { Card } from "@ui/card"
import { Heading } from "@ui/heading"
import { FormField } from "@ui/form-field"
import { Select } from "@ui/select"
import { Slider } from "@ui/slider"
import { LoaderBlock } from "@ui/loader-block"
import { IconButton } from "@ui/icon-button"

import { type Agent, useUpdateAgent } from "@entities/agent"
import { type Provider, useProviderById } from "@entities/provider"
import { useToast } from "@features/toasts"

import type { AgentParamsForm } from "../model/form-schema"
import { useForm } from "../lib/use-form"
import { useParams } from "../lib/use-params"

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
  const { provider, isLoading } = useProviderById(agent.provider.id)
  const { mutate: updateAgent } = useUpdateAgent()
  const toast = useToast()
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm(agent.params as AgentParamsForm)
  const { parseParams } = useParams()

  const onSubmit = (data: AgentParamsForm) => {
    updateAgent(
      {
        agentId: agent.id,
        data: { params: data as AgentParamsForm }
      },
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

  if (isLoading) return <LoaderBlock />

  const { models, maxTokens, topP, temperature, frequencyPenalty, presencePenalty } = parseParams(
    (provider as Provider).driverParamsConfig
  )
  const fieldsClasses = makeClasses("flex", "flex-col", "gap-2")
  const sliderClasses = makeClasses("px-3")

  return (
    <Card>
      <form onSubmit={handleSubmit(data => onSubmit(data))}>
        <Card.Header>
          <Heading>Параметры</Heading>
          <IconButton type="submit" schema="primary" circle icon="check" iconSize={20} />
        </Card.Header>
        <Card.Body className="flex flex-col gap-4 pt-4 pb-8">
          <FormField label="Модель" error={errors.model} className="flex-1">
            <Controller
              name="model"
              control={control}
              render={({ field, fieldState }) => (
                <Select
                  items={models}
                  value={field.value}
                  onChangeValue={value => field.onChange(value)}
                  error={!!fieldState.error}
                  placeholder="Выберите модель"
                />
              )}
            />
          </FormField>

          <FormField label="Температура" error={errors.temperature} className={fieldsClasses}>
            <Controller
              name="temperature"
              control={control}
              render={({ field, fieldState }) => (
                <Slider
                  value={[field.value]}
                  min={temperature.min}
                  max={temperature.max}
                  step={0.1}
                  onChange={value => field.onChange(value[0])}
                  error={!!fieldState.error}
                  className={sliderClasses}
                />
              )}
            />
          </FormField>

          <FormField label="Максимальное количество токенов" error={errors.maxTokens} className={fieldsClasses}>
            <Controller
              name="maxTokens"
              control={control}
              render={({ field, fieldState }) => (
                <Slider
                  value={[field.value]}
                  min={maxTokens.min}
                  max={maxTokens.max}
                  step={1}
                  onChange={value => field.onChange(value[0])}
                  error={!!fieldState.error}
                  className={sliderClasses}
                />
              )}
            />
          </FormField>

          <FormField label="Топ-P" error={errors.topP} className={fieldsClasses}>
            <Controller
              name="topP"
              control={control}
              render={({ field, fieldState }) => (
                <Slider
                  value={[field.value]}
                  min={topP.min}
                  max={topP.max}
                  step={0.1}
                  onChange={value => field.onChange(value[0])}
                  error={!!fieldState.error}
                  className={sliderClasses}
                />
              )}
            />
          </FormField>

          <FormField label="Частотная штрафность" error={errors.frequencyPenalty} className={fieldsClasses}>
            <Controller
              name="frequencyPenalty"
              control={control}
              render={({ field, fieldState }) => (
                <Slider
                  value={[field.value]}
                  min={frequencyPenalty.min}
                  max={frequencyPenalty.max}
                  step={0.1}
                  onChange={value => field.onChange(value[0])}
                  error={!!fieldState.error}
                  className={sliderClasses}
                />
              )}
            />
          </FormField>

          <FormField label="Наличие штрафа" error={errors.presencePenalty} className={fieldsClasses}>
            <Controller
              name="presencePenalty"
              control={control}
              render={({ field, fieldState }) => (
                <Slider
                  value={[field.value]}
                  min={presencePenalty.min}
                  max={presencePenalty.max}
                  step={0.1}
                  onChange={value => field.onChange(value[0])}
                  error={!!fieldState.error}
                  className={sliderClasses}
                />
              )}
            />
          </FormField>
        </Card.Body>
      </form>
    </Card>
  )
}
