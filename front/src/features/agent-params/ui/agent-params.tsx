import { Controller } from "react-hook-form"
import { makeClasses } from "@lib/style-api"
import { Card } from "@ui/card"
import { Heading } from "@ui/heading"
import { FormField } from "@ui/form-field"
import { Select } from "@ui/select"
import { Slider } from "@ui/slider"
import { LoaderBlock } from "@ui/loader-block"
import { ErrorBlock } from "@ui/error-block"
import { Button } from "@ui/button"

import { type Agent, useUpdateAgent } from "@entities/agent"
import { type ProviderWithDriverParamsConfig, useProviderById } from "@entities/provider"
import type { AgentParamsForm } from "../model/form-schema"
import { useForm } from "../lib/use-form"

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
  const { provider, isLoading, error } = useProviderById(agent.provider.id)
  const { mutate: updateAgent, error: updateError } = useUpdateAgent()
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm(agent.params as AgentParamsForm)

  if (isLoading) return <LoaderBlock />
  if (error) return <ErrorBlock error={error} />
  if (updateError) return <ErrorBlock error={updateError} />

  const onSubmit = (data: AgentParamsForm) => {
    updateAgent(
      {
        agentId: agent.id,
        data: { params: data as AgentParamsForm }
      },
      { onSuccess: () => {} }
    )
  }

  const paramsConfig = (provider as ProviderWithDriverParamsConfig).driverParamsConfig
  const models = paramsConfig.model.map(model => ({ label: model, value: model }))
  const maxTokens = paramsConfig.maxTokens
  const topP = paramsConfig.topP
  const temperature = paramsConfig.temperature
  const frequencyPenalty = paramsConfig.frequencyPenalty
  const presencePenalty = paramsConfig.presencePenalty

  const fieldsClasses = makeClasses("flex", "flex-col", "gap-2")
  const sliderClasses = makeClasses("px-2")

  return (
    <Card>
      <Card.Header>
        <Heading>Параметры</Heading>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit(data => onSubmit(data))} className="flex flex-col gap-4">
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

          <div className="flex justify-center p-2">
            <Button type="submit">Сохранить</Button>
          </div>
        </form>
      </Card.Body>
    </Card>
  )
}
