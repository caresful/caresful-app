import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Radio } from '../../../../components/radio'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BaseStepComponentProps } from '../../shared/types'

interface PartnersStepProps extends BaseStepComponentProps {}

export const partnersStepSchema = z.object({
  partners: z.enum(['none', '1', '2-10', '>10', 'notSure']),
})

type Partners = z.infer<typeof partnersStepSchema>

export function PartnersStep({ navigateToStep, updateData, data, animationDirection }: PartnersStepProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<Partners>({
    resolver: zodResolver(partnersStepSchema),
    defaultValues: {
      partners: data?.partners,
    },
  })

  function onSubmit(data: Partners) {
    updateData(data)
    navigateToStep('UnprotectedSex')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>risk factors</h5>
      <h3 className='text-2xl mt-4'>In the last 6 months, how many sexual partners have you had?</h3>
      <Controller
        name='partners'
        control={control}
        render={({ field }) => (
          <Radio className='mt-7'>
            <Radio.Item name={field.name} checked={field.value === 'none'} value='none' onChange={field.onChange}>
              None
            </Radio.Item>
            <Radio.Item name={field.name} checked={field.value === '1'} value='1' onChange={field.onChange}>
              Single partner
            </Radio.Item>
            <Radio.Item name={field.name} checked={field.value === '2-10'} value='2-10' onChange={field.onChange}>
              2-10 partners
            </Radio.Item>
            <Radio.Item name={field.name} checked={field.value === '>10'} value='>10' onChange={field.onChange}>
              More than 10 partners
            </Radio.Item>
            <Radio.Item name={field.name} checked={field.value === 'notSure'} value='notSure' onChange={field.onChange}>
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
