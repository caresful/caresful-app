import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Input } from '../../../../components/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BaseStepComponentProps } from '../../shared/types'

interface PersonalInfoStepProps extends BaseStepComponentProps {}

export const personalInfoStepSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
})

export type PersonalInfo = z.infer<typeof personalInfoStepSchema>

export function PersonalInfoStep({ navigateToStep, updateData, data, animationDirection }: PersonalInfoStepProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoStepSchema),
    defaultValues: {
      firstName: data.personalInformation?.firstName ?? '',
      lastName: data.personalInformation?.lastName ?? '',
      email: data.personalInformation?.email ?? '',
    },
  })

  function onSubmit(data: PersonalInfo) {
    updateData({
      personalInformation: data,
    })
    navigateToStep('PhoneNumber')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h3 className='text-2xl'>
        We’re good to go in <span className='capitalize'>{data?.state}!</span> Tell us a bit more about yourself.
      </h3>
      <p className='mt-[18px]'>Before we get started, let’s create an account for you to view your treatment options.</p>
      <Controller
        name='firstName'
        control={control}
        render={({ field }) => (
          <Input type='text' value={field.value} onChange={field.onChange} label='First name' className='mt-6' error={Boolean(errors.firstName)} />
        )}
      />
      <Controller
        name='lastName'
        control={control}
        render={({ field }) => (
          <Input type='text' value={field.value} onChange={field.onChange} label='Last name' className='mt-6' error={Boolean(errors.lastName)} />
        )}
      />
      <Controller
        name='email'
        control={control}
        render={({ field }) => (
          <Input type='email' value={field.value} onChange={field.onChange} label='Email' className='mt-6' error={Boolean(errors.email)} />
        )}
      />
      <Button type='submit' className='mt-6 w-full'>
        Continue
      </Button>
      <p className='text-sm text-caresful-dark-gray mt-[30px]'>
        By clicking ‘Continue’, you agree to the <span className='underline'>Terms & Conditions</span>,{' '}
        <span className='underline'>Privacy Policy</span>, and <span className='underline'>Telehealth Consent</span>.
      </p>
    </Form>
  )
}
