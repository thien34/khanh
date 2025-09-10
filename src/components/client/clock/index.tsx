'use client'

import { useState, useEffect } from 'react'
import FlipClock from './FlipClock'
import ClockMenu from './ClockMenu'

export const FONT_OPTIONS = [
  { label: 'Bebas Neue', cssClass: 'font-bebas-neue' },
  { label: 'Orbitron', cssClass: 'font-orbitron' },
  { label: 'Oswald', cssClass: 'font-oswald' },
  { label: 'Montserrat', cssClass: 'font-montserrat-alternates' }
]

export default function Clock() {
  const [is24Hour, setIs24Hour] = useState(false)
  const [showHours, setShowHours] = useState(true)
  const [showMinutes, setShowMinutes] = useState(true)
  const [showSeconds, setShowSeconds] = useState(false)
  const [sliderValue, setSliderValue] = useState([100])
  const [selectedFont, setSelectedFont] = useState('font-bebas-neue')

  // Load preferences from localStorage
  useEffect(() => {
    const savedFont = localStorage.getItem('clock-font')
    if (savedFont && FONT_OPTIONS.some(font => font.cssClass === savedFont)) {
      setSelectedFont(savedFont)
    }

    const savedScale = localStorage.getItem('clock-scale')
    if (savedScale) {
      const scaleValue = parseInt(savedScale, 10)
      if (scaleValue >= 30 && scaleValue <= 150) {
        setSliderValue([scaleValue])
      }
    }

    const savedIs24Hour = localStorage.getItem('clock-is24Hour')
    if (savedIs24Hour !== null) {
      setIs24Hour(savedIs24Hour === 'true')
    }

    const savedShowHours = localStorage.getItem('clock-showHours')
    if (savedShowHours !== null) {
      setShowHours(savedShowHours === 'true')
    }

    const savedShowMinutes = localStorage.getItem('clock-showMinutes')
    if (savedShowMinutes !== null) {
      setShowMinutes(savedShowMinutes === 'true')
    }

    const savedShowSeconds = localStorage.getItem('clock-showSeconds')
    if (savedShowSeconds !== null) {
      setShowSeconds(savedShowSeconds === 'true')
    }
  }, [])

  // Save font preference to localStorage
  useEffect(() => {
    localStorage.setItem('clock-font', selectedFont)
  }, [selectedFont])

  // Save scale preference to localStorage
  useEffect(() => {
    localStorage.setItem('clock-scale', sliderValue[0]?.toString() || '100')
  }, [sliderValue])

  // Save is24Hour preference to localStorage
  useEffect(() => {
    localStorage.setItem('clock-is24Hour', is24Hour.toString())
  }, [is24Hour])

  // Save visibility toggles to localStorage
  useEffect(() => {
    localStorage.setItem('clock-showHours', showHours.toString())
  }, [showHours])

  useEffect(() => {
    localStorage.setItem('clock-showMinutes', showMinutes.toString())
  }, [showMinutes])

  useEffect(() => {
    localStorage.setItem('clock-showSeconds', showSeconds.toString())
  }, [showSeconds])

  // Reset function to clear all localStorage and reset to defaults
  const handleReset = () => {
    // Clear all localStorage items
    localStorage.removeItem('clock-font')
    localStorage.removeItem('clock-scale')
    localStorage.removeItem('clock-is24Hour')
    localStorage.removeItem('clock-showHours')
    localStorage.removeItem('clock-showMinutes')
    localStorage.removeItem('clock-showSeconds')

    // Reset all state to default values
    setSelectedFont('font-bebas-neue')
    setSliderValue([100])
    setIs24Hour(false)
    setShowHours(true)
    setShowMinutes(true)
    setShowSeconds(false)
  }

  const currentFont = FONT_OPTIONS.find(font => font.cssClass === selectedFont) || FONT_OPTIONS[0]
  const scale = (sliderValue[0] ?? 100) / 100

  return (
    <>
      <FlipClock
        showHours={showHours}
        showMinutes={showMinutes}
        showSeconds={showSeconds}
        is24Hour={is24Hour}
        fontClass={currentFont.cssClass}
        scale={scale}
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
        fontOptions={FONT_OPTIONS}
        selectedFont={selectedFont}
        onFontChange={setSelectedFont}
        onReset={handleReset}
      />
    </>
  )
}
