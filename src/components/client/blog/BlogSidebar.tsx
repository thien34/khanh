'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ClockIcon, SearchIcon, SparklesIcon, TrendingIcon, FireIcon } from '@/components/Icons'

function BlogSidebar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Tất cả', icon: SparklesIcon, count: 24 },
    { id: 'trending', name: 'Trending', icon: TrendingIcon, count: 8 },
    { id: 'hot', name: 'Hot Posts', icon: FireIcon, count: 5 },
    { id: 'recent', name: 'Gần đây', icon: ClockIcon, count: 12 }
  ]

  return (
    <aside className={cn('space-y-6')}>
      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'rounded-2xl border border-slate-200/50 bg-white/80 p-4 backdrop-blur-sm',
          'dark:border-slate-700/50 dark:bg-slate-800/80',
          'shadow-lg shadow-purple-500/5'
        )}
      >
        <div className={cn('relative')}>
          <SearchIcon className={cn('absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400')} />
          <input
            type='text'
            placeholder='Tìm kiếm bài viết...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={cn(
              'w-full rounded-xl border-0 bg-slate-50 py-3 pr-4 pl-10 text-sm',
              'placeholder:text-slate-400 dark:bg-slate-700/50 dark:text-slate-300',
              'focus:ring-2 focus:ring-purple-500/20 focus:outline-none',
              'transition-all duration-200'
            )}
          />
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={cn(
          'rounded-2xl border border-slate-200/50 bg-white/80 p-4',
          'dark:border-slate-700/50 dark:bg-slate-800/80',
          'shadow-lg shadow-purple-500/5'
        )}
      >
        <h2 className={cn('mb-4 text-sm font-bold text-slate-900', 'dark:text-slate-100')}>Danh mục</h2>
        <div className={cn('space-y-2')}>
          {categories.map(category => {
            const Icon = category.icon
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-all',
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700/50'
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={cn('flex items-center gap-2')}>
                  <Icon className={cn('h-4 w-4')} />
                  <span className={cn('font-medium')}>{category.name}</span>
                </div>
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-xs font-bold',
                    activeCategory === category.id
                      ? 'bg-white/20'
                      : 'bg-slate-200 text-slate-600 dark:bg-slate-600 dark:text-slate-300'
                  )}
                >
                  {category.count}
                </span>
              </motion.button>
            )
          })}
        </div>
      </motion.div>
    </aside>
  )
}

export default BlogSidebar
