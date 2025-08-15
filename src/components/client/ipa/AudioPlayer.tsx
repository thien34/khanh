import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AccentType } from '@/types/ipa'

interface AudioPlayerProps {
  accent: AccentType
  onAccentChange: (accent: AccentType) => void
}

export default function AudioPlayer({ accent, onAccentChange }: Readonly<AudioPlayerProps>) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-2 rounded-lg bg-gray-50 p-4')}>
      <Button
        variant={accent === 'uk' ? 'default' : 'outline'}
        size='sm'
        onClick={() => onAccentChange('uk')}
      >
        UK
      </Button>
      <Button
        variant={accent === 'us' ? 'default' : 'outline'}
        size='sm'
        onClick={() => onAccentChange('us')}
      >
        US
      </Button>
    </div>
  )
}
