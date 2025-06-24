'use client'

import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { ExternalLink } from '@/components/Icons'
import type { LinkProps } from 'next/link'
import { cn } from '@/lib/utils'

type QuickViewProps = LinkProps & PropsWithChildren

export function QuickView({ href, children }: QuickViewProps) {
  const handleQuickView = () => {
    const title = 'Quick Preview'
    const width = 480
    const height = window.innerHeight - 100
    const left = window.innerWidth - (width + 50)
    const top = 100

    const newWindow = window.open(href.toString(), title, `width=${width},height=${height},left=${left},top=${top}`)

    newWindow?.focus()
  }

  return (
    <>
      <span className={cn('hidden items-center gap-2', 'xl:inline-flex')}>
        {/* only show for large devices */}
        <Link
          href={href}
          className={cn('link')}
        >
          {children}
        </Link>
        <button
          type='button'
          onClick={handleQuickView}
          className={cn(
            'inline-flex h-6 cursor-pointer items-center gap-1 rounded-full bg-purple-600/[0.08] px-2 text-[13px] font-medium text-purple-600',
            'dark:bg-purple-400/10 dark:font-normal dark:text-purple-400'
          )}
        >
          Quick View
          <ExternalLink className={cn('h-3.5 w-3.5')} />
        </button>
      </span>

      {/* show basic link on small devices */}
      <Link
        href={href}
        className={cn('link', 'xl:!hidden')}
      >
        {children}
      </Link>
    </>
  )
}
