'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface TimeState {
  hours: string
  minutes: string
  seconds: string
  period: string
}

interface FlipClockProps {
  showHours: boolean
  showMinutes: boolean
  showSeconds: boolean
  is24Hour: boolean
  fontClass?: string
  scale: number
  isVertical: boolean
}

function getCurrentTime(is24Hour: boolean): TimeState {
  const now = new Date()
  return {
    hours: format(now, is24Hour ? 'H' : 'h'),
    minutes: format(now, 'mm'),
    seconds: format(now, 'ss'),
    period: is24Hour ? '' : format(now, 'a')
  }
}

function FlipCard({ value, period }: Readonly<{ value: string; period?: string }>) {
  const [displayValue, setDisplayValue] = useState(value)
  const [isFlipping, setIsFlipping] = useState(false)

  useEffect(() => {
    if (value !== displayValue) {
      setIsFlipping(true)

      // After animation completes, update display value
      const timer = setTimeout(() => {
        setDisplayValue(value)
        setIsFlipping(false)
      }, 900)

      return () => clearTimeout(timer)
    }
  }, [value, displayValue])

  return (
    <div className={cn('flip-card', isFlipping ? 'flip' : '')}>
      {/* Back faces that will be revealed during flip */}
      <span className={cn('top')}>{value}</span>
      <span className={cn('bottom')}>{displayValue}</span>

      {/* Animated faces */}
      <span className={cn('topIn')}>{displayValue}</span>
      <span className={cn('bottomOut')}>{value}</span>

      {/* AM/PM indicator for 12-hour format */}
      {period && (
        <div className={cn('absolute bottom-24 left-11 z-10 text-5xl font-bold text-[#b9b9b9]')}>{period}</div>
      )}
    </div>
  )
}

export default function FlipClock({
  showHours,
  showMinutes,
  showSeconds,
  is24Hour,
  fontClass,
  scale,
  isVertical
}: Readonly<FlipClockProps>) {
  const [time, setTime] = useState<TimeState>({
    hours: '00',
    minutes: '00',
    seconds: '00',
    period: 'AM'
  })

  useEffect(() => {
    const updateTime = () => setTime(getCurrentTime(is24Hour))

    const msUntilNextSecond = 1000 - (Date.now() % 1000)

    let interval: NodeJS.Timeout

    const alignTimer = setTimeout(() => {
      updateTime()
      interval = setInterval(updateTime, 1000)
    }, msUntilNextSecond)

    return () => {
      clearTimeout(alignTimer)
      clearInterval(interval)
    }
  }, [is24Hour])

  return (
    <div className='wrap'>
      <div
        className={cn('countdown', fontClass, isVertical ? 'flex-col' : 'flex-row')}
        style={{ '--clock-scale': scale } as React.CSSProperties}
      >
        {showHours && (
          <FlipCard
            value={time.hours}
            period={time.period}
          />
        )}
        {showMinutes && <FlipCard value={time.minutes} />}
        {showSeconds && <FlipCard value={time.seconds} />}
      </div>
    </div>
  )
}
