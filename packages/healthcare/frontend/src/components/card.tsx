import { HTMLAttributes } from 'react'
import { cn } from '../utils/helpers/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ children, className, ...rest }: CardProps) {
  return (
    <div className={cn('bg-white rounded-[13px] border border-[#CBD5E1] px-5 py-4', className)} {...rest}>
      {children}
    </div>
  )
}
