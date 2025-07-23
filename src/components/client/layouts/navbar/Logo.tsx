import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Logo = () => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <Link
      href='/'
      className={cn('rounded-xl px-2 py-1')}
      aria-label='Home'
    >
      <div className={cn('flex items-center gap-1.5 font-bold')}>
        <div
          className={cn(
            'flex size-8 items-center justify-center rounded-xl border-2 border-purple-600',
            'sm:h-6 sm:w-6 sm:rounded-lg',
            isHomePage ? 'bg-purple-600' : 'bg-white'
          )}
        >
          <div
            className={cn('h-3.5 w-0.5 rotate-12 rounded-full', isHomePage ? 'bg-white' : 'bg-purple-600', 'sm:h-3')}
          />
        </div>
        <div className={cn('hidden text-xl', 'sm:block')}>
          <span className={cn('text-slate-900')}>luoi</span>
          <span className={cn('text-purple-600')}>dev</span>
        </div>
      </div>
    </Link>
  )
}

export default Logo
