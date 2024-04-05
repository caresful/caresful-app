import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Radio } from '../../../../components/radio'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TextArea } from '../../../../components/textarea'
import { BaseStepComponentProps } from '../../shared/types'

interface AllergiesStepProps extends BaseStepComponentProps {}

export const allergiesSchema = z.object({
  allergies: z.union([
    z.object({
      doesUserHaveAllergies: z.enum(['no']),
    }),
    z.object({
      doesUserHaveAllergies: z.enum(['yes']),
      allergiesList: z.string().min(3),
    }),
  ]),
})

type Allergies = z.infer<typeof allergiesSchema>

export function AllergiesStep({ navigateToStep, updateData, data, animationDirection }: AllergiesStepProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm<Allergies>({
    resolver: zodResolver(allergiesSchema),
    defaultValues: {
      allergies: data?.allergies,
    },
  })
  const values = watch()

  function onSubmit(data: Allergies) {
    updateData(data)
    navigateToStep('OtherQuestions')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>History</h5>
      <h3 className='text-2xl mt-4'>Do you have any allergies?</h3>
      <Controller
        name='allergies.doesUserHaveAllergies'
        control={control}
        render={({ field }) => (
          <Radio className='mt-7' onChange={field.onChange}>
            <Radio.Item name={field.name} value='yes' checked={field.value === 'yes'}>
              Yes
            </Radio.Item>
            <Radio.Item name={field.name} value='no' checked={field.value === 'no'}>
              No
            </Radio.Item>
          </Radio>
        )}
      />

      {values?.allergies?.doesUserHaveAllergies === 'yes' && (
        <div className='mt-14'>
          <h3 className='text-2xl'>Please list allergens</h3>
          <p className='mt-[18px]'>Include any allergies to food, dyes, medications, and over-the-counter medicines.</p>
          <Controller
            name='allergies.allergiesList'
            control={control}
            render={({ field }) => <TextArea placeholder='ex. Penicillin' className='mt-4' value={field.value} onChange={field.onChange} />}
          />
        </div>
      )}

      {isValid && (
        <Button type='submit' className='mt-6 w-full'>
          Continue
        </Button>
      )}
    </Form>
  )
}
