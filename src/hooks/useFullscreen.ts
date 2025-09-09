'use client'

import { useCallback, useEffect, useState } from 'react'

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const sync = () => setIsFullscreen(!!document.fullscreenElement)

    document.addEventListener('fullscreenchange', sync)
    sync()

    return () => {
      document.removeEventListener('fullscreenchange', sync)
    }
  }, [])

  const enter = useCallback(async () => {
    await document.documentElement.requestFullscreen()
  }, [])

  const exit = useCallback(async () => {
    await document.exitFullscreen()
  }, [])

  const toggle = useCallback(async () => {
    if (document.fullscreenElement) {
      await exit()
    } else {
      await enter()
    }
  }, [enter, exit])

  return { isFullscreen, enter, exit, toggle }
}
