import type { TPageFrontMatter, TTableOfContents } from '@/types'
import type { PropsWithChildren } from 'react'
import PageHeader from '../PageHeader'
import WithTableOfContents from '../WithTableOfContents'

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
