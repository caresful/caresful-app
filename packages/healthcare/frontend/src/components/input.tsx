import { InputHTMLAttributes } from 'react'
import InputMask from 'react-input-mask'
import { cn } from '../utils/helpers/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  mask?: string
  error?: boolean
  className?: string
}

export function Input({ mask = '', error = false, label, className, ...rest }: InputProps) {
  return (
    <div
      className={cn(
        'relative border border-[#D6D3D1] h-[60px] px-6 rounded-[10px] overflow-hidden flex items-center bg-white transition-all',
        {
          'border-[#FF3131]': error,
        },
        className
      )}
    >
      <label className=''>
        <InputMask
          mask={mask}
          maskChar={null}
          placeholder=''
          className='peer absolute h-full w-full left-0 bottom-0 px-6 pt-5 outline-none bg-inherit'
          {...rest}
        />
        <span className='block relative text-[#A6A6A6] transform transition-all translate-y-0 peer-focus:-translate-y-3 peer-focus:text-sm peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-sm pointer-events-none'>
          {label}
        </span>
      </label>
    </div>
  )
}
