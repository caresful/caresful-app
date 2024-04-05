import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Radio } from '../../../../components/radio'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BaseStepComponentProps } from '../../shared/types'

interface PreferredPronounsStepProps extends BaseStepComponentProps {}

export const PreferredPronounsSchema = z.object({
  preferredPronouns: z.enum(['she/her/hers', 'he/him/his', 'they/them/their', 'nonConforming', 'preferNotToSay']),
})

type PreferredPronouns = z.infer<typeof PreferredPronounsSchema>

export function PreferredPronounsStep({ navigateToStep, updateData, data, animationDirection }: PreferredPronounsStepProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<PreferredPronouns>({
    resolver: zodResolver(PreferredPronounsSchema),
    defaultValues: {
      preferredPronouns: data?.preferredPronouns,
    },
  })

  function onSubmit(data: PreferredPronouns) {
    updateData(data)
    navigateToStep('SexualOrientation')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>PROFILE</h5>
      <h3 className='text-2xl mt-4'>What are your preferred pronouns?</h3>
      <Controller
        name='preferredPronouns'
        control={control}
        render={({ field }) => (
          <Radio className='mt-7'>
            <Radio.Item name={field.name} checked={field.value === 'she/her/hers'} value='she/her/hers' onChange={field.onChange}>
              She / Her / Hers
            </Radio.Item>
            <Radio.Item name={field.name} checked={field.value === 'he/him/his'} value='he/him/his' onChange={field.onChange}>
              He / Him / His
            </Radio.Item>
            <Radio.Item name={field.name} checked={field.value === 'they/them/their'} value='they/them/their' onChange={field.onChange}>
              They / Them / Their
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
