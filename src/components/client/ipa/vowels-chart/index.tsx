'use client'

import { useState } from 'react'
import { IPASound, AccentType, LearningLevel } from '@/types/ipa'
import DiphthongArrows from './DiphthongArrows'
import LevelSelector from './LevelSelector'
import Legend from './Legend'
import VowelGrid from './VowelGrid'
import { VOWEL_POSITIONS, DIPHTHONGS } from '../../../../constants/vowel'
import { getFilteredDiphthongs } from '../../../../utils/vowelUtils'
import VowelDot from './VowelDot'
import { cn } from '@/lib/utils'

interface VowelTrapezoidalProps {
  readonly sounds: IPASound[]
  readonly accent: AccentType
  readonly onSoundSelect: (sound: IPASound) => void
  readonly selectedSound?: IPASound
}

export default function VowelTrapezoidal({ sounds, accent, onSoundSelect, selectedSound }: VowelTrapezoidalProps) {
  const [level, setLevel] = useState<LearningLevel>(1)

  return (
    <div className={cn('relative mx-auto w-full max-w-4xl')}>
      {/* Level Selector */}
      <LevelSelector
        level={level}
        onLevelChange={setLevel}
        maxUnlockedLevel={2}
      />

      {/* Trapezoid background */}
      <div className={cn('relative h-[581px] overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-50')}>
        {/* Grid and labels */}
        <VowelGrid />

        {/* Diphthong arrows - kept in main component for better control */}
        <DiphthongArrows
          diphthongs={getFilteredDiphthongs(DIPHTHONGS, level, accent)}
          vowelPositions={VOWEL_POSITIONS}
          show={level === 2}
        />

        {/* Vowel dots positioned on trapezoid */}
        <VowelDot
          selectedSound={selectedSound}
          level={level}
          accent={accent}
          onSoundSelect={onSoundSelect}
          sounds={sounds}
        />
      </div>

      {/* Legend */}
      <Legend level={level} />
    </div>
  )
}
