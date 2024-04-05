import { Button } from '../../../../components/button'
import { Form } from '../../shared/form'
import { BaseStepComponentProps } from '../../shared/types'
import Image from 'next/image'
import { Card } from '../../../../components/card'
import { Pill } from '../../../../components/pill'
import { FormEvent } from 'react'

interface SummaryStepProps extends BaseStepComponentProps {}

export function SummaryStep({ navigateToStep, updateData, data, animationDirection }: SummaryStepProps) {
  function onSubmit(e: FormEvent) {
    e.preventDefault()
    navigateToStep('Confirm')
  }

  return (
    <Form onSubmit={onSubmit} animationDirection={animationDirection}>
      <h5 className='uppercase text-sm tracking-wider text-caresful-dark-gray font-semibold'>summary</h5>
      <h3 className='text-2xl mt-4'>
        You’re almost done, <span className='inline-block first-letter:uppercase'>{data.personalInformation?.firstName}</span>!
      </h3>
      <p className='mt-[18px]'>To complete your request, please review and confirm all the information listed below is correct.</p>
      <Card className='flex items-center pr-8 mt-8'>
        <Image src={require('../../../../assets/images/prep.png')} alt='' className='h-[70px] w-auto' />
        <div className='ml-5'>
          <h4 className='text-xl font-medium'>PrEP</h4>
          <span className='text-caresful-dark-gray'>Covered by Insurance</span>
        </div>
        <Pill className='bg-[#D6D3D1] text-[#545454] border-[#545454] w-[60px] text-center'>TBD</Pill>
      </Card>
      <Card className='mt-5'>
        <div className='flex items-center pr-4'>
          <Image src={require('../../../../assets/images/prep_initial_kit.png')} alt='' className='h-[70px] w-auto' />
          <div className='ml-5'>
            <h4 className='text-xl font-medium'>PrEP Initial Screening Kit</h4>
            <span className='text-caresful-dark-gray'>Covered by WellView Care</span>
          </div>
          <Pill className='w-[60px] text-center'>FREE</Pill>
        </div>

        <ul className='space-y-2 px-4 mt-6'>
          <li className='flex justify-between'>
            <span>Required labs + STI testing</span>
            <span>
              <span className='line-through'>$199</span>
              <span className='inline-block ml-3'>$0</span>
            </span>
          </li>
          <li className='flex justify-between'>
            <span>Provider evaluation</span>
            <span>
              <span className='line-through'>$179</span>
              <span className='inline-block ml-3'>$0</span>
            </span>
          </li>
          <li className='flex justify-between'>
            <span>Ongoing support</span>
            <span>Included</span>
          </li>
          <li className='flex justify-between'>
            <span>Expedited shipping</span>
            <span>Included</span>
          </li>
        </ul>
        <div className='flex justify-between mt-6 h-[55px] items-center bg-gradient-to-r from-caresful-gradient-1/10 to-caresful-gradient-2/10 rounded-[10px] px-5'>
          <p>Total due</p>
          <p>$0</p>
        </div>
      </Card>
      <div className='flex justify-between items-center px-4 lg:px-10 mt-8 mb-6'>
        <Image src={require('../../../../assets/images/wellview.png')} alt='' className='w-[150px] h-auto -mt-3' />
        <Image src={require('../../../../assets/images/x.png')} alt='' className='h-[25px] w-auto' />
        <Image src={require('../../../../assets/images/caresful.png')} alt='' className='h-[30px] w-auto' />
      </div>
      <p className='text-sm text-caresful-dark-gray mt-[30px] text-justify px-4'>
        I understand that by becoming a patient of WellView, the cost of my required labs, STI testing and any cost related to my medication not
        covered by insurance will be paid for by WELLVIEW in exchange for using one of WELLVIEW’s partner pharmacies.
      </p>
      <Button type='submit' variant='secondary' className='mt-6 w-full'>
        Confirm
      </Button>
    </Form>
  )
}
