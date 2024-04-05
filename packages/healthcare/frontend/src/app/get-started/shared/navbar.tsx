import Link from 'next/link'
import { Button } from '../../../components/button'
import { FaArrowLeftLong } from 'react-icons/fa6'

interface NavbarProps {
  navigateBack: () => void
}

export function Navbar({ navigateBack }: NavbarProps) {
  return (
    <section
      className='text-white py-6 sticky top-0'
      style={{
        background: 'radial-gradient(circle at 0% 0%, #050a30, #795176, #4a2057, #783f37)',
      }}
    >
      <nav className='container relative mx-auto flex justify-between px-4'>
        <button onClick={() => navigateBack()}>
          <FaArrowLeftLong color='white' size='17px' />
        </button>
        <Link href='/' className='text-[27px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          caresful
        </Link>
        <Button
          variant='tertiary'
          className='h-[38px] text-sm font-medium tracking-wide after:bg-[#693442] before:from-[#fff7ad] before:to-[#ffa9f9] after:w-[calc(100%_-_4px)] after:h-[calc(100%_-_4px)]'
        >
          HELP
        </Button>
      </nav>
    </section>
  )
}
