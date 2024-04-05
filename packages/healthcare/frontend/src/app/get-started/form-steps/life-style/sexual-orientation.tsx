import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Radio } from '../../../../components/radio'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BaseStepComponentProps } from '../../shared/types'

interface SexualOrientationStepProps extends BaseStepComponentProps {}

export const SexualOrientationSchema = z.object({
  sexualOrientation: z.enum(['straight', 'bisexual', 'gay', 'preferNotToSay']),
})

type SexualOrientation = z.infer<typeof SexualOrientationSchema>

export function SexualOrientationStep({ navigateToStep, updateData, data, animationDirection }: SexualOrientationStepProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SexualOrientation>({
    resolver: zodResolver(SexualOrientationSchema),
    defaultValues: {
      sexualOrientation: data?.sexualOrientation,
    },
  })

  function onSubmit(data: SexualOrientation) {
    updateData(data)
    navigateToStep('CurrentRelationship')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>lifestyle</h5>
      <h3 className='text-2xl mt-4'>What is your sexual orientation? </h3>
      <Controller
        name='sexualOrientation'
        control={control}
        render={({ field }) => (
          <Radio className='mt-7'>
            <Radio.Item name={field.name} value='straight' checked={field.value === 'straight'} onChange={field.onChange}>
              Straight
            </Radio.Item>
            <Radio.Item name={field.name} value='bisexual' checked={field.value === 'bisexual'} onChange={field.onChange}>
              Bisexual
            </Radio.Item>
            <Radio.Item name={field.name} value='gay' checked={field.value === 'gay'} onChange={field.onChange}>
              Gay
            </Radio.Item>
            <Radio.Item name={field.name} value='preferNotToSay' checked={field.value === 'preferNotToSay'} onChange={field.onChange}>
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
