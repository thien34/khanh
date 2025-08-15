export interface IPASound {
  symbol: string
  word: string
  category: 'monophthong' | 'diphthong' | 'consonant'
  videoUrlUk?: string
  videoUrlUs?: string
  audioUrlUk?: string
  audioUrlUs?: string
}

export interface IPAData {
  vowels: {
    monophthongs: IPASound[]
    diphthongs: IPASound[]
  }
  consonants: IPASound[]
}

export type AccentType = 'uk' | 'us'

export type LearningLevel = 1 | 2

export interface VowelPosition {
  x: number
  y: number
}

export interface DiphthongData {
  start: string
  end: string
}

export interface VowelPositions {
  [key: string]: VowelPosition
}

export interface Diphthongs {
  [key: string]: DiphthongData
}
