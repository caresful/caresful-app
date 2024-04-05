import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Radio } from '../../../../components/radio'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BaseStepComponentProps } from '../../shared/types'

interface SyphilisDiagnosisStepProps extends BaseStepComponentProps {}

export const syphilisDiagnosisSchema = z.object({
  syphilisDiagnosis: z.enum(['yes', 'no']),
})

type SyphilisDiagnosis = z.infer<typeof syphilisDiagnosisSchema>

export function SyphilisDiagnosisStep({ navigateToStep, updateData, data, animationDirection }: SyphilisDiagnosisStepProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SyphilisDiagnosis>({
    resolver: zodResolver(syphilisDiagnosisSchema),
    defaultValues: {
      syphilisDiagnosis: data?.syphilisDiagnosis,
    },
  })

  function onSubmit(data: SyphilisDiagnosis) {
    updateData(data)
    navigateToStep('GonorrheaDiagnosis')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>History</h5>
      <h3 className='text-2xl mt-4'>Have you ever been diagnosed with syphilis in your lifetime?</h3>
      <Controller
        name='syphilisDiagnosis'
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
