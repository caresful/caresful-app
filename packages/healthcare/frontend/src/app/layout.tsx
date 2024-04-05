import localFont from 'next/font/local'
import '../styles/globals.css'
import { Metadata } from 'next'

const SofiaProFont = localFont({
  variable: '--sofia-pro',
  src: [
    {
      path: '../assets/fonts/Sofia_Pro_Light_Az.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Sofia_Pro_Regular_Az.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Sofia_Pro_Medium_Az.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Sofia_Pro_Semi_Bold_Az.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Sofia_Pro_Bold_Az.woff',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Sofia_Pro_Black_Az.woff',
      weight: '900',
      style: 'normal',
    },
  ],
})

export const metadata: Metadata = {
  title: 'Caresful',
}

export default function RootLayout(props: { children: React.ReactNode }): JSX.Element {
  const { children } = props;

  return (
    <html lang="en" className={`${SofiaProFont.className} ${SofiaProFont.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
