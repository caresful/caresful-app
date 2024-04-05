import { AnimationDirection } from '../../../../components/stepper'
import { StepKey } from '../../page'
import { FormSchema } from '../../validation'

export interface BaseStepComponentProps {
  navigateToStep: (key: StepKey) => void
  updateData: (data: Partial<FormSchema>) => void
  data: Partial<FormSchema>
  animationDirection: AnimationDirection
}
