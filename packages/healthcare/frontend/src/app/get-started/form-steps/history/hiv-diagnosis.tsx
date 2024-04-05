import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Radio } from '../../../../components/radio'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BaseStepComponentProps } from '../../shared/types'

interface HIVDiagnosisStepProps extends BaseStepComponentProps {}

export const hivDiagnosisSchema = z.object({
  hivDiagnosis: z.enum(['yes', 'no']),
})

type HIVDiagnosis = z.infer<typeof hivDiagnosisSchema>

export function HIVDiagnosisStep({ navigateToStep, updateData, data, animationDirection }: HIVDiagnosisStepProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<HIVDiagnosis>({
    resolver: zodResolver(hivDiagnosisSchema),
    defaultValues: {
      hivDiagnosis: data?.hivDiagnosis,
    },
  })

  function onSubmit(d: HIVDiagnosis) {
    if (d.hivDiagnosis === 'no') {
      const newData = { ...data }

      // We Delete those props here in order to validate later against form schema
      newData.lastTimeDoctorVisit = undefined
      newData.aidsDiagnosis = undefined

      newData.hivDiagnosis = d.hivDiagnosis

      updateData(newData)
      navigateToStep('SyphilisDiagnosis')
    } else {
      updateData(d)
      navigateToStep('AidsDiagnosis')
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>History</h5>
      <h3 className='text-2xl mt-4'>Have you ever been diagnosed with HIV?</h3>
      <Controller
        name='hivDiagnosis'
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
