'use client'

import { IPASound } from '@/types/ipa'
import { cn } from '@/lib/utils'

interface WordExample {
  word: string
  ipa: string
}

interface WordExamples {
  start: WordExample[]
  middle: WordExample[]
  end: WordExample[]
}

// Word examples data for each IPA sound
const wordExamplesData: Record<string, WordExamples> = {
  iː: {
    start: [{ word: 'eat', ipa: '/iːt/' }],
    middle: [{ word: 'sleep', ipa: '/sliːp/' }],
    end: [{ word: 'tea', ipa: '/tiː/' }]
  },
  ɪ: {
    start: [{ word: 'it', ipa: '/ɪt/' }],
    middle: [{ word: 'ship', ipa: '/ʃɪp/' }],
    end: [{ word: 'city', ipa: '/ˈsɪti/' }]
  },
  ʊ: {
    start: [],
    middle: [{ word: 'foot', ipa: '/fʊt/' }],
    end: []
  },
  uː: {
    start: [],
    middle: [{ word: 'food', ipa: '/fuːd/' }],
    end: [{ word: 'blue', ipa: '/bluː/' }]
  },
  e: {
    start: [{ word: 'egg', ipa: '/eɡ/' }],
    middle: [{ word: 'bed', ipa: '/bed/' }],
    end: []
  },
  ə: {
    start: [{ word: 'about', ipa: '/əˈbaʊt/' }],
    middle: [{ word: 'teacher', ipa: '/ˈtiːtʃər/' }],
    end: [{ word: 'China', ipa: '/ˈtʃaɪnə/' }]
  },
  ɜː: {
    start: [{ word: 'early', ipa: '/ˈɜːli/' }],
    middle: [{ word: 'bird', ipa: '/bɜːd/' }],
    end: [{ word: 'her', ipa: '/hɜː/' }]
  },
  ɔː: {
    start: [{ word: 'all', ipa: '/ɔːl/' }],
    middle: [{ word: 'call', ipa: '/kɔːl/' }],
    end: [{ word: 'saw', ipa: '/sɔː/' }]
  },
  ʌ: {
    start: [{ word: 'up', ipa: '/ʌp/' }],
    middle: [{ word: 'but', ipa: '/bʌt/' }],
    end: []
  },
  æ: {
    start: [{ word: 'at', ipa: '/æt/' }],
    middle: [{ word: 'cat', ipa: '/kæt/' }],
    end: []
  },
  ɑː: {
    start: [{ word: 'arm', ipa: '/ɑːm/' }],
    middle: [{ word: 'car', ipa: '/kɑː/' }],
    end: [{ word: 'far', ipa: '/fɑː/' }]
  }
}

interface WordExamplesProps {
  readonly selectedSound?: IPASound
}

function ExampleSection({ title, examples }: Readonly<{ title: string; examples: WordExample[] }>) {
  const hasExamples = examples.length > 0

  return (
    <div>
      <h4 className={cn('mb-2 text-center text-xs font-medium text-gray-600')}>{title}</h4>
      {hasExamples ? (
        examples.map(example => (
          <div
            key={`${example.word}-${example.ipa}`}
            className={cn('rounded bg-gray-50 p-2 text-center hover:bg-gray-100')}
          >
            <div className={cn('truncate text-xs font-medium text-gray-900')}>{example.word}</div>
            <div className={cn('truncate font-mono text-xs text-blue-600')}>{example.ipa}</div>
          </div>
        ))
      ) : (
        <p className={cn('text-center text-xs text-gray-400')}>—</p>
      )}
    </div>
  )
}

const EmptyState = ({ message }: { message: string }) => (
  <div className={cn('rounded-lg border-2 border-gray-300 p-4 text-center')}>
    <p className={cn('text-sm text-gray-500')}>{message}</p>
  </div>
)

export default function WordExamples({ selectedSound }: WordExamplesProps) {
  if (!selectedSound) {
    return <EmptyState message='Click on any phonetic bro' />
  }

  const examples = wordExamplesData[selectedSound.symbol]

  if (!examples) {
    return <EmptyState message='No hope !!!' />
  }

  return (
    <div className={cn('rounded-lg border-2 border-gray-300 p-4')}>
      <div className={cn('mb-3 flex items-center justify-center gap-2')}>
        <h3 className={cn('text-sm font-medium text-gray-700')}>Examples for</h3>
        <span className={cn('rounded bg-blue-100 px-2 py-0.5 font-mono text-blue-800')}>/{selectedSound.symbol}/</span>
      </div>

      <div className={cn('grid grid-cols-3 gap-2')}>
        <ExampleSection
          title='Beginning'
          examples={examples.start}
        />
        <ExampleSection
          title='Middle'
          examples={examples.middle}
        />
        <ExampleSection
          title='End'
          examples={examples.end}
        />
      </div>
    </div>
  )
}
