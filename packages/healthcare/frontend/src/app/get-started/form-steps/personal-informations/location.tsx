import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { BaseStepComponentProps } from '../../shared/types'
import { ComboboxInput } from '../../../../components/combobox'
import { type State, states } from '../../../../utils/constants'

interface LocationStepProps extends BaseStepComponentProps {}

export const locationStepSchema = z.object({
  state: z.string().refine((v) => states.flatMap((s) => [s.name]).includes(v as State['name'])),
})

export type Location = z.infer<typeof locationStepSchema>

export function LocationStep({ navigateToStep, updateData, data, animationDirection }: LocationStepProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Location>({
    resolver: zodResolver(locationStepSchema),
    defaultValues: {
      state: data?.state ?? '',
    },
  })

  function onSubmit(data: z.infer<typeof locationStepSchema>) {
    updateData(data)
    navigateToStep('DateOfBirth')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h3 className='text-2xl'>Where are you located?</h3>
      <p className='mt-[18px]'>This helps us connect you to licensed providers in your state. Select your primary state of residence.</p>

      <Controller
        name='state'
        control={control}
        render={({ field }) => (
          <ComboboxInput
            options={states.map((s) => ({ key: s.abbreviation, value: s.name }))}
            onChange={field.onChange}
            defaultValue={data.state}
            className='mt-6'
            error={Boolean(errors.state)}
          />
        )}
      />

      <Button type='submit' className='mt-6 w-full'>
        Continue
      </Button>
    </Form>
  )
}
