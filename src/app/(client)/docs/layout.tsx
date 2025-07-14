import { getMdxBySlug } from '@/lib/mdx'
import PageWithMDX from '@/components/client/layouts/content-layout/PageWithMDX'

type LayoutProps = {
  children: React.ReactNode
}

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
