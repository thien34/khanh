import { cn } from '@/lib/utils'
import { LearningLevel } from '@/types/ipa'
import { Lock } from 'lucide-react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

interface LevelSelectorProps {
  readonly level: LearningLevel
  readonly onLevelChange: (level: LearningLevel) => void
  readonly maxUnlockedLevel?: LearningLevel
}

export default function LevelSelector({ level, onLevelChange, maxUnlockedLevel }: LevelSelectorProps) {
  const LEVELS: ReadonlyArray<{ id: LearningLevel; title: string; short: string; gradient: string }> = [
    { id: 1, title: 'Monophthongs', short: 'Mono', gradient: 'from-blue-500 to-indigo-500' },
    { id: 2, title: 'Diphthongs', short: 'Diph', gradient: 'from-emerald-500 to-teal-500' },
    { id: 3, title: 'Consonants', short: 'Cons', gradient: 'from-violet-500 to-purple-500' }
  ]

  return (
    <ScrollArea className={cn('group mb-3 w-full')}>
      <div
        role='tablist'
        className={cn('flex w-max gap-2')}
      >
        {LEVELS.map(item => {
          const isActive = level === item.id
          const isLocked = item.id > (maxUnlockedLevel ?? level)
          return (
            <button
              key={item.id}
              type='button'
              role='tab'
              aria-selected={isActive}
              onClick={() => !isLocked && onLevelChange(item.id)}
              className={cn(
                'group inline-flex snap-start flex-col items-center gap-1 rounded-2xl p-2 text-xs font-medium transition-transform outline-none',
                isLocked && 'pointer-events-none opacity-60',
                isActive ? 'scale-[1.02]' : 'hover:scale-[1.01]'
              )}
            >
              <span
                className={cn(
                  'rounded-full bg-gradient-to-br p-[2px]',
                  isActive ? item.gradient : 'from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800'
                )}
              >
                <span
                  className={cn(
                    'grid size-8 place-items-center rounded-full bg-neutral-100 text-xs font-bold text-neutral-700 shadow-sm dark:bg-neutral-800 dark:text-neutral-200',
                    isActive && 'bg-white text-neutral-900 shadow-[0_0_0_6px_rgba(59,130,246,0.08)]'
                  )}
                >
                  {isLocked ? <Lock className='size-2' /> : item.id}
                </span>
              </span>
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[11px]',
                  isActive
                    ? 'bg-neutral-900 text-white dark:bg-neutral-50 dark:text-neutral-900'
                    : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300'
                )}
              >
                <span className={cn('hidden sm:inline')}>{item.title}</span>
                <span className={cn('inline sm:hidden')}>{item.short}</span>
              </span>
            </button>
          )
        })}
      </div>
      <ScrollBar
        orientation='horizontal'
        className={cn('opacity-0 transition-opacity group-hover:opacity-100')}
      />
    </ScrollArea>
  )
}
