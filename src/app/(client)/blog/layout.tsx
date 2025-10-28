import { GenerateMetadata } from '@/components/client/meta/Metadata'
import { getBaseUrl } from '@/lib/url'
import { Metadata } from 'next'
import ogImage from '@public/images/og-blog.png'

type LayoutProps = {
  children: React.ReactNode
}

export const metadata: Metadata = GenerateMetadata({
  title: 'Blog',
  description: 'Web development thoughts and stories.',
  ogImage: ogImage.src,
  currentUrl: `${getBaseUrl()}/blog`
})

export default function Layout({ children }: Readonly<LayoutProps>) {
  return <div>{children}</div>
}
