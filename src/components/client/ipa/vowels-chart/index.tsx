'use client'

import { IPASound, AccentType, LearningLevel } from '@/types/ipa'
import { cn } from '@/lib/utils'
import VowelGrid from './VowelGrid'
import ConsonantGrid from './ConsonantGrid'
import SoundDot from './SoundDot'
import Legend from './Legend'
import DiphthongArrows from './DiphthongArrows'
import { VOWEL_POSITIONS, DIPHTHONGS } from '../../../../constants/ipa'
import { getFilteredDiphthongs } from '../../../../utils/ipaUtils'
import { ipaData } from '../data'

interface IPAChartProps {
  readonly accent: AccentType
  readonly onSoundSelect: (sound: IPASound) => void
  readonly selectedSound?: IPASound
  readonly level: LearningLevel
}

export default function UnifiedChart({ accent, onSoundSelect, selectedSound, level }: IPAChartProps) {
  const isVowelLevel = level <= 2

  const getSoundsForLevel = (level: LearningLevel) => {
    switch (level) {
      case 1:
        return ipaData.vowels.monophthongs
      case 2:
        return [...ipaData.vowels.monophthongs, ...ipaData.vowels.diphthongs]
      case 3:
        return ipaData.consonants
      default:
        return []
    }
  }

  const currentSounds = getSoundsForLevel(level)

  return (
    <div className={cn('relative mx-auto w-full max-w-4xl')}>
      <div
        className={cn(
          'relative mx-auto w-full',
          isVowelLevel
            ? 'aspect-[1.618/1] h-[300px] max-w-[722px] sm:h-[400px] md:h-[500px] lg:h-[581px]'
            : 'aspect-[1.8/1] h-[250px] max-w-[900px] sm:h-[320px] md:h-[400px] lg:h-[450px]',
          'overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-50',
          'min-h-[300px]'
        )}
      >
        {isVowelLevel ? <VowelGrid /> : <ConsonantGrid />}

        {isVowelLevel && (
          <DiphthongArrows
            diphthongs={getFilteredDiphthongs(DIPHTHONGS, level, accent)}
            vowelPositions={VOWEL_POSITIONS}
            show={level === 2}
          />
        )}

        <SoundDot
          selectedSound={selectedSound}
          level={level}
          accent={accent}
          onSoundSelect={onSoundSelect}
          sounds={currentSounds}
        />
      </div>

      {/* Legend */}
      <Legend level={level} />
    </div>
  )
}
