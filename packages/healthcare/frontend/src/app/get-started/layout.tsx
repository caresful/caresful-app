import { ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Caresful | Get started',
}

export default function RegistrationFormLayout({ children }: { children: ReactNode }) {
  return <section className='flex flex-col min-h-screen'>{children}</section>
}
