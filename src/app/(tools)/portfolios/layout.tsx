import { GenerateMetadata } from '@/components/client/meta/Metadata'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import { Nunito, Sedgwick_Ave } from 'next/font/google'
import ogImage from '@public/images/og.png'
import { getBaseUrl } from '@/lib/url'

const nunito = Nunito({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap'
})

const sedgwickAve = Sedgwick_Ave({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sedgwick-ave',
  display: 'swap'
})

export const metadata: Metadata = GenerateMetadata({
  title: 'Portfolios',
  description: 'Portfolio showcase, bộ sưu tập dự án',
  ogImage: ogImage.src,
  currentUrl: `${getBaseUrl()}/portfolios`
})

export default function PortfoliosLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={cn('antialiased', nunito.variable, sedgwickAve.variable)}>{children}</div>
}
