import type { TTableOfContents } from '@/types'
import type { PropsWithChildren } from 'react'
import TableOfContents from './TableOfContents'
import { cn } from '@/lib/utils'

interface PageWithMDXProps {
  tableOfContents: TTableOfContents
}

function WithTableOfContents({ tableOfContents, children = null }: PropsWithChildren<PageWithMDXProps>) {
  return (
    <div className={cn('content-wrapper flex-shrink-0 overflow-hidden', 'lg:overflow-visible')}>
      <div className={cn('flex flex-row-reverse gap-8', 'xl:gap-24')}>
        <div className={cn('-mt-48 hidden', 'lg:block')}>
          <div className={cn('sticky top-24 z-[901] w-64', 'xl:w-[272px]', 'fm:relative fm:top-0')}>
            <TableOfContents items={tableOfContents} />
          </div>
        </div>
        <div
          className={cn('mdx-contents min-w-0 flex-1 scroll-mt-[86px]')}
          id='main-contents'
          data-ss-wrapper
        >
          {children}
        </div>
        <div className={cn('hidden border-l', 'lg:block')} />
      </div>
    </div>
  )
}

export default WithTableOfContents
