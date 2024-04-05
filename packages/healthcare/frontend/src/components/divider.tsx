import { HTMLAttributes } from 'react'
import { cn } from '../utils/helpers/cn'

export function Divider({ className }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('w-10/12 h-px bg-[#F0EBE5] rounded-full mx-auto my-2', className)} />
}
