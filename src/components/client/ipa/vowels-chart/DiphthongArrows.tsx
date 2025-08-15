import { CENTERING_DIPHTHONGS } from '@/constants/vowel'
import { VowelPosition, DiphthongData } from '@/types/ipa'
import { cn } from '@/lib/utils'

interface DiphthongArrowsProps {
  readonly diphthongs: Record<string, DiphthongData>
  readonly vowelPositions: Record<string, VowelPosition>
  readonly show: boolean
}

export default function DiphthongArrows({ diphthongs, vowelPositions, show }: DiphthongArrowsProps) {
  if (!show) return null

  return (
    <svg
      className={cn('pointer-events-none absolute inset-0 h-full w-full')}
      viewBox='0 0 100 100'
      preserveAspectRatio='none'
    >
      <defs>
        <marker
          id='blue'
          markerWidth='3'
          markerHeight='3'
          refX='2.5'
          refY='1.5'
          orient='auto'
        >
          <polygon
            points='0 0, 3 1.5, 0 3'
            fill='#3b82f6'
          />
        </marker>
        <marker
          id='green'
          markerWidth='3'
          markerHeight='3'
          refX='2.5'
          refY='1.5'
          orient='auto'
        >
          <polygon
            points='0 0, 3 1.5, 0 3'
            fill='#10b981'
          />
        </marker>
      </defs>

      {Object.entries(diphthongs).map(([diphthong, { start, end }]) => {
        const startPos = vowelPositions[start]
        const endPos = vowelPositions[end]
        if (!startPos || !endPos) return null

        // Button is positioned from top-left corner
        // Button size-14 = 56px, need to offset to center
        // In viewBox 0-100 scale, button center offset varies by container size
        // Container h-[581px], so 28px = ~4.8% of height
        // Container responsive width, so ~2.8% for width
        const offsetX = 2.8
        const offsetY = 4.8

        // Shorten arrow by fixed pixels from each end
        const dx = endPos.x - startPos.x
        const dy = endPos.y - startPos.y
        const length = Math.sqrt(dx * dx + dy * dy)

        if (length === 0) return null

        const shortenPx = 5 // Shorten by 5 units from each end
        const unitX = dx / length
        const unitY = dy / length

        let x1 = startPos.x + offsetX + unitX * shortenPx
        let y1 = startPos.y + offsetY + unitY * shortenPx
        let x2 = endPos.x + offsetX - unitX * shortenPx
        let y2 = endPos.y + offsetY - unitY * shortenPx

        const isGreen = CENTERING_DIPHTHONGS.includes(diphthong)

        if (diphthong === 'əʊ') {
          x1 -= 0.5
          x2 -= 0.5
          y1 -= 0.5
          y2 -= 0.5
        }
        if (diphthong === 'ʊə') {
          x1 += 0.5
          x2 += 0.5
          y1 += 0.5
          y2 += 0.5
        }

        return (
          <path
            key={diphthong}
            d={`M ${x1} ${y1} L ${x2} ${y2}`}
            stroke={isGreen ? '#10b981' : '#3b82f6'}
            strokeWidth='0.5'
            fill='none'
            markerEnd={`url(#${isGreen ? 'green' : 'blue'})`}
            className={cn('opacity-50')}
          />
        )
      })}
    </svg>
  )
}
