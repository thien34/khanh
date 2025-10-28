import { NpmIcon, PnpmIcon, TypeScriptIcon, YarnIcon } from '@/components/Icons'
import {
  CssIcon,
  FileIcon,
  HtmlIcon,
  JavaScriptIcon,
  NpmFileIcon,
  ReactIcon,
  TailwindIcon
} from '@/components/IconsFile'
import { ReactElement, ReactNode } from 'react'
import slugify from 'slugify'

export const getSlug = (children: React.ReactNode): string => {
  if (typeof children === 'string') {
    return slugify(children, {
      lower: true,
      strict: true,
      locale: 'vi'
    })
  }

  return ''
}

export const urlType = (url: string) => {
  if (['/'].includes(url[0])) {
    return 'internal'
  }

  if (['#'].includes(url[0])) {
    return 'hash'
  }

  if (url.startsWith('mailto')) {
    return 'mail'
  }

  return 'external'
}

export const formatLang = (
  language: string,
  title?: string
): {
  lang: string
  icon: ReactElement
} => {
  let lang = language
  let icon = <FileIcon />

  switch (language) {
    case 'js':
    case 'javascript':
      lang = 'JavaScript'
      icon = <JavaScriptIcon />
      break
    case 'ts':
    case 'typescript':
      lang = 'TypeScript'
      icon = <TypeScriptIcon />
      break
    case 'jsx':
      lang = 'JavaScript React'
      icon = <ReactIcon />
      break
    case 'tsx':
      lang = 'TypeScript React'
      icon = <ReactIcon />
      break
    case 'html':
      lang = 'HTML'
      icon = <HtmlIcon />
      break
    case 'css':
      lang = 'CSS'
      icon = <CssIcon />
      break
    case 'bash':
    case 'cmd':
      lang = 'Terminal'
      break
    case 'json':
      lang = 'JSON'
      break
    case '':
      lang = 'Plain Text'
      break
    default:
      break
  }

  switch (title) {
    case 'tailwind.config.js':
      icon = <TailwindIcon />
      break
    case 'package.json':
      icon = <NpmFileIcon />
      break
    case 'npm':
      icon = <NpmIcon />
      break
    case 'pnpm':
      icon = <PnpmIcon />
      break
    case 'yarn':
      icon = <YarnIcon />
      break
    default:
      break
  }

  return { lang, icon }
}

export const extractLanguage = (children: ReactNode): string => {
  const element = children as ReactElement
  const props = element.props as { className: string }
  const rawClass = props?.className

  if (!rawClass) {
    return ''
  }

  const langMatch = rawClass.split(' ').find((c: string) => c.startsWith('language-'))
  return langMatch?.replace('language-', '') ?? ''
}
