import { HTMLAttributes } from 'react'
import { cn } from '../utils/helpers/cn'

export function Pill({ children, className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('inline-block bg-[#B5E4C9] py-0.5 rounded-full text-xs font-medium border border-black tracking-wider ml-auto', className)}
      {...rest}
    >
      {children}
    </span>
  )
}
