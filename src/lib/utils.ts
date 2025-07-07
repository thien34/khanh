import { TPostFrontMatter } from '@/types'
import { clsx, type ClassValue } from 'clsx'
import { isValid, parseISO, format, differenceInDays, parse, formatISO } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: string) => {
  if (!date) return ''
  const parsed = new Date(date)

  if (isValid(parsed)) {
    return format(parsed, 'MMMM d, yyyy')
  }

  return date
}

export const formatDateISO = (date: string) => {
  if (!date) return ''
  const parsed = parse(date, 'yyyy-MM-dd', new Date())
  return isValid(parsed) ? formatISO(parsed) : date
}

export const formatLang = (lang: TPostFrontMatter['lang']) => {
  switch (lang) {
    case 'vi':
      return 'Tiếng Việt'
    case 'en':
      return 'English'
    default:
      return ''
  }
}

export const formatDateRelative = (date: string) => {
  if (!date) return ''
  const parsedDate = parseISO(date)

  if (isValid(parsedDate)) {
    const days = differenceInDays(new Date(), parsedDate)

    if (days > 6) {
      return format(parsedDate, 'dd/MM/yyyy')
    }

    if (days > 1) {
      return `${days} days ago`
    }

    if (days === 1) {
      return `Yesterday`
    }

    if (days === 0) {
      return `Today`
    }
  }

  return date
}
