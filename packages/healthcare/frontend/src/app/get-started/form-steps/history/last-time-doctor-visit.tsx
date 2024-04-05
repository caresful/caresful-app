import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Radio } from '../../../../components/radio'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BaseStepComponentProps } from '../../shared/types'

interface LastTimeDoctorVisitStepProps extends BaseStepComponentProps {}

export const lastTimeDoctorVisitSchema = z.object({
  lastTimeDoctorVisit: z.enum(['3M', '3-6M', '6-9M', '>1Y', 'never']),
})

type LastTimeDoctorVisit = z.infer<typeof lastTimeDoctorVisitSchema>

export function LastTimeDoctorVisitStep({ navigateToStep, updateData, data, animationDirection }: LastTimeDoctorVisitStepProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LastTimeDoctorVisit>({
    resolver: zodResolver(lastTimeDoctorVisitSchema),
    defaultValues: {
      lastTimeDoctorVisit: data?.lastTimeDoctorVisit,
    },
  })

  function onSubmit(data: LastTimeDoctorVisit) {
    updateData(data)
    navigateToStep('SyphilisDiagnosis')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>History</h5>
      <h3 className='text-2xl mt-4'>When did you last visit your doctor and complete labs?</h3>
      <Controller
        name='lastTimeDoctorVisit'
        control={control}
        render={({ field }) => (
          <Radio className='mt-7' onChange={field.onChange}>
            <Radio.Item name={field.name} value='3M' checked={field.value === '3M'}>
              Within the last 3 months
            </Radio.Item>
            <Radio.Item name={field.name} value='3-6M' checked={field.value === '3-6M'}>
              3-6 months ago
            </Radio.Item>
            <Radio.Item name={field.name} value='6-9M' checked={field.value === '6-9M'}>
              6-9 months ago
            </Radio.Item>
            <Radio.Item name={field.name} value='>1Y' checked={field.value === '>1Y'}>
              Over a year ago
            </Radio.Item>
            <Radio.Item name={field.name} value='never' checked={field.value === 'never'}>
              never
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
