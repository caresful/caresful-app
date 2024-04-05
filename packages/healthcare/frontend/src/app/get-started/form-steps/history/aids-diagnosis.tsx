import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Radio } from '../../../../components/radio'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BaseStepComponentProps } from '../../shared/types'

interface AidsDiagnosisStepProps extends BaseStepComponentProps {}

export const aidsDiagnosisSchema = z.object({
  aidsDiagnosis: z.enum(['yes', 'no']),
})

type AidsDiagnosis = z.infer<typeof aidsDiagnosisSchema>

export function AidsDiagnosisStep({ navigateToStep, updateData, data, animationDirection }: AidsDiagnosisStepProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<AidsDiagnosis>({
    resolver: zodResolver(aidsDiagnosisSchema),
    defaultValues: {
      aidsDiagnosis: data?.aidsDiagnosis,
    },
  })

  function onSubmit(data: AidsDiagnosis) {
    updateData(data)
    navigateToStep('LastTimeDoctorVisit')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>History</h5>
      <h3 className='text-2xl mt-4'>Have you ever been diagnosed with AIDS?</h3>
      <Controller
        name='aidsDiagnosis'
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
