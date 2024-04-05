import { renderHook } from '@testing-library/react'
import { AnimationDirection, useStepper } from './stepper'
import { useRouter } from 'next/navigation'
import { act } from 'react-dom/test-utils'

const mockBack = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))
;(useRouter as jest.Mock).mockImplementation(() => ({
  pathname: '/',
  back: mockBack,
}))

describe('stepper component tests', () => {
  it('should update useStrepper hook correctly', async () => {
    const { result } = renderHook(() => useStepper<string>('test'))

    await act(async () => {
      result.current.navigateTo('test2')
    })
    expect(result.current.currentStepKey).toEqual('test2')
    expect(result.current.animationDirection).toEqual(AnimationDirection.FORWARD)

    await act(async () => {
      result.current.navigateBack()
    })
    expect(result.current.currentStepKey).toEqual('test')
    expect(result.current.animationDirection).toEqual(AnimationDirection.BACKWARD)

    // If the current step is the first step and we call
    // the navigate back function then it should use the router back method
    await act(async () => {
      result.current.navigateBack()
    })
    expect(mockBack).toHaveBeenCalledTimes(1)
  })
})
