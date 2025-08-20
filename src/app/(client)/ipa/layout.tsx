import { GenerateMetadata } from '@/components/client/meta/Metadata'
import { getBaseUrl } from '@/lib/url'
import { Metadata } from 'next'
import ogImage from '@public/images/og-ipa.png'

type LayoutProps = {
  children: React.ReactNode
}

export const metadata: Metadata = GenerateMetadata({
  title: 'Interactive IPA Chart - International Phonetic Alphabet with Audio & Video',
  description:
    'Free interactive IPA chart with audio pronunciation, video guides, and practice tools. Learn phonetic symbols for UK and US English accents. Perfect for linguists, students, and language learners.',
  ogImage: ogImage.src,
  currentUrl: `${getBaseUrl()}/ipa`
})

export default function Layout({ children }: Readonly<LayoutProps>) {
  return <>{children}</>
}
