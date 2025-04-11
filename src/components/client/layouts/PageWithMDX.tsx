import WithTableOfContents from '@/components/client/layouts/WithTableOfContents'
import SkipNavigation from '@/components/client/navigations/SkipNavigation'
import PageHeader from '@/components/client/layouts/PageHeader'
import type { TPageFrontMatter, TTableOfContents } from '@/types'
import type { PropsWithChildren } from 'react'

interface PageWithMDXProps {
  frontMatter: TPageFrontMatter
  tableOfContents: TTableOfContents
}

function PageWithMDX({
  frontMatter: { title, description, caption },
  tableOfContents,
  children = null
}: PropsWithChildren<PageWithMDXProps>) {
  return (
    <>
      <SkipNavigation />
      <PageHeader
        title={title}
        description={description}
        caption={caption}
      />
      <WithTableOfContents tableOfContents={tableOfContents}>{children}</WithTableOfContents>
    </>
  )
}

export default PageWithMDX
