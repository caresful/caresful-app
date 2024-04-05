import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Radio } from '../../../../components/radio'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BaseStepComponentProps } from '../../shared/types'

interface TreatmentReceptionStepProps extends BaseStepComponentProps {}

export const treatmentReceptionSchema = z.object({
  treatmentReception: z.enum(['yes', 'no']),
})

type TreatmentReception = z.infer<typeof treatmentReceptionSchema>

export function TreatmentReceptionStep({ navigateToStep, updateData, data, animationDirection }: TreatmentReceptionStepProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<TreatmentReception>({
    resolver: zodResolver(treatmentReceptionSchema),
    defaultValues: {
      treatmentReception: data?.treatmentReception,
    },
  })

  function onSubmit(data: TreatmentReception) {
    updateData(data)
    navigateToStep('Prescriptions')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>History</h5>
      <h3 className='text-2xl mt-4'>Have you received treatment for these conditions?</h3>
      <Controller
        name='treatmentReception'
        control={control}
        render={({ field }) => (
          <Radio className='mt-7' onChange={field.onChange}>
            <Radio.Item name={field.name} value='yes' checked={field.value === 'yes'}>
              Yes
            </Radio.Item>
            <Radio.Item name={field.name} value='no' checked={field.value === 'no'}>
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
