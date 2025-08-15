'use client'

import { useState } from 'react'
import { AccentType, IPASound } from '@/types/ipa'
import { ipaData } from './data'
import VowelTrapezoidal from './vowels-chart'
import VideoEmbed from './VideoEmbed'
import RecordingPanel from './RecordingPanel'
import AudioPlayer from './AudioPlayer'
import { cn } from '@/lib/utils'

export default function IPAChart() {
  const [accent, setAccent] = useState<AccentType>('uk')
  const [selectedSound, setSelectedSound] = useState<IPASound | undefined>()

  return (
    <div className={cn('content-wrapper space-y-8')}>
      {/* Main Grid Layout */}
      <div className={cn('grid grid-cols-1 gap-8', 'lg:grid-cols-3')}>
        {/* Left: Vowel Chart */}
        <div className={cn('rounded-lg border-2 border-gray-300 p-4', 'lg:col-span-2')}>
          <VowelTrapezoidal
            sounds={ipaData.vowels.monophthongs}
            accent={accent}
            onSoundSelect={setSelectedSound}
            selectedSound={selectedSound}
          />
        </div>

        {/* Right: Video & Recording */}
        <div className={cn('space-y-6')}>
          {/* Audio Controls & Recording Panel */}
          <div className={cn('grid grid-cols-1 gap-4', 'sm:grid-cols-3')}>
            <div className={cn('sm:col-span-1')}>
              <AudioPlayer
                accent={accent}
                onAccentChange={setAccent}
              />
            </div>
            <div className={cn('sm:col-span-2')}>
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
