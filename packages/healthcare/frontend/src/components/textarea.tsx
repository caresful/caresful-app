import { TextareaHTMLAttributes } from 'react'
import { cn } from '../utils/helpers/cn'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number
}

const DEFAULT_ROWS = 9

export function TextArea({ rows = DEFAULT_ROWS, className, ...rest }: TextAreaProps) {
  return (
    <textarea
      className={cn('w-full border border-[#D6D3D1] rounded-[10px] py-6 px-6 placeholder:font-thin text-[17px] tracking-wide', className)}
      rows={rows}
      {...rest}
    ></textarea>
  )
}
