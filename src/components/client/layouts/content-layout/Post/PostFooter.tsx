import clsx from 'clsx'
import Link from 'next/link'

import type { PropsWithChildren } from 'react'
import { TPostFrontMatter } from '@/types'

type ChipProps = {
  href: string
}

function Chip({ href, children = null }: PropsWithChildren<ChipProps>) {
  return (
    <Link
      href={href}
      className={clsx(
        'inline-flex h-6 items-center gap-1 rounded-full bg-purple-600/[0.08] px-2 text-[13px] font-medium text-purple-600',
        'dark:bg-purple-400/10 dark:font-normal dark:text-purple-400'
      )}
    >
      {children}
    </Link>
  )
}

interface PostFooterProps {
  tags: TPostFrontMatter['tags']
  category: TPostFrontMatter['category']
}

function PostFooter({ tags, category }: Readonly<PostFooterProps>) {
  return (
    <div
      className={clsx(
        'mt-24 flex flex-col gap-6 text-sm text-slate-600',
        'md:flex-row md:items-center md:justify-between',
        'dark:text-slate-400'
      )}
    >
      <div className={clsx('flex flex-wrap gap-x-1 gap-y-2')}>
        Posted on
        <Link
          href='/blog'
          className={clsx('font-bold text-purple-600', 'dark:text-purple-400')}
        >
          {category}
        </Link>
        with tags:
        <div className={clsx('flex flex-wrap gap-1')}>
          {tags?.map(tag => (
            <Chip
              href='/blog'
              key={tag}
            >
              #{tag}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PostFooter
