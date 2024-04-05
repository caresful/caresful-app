import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Radio } from '../../../../components/radio'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BaseStepComponentProps } from '../../shared/types'

interface ChlamydiaDiagnosisStepProps extends BaseStepComponentProps {}

export const chlamydiaDiagnosisSchema = z.object({
  chlamydiaDiagnosis: z.enum(['yes', 'no']),
})

type ChlamydiaDiagnosis = z.infer<typeof chlamydiaDiagnosisSchema>

export function ChlamydiaDiagnosisStep({ navigateToStep, updateData, data, animationDirection }: ChlamydiaDiagnosisStepProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ChlamydiaDiagnosis>({
    resolver: zodResolver(chlamydiaDiagnosisSchema),
    defaultValues: {
      chlamydiaDiagnosis: data?.chlamydiaDiagnosis,
    },
  })

  function onSubmit(data: ChlamydiaDiagnosis) {
    updateData(data)
    navigateToStep('Diagnostics')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>History</h5>
      <h3 className='text-2xl mt-4'>In the last year, have you been diagnosed with chlamydia?</h3>
      <Controller
        name='chlamydiaDiagnosis'
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
