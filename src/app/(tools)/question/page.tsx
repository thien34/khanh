'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import image1 from './assets/1.gif'
import image2 from './assets/2.gif'
import image3 from './assets/3.gif'

export default function QuestionPage() {
  const [step, setStep] = useState<'question' | 'final'>('question')
  const [button2ClickCount, setButton2ClickCount] = useState(0)
  const [button1Scale, setButton1Scale] = useState(1)

  const handleButton1Click = () => {
    setStep('final')
  }

  const handleButton2Click = () => {
    setButton2ClickCount(prev => prev + 1)
    // Increase button 1 size by 20% each click
    setButton1Scale(prev => prev + 0.2)
  }

  if (step === 'final') {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-6 p-4'>
        <div className='relative aspect-square w-full max-w-[420px]'>
          <Image
            src={image3}
            alt='Chào con'
            fill
            sizes='(max-width: 480px) 80vw, 420px'
            className='rounded-lg object-contain'
            priority
          />
        </div>
        <h1 className='text-center text-2xl font-bold'>Chào con zai</h1>
      </div>
    )
  }

  const currentImage = button2ClickCount >= 3 ? image2 : image1

  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden p-4'>
      <div className='relative aspect-square w-full max-w-[420px]'>
        <Image
          src={currentImage}
          alt='Question'
          fill
          sizes='(max-width: 480px) 80vw, 420px'
          className='rounded-lg object-contain transition-all duration-300'
          priority
        />
      </div>

      <h1 className='text-center text-2xl font-bold'>Con có muốn làm con zai của ta không?</h1>

      <div className='relative flex items-center gap-4'>
        <Button
          onClick={handleButton1Click}
          className='rounded-4xl bg-blue-500 px-8 py-7 transition-all duration-300 ease-in-out'
          style={{
            transform: `scale(${button1Scale})`,
            transformOrigin: 'center'
          }}
        >
          Con chào cha
        </Button>

        <Button
          onClick={handleButton2Click}
          className='rounded-4xl bg-pink-500 px-8 py-7 transition-all duration-300'
        >
          Đóé
        </Button>
      </div>
    </div>
  )
}
