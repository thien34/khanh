import { cn } from '@/lib/utils'
import { PLACE_LABELS, MANNER_LABELS } from '@/constants/ipa'

export default function ConsonantGrid() {
  return (
    <>
      {/* IPA Consonant Chart Grid representing place and manner of articulation */}
      <svg className={cn('pointer-events-none absolute inset-0 h-full w-full')}>
        {/* Horizontal grid lines - Manner of Articulation */}
        {MANNER_LABELS.map(manner => (
          <line
            key={manner.label}
            x1='6%'
            y1={`${manner.position}%`}
            x2='96%'
            y2={`${manner.position}%`}
            stroke='#9ca3af'
            strokeWidth='1.5'
            strokeDasharray='6,4'
            opacity='0.7'
          />
        ))}

        {/* Vertical grid lines - Place of Articulation */}
        {PLACE_LABELS.map(place => (
          <line
            key={place.label}
            x1={`${place.position}%`}
            y1='10%'
            x2={`${place.position}%`}
            y2='95%'
            stroke='#9ca3af'
            strokeWidth='1.5'
            strokeDasharray='6,4'
            opacity='0.7'
          />
        ))}
      </svg>
      {/* Place of Articulation Labels (Top) */}
      <div className={cn('flex h-8 items-center justify-between sm:h-10')}>
        {PLACE_LABELS.map(place => (
          <div
            key={place.label}
            className={cn(
              '-rotate-20 transform font-medium text-gray-600 sm:-rotate-20 md:-rotate-12',
              'xs:text-[9px] text-[8px] sm:text-xs md:text-sm',
              'leading-none'
            )}
            style={{ left: `${place.position}%`, position: 'absolute' }}
          >
            {place.label}
          </div>
        ))}
      </div>

      {/* Manner of Articulation Labels (Left) */}
      {MANNER_LABELS.map(manner => (
        <div
          key={manner.label}
          className={cn(
            'w-8 -rotate-45 transform font-medium text-gray-600 sm:w-10 sm:-rotate-45 md:w-12 md:-rotate-35',
            'xs:text-[8px] text-[7px] sm:text-xs md:text-sm',
            'pr-1 leading-tight sm:pr-2'
          )}
          style={{ top: `${manner.position}%`, position: 'absolute' }}
        >
          {manner.label}
        </div>
      ))}
    </>
  )
}
