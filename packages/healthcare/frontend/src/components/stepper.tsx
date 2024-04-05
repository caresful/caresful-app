import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ReactElement, ReactNode, useRef, useState } from 'react'

interface StepperProps<T> {
  currentStepKey: T
  children: ReactElement<StepProps<T>> | ReactElement<StepProps<T>>[]
}

export const AnimationDirection = {
  FORWARD: 'FORWARD',
  BACKWARD: 'BACKWARD',
} as const

export type AnimationDirection = keyof typeof AnimationDirection

export function useStepper<T extends string>(initialStep: T) {
  const router = useRouter()
  const [currentStepKey, setCurrentStepKey] = useState(initialStep)
  const [direction, setDirection] = useState<AnimationDirection>(AnimationDirection.FORWARD)
  const stepsListRef = useRef<T[]>([initialStep])

  function navigateTo(step: T) {
    if (direction === AnimationDirection.BACKWARD) {
      setDirection(AnimationDirection.FORWARD)
    }
    stepsListRef.current.push(step)
    setCurrentStepKey(step)
  }

  function navigateBack() {
    if (direction === AnimationDirection.FORWARD) {
      setDirection(AnimationDirection.BACKWARD)
    }
    if (stepsListRef.current.length === 1) {
      router.back()
    }

    stepsListRef.current.pop()
    setCurrentStepKey(stepsListRef.current[stepsListRef.current.length - 1])
  }

  return { currentStepKey, navigateTo, navigateBack, animationDirection: direction }
}

export function Stepper<T>({ children, currentStepKey }: StepperProps<T>) {
  function renderCurrentStep() {
    if (Array.isArray(children)) {
      return children.find((child) => child.key === currentStepKey)
    }

    return children
  }

  return (
    <AnimatePresence mode='wait' initial={false}>
      {renderCurrentStep()}
    </AnimatePresence>
  )
}

interface StepProps<T> {
  key: T
  children: ReactNode
}

function Step<T>({ children }: StepProps<T>) {
  return children
}

Stepper.Step = Step
