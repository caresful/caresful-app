import { FiUpload } from 'react-icons/fi'
import { cn } from '../utils/helpers/cn'
import { InputHTMLAttributes } from 'react'
import { TbPictureInPicture } from 'react-icons/tb'

interface InputFileProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  uploadedFileName?: string
  error?: boolean
  success?: boolean
}

export function InputFile({ label, uploadedFileName, error, success, ...rest }: InputFileProps) {
  const fileExtension = uploadedFileName?.split('.').pop()

  return (
    <label
      className={cn(
        'bg-white py-5 border border-dashed border-[#CBD5E1] rounded-[10px] cursor-pointer hover:bg-zinc-50 transition-all flex items-center justify-center flex-col',
        {
          'border-green-500': success,
          'border-red-500': error,
        }
      )}
    >
      <input type='file' className='hidden' {...rest} />
      <FiUpload size='20px' color='#737373' />
      <p className='first-letter:uppercase text-caresful-dark-gray mt-2'>{label}</p>
      {success && uploadedFileName && (
        <div className='flex items-center gap-x-1 text-gray-600'>
          <TbPictureInPicture className='-mb-[9px]' />
          <span className='text-sm font-medium mt-3'>{uploadedFileName.slice(0, 10) + '...' + fileExtension}</span>
        </div>
      )}
    </label>
  )
}
