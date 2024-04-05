import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Radio } from '../../../../components/radio'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BaseStepComponentProps } from '../../shared/types'

interface LastMonthHIVExpositionStepProps extends BaseStepComponentProps {}

export const lastMonthHIVExpositionSchema = z.object({
  lastMonthHIVExposition: z.enum(['yes', 'no', 'notSure']),
})

type LastMonthHIVExposition = z.infer<typeof lastMonthHIVExpositionSchema>

export function LastMonthHIVExpositionStep({ navigateToStep, updateData, data, animationDirection }: LastMonthHIVExpositionStepProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LastMonthHIVExposition>({
    resolver: zodResolver(lastMonthHIVExpositionSchema),
    defaultValues: {
      lastMonthHIVExposition: data?.lastMonthHIVExposition,
    },
  })

  function onSubmit(data: LastMonthHIVExposition) {
    updateData(data)
    navigateToStep('HIVOngoingRisk')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>risk factors</h5>
      <h3 className='text-2xl mt-4'>Do you think you may have been exposed to HIV within the last 30 days?</h3>
      <Controller
        name='lastMonthHIVExposition'
        control={control}
        render={({ field }) => (
          <Radio className='mt-7'>
            <Radio.Item name={field.name} value='yes' checked={field.value === 'yes'} onChange={field.onChange}>
              Yes
            </Radio.Item>
            <Radio.Item name={field.name} value='no' checked={field.value === 'no'} onChange={field.onChange}>
              No
            </Radio.Item>
            <Radio.Item name={field.name} value='notSure' checked={field.value === 'notSure'} onChange={field.onChange}>
              I’m not sure
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
