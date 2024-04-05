import '@testing-library/jest-dom'
import { RenderResult, fireEvent, render, screen } from '@testing-library/react'
import { AnimationDirection } from '../../../../../components/stepper'
import { act } from 'react-dom/test-utils'
import { UnprotectedSexStep } from '../unprotected-sex'

const updateDataMockFn = jest.fn()
const navigateToStepMockFn = jest.fn()

describe('unprotected sex in the last 6 months tests', () => {
  let Component: RenderResult

  beforeEach(() => {
    Component = render(
      <UnprotectedSexStep
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
      unprotectedSex: 'yes',
    })

    expect(navigateToStepMockFn).toHaveBeenCalledTimes(1)
    expect(navigateToStepMockFn).toHaveBeenCalledWith('RecentHIVExposition')
  })
})
