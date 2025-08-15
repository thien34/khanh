import { cn } from '@/lib/utils'
import { IPASound, AccentType } from '@/types/ipa'
import { parseYouTubeEmbed } from '@/utils/youtubeUtils'
import { YouTubeEmbed } from '@next/third-parties/google'

interface VideoEmbedProps {
  selectedSound?: IPASound
  accent: AccentType
}

export default function VideoEmbed({ selectedSound, accent }: Readonly<VideoEmbedProps>) {
  if (!selectedSound) {
    return (
      <div className={cn('flex aspect-video w-full items-center justify-center rounded-lg bg-gray-100')}>
        <div className={cn('text-center text-gray-500')}>
          <div className={cn('mb-2 text-lg font-medium')}>Pronunciation Guide</div>
          <div className={cn('text-sm')}>Click on a vowel to see pronunciation video</div>
        </div>
      </div>
    )
  }

  const url = accent === 'uk' ? selectedSound.videoUrlUk : selectedSound.videoUrlUs

  if (url) {
    const youtubeUrl = parseYouTubeEmbed(url)

    return (
      <div className={cn('aspect-video w-full overflow-hidden rounded-lg')}>
        <YouTubeEmbed
          videoid={youtubeUrl.videoKey}
          params={youtubeUrl.paramString}
        />
      </div>
    )
  }
}
