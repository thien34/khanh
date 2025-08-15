import { IPASound, LearningLevel, AccentType, Diphthongs } from '@/types/ipa'
import {
  COMPONENT_VOWELS,
  CENTERING_DIPHTHONGS,
  US_EXCLUDED_MONOPHTHONGS,
  US_EXCLUDED_DIPHTHONGS,
  LONG_VOWEL_MARK
} from '../constants/vowel'

function filterByAccent(sounds: IPASound[], accent: AccentType): IPASound[] {
  if (accent !== 'us') return sounds
  return sounds.filter(sound => !(sound.category === 'monophthong' && US_EXCLUDED_MONOPHTHONGS.has(sound.symbol)))
}

function selectMonophthongs(sounds: IPASound[]): IPASound[] {
  return sounds.filter(sound => sound.category === 'monophthong')
}

function selectDiphthongs(sounds: IPASound[]): IPASound[] {
  return sounds.filter(sound => sound.category === 'diphthong')
}

function ensureSoundWithSymbol(list: IPASound[], symbol: string, fallback: IPASound): IPASound[] {
  return list.some(sound => sound.symbol === symbol) ? list : [...list, fallback]
}

/**
 * Filter sounds based on learning level
 */
export function getFilteredSounds(sounds: IPASound[], level: LearningLevel, accent: AccentType): IPASound[] {
  const accentAdjusted = filterByAccent(sounds, accent)

  if (level === 1) {
    return selectMonophthongs(accentAdjusted)
  }

  if (level === 2) {
    // Component monophthongs
    let componentMonophthongs = selectMonophthongs(accentAdjusted).filter(sound =>
      COMPONENT_VOWELS.includes(sound.symbol)
    )
    componentMonophthongs = ensureSoundWithSymbol(componentMonophthongs, 'a', {
      symbol: 'a',
      word: '',
      category: 'monophthong'
    })

    if (accent === 'us') {
      componentMonophthongs = componentMonophthongs.filter(sound => sound.symbol !== 'ə')
      componentMonophthongs = ensureSoundWithSymbol(componentMonophthongs, 'o', {
        symbol: 'o',
        word: '',
        category: 'monophthong'
      })
    }

    // Diphthongs
    let diphthongs = selectDiphthongs(accentAdjusted)
    if (accent === 'us') {
      diphthongs = diphthongs.filter(sound => !US_EXCLUDED_DIPHTHONGS.has(sound.symbol))
      diphthongs = ensureSoundWithSymbol(diphthongs, 'oʊ', {
        symbol: 'oʊ',
        word: 'boat',
        category: 'diphthong',
        videoUrlUs: 'https://www.youtube-nocookie.com/embed/Civ7UBZP99M?start=15&modestbranding=1&color=white&rel=0',
        audioUrlUk: '',
        audioUrlUs: 'https://alphabets-resources.duolingo.com/audio/pronunciation/ow.mp3'
      })
    }

    return [...componentMonophthongs, ...diphthongs]
  }

  return accentAdjusted
}

/**
 * Get cell color based on sound type
 */
export function getCellColor(sound: IPASound): string {
  if (sound.category === 'diphthong') {
    if (CENTERING_DIPHTHONGS.includes(sound.symbol)) {
      return 'bg-green-100/50 hover:bg-green-200/50 border-green-300/50'
    }
    return 'bg-blue-100/50 hover:bg-blue-200/50 border-blue-300/50'
  }

  if (sound.symbol.includes(LONG_VOWEL_MARK)) {
    return 'bg-orange-100/50 hover:bg-orange-200/50 border-orange-300/50'
  }

  return 'bg-yellow-100/50 hover:bg-yellow-200/50 border-yellow-300/50'
}

/**
 * Filter diphthong arrows to render on the chart based on level and accent
 */
export function getFilteredDiphthongs(diphthongs: Diphthongs, level: LearningLevel, accent: AccentType): Diphthongs {
  if (level === 2 && accent === 'us') {
    const baseEntries = Object.entries(diphthongs).filter(([key]) => !US_EXCLUDED_DIPHTHONGS.has(key))
    return { ...Object.fromEntries(baseEntries), oʊ: { start: 'o', end: 'ʊ' } }
  }

  return diphthongs
}
