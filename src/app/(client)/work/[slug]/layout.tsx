import { GenerateMetadata } from '@/components/client/meta/Metadata'
import { getBaseUrl } from '@/lib/url'
import { Metadata } from 'next'
import { getMdxBySlug } from '@/lib/mdx'
import PageWithMDX from '@/components/client/layouts/content-layout/PageWithMDX'

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const { frontMatter } = await getMdxBySlug(slug, 'work')
  return GenerateMetadata({
    title: frontMatter.title,
    description: frontMatter.description,
    keywords: frontMatter.keywords,
    ogImage: frontMatter.ogImage,
    currentUrl: `${getBaseUrl()}/work/${slug}`
  })
}

export default async function Layout({ children, params }: Readonly<LayoutProps>) {
  const { slug } = await params
  const { frontMatter } = await getMdxBySlug(slug, 'work')

  return (
    <PageWithMDX
      frontMatter={frontMatter}
      tableOfContents={frontMatter.tableOfContents}
    >
      {children}
    </PageWithMDX>
  )
}
