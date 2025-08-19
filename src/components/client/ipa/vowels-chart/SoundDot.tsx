'use client'

import { AccentType, IPASound, LearningLevel } from '@/types/ipa'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { HelpCircle } from 'lucide-react'
import { getFilteredSounds, getCellColor, getFilteredConsonants } from '@/utils/ipaUtils'
import { useAudioManager } from '@/hooks/useAudioManager'
import { VOWEL_POSITIONS, CONSONANT_POSITIONS } from '@/constants/ipa'

interface SoundDotProps {
  readonly selectedSound?: IPASound
  readonly level: LearningLevel
  readonly accent: AccentType
  readonly onSoundSelect: (sound: IPASound) => void
  readonly sounds: IPASound[]
}

export default function SoundDot({ selectedSound, level, accent, onSoundSelect, sounds }: SoundDotProps) {
  const { playSound, currentSound, isPlaying } = useAudioManager({
    accent,
    onSoundSelect
  })

  // Determine if we're showing vowels or consonants
  const isVowelLevel = level <= 2

  // Filter sounds based on level
  const filteredSounds = isVowelLevel ? getFilteredSounds(sounds, level, accent) : getFilteredConsonants(sounds)

  // Get positions based on sound type
  const getPositions = () => (isVowelLevel ? VOWEL_POSITIONS : CONSONANT_POSITIONS)

  const getInfoNote = (symbol: string): string => {
    if (symbol === 'e' && level === 1) {
      return 'GA theo IPA là /ɛ/, nhưng nhiều từ điển ghi /e/ để dễ nhận biết.'
    }
    if (symbol === 'ɔː' && accent === 'us' && level === 1) {
      return 'Theo GA vẫn có /ɔː/, nhưng ở Mỹ nhiều vùng gộp cot–caught nên /ɔː/ thường gộp vào /ɑː/.'
    }
    if (symbol === 'ɒ') {
      return 'Tiếng Anh Mỹ không dùng /ɒ/ → dùng /ɑː/ thay thế.'
    }
    return ''
  }

  const positions = getPositions()

  return filteredSounds.map(sound => {
    const position = positions[sound.symbol]

    if (!position) return null

    const isSelected = selectedSound?.symbol === sound.symbol
    const isCurrentlyPlaying = currentSound === sound.symbol && isPlaying
    const note = getInfoNote(sound.symbol)

    return (
      <Button
        key={sound.symbol}
        onClick={() => playSound(sound)}
        className={cn(
          'absolute flex cursor-pointer flex-col items-center justify-center gap-0 rounded-full border-2 p-1 transition-all duration-200',
          'size-6 sm:size-10 md:size-12',
          getCellColor(sound),
          isSelected && 'scale-105 ring-2 ring-blue-500/50 ring-offset-2',
          isCurrentlyPlaying && 'animate-pulse ring-2 ring-green-500/50'
        )}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`
        }}
      >
        <div className={cn('pb-1 !leading-[0.75] font-bold text-gray-700', 'text-sm sm:text-lg md:text-xl')}>
          {sound.symbol}
        </div>

        {note && (
          <div className={cn('absolute -top-1 -right-2 hidden', 'sm:block')}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    'inline-flex items-center justify-center rounded-full bg-gray-100 p-0.5 text-gray-500 hover:text-gray-700'
                  )}
                >
                  <HelpCircle className={cn('h-3.5 w-3.5')} />
                </div>
              </TooltipTrigger>
              <TooltipContent
                side='top'
                align='center'
                className={cn('max-w-52 leading-snug whitespace-pre-wrap')}
              >
                {note}
              </TooltipContent>
            </Tooltip>
          </div>
        )}

        <div
          className={cn(
            'w-full truncate text-center leading-tight text-gray-600',
            'text-[9px] sm:text-[10px] md:text-xs'
          )}
        >
          {sound.word}
        </div>
      </Button>
    )
  })
}
