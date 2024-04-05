import { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '../utils/helpers/cn'

interface SelectProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  children: ReactNode
  className?: string
}

export function Radio({ children, onChange, className }: SelectProps) {
  return (
    <div className={cn('flex flex-col gap-y-4', className)} onChange={onChange}>
      {children}
    </div>
  )
}

interface OptionProps extends InputHTMLAttributes<HTMLInputElement> {}

function Item({ id, children, name, value, ...rest }: OptionProps) {
  return (
    <label htmlFor={id} className='group relative bg-white border border-gray rounded-[10px] flex justify-center items-center cursor-pointer'>
      <input type='radio' id={id} name={name} className='peer hidden' value={value} {...rest} />
      <span className='opacity absolute bg-[#D9D9D9] h-[calc(100%_+_2px)] w-[calc(100%_+_2px)] rounded-[10px] transition-all bg-gradient-to-r' />
      <span className='opacity-0 absolute h-[calc(100%_+_2px)] w-[calc(100%_+_2px)] rounded-[10px] transition-all bg-gradient-to-r from-caresful-gradient-1 to-caresful-gradient-2 group-hover:opacity-100' />
      <span className='opacity-0 absolute h-[calc(100%_+_4px)] w-[calc(100%_+_4px)] rounded-[10px] transition-all bg-gradient-to-r from-caresful-gradient-1 to-caresful-gradient-2 peer-checked:opacity-100' />
      <span className='relative py-5 flex w-full px-[26px] items-center bg-white z-10 pointer-events-none rounded-[8px] group-hover:rounded-[9px] peer-checked:rounded-[9px]'>
        {children}
      </span>
    </label>
  )
}

Radio.Item = Item
