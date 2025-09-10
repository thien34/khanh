'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import {
  MoreVertical,
  Settings,
  Palette,
  Timer,
  Maximize,
  Minimize,
  RotateCcw,
  GalleryHorizontal,
  GalleryVertical
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFullscreen } from '@/hooks/useFullscreen'

interface FontOption {
  label: string
  cssClass: string
}

interface ClockMenuProps {
  is24Hour: boolean
  setIs24Hour: (value: boolean) => void
  showHours: boolean
  setShowHours: (value: boolean | ((prev: boolean) => boolean)) => void
  showMinutes: boolean
  setShowMinutes: (value: boolean | ((prev: boolean) => boolean)) => void
  showSeconds: boolean
  setShowSeconds: (value: boolean | ((prev: boolean) => boolean)) => void
  sliderValue: number[]
  setSliderValue: (value: number[]) => void
  fontOptions: FontOption[]
  selectedFont: string
  onFontChange: (value: string) => void
  onReset: () => void
  isVertical: boolean
  setIsVertical: (value: boolean | ((prev: boolean) => boolean)) => void
}

function TogglePill({
  active,
  onClick,
  label
}: Readonly<{
  active: boolean
  onClick: () => void
  label: string
}>) {
  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={onClick}
      className={cn(
        'h-auto py-1 duration-300',
        active
          ? 'bg-white/20 text-white hover:bg-white/25 hover:text-white'
          : 'bg-transparent text-white/40 hover:bg-white/5 hover:text-white/60'
      )}
    >
      <span className={cn('text-xs font-bold')}>{label}</span>
    </Button>
  )
}

export default function ClockMenu({
  is24Hour,
  setIs24Hour,
  showHours,
  setShowHours,
  showMinutes,
  setShowMinutes,
  showSeconds,
  setShowSeconds,
  sliderValue,
  setSliderValue,
  fontOptions,
  selectedFont,
  onFontChange,
  onReset,
  isVertical,
  setIsVertical
}: Readonly<ClockMenuProps>) {
  const { isFullscreen, toggle } = useFullscreen()

  return (
    <div className={cn('fixed right-4 bottom-4 z-50')}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className={cn(
              'size-10 rounded-full bg-black/20 text-white backdrop-blur-sm',
              'focus:ring-2 focus:ring-white/20',
              'hover:bg-black/30 hover:text-white'
            )}
          >
            <MoreVertical className='size-5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          side='top'
          className={cn(
            'w-32 space-y-3 border border-white/20 bg-black/80 p-3 text-white backdrop-blur-md',
            'transition-transform duration-300 portrait:rotate-0 max-[1024px]:landscape:mb-4 max-[1024px]:landscape:origin-bottom max-[1024px]:landscape:-rotate-90'
          )}
        >
          {/* Interactive slider */}
          <Slider
            value={sliderValue}
            onValueChange={setSliderValue}
            min={30}
            max={150}
            step={2}
            className={cn('w-full')}
          />

          {/* 24H/12H format - Pill toggle style */}
          <div className={cn('flex rounded-full border border-white/10 bg-white/5 p-0.5')}>
            {[
              { label: '12H', value: false },
              { label: '24H', value: true }
            ].map(({ label, value }) => (
              <Button
                key={label}
                variant='ghost'
                size='sm'
                onClick={() => setIs24Hour(value)}
                className={cn(
                  'flex-1 rounded-full px-3 py-1.5 text-xs font-medium duration-300 hover:bg-white/60',
                  is24Hour === value
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'text-white/60 hover:bg-transparent hover:text-white/80'
                )}
              >
                {label}
              </Button>
            ))}
          </div>

          {/* Time block toggles - HH:MM:SS */}
          <div className='grid grid-cols-3 gap-1 rounded-lg border border-white/10 bg-white/5 p-1'>
            <TogglePill
              active={showHours}
              onClick={() => setShowHours(v => !v)}
              label='HH'
            />
            <TogglePill
              active={showMinutes}
              onClick={() => setShowMinutes(v => !v)}
              label='MM'
            />
            <TogglePill
              active={showSeconds}
              onClick={() => setShowSeconds(v => !v)}
              label='SS'
            />
          </div>

          <DropdownMenuSeparator className={cn('bg-white/20')} />

          {/* Font selection */}
          <div className='grid grid-cols-1 gap-1'>
            {fontOptions.map(font => (
              <Button
                key={font.cssClass}
                variant='ghost'
                size='sm'
                onClick={() => onFontChange(font.cssClass)}
                className={cn(
                  'h-auto justify-start px-2 py-1 text-xs duration-300',
                  selectedFont === font.cssClass
                    ? 'bg-white/20 text-white hover:bg-white/25 hover:text-white'
                    : 'bg-transparent text-white/60 hover:bg-white/10 hover:text-white/80'
                )}
              >
                {font.label}
              </Button>
            ))}
          </div>

          <DropdownMenuSeparator className={cn('bg-white/20')} />

          {/* Icon grid - 2 columns */}
          <div className={cn('grid grid-cols-2 gap-2')}>
            {/* Row 1 */}
            <DropdownMenuItem className={cn('menu-item')}>
              <Settings className={cn('size-5')} />
            </DropdownMenuItem>
            <DropdownMenuItem className={cn('menu-item')}>
              <Palette className={cn('size-5')} />
            </DropdownMenuItem>

            {/* Row 2 */}
            <DropdownMenuItem
              className={cn('menu-item')}
              onClick={() => setIsVertical(v => !v)}
            >
              {isVertical ? (
                <GalleryVertical className={cn('size-5')} />
              ) : (
                <GalleryHorizontal className={cn('size-5')} />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem className={cn('menu-item')}>
              <Timer className={cn('size-5')} />
            </DropdownMenuItem>

            {/* Row 3 */}
            <DropdownMenuItem
              className={cn('menu-item')}
              onClick={onReset}
            >
              <RotateCcw className={cn('size-5')} />
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn('menu-item')}
              onClick={toggle}
            >
              {isFullscreen ? <Minimize className={cn('size-5')} /> : <Maximize className={cn('size-5')} />}
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
