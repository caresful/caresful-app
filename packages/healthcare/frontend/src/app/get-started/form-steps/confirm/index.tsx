import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { FormSchema, formSchema } from '../../validation'
import { BaseStepComponentProps } from '../../shared/types'
import { FormEvent } from 'react'

interface ConfirmStepProps extends BaseStepComponentProps {}

export function ConfirmStep({ data, animationDirection }: ConfirmStepProps) {
  const {
    shippingAddress: { streetAddress, aptSuite, city, state, zipCode },
  } = data as FormSchema

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    console.log({ data })
    console.log({ parsedData: formSchema.safeParse(data) })
  }

  return (
    <Form onSubmit={onSubmit} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>Confirm</h5>
      <h3 className='text-2xl mt-4'>
        You’re almost done, <span className='capitalize'>{data.personalInformation?.firstName}</span>!
      </h3>
      <p className='mt-[18px]'>To complete your request, please review and confirm all the information listed below is correct.</p>

      <div className='mt-7 space-y-4'>
        <div className='bg-white rounded-[13px] border border-[#CBD5E1] space-y-3 py-6 px-7'>
          <h4 className='text-xl font-medium tracking-wide'>{`${data.personalInformation?.firstName} ${data.personalInformation?.lastName}`}</h4>
          <div>{data.phoneNumber}</div>
          <div>{data.personalInformation?.email}</div>
        </div>
        <div className='bg-white rounded-[13px] border border-[#CBD5E1] space-y-3 py-6 px-7'>
          <h4 className='text-xl font-medium tracking-wide'>Shipping address</h4>
          <div className='flex flex-col'>
            <span>{`${streetAddress} ${aptSuite}`}</span>
            <span>{`${city} ${state} ${zipCode}`}</span>
          </div>
        </div>
      </div>

      <Button type='submit' variant='secondary' className='mt-6 w-full'>
        Submit request
      </Button>
    </Form>
  )
}
