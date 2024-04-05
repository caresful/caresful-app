import { HTMLMotionProps, MotionConfig, motion } from 'framer-motion'
import { AnimationDirection } from '../../../components/stepper'

interface FormProps extends HTMLMotionProps<'form'> {
  animationDirection: AnimationDirection
}

export function Form({ animationDirection, children, ...rest }: FormProps) {
  return (
    <MotionConfig transition={{ duration: 0.1 }}>
      <motion.form
        initial={{ opacity: 0, x: animationDirection === AnimationDirection.FORWARD ? 100 : -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        className='max-w-[480px] mx-auto pb-10 px-4 md:px-0'
        {...rest}
      >
        {children}
      </motion.form>
    </MotionConfig>
  )
}
