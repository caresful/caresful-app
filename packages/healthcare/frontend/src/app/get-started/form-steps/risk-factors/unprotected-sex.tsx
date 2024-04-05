import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Radio } from '../../../../components/radio'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BaseStepComponentProps } from '../../shared/types'

interface UnprotectedSexStepProps extends BaseStepComponentProps {}

export const unprotectedSexSchema = z.object({
  unprotectedSex: z.enum(['yes', 'no', 'notSure']),
})

type UnprotectedSex = z.infer<typeof unprotectedSexSchema>

export function UnprotectedSexStep({ navigateToStep, updateData, data, animationDirection }: UnprotectedSexStepProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<UnprotectedSex>({
    resolver: zodResolver(unprotectedSexSchema),
    defaultValues: {
      unprotectedSex: data?.unprotectedSex,
    },
  })

  function onSubmit(data: UnprotectedSex) {
    updateData(data)
    navigateToStep('RecentHIVExposition')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>risk factors</h5>
      <h3 className='text-2xl mt-4'>In the last 6 months, have you had unprotected sex?</h3>
      <Controller
        name='unprotectedSex'
        control={control}
        render={({ field }) => (
          <Radio className='mt-7'>
            <Radio.Item name={field.name} value='yes' checked={field.value === 'yes'} onChange={field.onChange}>
              Yes
            </Radio.Item>
            <Radio.Item name={field.name} value='no' checked={field.value === 'no'} onChange={field.onChange}>
              No
            </Radio.Item>
            <Radio.Item name={field.name} value='notSure' checked={field.value === 'notSure'} onChange={field.onChange}>
              I’m not sure
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
