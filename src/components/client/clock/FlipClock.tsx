'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'

interface TimeState {
  hours: string
  minutes: string
  seconds: string
}

function getCurrentTime(): TimeState {
  const now = new Date()
  return {
    hours: format(now, 'HH'),
    minutes: format(now, 'mm'),
    seconds: format(now, 'ss')
  }
}

function FlipCard({ value }: Readonly<{ value: string }>) {
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
    <div className={`flip-card ${isFlipping ? 'flip' : ''}`}>
      {/* Back faces that will be revealed during flip */}
      <span className='top'>{value}</span>
      <span className='bottom'>{displayValue}</span>

      {/* Animated faces */}
      <span className='topIn'>{displayValue}</span>
      <span className='bottomOut'>{value}</span>
    </div>
  )
}

export default function FlipClock() {
  const [time, setTime] = useState<TimeState>(() => getCurrentTime())

  useEffect(() => {
    const updateTime = () => setTime(getCurrentTime())

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
  }, [])

  return (
    <div className='countdown'>
      <FlipCard value={time.hours} />
      <FlipCard value={time.minutes} />
      <FlipCard value={time.seconds} />
    </div>
  )
}
