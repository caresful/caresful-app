import '@testing-library/jest-dom'
import { RenderResult, fireEvent, render, screen } from '@testing-library/react'
import { AnimationDirection } from '../../../../../components/stepper'
import { act } from 'react-dom/test-utils'
import { RecentHIVExpositionStep } from '../recent-hiv-exposition'

const updateDataMockFn = jest.fn()
const navigateToStepMockFn = jest.fn()

describe('recent hiv exposition tests', () => {
  let Component: RenderResult

  beforeEach(() => {
    Component = render(
      <RecentHIVExpositionStep
        navigateToStep={navigateToStepMockFn}
        updateData={updateDataMockFn}
        data={{}}
        animationDirection={AnimationDirection.FORWARD}
      />
    )
  })

  it('should not display continue button when no value is selected', () => {
    const { queryByText } = Component

    expect(queryByText('Continue')).not.toBeInTheDocument()
  })

  it('should display the next button when a value is selected', async () => {
    await act(async () => {
      fireEvent.click(Component.getByLabelText('Yes'))
    })

    const ContinueButton = screen.getByText('Continue')
    expect(ContinueButton).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(ContinueButton)
    })

    expect(updateDataMockFn).toHaveBeenCalledTimes(1)
    expect(updateDataMockFn).toHaveBeenCalledWith({
      recentHIVexposition: 'yes',
    })

    expect(navigateToStepMockFn).toHaveBeenCalledTimes(1)
    expect(navigateToStepMockFn).toHaveBeenCalledWith('LastMonthHIVExposition')
  })
})
