import { Positions, Diphthongs } from '@/types/ipa'

// Standard IPA Consonant Chart positions
export const CONSONANT_POSITIONS: Positions = {
  // PLOSIVES
  // Bilabial
  p: { x: 6, y: 12 },
  b: { x: 12.5, y: 12 },

  // Alveolar
  t: { x: 45, y: 12 },
  d: { x: 51.5, y: 12 },

  // Velar
  k: { x: 77, y: 12 },
  g: { x: 83.5, y: 12 },

  // FRICATIVES
  // Labiodental
  f: { x: 19, y: 26 },
  v: { x: 25.5, y: 26 },

  // Dental
  θ: { x: 32, y: 26 },
  ð: { x: 38.5, y: 26 },

  // Alveolar
  s: { x: 45, y: 26 },
  z: { x: 51.5, y: 26 },

  // Post-alveolar
  ʃ: { x: 58, y: 26 },
  ʒ: { x: 64.5, y: 26 },

  // Glottal
  h: { x: 90, y: 26 },

  // AFFRICATES
  // Post-alveolar
  tʃ: { x: 58, y: 40 },
  dʒ: { x: 64.5, y: 40 },

  // NASALS
  // Bilabial
  m: { x: 12.5, y: 54 },

  // Dental
  n: { x: 38.5, y: 54 },

  // Velar
  ŋ: { x: 83.5, y: 54 },

  // LATERAL APPROXIMANT
  // Dental
  l: { x: 38.5, y: 68 },

  // APPROXIMANTS
  // Bilabial
  w: { x: 12.5, y: 82 },

  // Post-alveolar
  r: { x: 64, y: 82 },

  // Palatal
  j: { x: 71, y: 82 }
}

// Place of articulation labels
export const PLACE_LABELS = [
  { position: 6, label: 'Bilabial' },
  { position: 19, label: 'Labiodental' },
  { position: 32, label: 'Dental' },
  { position: 45, label: 'Alveolar' },
  { position: 58, label: 'Post-alveolar' },
  { position: 71, label: 'Palatal' },
  { position: 77, label: 'Velar' },
  { position: 90, label: 'Glottal' },
  { position: 96, label: '' }
]

// Manner of articulation labels
export const MANNER_LABELS = [
  { position: 10, label: 'Plosive' },
  { position: 24, label: 'Fricative' },
  { position: 38, label: 'Affricate' },
  { position: 52, label: 'Nasal' },
  { position: 66, label: 'Lateral Approximant' },
  { position: 80, label: 'Approximant' },
  { position: 94, label: '' }
]

// Traditional IPA vowel trapezoid positions
export const VOWEL_POSITIONS: Positions = {
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
export const VOICED_CONSONANTS = ['b', 'd', 'g', 'v', 'ð', 'z', 'ʒ', 'dʒ', 'm', 'n', 'ŋ', 'l', 'r', 'w', 'j']
