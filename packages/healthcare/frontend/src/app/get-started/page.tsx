'use client'

import { useState } from 'react'
import { Stepper, useStepper } from '../../components/stepper'
import { steps } from '../../utils/constants'
import { Navbar } from './shared/navbar'
import { FormSchema } from './validation'

export type Step = (typeof steps)[number]
export type StepKey = (typeof steps)[number]['key']

export default function GetStartedPage() {
  // TODO use a reducer if the form gets too complex
  const [userGatheredData, setUserGatheredData] = useState<Partial<FormSchema>>({})
  const { currentStepKey, navigateTo, navigateBack, animationDirection } = useStepper<StepKey>('Location')

  function updateUserData(data: Partial<FormSchema>) {
    setUserGatheredData((prevData) => ({
      ...prevData,
      ...data,
    }))
  }

  return (
    <>
      <Navbar navigateBack={navigateBack} />
      <section className='bg-caresful-beige flex-grow pt-28'>
        <Stepper<StepKey> currentStepKey={currentStepKey}>
          {steps.map(({ key, Component }) => (
            <Stepper.Step<StepKey> key={key}>
              <Component navigateToStep={navigateTo} updateData={updateUserData} data={userGatheredData} animationDirection={animationDirection} />
            </Stepper.Step>
          ))}
        </Stepper>
      </section>
    </>
  )
}
