import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Radio } from '../../../../components/radio'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BaseStepComponentProps } from '../../shared/types'

interface CurrentRelationshipStepProps extends BaseStepComponentProps {}

export const CurrentRelationshipSchema = z.object({
  currentRelationShip: z.enum(['single', 'inRelationship', 'inOpenRelationship']),
})

type CurrentRelationship = z.infer<typeof CurrentRelationshipSchema>

export function CurrentRelationshipStep({ navigateToStep, updateData, data, animationDirection }: CurrentRelationshipStepProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<CurrentRelationship>({
    resolver: zodResolver(CurrentRelationshipSchema),
    defaultValues: {
      currentRelationShip: data?.currentRelationShip,
    },
  })

  function onSubmit(data: CurrentRelationship) {
    updateData(data)
    navigateToStep('Partners')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>lifestyle</h5>
      <h3 className='text-2xl mt-4'>What is your current relationship status?</h3>
      <Controller
        name='currentRelationShip'
        control={control}
        render={({ field }) => (
          <Radio className='mt-7'>
            <Radio.Item name={field.name} value='single' checked={field.value === 'single'} onChange={field.onChange}>
              Single
            </Radio.Item>
            <Radio.Item name={field.name} value='inRelationship' checked={field.value === 'inRelationship'} onChange={field.onChange}>
              In a committed relationship
            </Radio.Item>
            <Radio.Item name={field.name} value='inOpenRelationship' checked={field.value === 'inOpenRelationship'} onChange={field.onChange}>
              In an open relationship
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
