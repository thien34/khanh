'use client'

import { useState } from 'react'
import { EyeSlash } from '@/components/Icons'
import Image from '@/components/mdx/Image'
import { cn } from '@/lib/utils'
import { ImageProps } from 'next/image'

type ImageSensitiveProps = ImageProps & {
  message?: string
}

export default function ImageSensitive({ message = '', ...props }: ImageSensitiveProps) {
  const [shown, setShown] = useState<boolean>(false)

  const width = props.width
  const height = props.height
  const aspectRatio = `${width} / ${height}`

  return (
    <div className={cn('mdx-image-sensitive relative')}>
      <button
        type='button'
        className={cn(
          'absolute right-4 bottom-4 z-20 flex h-8 items-center rounded-full border bg-white/70 px-4 text-sm',
          'md:right-6 md:bottom-6',
          'dark:bg-slate-900/80'
        )}
        onClick={() => setShown(!shown)}
      >
        {shown ? 'Hide' : 'Show'}
      </button>
      {shown ? (
        <Image
          {...props}
          alt={props.alt}
        />
      ) : (
        <div
          className={cn('background-grid flex max-w-full items-center justify-center rounded-lg border')}
          style={{
            aspectRatio,
            width: `${width}px`
          }}
        >
          <div className={cn('flex flex-col items-center gap-1 px-4 text-center')}>
            <EyeSlash className={cn('mb-2 h-5 w-5')} />
            <div className={cn('font-bold')}>{message || 'Sensitive Content'}</div>
            <p className={cn('text-sm')}>WARNING: This image is flagged as sensitive content.</p>
          </div>
        </div>
      )}
    </div>
  )
}
