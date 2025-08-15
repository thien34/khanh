'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { IPASound, AccentType } from '@/types/ipa'

type AudioStatus = 'idle' | 'loading' | 'playing'

interface AudioManagerOptions {
  accent: AccentType
  onSoundSelect?: (sound: IPASound) => void
  timeoutMs?: number
  volume?: number
}

interface AudioState {
  currentSound: string | null
  status: AudioStatus
}

export function useAudioManager({ accent, onSoundSelect, timeoutMs = 5000, volume = 0.8 }: AudioManagerOptions) {
  const [state, setState] = useState<AudioState>({ currentSound: null, status: 'idle' })

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const playIdRef = useRef<string | null>(null)
  const timeoutRef = useRef<number | null>(null)

  const isCurrent = (id: string) => playIdRef.current === id

  const clearTimeoutSafe = () => {
    if (timeoutRef.current != null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const detachAll = (audio: HTMLAudioElement | null) => {
    if (!audio) return
    audio.oncanplay = null
    audio.onloadstart = null
    audio.onended = null
    audio.onerror = null
  }

  const cleanup = useCallback(() => {
    clearTimeoutSafe()
    if (audioRef.current) {
      try {
        audioRef.current.pause()
      } catch {}
      detachAll(audioRef.current)
      audioRef.current = null
    }
    playIdRef.current = null
    setState({ currentSound: null, status: 'idle' })
  }, [])

  const playSound = useCallback(
    async (sound: IPASound) => {
      if (state.status === 'playing' && state.currentSound === sound.symbol) return

      const id = `${sound.symbol}-${Date.now()}`
      playIdRef.current = id

      if (audioRef.current) {
        try {
          audioRef.current.pause()
        } catch {}
        detachAll(audioRef.current)
        audioRef.current = null
      }

      onSoundSelect?.(sound)
      setState({ currentSound: sound.symbol, status: 'loading' })

      const url = accent === 'uk' ? sound.audioUrlUk : sound.audioUrlUs

      if (!url) {
        console.warn(`No audio URL found for ${sound.symbol} (${accent})`)
        setState({ currentSound: null, status: 'idle' })
        return
      }

      const audio = new Audio(url)
      audioRef.current = audio
      audio.volume = volume

      audio.onloadstart = () => {
        if (isCurrent(id)) setState(prev => ({ ...prev, status: 'loading' }))
      }

      audio.oncanplay = () => {
        if (isCurrent(id)) setState(prev => ({ ...prev, status: 'playing' }))
      }

      audio.onended = () => {
        if (isCurrent(id)) {
          clearTimeoutSafe()
          setState({ currentSound: null, status: 'idle' })
        }
      }

      audio.onerror = () => {
        if (isCurrent(id)) {
          clearTimeoutSafe()
          setState({ currentSound: null, status: 'idle' })
        }
      }

      clearTimeoutSafe()
      timeoutRef.current = window.setTimeout(() => {
        if (isCurrent(id)) {
          try {
            audio.pause()
          } catch {}
          setState({ currentSound: null, status: 'idle' })
        }
      }, timeoutMs)

      try {
        await audio.play()
      } catch {
        if (isCurrent(id)) {
          clearTimeoutSafe()
          setState({ currentSound: null, status: 'idle' })
        }
      }
    },
    [accent, onSoundSelect, state.currentSound, state.status, timeoutMs, volume]
  )

  const stopSound = useCallback(() => {
    cleanup()
  }, [cleanup])

  useEffect(() => cleanup, [cleanup])

  return {
    currentSound: state.currentSound,
    isLoading: state.status === 'loading',
    isPlaying: state.status === 'playing',
    playSound,
    stopSound
  }
}
