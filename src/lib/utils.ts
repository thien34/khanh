import { clsx, type ClassValue } from 'clsx'
import { isValid, parseISO, format, differenceInDays, parse } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: string) => {
  const parsed = parse(date, 'yyyy-MM-dd', new Date())

  if (isValid(parsed)) {
    return format(parsed, 'MMMM d, yyyy')
  }

  return date
}

export const formatDateRelative = (date: string) => {
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
