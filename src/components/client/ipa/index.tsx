'use client'

import { useState } from 'react'
import { IPASound, AccentType, LearningLevel } from '@/types/ipa'
import VideoEmbed from './VideoEmbed'
import RecordingPanel from './RecordingPanel'
import AudioPlayer from './AudioPlayer'
import LevelSelector from './vowels-chart/LevelSelector'
import { cn } from '@/lib/utils'
import UnifiedChart from './vowels-chart'

export default function IPAChart() {
  const [accent, setAccent] = useState<AccentType>('uk')
  const [selectedSound, setSelectedSound] = useState<IPASound | undefined>()
  const [level, setLevel] = useState<LearningLevel>(1)

  return (
    <div className={cn('content-wrapper space-y-8')}>
      <div className={cn('flex justify-center')}>
        <LevelSelector
          level={level}
          onLevelChange={setLevel}
          maxUnlockedLevel={3}
        />
      </div>

      {/* Main Grid Layout */}
      <div className={cn('grid grid-cols-1 gap-8', 'lg:grid-cols-3')}>
        {/* Left: Chart Area */}
        <div className={cn('rounded-lg border-2 border-gray-300 p-4', 'lg:col-span-2')}>
          <UnifiedChart
            accent={accent}
            onSoundSelect={setSelectedSound}
            selectedSound={selectedSound}
            level={level}
          />
        </div>

        {/* Right: Video & Recording */}
        <div className={cn('space-y-6')}>
          {/* Audio Controls & Recording Panel */}
          <div className={cn('grid grid-cols-3 gap-4')}>
            <div className={cn('col-span-1')}>
              <AudioPlayer
                accent={accent}
                onAccentChange={setAccent}
              />
            </div>
            <div className={cn('col-span-2')}>
              <RecordingPanel selectedSound={selectedSound} />
            </div>
          </div>

          {/* Video Guide */}
          <VideoEmbed
            selectedSound={selectedSound}
            accent={accent}
          />
        </div>
      </div>
    </div>
  )
}
