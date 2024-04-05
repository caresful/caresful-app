import { ReactNode } from 'react'
import { cn } from '../utils/helpers/cn'
import { HTMLMotionProps, motion } from 'framer-motion'

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'tertiary'
  className?: string
  children: ReactNode
}

export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  const variantClasses: Record<typeof variant, string> = {
    primary: 'text-white bg-gradient-to-r from-caresful-gradient-1 to-caresful-gradient-2 border border-black',
    secondary: 'text-white bg-caresful-secondary border border-black',
    tertiary:
      'relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black before:rounded-full before:bg-gradient-to-r before:from-caresful-gradient-1 before:to-caresful-gradient-2 after:absolute after:top-1/2 after:left-1/2 after:w-[calc(100%_-_2px)] after:h-[calc(100%_-_2px)] after:rounded-full after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:bg-caresful-beige after:z-0',
  }

  return (
    <motion.button
      className={cn('group relative rounded-full h-[50px] px-8 overflow-hidden', variantClasses[variant], className)}
      whileTap={{ scale: 0.95 }}
      {...rest}
    >
      <span className='relative z-10'>{children}</span>
      {variant === 'primary' && (
        <div className='absolute opacity-0 group-hover:opacity-100 inset-0 h-full w-full bg-red-200 bg-gradient-to-r from-caresful-gradient-2 to-caresful-gradient-1 transition-all duration-300 ease-in' />
      )}
    </motion.button>
  )
}
