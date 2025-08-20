'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Source {
  title: string
  url: string
  institution?: string
}

const sources: Source[] = [
  {
    title: 'Interactive IPA Chart',
    url: 'https://www.ipachart.com/',
    institution: 'IPA Chart'
  },
  {
    title: 'American IPA Chart',
    url: 'https://americanipachart.com/',
    institution: 'American IPA Chart'
  },
  {
    title: 'English with Lucy - Phonemic Chart',
    url: 'https://englishwithlucy.com/phonemic-chart/',
    institution: 'English with Lucy'
  },
  {
    title: 'IPA 101 - UK Accent',
    url: 'https://ipa101.com/?accent=UK',
    institution: 'IPA 101'
  },
  {
    title: 'Sounds American',
    url: 'https://soundsamerican.net/',
    institution: 'Sounds American'
  },
  {
    title: 'Pronunciation Studio - IPA Chart',
    url: 'https://pronunciationstudio.com/english-ipa-chart/',
    institution: 'Pronunciation Studio'
  },
  {
    title: 'LangEek Pronunciation Guide',
    url: 'https://langeek.co/en/pronunciation',
    institution: 'LangEek'
  },
  {
    title: 'Duolingo Characters',
    url: 'https://www.duolingo.com/characters',
    institution: 'Duolingo'
  },
  {
    title: 'Cambridge Dictionary - IPA Chart',
    url: 'https://dictionary.cambridge.org/help/phonetics.html',
    institution: 'Cambridge University Press'
  },
  {
    title: 'International Phonetic Association',
    url: 'https://www.internationalphoneticassociation.org/',
    institution: 'International Phonetic Association'
  }
]

export default function SourcesSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={cn('mt-16 border-t border-gray-200 pt-8')}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'group flex w-full items-center justify-between text-left',
          'transition-colors hover:text-gray-900'
        )}
      >
        <h3 className={cn('text-base font-medium text-gray-700 group-hover:text-gray-900')}>Sources & References</h3>
        {isExpanded ? (
          <ChevronUp className={cn('h-4 w-4 text-gray-500')} />
        ) : (
          <ChevronDown className={cn('h-4 w-4 text-gray-500')} />
        )}
      </button>

      {/* Clean List */}
      {isExpanded && (
        <div className={cn('mt-4 space-y-3')}>
          <p className={cn('mb-6 text-sm text-gray-600')}>Educational resources used in this IPA chart:</p>

          <div className={cn('space-y-2')}>
            {sources.map(source => (
              <div
                key={source.title}
                className={cn('flex items-center justify-between py-1.5')}
              >
                <div className={cn('flex-1')}>
                  <div className={cn('text-sm font-medium text-gray-900')}>{source.title}</div>
                  {source.institution && <div className={cn('mt-0.5 text-xs text-gray-500')}>{source.institution}</div>}
                </div>

                <a
                  href={source.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cn(
                    'ml-4 flex items-center text-sm text-blue-600 hover:text-blue-800',
                    'transition-colors'
                  )}
                >
                  <ExternalLink className={cn('h-3 w-3')} />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
