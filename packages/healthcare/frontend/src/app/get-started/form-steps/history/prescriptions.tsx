import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Radio } from '../../../../components/radio'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TextArea } from '../../../../components/textarea'
import { BaseStepComponentProps } from '../../shared/types'

interface PrescriptionsStepProps extends BaseStepComponentProps {}

export const prescriptionsSchema = z.object({
  prescriptions: z.union([
    z.object({
      doesUserTakeMedications: z.enum(['no']),
    }),
    z.object({
      doesUserTakeMedications: z.enum(['yes']),
      medicationsList: z.string().min(3),
    }),
  ]),
})

type Prescriptions = z.infer<typeof prescriptionsSchema>

export function PrescriptionsStep({ navigateToStep, updateData, data, animationDirection }: PrescriptionsStepProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm<Prescriptions>({
    resolver: zodResolver(prescriptionsSchema),
    defaultValues: {
      prescriptions: data?.prescriptions,
    },
  })

  const values = watch()

  function onSubmit(data: Prescriptions) {
    updateData(data)
    navigateToStep('Allergies')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>History</h5>
      <h3 className='text-2xl mt-4'>Do you take any prescription medications or supplements regularly?</h3>
      <Controller
        name='prescriptions.doesUserTakeMedications'
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

      {values?.prescriptions?.doesUserTakeMedications === 'yes' && (
        <div className='mt-14'>
          <h3 className='text-2xl'>Please list all the medications</h3>
          <Controller
            name='prescriptions.medicationsList'
            control={control}
            render={({ field }) => (
              <TextArea placeholder='ex. Viagra 5mg - daily for ED' className='mt-4' value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
      )}

      {isValid && (
        <Button type='submit' className='mt-6 w-full'>
          Continue
        </Button>
      )}
    </Form>
  )
}
