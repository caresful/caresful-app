import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '../../../../components/input'
import { BaseStepComponentProps } from '../../shared/types'

interface CardCredentialsStepProps extends BaseStepComponentProps {}

export const cardCredentialsSchema = z.object({
  paymentCardCredentials: z.object({
    cardNumber: z.string().regex(/\d{4}\s\d{4}\s\d{4}\s\d{4}/g),
    cardExpirationDate: z.string().regex(/\d{2}\/\d{2}/g),
    cardCVC: z.string().regex(/\d{3}/g),
  }),
})

type CardCredentials = z.infer<typeof cardCredentialsSchema>

export function CardCredentialsStep({ navigateToStep, updateData, data, animationDirection }: CardCredentialsStepProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CardCredentials>({
    resolver: zodResolver(cardCredentialsSchema),
    defaultValues: {
      paymentCardCredentials: data?.paymentCardCredentials,
    },
  })

  function onSubmit(data: CardCredentials) {
    updateData(data)
    navigateToStep('HealthInsurance')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>checkout</h5>
      <h3 className='text-2xl mt-4'>Credit Card</h3>
      <p className='mt-[18px]'>Your card will not be charged until you review and submit your request.</p>
      <Controller
        name='paymentCardCredentials.cardNumber'
        control={control}
        render={({ field }) => (
          <Input
            type='text'
            label='Card Number'
            value={field.value}
            onChange={field.onChange}
            mask='9999 9999 9999 9999'
            className='mt-7'
            error={Boolean(errors.paymentCardCredentials?.cardNumber)}
          />
        )}
      />
      <div className='flex gap-x-4 mt-4'>
        <Controller
          name='paymentCardCredentials.cardExpirationDate'
          control={control}
          render={({ field }) => (
            <Input
              type='text'
              label='MM / YY'
              value={field.value}
              onChange={field.onChange}
              mask='99/99'
              className='w-full'
              error={Boolean(errors.paymentCardCredentials?.cardExpirationDate)}
            />
          )}
        />
        <Controller
          name='paymentCardCredentials.cardCVC'
          control={control}
          render={({ field }) => (
            <Input
              type='text'
              label='CVC'
              value={field.value}
              onChange={field.onChange}
              mask='999'
              className='w-full'
              error={Boolean(errors.paymentCardCredentials?.cardCVC)}
            />
          )}
        />
      </div>

      <Button type='submit' variant='tertiary' className='mt-6 w-full'>
        Use this card
      </Button>
    </Form>
  )
}
