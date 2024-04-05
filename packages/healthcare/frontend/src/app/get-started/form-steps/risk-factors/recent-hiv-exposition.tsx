import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Radio } from '../../../../components/radio'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BaseStepComponentProps } from '../../shared/types'

interface RecentHIVExpositionStepProps extends BaseStepComponentProps {}

export const recentHIVExpositionSchema = z.object({
  recentHIVexposition: z.enum(['yes', 'no']),
})

type RecentHIVExposition = z.infer<typeof recentHIVExpositionSchema>

export function RecentHIVExpositionStep({ navigateToStep, updateData, data, animationDirection }: RecentHIVExpositionStepProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<RecentHIVExposition>({
    resolver: zodResolver(recentHIVExpositionSchema),
    defaultValues: {
      recentHIVexposition: data?.recentHIVexposition,
    },
  })

  function onSubmit(data: RecentHIVExposition) {
    updateData(data)
    navigateToStep('LastMonthHIVExposition')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>risk factors</h5>
      <h3 className='text-2xl mt-4'>In the last 72 hours, have you been exposed to the semen or blood of someone HIV positive?</h3>
      <Controller
        name='recentHIVexposition'
        control={control}
        render={({ field }) => (
          <Radio className='mt-7'>
            <Radio.Item name={field.name} value='yes' checked={field.value == 'yes'} onChange={field.onChange}>
              Yes
            </Radio.Item>
            <Radio.Item name={field.name} value='no' checked={field.value == 'no'} onChange={field.onChange}>
              No
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
