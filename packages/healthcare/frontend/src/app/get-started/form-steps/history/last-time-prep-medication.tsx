import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Radio } from '../../../../components/radio'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BaseStepComponentProps } from '../../shared/types'

interface LastTimePrepMedicationStepProps extends BaseStepComponentProps {}

export const lastTimePrepMedicationSchema = z.object({
  lastTimePrepMedication: z.enum(['currently', '<3M', '3-6M', '6-12M', '>1Y']),
})

type LastTimePrepMedication = z.infer<typeof lastTimePrepMedicationSchema>

export function LastTimePrepMedicationStep({ navigateToStep, updateData, data, animationDirection }: LastTimePrepMedicationStepProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LastTimePrepMedication>({
    resolver: zodResolver(lastTimePrepMedicationSchema),
    defaultValues: {
      lastTimePrepMedication: data?.lastTimePrepMedication,
    },
  })

  function onSubmit(data: LastTimePrepMedication) {
    updateData(data)
    navigateToStep('HIVDiagnosis')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>History</h5>
      <h3 className='text-2xl mt-4'>When was the last time you were actively taking PrEP?</h3>
      <Controller
        name='lastTimePrepMedication'
        control={control}
        render={({ field }) => (
          <Radio className='mt-7' onChange={field.onChange}>
            <Radio.Item name={field.name} value='currently' checked={field.value === 'currently'}>
              Currently
            </Radio.Item>
            <Radio.Item name={field.name} value='<3M' checked={field.value === '<3M'}>
              Less than 3 months ago
            </Radio.Item>
            <Radio.Item name={field.name} value='3-6M' checked={field.value === '3-6M'}>
              3-6 months ago
            </Radio.Item>
            <Radio.Item name={field.name} value='6-12M' checked={field.value === '6-12M'}>
              6-12 months ago
            </Radio.Item>
            <Radio.Item name={field.name} value='>1Y' checked={field.value === '>1Y'}>
              Over a year ago
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
