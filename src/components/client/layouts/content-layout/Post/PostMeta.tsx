import { CalendarIcon, LanguageIcon } from '@/components/Icons'
import { TPostFrontMatter } from '@/types'
import { cn, formatDate, formatLang } from '@/lib/utils'

interface PostMetaProps {
  date: TPostFrontMatter['date']
  lang: TPostFrontMatter['lang']
}

function PostMeta({ date, lang }: Readonly<PostMetaProps>) {
  return (
    <div className={cn('content-wrapper mb-10')}>
      <div className={cn('flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600', 'dark:text-slate-400')}>
        <div className={cn('flex items-center gap-1.5')}>
          <CalendarIcon className={cn('h-5 w-5')} />
          <time dateTime={date}>{formatDate(date)}</time>
        </div>
        <div className={cn('flex items-center gap-1.5')}>
          <LanguageIcon className={cn('h-5 w-5')} />
          {formatLang(lang)}
        </div>
      </div>
    </div>
  )
}

export default PostMeta
