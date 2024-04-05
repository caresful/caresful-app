import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Radio } from '../../../../components/radio'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BaseStepComponentProps } from '../../shared/types'

interface GenderStepProps extends BaseStepComponentProps {}

export const GenderStepSchema = z.object({
  gender: z.enum(['female', 'male', 'transgender', 'nonConforming', 'preferNotToSay']),
})

type Gender = z.infer<typeof GenderStepSchema>

export function GenderStep({ navigateToStep, updateData, data, animationDirection }: GenderStepProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<Gender>({
    resolver: zodResolver(GenderStepSchema),
    defaultValues: {
      gender: data?.gender,
    },
  })

  function onSubmit(data: Gender) {
    updateData(data)
    navigateToStep('PreferredPronouns')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>PROFILE</h5>
      <h3 className='text-2xl mt-4'>What is your gender?</h3>
      <Controller
        name='gender'
        control={control}
        render={({ field }) => (
          <Radio className='mt-7'>
            <Radio.Item name={field.name} checked={field.value === 'female'} value='female' onChange={field.onChange}>
              Female
            </Radio.Item>
            <Radio.Item name={field.name} checked={field.value === 'male'} value='male' onChange={field.onChange}>
              Male
            </Radio.Item>
            <Radio.Item name={field.name} checked={field.value === 'transgender'} value='transgender' onChange={field.onChange}>
              Transgender
            </Radio.Item>
            <Radio.Item name={field.name} checked={field.value === 'nonConforming'} value='nonConforming' onChange={field.onChange}>
              Nonconforming
            </Radio.Item>
            <Radio.Item name={field.name} checked={field.value === 'preferNotToSay'} value='preferNotToSay' onChange={field.onChange}>
              I prefer not to say
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
