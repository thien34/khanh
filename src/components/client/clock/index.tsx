'use client'

import { useState } from 'react'
import FlipClock from './FlipClock'
import ClockMenu from './ClockMenu'

export default function Clock() {
  const [is24Hour, setIs24Hour] = useState(false)
  const [showHours, setShowHours] = useState(true)
  const [showMinutes, setShowMinutes] = useState(true)
  const [showSeconds, setShowSeconds] = useState(false)
  const [sliderValue, setSliderValue] = useState([75])

  return (
    <>
      <FlipClock
        showHours={showHours}
        showMinutes={showMinutes}
        showSeconds={showSeconds}
        is24Hour={is24Hour}
      />
      <ClockMenu
        is24Hour={is24Hour}
        setIs24Hour={setIs24Hour}
        showHours={showHours}
        setShowHours={setShowHours}
        showMinutes={showMinutes}
        setShowMinutes={setShowMinutes}
        showSeconds={showSeconds}
        setShowSeconds={setShowSeconds}
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
      />
    </>
  )
}
