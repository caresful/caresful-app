import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Radio } from '../../../../components/radio'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BaseStepComponentProps } from '../../shared/types'

interface PrepPrescriptionStepProps extends BaseStepComponentProps {}

export const prepPrescriptionSchema = z.object({
  prepPrescription: z.enum(['yes', 'no']),
})

type PrepPrescription = z.infer<typeof prepPrescriptionSchema>

export function PrepPrescriptionStep({ navigateToStep, updateData, data, animationDirection }: PrepPrescriptionStepProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<PrepPrescription>({
    resolver: zodResolver(prepPrescriptionSchema),
    defaultValues: {
      prepPrescription: data?.prepPrescription,
    },
  })

  function onSubmit(d: PrepPrescription) {
    if (d.prepPrescription === 'no') {
      const newData = { ...data }

      newData.prepPrescription = d.prepPrescription
      newData.lastTimePrepMedication = undefined

      updateData(newData)
      navigateToStep('HIVDiagnosis')
    } else {
      updateData(d)
      navigateToStep('LastTimePrepMedication')
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>History</h5>
      <h3 className='text-2xl mt-4'>Have you ever been prescribed PrEP?</h3>
      <Controller
        name='prepPrescription'
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
