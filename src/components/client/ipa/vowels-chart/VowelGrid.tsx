import { cn } from '@/lib/utils'

export default function VowelGrid() {
  return (
    <>
      {/* Anatomically correct trapezoidal grid representing mouth cavity */}
      <svg className={cn('pointer-events-none absolute inset-0 h-full w-full')}>
        {/* Horizontal grid lines - creating rectangular grid pattern */}
        {/* Close level */}
        <line
          x1='10%'
          y1='10%'
          x2='90%'
          y2='10%'
          stroke='#9ca3af'
          strokeWidth='1.5'
          strokeDasharray='6,4'
          opacity='0.7'
        />
        {/* Close-mid level */}
        <line
          x1='24%'
          y1='37%'
          x2='90%'
          y2='37%'
          stroke='#9ca3af'
          strokeWidth='1.5'
          strokeDasharray='6,4'
          opacity='0.7'
        />
        {/* Open-mid level */}
        <line
          x1='37.5%'
          y1='64%'
          x2='90%'
          y2='64%'
          stroke='#9ca3af'
          strokeWidth='1.5'
          strokeDasharray='6,4'
          opacity='0.7'
        />
        {/* Open level */}
        <line
          x1='50%'
          y1='91%'
          x2='90%'
          y2='91%'
          stroke='#9ca3af'
          strokeWidth='1.5'
          strokeDasharray='6,4'
          opacity='0.7'
        />

        {/* Vertical grid lines - creating columns */}
        {/* Right boundary (Back) */}
        <line
          x1='90%'
          y1='10%'
          x2='90%'
          y2='90%'
          stroke='#9ca3af'
          strokeWidth='1.5'
          strokeDasharray='6,4'
          opacity='0.7'
        />
        {/* Central division line */}
        <line
          x1='50%'
          y1='10%'
          x2='70%'
          y2='90%'
          stroke='#9ca3af'
          strokeWidth='1.5'
          strokeDasharray='6,4'
          opacity='0.7'
        />
        {/* Left diagonal - Front slope */}
        <line
          x1='10%'
          y1='10%'
          x2='50%'
          y2='91%'
          stroke='#9ca3af'
          strokeWidth='1.5'
          strokeDasharray='6,4'
          opacity='0.7'
        />
      </svg>

      {/* Anatomical labels for mouth cavity */}
      <div
        className={cn(
          'absolute top-2 left-16 z-10 text-xs font-medium text-gray-700',
          'top-1 sm:top-2 md:top-2',
          'left-8 sm:left-12 md:left-16',
          'text-[10px] sm:text-xs md:text-xs'
        )}
      >
        Front
      </div>

      <div
        className={cn(
          'absolute top-2 right-16 z-10 text-xs font-medium text-gray-700',
          'top-1 sm:top-2 md:top-2',
          'right-8 sm:right-12 md:right-16',
          'text-[10px] sm:text-xs md:text-xs'
        )}
      >
        Back
      </div>

      <div
        className={cn(
          'absolute top-2 left-1/2 z-10 -translate-x-1/2 transform text-xs font-medium text-gray-700',
          'top-1 sm:top-2 md:top-2',
          'text-[10px] sm:text-xs md:text-xs'
        )}
      >
        Central
      </div>

      {/* Tongue height and mouth opening labels */}
      <div
        className={cn(
          'absolute top-[8.5%] left-2 z-10 transform text-xs font-medium text-gray-700',
          'left-1 sm:left-1.5 md:left-2',
          'text-[10px] sm:text-xs md:text-xs'
        )}
      >
        Close
      </div>

      <div
        className={cn(
          'absolute top-[35.5%] left-2 z-10 transform text-xs font-medium text-gray-700',
          'left-1 sm:left-1.5 md:left-2',
          'text-[10px] sm:text-xs md:text-xs'
        )}
      >
        Close-mid
      </div>

      <div
        className={cn(
          'absolute top-[62.5%] left-2 z-10 transform text-xs font-medium text-gray-700',
          'left-1 sm:left-1.5 md:left-2',
          'text-[10px] sm:text-xs md:text-xs'
        )}
      >
        Open-mid
      </div>

      <div
        className={cn(
          'absolute top-[89.5%] left-2 z-10 transform text-xs font-medium text-gray-700',
          'left-1 sm:left-1.5 md:left-2',
          'text-[10px] sm:text-xs md:text-xs'
        )}
      >
        Open
      </div>
    </>
  )
}
