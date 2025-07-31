import { getMdxBySlug } from '@/lib/mdx'
import PageWithMDX from '@/components/client/layouts/content-layout/PageWithMDX'
import { GenerateMetadata } from '@/components/client/meta/Metadata'
import { Metadata } from 'next'
import ogImage from '@public/images/og.png'
import { getBaseUrl } from '@/lib/url'

type LayoutProps = {
  children: React.ReactNode
}

export const metadata: Metadata = GenerateMetadata({
  title: 'Docs',
  description: 'Documentation for my projects.',
  ogImage: ogImage.src,
  currentUrl: `${getBaseUrl()}/docs`
})

export default async function Layout({ children }: Readonly<LayoutProps>) {
  const { frontMatter, tableOfContents } = await getMdxBySlug('docs', 'other')

  return (
    <PageWithMDX
      frontMatter={frontMatter}
      tableOfContents={tableOfContents}
    >
      {children}
    </PageWithMDX>
  )
}
