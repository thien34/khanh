'use client'

import { AccentType, IPASound, LearningLevel } from '@/types/ipa'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { HelpCircle } from 'lucide-react'
import { getFilteredSounds, getCellColor } from '../../../../utils/vowelUtils'
import { useAudioManager } from '@/hooks/useAudioManager'
import { VOWEL_POSITIONS } from '@/constants/vowel'

interface VowelDotProps {
  readonly selectedSound?: IPASound
  readonly level: LearningLevel
  readonly accent: AccentType
  readonly onSoundSelect: (sound: IPASound) => void
  readonly sounds: IPASound[]
}

export default function VowelDot({ selectedSound, level, accent, onSoundSelect, sounds }: VowelDotProps) {
  const { playSound, currentSound, isPlaying } = useAudioManager({
    accent,
    onSoundSelect
  })

  const filteredSounds = getFilteredSounds(sounds, level, accent)

  const getInfoNote = (symbol: string): string => {
    if (symbol === 'e' && level === 1) {
      return 'GA theo IPA là /ɛ/, nhưng nhiều từ điển ghi /e/ để dễ nhận biết.'
    }
    if (symbol === 'ɔː' && accent === 'us') {
      return 'Theo GA vẫn có /ɔː/, nhưng ở Mỹ nhiều vùng gộp cot–caught nên /ɔː/ thường gộp vào /ɑː/.'
    }
    if (symbol === 'ɒ') {
      return 'Tiếng Anh Mỹ không dùng /ɒ/ → dùng /ɑː/ thay thế.'
    }
    return ''
  }
  return filteredSounds.map(sound => {
    // Both monophthongs and diphthongs use predefined positions
    const position = VOWEL_POSITIONS[sound.symbol]

    if (!position) return null

    const isSelected = selectedSound?.symbol === sound.symbol
    const isCurrentlyPlaying = currentSound === sound.symbol && isPlaying
    const note = getInfoNote(sound.symbol)

    return (
      <Button
        key={sound.symbol}
        onClick={() => playSound(sound)}
        className={cn(
          'absolute flex size-12 cursor-pointer flex-col items-center justify-center gap-0 rounded-full border-2 p-1 transition-all duration-200',
          getCellColor(sound),
          isSelected && 'scale-105 ring-2 ring-blue-500/50 ring-offset-2',
          isCurrentlyPlaying && 'animate-pulse ring-2 ring-green-500/50'
        )}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`
        }}
      >
        <div className={cn('pb-1 text-xl leading-[0.75] font-bold text-gray-700')}>{sound.symbol}</div>
        {note && (
          <div className={cn('absolute -top-1 -right-2')}>
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
        <div className={cn('w-full truncate text-center text-xs leading-tight text-gray-600')}>{sound.word}</div>
      </Button>
    )
  })
}
