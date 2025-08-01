'use client'

import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { FilterIcon } from '@/components/Icons'

type BlogFilterProps = {
  showFilters: boolean
  setShowFilters: (show: boolean) => void
  filterBy: string
  setFilterBy: (filter: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
  postsCount: number
}

function BlogFilter({
  showFilters,
  setShowFilters,
  filterBy,
  setFilterBy,
  sortBy,
  setSortBy,
  postsCount
}: Readonly<BlogFilterProps>) {
  const availableTags = ['React', 'Next.js', 'TypeScript', 'AI', 'Performance', 'Tutorial', 'Java Spring']

  const sortOptions = [
    { value: 'newest', label: 'Mới nhất' },
    { value: 'popular', label: 'Phổ biến nhất' },
    { value: 'trending', label: 'Trending' },
    { value: 'oldest', label: 'Cũ nhất' }
  ]

  return (
    <>
      {/* Sort and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className='mb-8 flex flex-col gap-4 rounded-2xl border border-slate-200/50 bg-white/80 p-4 shadow-lg shadow-purple-500/5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-700/50 dark:bg-slate-800/80'
      >
        <div className='flex items-center gap-4'>
          <span className='text-sm font-medium text-slate-700 dark:text-slate-300'>
            <span className='font-bold text-purple-600 dark:text-purple-400'>{postsCount}</span> bài viết
          </span>
        </div>

        <div className='flex items-center gap-3'>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200',
              'border border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700',
              showFilters
                ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                : 'text-slate-600 dark:text-slate-400'
            )}
          >
            <FilterIcon className='h-4 w-4' />
            Bộ lọc
          </button>

          <div className='flex items-center gap-2'>
            <label
              htmlFor='sort-select'
              className='text-sm font-medium text-slate-700 dark:text-slate-300'
            >
              Sắp xếp:
            </label>
            <select
              id='sort-select'
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className='cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50 focus:ring-2 focus:ring-purple-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            >
              {sortOptions.map(option => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className='mb-6 rounded-2xl border border-slate-200/50 bg-white/80 p-4 shadow-lg shadow-purple-500/5 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80'
          >
            <h4 className='mb-3 text-sm font-bold text-slate-900 dark:text-slate-100'>Lọc theo tags</h4>
            <div className='flex flex-wrap gap-2'>
              <button
                onClick={() => setFilterBy('all')}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-medium transition-colors duration-200',
                  filterBy === 'all'
                    ? 'bg-purple-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600'
                )}
              >
                Tất cả
              </button>
              {availableTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setFilterBy(tag)}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-medium transition-colors duration-200',
                    filterBy === tag
                      ? 'bg-purple-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600'
                  )}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default BlogFilter
