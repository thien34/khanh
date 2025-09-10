import { GenerateMetadata } from '@/components/client/meta/Metadata'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import { Bebas_Neue, Orbitron, Oswald, Montserrat_Alternates } from 'next/font/google'
import ogImage from '@public/images/og.png'
import { getBaseUrl } from '@/lib/url'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap'
})

const orbitron = Orbitron({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap'
})

const oswald = Oswald({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap'
})

const montserratAlternates = Montserrat_Alternates({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-montserrat-alternates',
  display: 'swap'
})

export const metadata: Metadata = GenerateMetadata({
  title: 'Clock Flip',
  description: 'Flip Clock, đồng hồ lật',
  ogImage: ogImage.src,
  currentUrl: `${getBaseUrl()}/clock`
})

export default function ClockLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={cn(
        'antialiased',
        bebasNeue.variable,
        orbitron.variable,
        oswald.variable,
        montserratAlternates.variable
      )}
    >
      {children}
    </div>
  )
}
