import { cn, formatDateRelative } from '@/lib/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'
import type { TPostFrontMatter } from '@/types'
import { BookmarkIcon, CheckVerifiedIcon, ClockIcon, EyeIcon, ShareIcon, UpvoteIcon } from '@/components/Icons'
import Image from 'next/image'

export type PostPreviewProps = TPostFrontMatter & {
  slug: string
  views: number
  upvotes: number
  thumbnail: string
  author: {
    name: string
    avatar: string
    verified: boolean
  }
  readTime: number
  tags: string[]
}

function PostPreview({
  title,
  description,
  date,
  slug,
  lang,
  views,
  upvotes,
  thumbnail,
  author,
  readTime,
  tags
}: PostPreviewProps) {
  return (
    <motion.article
      lang={lang}
      className={cn('group relative')}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl transition-all duration-500',
          'bg-white/80 backdrop-blur-sm dark:bg-slate-900/80',
          'border border-slate-200/50 dark:border-slate-700/50',
          'hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/5',
          'hover:border-purple-200 dark:hover:border-purple-800',
          'hover:bg-gradient-to-br hover:from-purple-500/5 hover:via-pink-500/5 hover:to-purple-500/5'
        )}
      >
        {/* Main Content */}
        <Link
          href={`blog/${slug}`}
          className={cn('block')}
        >
          <div className={cn('relative')}>
            {/* Thumbnail Section */}
            <div
              className={cn(
                'relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20'
              )}
            >
              <Image
                src={thumbnail}
                alt={title}
                fill
                className={cn('object-cover transition-transform duration-700 group-hover:scale-110')}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />

              {/* Gradient Overlay */}
              <div className={cn('absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent')} />

              {/* Action Buttons */}
              <div className={cn('absolute top-3 right-3 flex gap-2')}>
                <div
                  className={cn(
                    'rounded-full bg-white/90 p-2 shadow-lg transition-colors',
                    'hover:bg-white dark:bg-slate-800/90 dark:hover:bg-slate-800',
                    'text-slate-600 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400'
                  )}
                  title='Lưu bài viết'
                >
                  <BookmarkIcon className='h-4 w-4' />
                </div>

                <div
                  className={cn(
                    'rounded-full bg-white/90 p-2 shadow-lg transition-colors',
                    'hover:bg-white dark:bg-slate-800/90 dark:hover:bg-slate-800',
                    'text-slate-600 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400'
                  )}
                  title='Chia sẻ'
                >
                  <ShareIcon className='h-4 w-4' />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className={cn('p-6')}>
              {/* Tags */}
              {tags.length > 0 && (
                <div className={cn('mb-3 flex flex-wrap gap-2')}>
                  {tags.slice(0, 3).map((tag, index) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        'rounded-full bg-gradient-to-r from-purple-50 to-pink-50 px-2 py-1 text-xs font-medium',
                        'text-purple-700 dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-300',
                        'border border-purple-200/50 dark:border-purple-700/50'
                      )}
                    >
                      #{tag}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Title */}
              <h2
                className={cn(
                  'mb-3 text-xl leading-tight font-bold',
                  'text-slate-900 dark:text-slate-100',
                  'transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400',
                  'line-clamp-2'
                )}
              >
                {title}
              </h2>

              {/* Description */}
              <p className={cn('mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400')}>
                {description}
              </p>

              {/* Author & Meta */}
              <div className={cn('mb-4 flex items-center justify-between')}>
                <div className={cn('flex items-center gap-3')}>
                  <div className={cn('relative')}>
                    <div
                      className={cn(
                        'flex size-8 items-center justify-center rounded-full',
                        'ring-1 ring-purple-300',
                        'dark:ring-purple-800'
                      )}
                    >
                      <Image
                        src={author.avatar}
                        alt={author.name}
                        width={32}
                        height={32}
                        className='rounded-full'
                      />
                    </div>
                    {author.verified && (
                      <div className={cn('absolute -right-1 -bottom-1 rounded-full bg-white p-[1px]')}>
                        <CheckVerifiedIcon className={cn('size-3 text-blue-500')} />
                      </div>
                    )}
                  </div>

                  <span className={cn('text-sm text-slate-900 dark:text-slate-100')}>{author.name}</span>
                </div>
              </div>

              {/* Stats & Actions */}
              <div className={cn('flex items-center justify-between')}>
                <div className={cn('flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400')}>
                  <div className={cn('flex items-center gap-1')}>
                    <ClockIcon className={cn('h-4 w-4')} />
                    <span>{readTime} phút đọc</span>
                  </div>
                  <time
                    dateTime={date}
                    className={cn('text-xs text-slate-500 dark:text-slate-400')}
                  >
                    {formatDateRelative(date)}
                  </time>
                </div>

                <div className={cn('flex items-center gap-2')}>
                  <div className={cn('flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400')}>
                    <EyeIcon className={cn('h-4 w-4')} />
                    <span>{views}</span>
                  </div>

                  <div className={cn('flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400')}>
                    <UpvoteIcon className={cn('h-4 w-4')} />
                    <span>{upvotes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </motion.article>
  )
}

export default PostPreview
