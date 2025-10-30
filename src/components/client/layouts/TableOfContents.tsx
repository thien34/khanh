'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import useOnScroll from '@/hooks/useOnScroll'
import useScrollSpy from '@/hooks/useScrollSpy'
import type { TTableOfContentsItem } from '@/types'
import { cn } from '@/lib/utils'

interface TableOfContentsLinkProps extends TTableOfContentsItem {
  active?: boolean
}

function TableOfContentsLink({ title, depth, slug, active = false }: Readonly<TableOfContentsLinkProps>) {
  const linkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (active && linkRef.current) {
      linkRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }, [active])

  return (
    <a
      ref={linkRef}
      className={cn('toc-link', {
        'toc-link--depth-2': depth === 2,
        'toc-link--active': active
      })}
      href={`#${slug}`}
    >
      {title}
    </a>
  )
}

interface TableOfContensProps {
  items?: Array<TTableOfContentsItem>
}

function TableOfContents({ items = [] }: Readonly<TableOfContensProps>) {
  const isScrolled = useOnScroll(200)
  const { currentVisibles } = useScrollSpy()

  const handleScrollToTopClick = () => {
    window.scrollTo({ top: 0 })
  }

  return (
    <nav
      aria-label='Page table of contents'
      className={cn('flex max-h-[600px] flex-col rounded-xl border bg-white', 'dark:bg-[#161e31]')}
    >
      <div className={cn('flex items-center justify-between border-b px-5 py-3 text-sm font-bold')}>
        <h2
          className={cn('text-slate-700', 'dark:text-slate-300')}
          id='table-of-contents'
        >
          <span className={cn('lg:hidden', 'xl:inline')}>Table of </span> Contents
        </h2>
        <motion.div
          initial={{ x: 16, opacity: 0 }}
          animate={isScrolled ? { x: 0, opacity: 1 } : { x: 16, opacity: 0 }}
        >
          <a
            href='#skip-navigation'
            className={cn(
              'flex h-6 cursor-pointer items-center rounded-full border px-2 text-xs font-normal text-blue-700',
              'dark:text-purple-400'
            )}
            tabIndex={isScrolled ? 0 : -1}
            onClick={handleScrollToTopClick}
          >
            scroll to top
          </a>
        </motion.div>
      </div>
      <div className={cn('relative overflow-y-auto p-3')}>
        <ol className={cn('toc flex flex-col gap-2')}>
          {items.map(({ title, depth, slug }) => {
            const isActive = currentVisibles?.[slug]

            return (
              <li key={slug}>
                <TableOfContentsLink
                  title={title}
                  depth={depth}
                  slug={slug}
                  active={isActive}
                />
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}

export default TableOfContents
