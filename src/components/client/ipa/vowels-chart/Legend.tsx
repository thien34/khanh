import { cn } from '@/lib/utils'
import { LearningLevel } from '@/types/ipa'

interface LegendProps {
  readonly level: LearningLevel
}

interface LegendItem {
  readonly indicatorType: 'short' | 'long' | 'closing' | 'centering' | 'voiceless' | 'voiced'
  readonly label: string
}

function LegendItem({ indicatorType, label }: LegendItem) {
  return (
    <div className={cn('legend-item')}>
      <div className={cn('legend-indicator', `legend-indicator--${indicatorType}`)}></div>
      <span>{label}</span>
    </div>
  )
}

function getLegendItems(level: LearningLevel): LegendItem[] {
  switch (level) {
    case 1:
      return [
        { indicatorType: 'short', label: 'Short' },
        { indicatorType: 'long', label: 'Long' }
      ]
    case 2:
      return [
        { indicatorType: 'closing', label: 'Closing' },
        { indicatorType: 'centering', label: 'Centering' }
      ]
    case 3:
      return [
        { indicatorType: 'voiceless', label: 'Voiceless' },
        { indicatorType: 'voiced', label: 'Voiced' }
      ]
    default:
      return []
  }
}

export default function Legend({ level }: LegendProps) {
  return (
    <div className={cn('legend')}>
      {getLegendItems(level).map(item => (
        <LegendItem
          key={item.label}
          indicatorType={item.indicatorType}
          label={item.label}
        />
      ))}
    </div>
  )
}
