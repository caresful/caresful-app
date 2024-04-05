import { Controller, ControllerRenderProps, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Checkbox } from '../../../../components/checkbox'
import { BaseStepComponentProps } from '../../shared/types'
import { Divider } from '../../../../components/divider'

interface DiagnosticsStepProps extends BaseStepComponentProps {}

export const diagnosticsSchema = z.object({
  diagnostics: z.array(z.string()).nonempty(),
})

type Diagnostics = z.infer<typeof diagnosticsSchema>

export function DiagnosticsStep({ navigateToStep, updateData, data, animationDirection }: DiagnosticsStepProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<Diagnostics>({
    resolver: zodResolver(diagnosticsSchema),
    defaultValues: {
      diagnostics: data?.diagnostics ?? [],
    },
  })
  const values = watch()

  function onDiagnosticsChange(value: string, field: ControllerRenderProps<Diagnostics, 'diagnostics'>) {
    let newVals = [...field.value]
    // If none value is selected => remove all other values
    // If one of the other values is selected => remove the none value
    newVals = value === 'none' ? newVals.filter((v) => v === 'none') : newVals.filter((v) => v !== 'none')

    return newVals.includes(value) ? field.onChange(newVals.filter((v) => v !== value)) : field.onChange([...newVals, value])
  }

  function onSubmit(data: Diagnostics) {
    updateData(data)
    navigateToStep('TreatmentReception')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>History</h5>
      <h3 className='text-2xl mt-3'>Have you ever been diagnosed with any of the following conditions?</h3>
      <p className='mt-[18px]'>Please select all that apply.</p>
      <Controller
        name='diagnostics'
        control={control}
        render={({ field }) => (
          <Checkbox className='mt-6' onChange={(e) => onDiagnosticsChange(e.target.value, field)}>
            <Checkbox.Item value='hepatitisB' checked={values.diagnostics.includes('hepatitisB')}>
              Hepatitis B
            </Checkbox.Item>
            <Checkbox.Item value='hepatitisC' checked={values.diagnostics.includes('hepatitisC')}>
              Hepatitis C
            </Checkbox.Item>
            <Checkbox.Item value='kidneyDisease' checked={values.diagnostics.includes('kidneyDisease')}>
              Kidney Disease
            </Checkbox.Item>
            <Checkbox.Item value='liverDisease' checked={values.diagnostics.includes('liverDisease')}>
              Liver Disease
            </Checkbox.Item>
            <Checkbox.Item value='uncontrolledDiabetes' checked={values.diagnostics.includes('uncontrolledDiabetes')}>
              Diabetes (uncontrolled)
            </Checkbox.Item>
            <Divider />
            <Checkbox.Item value='none' checked={values.diagnostics.includes('none')}>
              None of the above
            </Checkbox.Item>
          </Checkbox>
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
