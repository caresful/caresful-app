import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Radio } from '../../../../components/radio'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BaseStepComponentProps } from '../../shared/types'

interface HIVOngoingRiskStepProps extends BaseStepComponentProps {}

export const hivOngoingRiskSchema = z.object({
  hivOngoingRisk: z.enum(['yes', 'no']),
})

type HIVOngoingRisk = z.infer<typeof hivOngoingRiskSchema>

export function HIVOngoingRiskStep({ navigateToStep, updateData, data, animationDirection }: HIVOngoingRiskStepProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<HIVOngoingRisk>({
    resolver: zodResolver(hivOngoingRiskSchema),
    defaultValues: {
      hivOngoingRisk: data?.hivOngoingRisk,
    },
  })

  function onSubmit(data: HIVOngoingRisk) {
    updateData(data)
    navigateToStep('PrepPrescription')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>risk factors</h5>
      <h3 className='text-2xl mt-4'>Are you concerned you may have an ongoing risk for HIV?</h3>
      <Controller
        name='hivOngoingRisk'
        control={control}
        render={({ field }) => (
          <Radio className='mt-7'>
            <Radio.Item name={field.name} value='yes' checked={field.value === 'yes'} onChange={field.onChange}>
              Yes
            </Radio.Item>
            <Radio.Item name={field.name} value='no' checked={field.value === 'no'} onChange={field.onChange}>
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
