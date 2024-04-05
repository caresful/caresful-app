import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Input } from '../../../../components/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { BaseStepComponentProps } from '../../shared/types'

interface PhoneNumberStepProps extends BaseStepComponentProps {}

export const phoneNumberSchema = z.object({
  phoneNumber: z.string().regex(/\(\d{3}\) \d{3}-\d{4}/g),
})

type PhoneNumber = z.infer<typeof phoneNumberSchema>

export function PhoneNumberStep({ navigateToStep, updateData, data, animationDirection }: PhoneNumberStepProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneNumber>({
    resolver: zodResolver(phoneNumberSchema),
    defaultValues: {
      phoneNumber: data?.phoneNumber ?? '',
    },
  })

  function onSubmit(data: PhoneNumber) {
    updateData(data)
    navigateToStep('BirthSex')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h3 className='text-2xl'>What’s your phone number?</h3>
      <p className='mt-[18px]'>To ensure patient safety, we need to verify your phone number.</p>
      <Controller
        name='phoneNumber'
        control={control}
        render={({ field }) => (
          <Input
            type='text'
            value={field.value}
            onChange={field.onChange}
            mask='(999) 999-9999'
            label='Phone number'
            className='mt-6'
            error={Boolean(errors.phoneNumber)}
          />
        )}
      />
      <Button type='submit' className='mt-6 w-full'>
        Continue
      </Button>
      <p className='text-sm text-caresful-dark-gray mt-[30px]'>
        By clicking ‘Continue’, you agree to receive marketing text messages from Caresful at the number provided above. Messages may be sent using an
        automated telephone dialing system. Consent is not required as a condition of purchase. Message and data rates may apply. Send HELP for
        support or STOP to cancel. Messages may include shopping cart reminders.{' '}
      </p>
    </Form>
  )
}
