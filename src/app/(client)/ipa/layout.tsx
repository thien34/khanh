import { GenerateMetadata } from '@/components/client/meta/Metadata'
import { getBaseUrl } from '@/lib/url'
import { Metadata } from 'next'
import ogImage from '@public/images/og.png'

type LayoutProps = {
  children: React.ReactNode
}

export const metadata: Metadata = GenerateMetadata({
  title: 'International Phonetic Alphabet Chart',
  description: 'Interactive IPA chart for learning phonetic symbols and pronunciation',
  ogImage: ogImage.src,
  currentUrl: `${getBaseUrl()}/ipa`
})

export default function Layout({ children }: Readonly<LayoutProps>) {
  return <>{children}</>
}
