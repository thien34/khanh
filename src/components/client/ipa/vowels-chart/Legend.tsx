import { cn } from '@/lib/utils'
import { LearningLevel } from '@/types/ipa'

interface LegendProps {
  readonly level: LearningLevel
}

interface LegendItem {
  readonly indicatorType: 'short' | 'long' | 'closing' | 'centering'
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
  if (level === 1) {
    return [
      { indicatorType: 'short', label: 'Short' },
      { indicatorType: 'long', label: 'Long' }
    ]
  } else {
    return [
      { indicatorType: 'closing', label: 'Closing' },
      { indicatorType: 'centering', label: 'Centering' }
    ]
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
