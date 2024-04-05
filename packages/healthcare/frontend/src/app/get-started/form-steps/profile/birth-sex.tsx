import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Radio } from '../../../../components/radio'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BaseStepComponentProps } from '../../shared/types'

interface BirthSexStepProps extends BaseStepComponentProps {}

export const birthSexSchema = z.object({
  birthSex: z.enum(['F', 'M']),
})

type BirthSex = z.infer<typeof birthSexSchema>

export function BirthSexStep({ navigateToStep, updateData, data, animationDirection }: BirthSexStepProps) {
  const { control, handleSubmit, formState } = useForm<BirthSex>({
    resolver: zodResolver(birthSexSchema),
    mode: 'onChange',
    defaultValues: {
      birthSex: data?.birthSex,
    },
  })
  const { isValid } = formState

  function onSubmit(data: BirthSex) {
    updateData(data)
    navigateToStep('Gender')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>PROFILE</h5>
      <h3 className='text-2xl mt-4'>Sex assigned at birth</h3>
      <Controller
        name='birthSex'
        control={control}
        render={({ field }) => (
          <Radio className='mt-7'>
            <Radio.Item name={field.name} value='F' checked={field.value === 'F'} onChange={field.onChange}>
              Female
            </Radio.Item>
            <Radio.Item name={field.name} value='M' checked={field.value === 'M'} onChange={field.onChange}>
              Male
            </Radio.Item>
          </Radio>
        )}
      />

      {isValid && (
        <Button type='submit' className='mt-6 w-full'>
          Continue
        </Button>
      )}
    </Form>
  )
}
