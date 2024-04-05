import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { Radio } from '../../../../components/radio'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TextArea } from '../../../../components/textarea'
import { BaseStepComponentProps } from '../../shared/types'

interface OtherQuestionsStepProps extends BaseStepComponentProps {}

export const otherQuestionsSchema = z.object({
  otherQuestions: z.union([
    z.object({
      doesUserHaveOtherQuestions: z.enum(['no']),
    }),
    z.object({
      doesUserHaveOtherQuestions: z.enum(['yes']),
      otherQuestionsList: z.string().min(3),
    }),
  ]),
})

type OtherQuestions = z.infer<typeof otherQuestionsSchema>

export function OtherQuestionsStep({ navigateToStep, updateData, data, animationDirection }: OtherQuestionsStepProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm<OtherQuestions>({
    resolver: zodResolver(otherQuestionsSchema),
    defaultValues: {
      otherQuestions: data.otherQuestions,
    },
  })
  const values = watch()

  function onSubmit(data: OtherQuestions) {
    updateData(data)
    navigateToStep('CardCredentials')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>History</h5>
      <h3 className='text-2xl mt-4'>Is there anything else your provider should know or any questions you want to ask?</h3>
      <Controller
        name='otherQuestions.doesUserHaveOtherQuestions'
        control={control}
        render={({ field }) => (
          <Radio className='mt-7' onChange={field.onChange}>
            <Radio.Item name={field.name} value='yes' checked={field.value === 'yes'}>
              Yes
            </Radio.Item>
            <Radio.Item name={field.name} value='no' checked={field.value === 'no'}>
              No, I’ve provided all relevant information and have no quesitons.
            </Radio.Item>
          </Radio>
        )}
      />

      {values?.otherQuestions?.doesUserHaveOtherQuestions === 'yes' && (
        <div className='mt-14'>
          <h3 className='text-2xl'>Please explain in detail any questions or concerns you may have</h3>
          <Controller
            name='otherQuestions.otherQuestionsList'
            control={control}
            render={({ field }) => (
              <TextArea
                placeholder='Please explain in detail any questions or concerns you may have.'
                className='mt-4'
                value={field.value}
                onChange={field.onChange}
              />
            )}
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
