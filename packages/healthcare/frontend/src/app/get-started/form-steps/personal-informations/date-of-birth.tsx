import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Input } from '../../../../components/input'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BaseStepComponentProps } from '../../shared/types'

interface DateOfBirthStepProps extends BaseStepComponentProps {}

export const dateOfBirthSchema = z.object({
  // TODO Find a solution for this hack to validate the actual date
  dateOfBirth: z.string().min(1),
})

export type DateOfBirth = z.infer<typeof dateOfBirthSchema>

export function DateOfBirthStep({ navigateToStep, updateData, data, animationDirection }: DateOfBirthStepProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<DateOfBirth>({
    resolver: zodResolver(dateOfBirthSchema),
    defaultValues: {
      dateOfBirth: data?.dateOfBirth,
    },
  })

  function onSubmit(data: DateOfBirth) {
    updateData(data)
    navigateToStep('PersonalInfo')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h3 className='text-2xl'>Confirm your date of birth</h3>
      <p className='mt-[18px]'>This helps us connect you to licensed providers in your state.</p>
      <Controller
        name='dateOfBirth'
        control={control}
        render={({ field }) => <Input value={field.value} onChange={field.onChange} type='date' label='MM/DD/YYYY' className='mt-6' />}
      />

      {isValid && (
        <Button type='submit' className='mt-6 w-full'>
          Continue
        </Button>
      )}
    </Form>
  )
}
