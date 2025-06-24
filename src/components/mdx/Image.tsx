'use client'

import NextImage from 'next/image'
import { useState } from 'react'
import type { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

export default function Image({ className, src, ...props }: ImageProps) {
  const [image, setImage] = useState<string>('')

  return (
    <div className={cn('mdx-image relative')}>
      {image ? (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className={cn(
            'absolute -inset-8 z-[-1] rounded-[20%] bg-[length:180%_180%] bg-center opacity-25 blur-2xl',
            'hidden', // disable immersive on light mode
            'dark:block'
          )}
        />
      ) : null}
      <NextImage
        src={src}
        className={cn('rounded-lg border', className)}
        {...props}
        onLoad={event => {
          setImage(event.currentTarget.currentSrc)
        }}
      />
    </div>
  )
}
