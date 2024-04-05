import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '../../../../components/input'
import { BaseStepComponentProps } from '../../shared/types'
import { type State, states } from '../../../../utils/constants'
import { ComboboxInput } from '../../../../components/combobox'

interface ShippingInfoStepProps extends BaseStepComponentProps {}

export const shippingInfoSchema = z.object({
  shippingAddress: z.object({
    streetAddress: z.string().min(3),
    aptSuite: z.string().min(1),
    city: z.string().min(3),
    state: z.string().refine((v) => states.flatMap((s) => [s.name]).includes(v as State['name'])),
    zipCode: z
      .string()
      .length(5)
      .regex(/^\d{5}$/g),
  }),
})

type ShippingInfo = z.infer<typeof shippingInfoSchema>

export function ShippingInfoStep({ navigateToStep, updateData, data, animationDirection }: ShippingInfoStepProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingInfo>({
    resolver: zodResolver(shippingInfoSchema),
    defaultValues: {
      shippingAddress: data?.shippingAddress,
    },
  })

  function onSubmit(data: ShippingInfo) {
    updateData(data)
    navigateToStep('Summary')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>checkout</h5>
      <h3 className='text-2xl mt-4'>Shipping info.</h3>
      <p className='mt-[18px]'>Please enter the address you would like to receive your test kits and medication.</p>
      <Controller
        name='shippingAddress.streetAddress'
        control={control}
        render={({ field }) => (
          <Input
            type='text'
            label='Street address'
            value={field.value}
            onChange={field.onChange}
            className='mt-5'
            error={Boolean(errors.shippingAddress?.streetAddress)}
          />
        )}
      />
      <Controller
        name='shippingAddress.aptSuite'
        control={control}
        render={({ field }) => (
          <Input
            type='text'
            label='Apt / Suite'
            value={field.value}
            onChange={field.onChange}
            className='mt-5'
            error={Boolean(errors?.shippingAddress?.aptSuite)}
          />
        )}
      />
      <Controller
        name='shippingAddress.city'
        control={control}
        render={({ field }) => (
          <Input
            type='text'
            label='City'
            value={field.value}
            onChange={field.onChange}
            className='mt-5'
            error={Boolean(errors?.shippingAddress?.city)}
          />
        )}
      />
      <Controller
        name='shippingAddress.state'
        control={control}
        render={({ field }) => (
          <ComboboxInput
            options={states.map((s) => ({ key: s.abbreviation, value: s.name }))}
            onChange={field.onChange}
            defaultValue={data.shippingAddress?.state}
            className='mt-5'
            error={Boolean(errors.shippingAddress?.state)}
          />
        )}
      />
      <Controller
        name='shippingAddress.zipCode'
        control={control}
        render={({ field }) => (
          <Input
            type='text'
            label='Zip code'
            value={field.value}
            onChange={field.onChange}
            className='mt-5'
            mask='99999'
            error={Boolean(errors?.shippingAddress?.zipCode)}
          />
        )}
      />
      <Button type='submit' className='mt-6 w-full'>
        Continue
      </Button>
    </Form>
  )
}
