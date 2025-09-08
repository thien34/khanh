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
import { MoreVertical, Settings, Palette, Bell, Timer, Volume2, Maximize } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

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
      <span className='text-xs font-bold'>{label}</span>
    </Button>
  )
}

export default function ClockMenu() {
  const [is24Hour, setIs24Hour] = useState(true)
  const [showHours, setShowHours] = useState(true)
  const [showMinutes, setShowMinutes] = useState(true)
  const [showSeconds, setShowSeconds] = useState(true)
  const [sliderValue, setSliderValue] = useState([75])

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
          className={cn('w-32 space-y-3 border border-white/20 bg-black/80 p-3 text-white backdrop-blur-md')}
        >
          {/* Interactive slider */}
          <Slider
            value={sliderValue}
            onValueChange={setSliderValue}
            max={100}
            step={1}
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

          {/* Icon grid - 2 columns */}
          <div className={cn('grid grid-cols-2 gap-2')}>
            {/* Row 1 */}
            <DropdownMenuItem className='menu-item'>
              <Settings className='size-5' />
            </DropdownMenuItem>
            <DropdownMenuItem className='menu-item'>
              <Palette className='size-5' />
            </DropdownMenuItem>

            {/* Row 2 */}
            <DropdownMenuItem className='menu-item'>
              <Bell className='size-5' />
            </DropdownMenuItem>
            <DropdownMenuItem className='menu-item'>
              <Timer className='size-5' />
            </DropdownMenuItem>

            {/* Row 3 */}
            <DropdownMenuItem className='menu-item'>
              <Volume2 className='size-5' />
            </DropdownMenuItem>
            <DropdownMenuItem className='menu-item'>
              <Maximize className='size-5' />
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
