'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { IPASound } from '@/types/ipa'
import { cn } from '@/lib/utils'

interface RecordingPanelProps {
  selectedSound?: IPASound
}

export default function RecordingPanel({ selectedSound }: Readonly<RecordingPanelProps>) {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const hasRecording = !!audioUrl
  const canRecord = !!selectedSound && !isRecording && !hasRecording

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (audioRef.current) audioRef.current.pause()
      if (audioUrl) URL.revokeObjectURL(audioUrl)
    }
  }, [audioUrl])

  const startRecording = async () => {
    if (!canRecord) return
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      const chunks: Blob[] = []

      mediaRecorder.ondataavailable = e => e.data.size > 0 && chunks.push(e.data)
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' })
        setAudioUrl(URL.createObjectURL(blob))
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)
      intervalRef.current = setInterval(() => setRecordingTime(t => t + 1), 1000)
    } catch (error) {
      console.error('Error starting recording:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) mediaRecorderRef.current.stop()
    setIsRecording(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const togglePlayback = () => {
    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    } else if (audioUrl) {
      const audio = new Audio(audioUrl)
      audio.onended = () => setIsPlaying(false)
      audio.play()
      audioRef.current = audio
      setIsPlaying(true)
    }
  }

  const clearRecording = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    if (audioRef.current) audioRef.current.pause()
    setAudioUrl(null)
    setIsPlaying(false)
    setRecordingTime(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getStatusText = () => {
    if (isRecording) return 'Recording...'
    if (hasRecording) return 'Ready to play'
    return 'Ready to record'
  }

  const getButtonClass = () => {
    if (isRecording) return 'bg-red-600 hover:bg-red-700'
    if (canRecord) return 'bg-red-500 hover:bg-red-600'
    return 'cursor-not-allowed bg-gray-300'
  }

  return (
    <div className={cn('flex flex-col items-center space-y-4 rounded-lg border-2 border-gray-300 p-4')}>
      <div className={cn('flex items-center space-x-4')}>
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={!canRecord && !isRecording}
          className={cn('h-16 w-16 rounded-full', getButtonClass())}
        >
          <div className={cn('bg-white', isRecording ? 'h-4 w-4' : 'h-6 w-6 rounded-full')} />
        </Button>

        <div className={cn('text-center')}>
          <div className={cn('text-sm text-gray-600')}>{getStatusText()}</div>
          <div className={cn('font-mono text-lg')}>{formatTime(recordingTime)}</div>
        </div>
      </div>

      {hasRecording && (
        <div className={cn('flex items-center space-x-2')}>
          <Button
            onClick={togglePlayback}
            variant='outline'
            size='sm'
          >
            {isPlaying ? 'Stop' : 'Play'}
          </Button>
          <Button
            onClick={clearRecording}
            variant='outline'
            size='sm'
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  )
}
