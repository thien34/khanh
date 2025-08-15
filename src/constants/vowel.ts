import { VowelPositions, Diphthongs } from '@/types/ipa'

// Traditional IPA vowel trapezoid positions
export const VOWEL_POSITIONS: VowelPositions = {
  // Level 1: Monophthongs
  iː: { x: 13, y: 10 },
  ɪ: { x: 35, y: 20 },
  uː: { x: 73, y: 10 },
  ʊ: { x: 65, y: 20 },

  e: { x: 29, y: 52 },
  ə: { x: 56, y: 46 },
  ɜː: { x: 58, y: 53 },
  ɔː: { x: 83, y: 51 },

  æ: { x: 44, y: 75 },
  ʌ: { x: 60, y: 70 },
  ɑː: { x: 79, y: 82 },
  ɒ: { x: 84, y: 75 },

  // Additional vowel positions for diphthongs
  a: { x: 61, y: 75 },
  o: { x: 79, y: 40 }, //US only

  // Level 2: Diphthongs - Fixed positions
  eɪ: { x: 29, y: 32 },
  aɪ: { x: 37, y: 34 },
  ɔɪ: { x: 48, y: 25 },
  aʊ: { x: 67, y: 35 },
  əʊ: { x: 57, y: 30 },
  ɪə: { x: 45, y: 41 },
  eə: { x: 44, y: 54 },
  ʊə: { x: 62, y: 39 },
  // GA variant for "oʊ" diphthong (dot position)
  oʊ: { x: 74, y: 28 }
}

// Diphthong definitions with their component vowels and movement
export const DIPHTHONGS: Diphthongs = {
  eɪ: { start: 'e', end: 'ɪ' },
  aɪ: { start: 'a', end: 'ɪ' },
  ɔɪ: { start: 'ɔː', end: 'ɪ' },
  aʊ: { start: 'a', end: 'ʊ' },
  əʊ: { start: 'ə', end: 'ʊ' },
  ɪə: { start: 'ɪ', end: 'ə' },
  eə: { start: 'e', end: 'ə' },
  ʊə: { start: 'ʊ', end: 'ə' }
}

// Centering diphthongs (end with ə)
export const CENTERING_DIPHTHONGS = ['ɪə', 'eə', 'ʊə']

// Component vowels used in diphthongs
export const COMPONENT_VOWELS = ['ɪ', 'e', 'ə', 'ʊ', 'ɔː', 'a']

export const US_EXCLUDED_MONOPHTHONGS = new Set(['ɒ'])
export const US_EXCLUDED_DIPHTHONGS = new Set(['ɪə', 'ʊə', 'eə', 'əʊ'])
export const LONG_VOWEL_MARK = 'ː'
