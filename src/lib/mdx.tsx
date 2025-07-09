import { TTableOfContents } from '@/types'
import fs from 'fs'
import path from 'path'
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

export function getAllSlugs(folder: string): string[] {
  const dir = path.join(process.cwd(), `src/contents/${folder}`)
  return fs
    .readdirSync(dir)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''))
}

type MdxValue = {
  frontMatter: any
  tableOfContents: TTableOfContents
}

// Helper function to extract table of contents from MDX content
export function extractTableOfContents(content: string): TTableOfContents {
  // Extract headings with regex
  const headingRegex = /^(#{2,3})\s+(.+?)$/gm
  const matches = [...content.matchAll(headingRegex)]

  return matches.map(match => {
    const level = match[1].length - 1 // Adjust level (h2 -> level 1, h3 -> level 2)
    const text = match[2]
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s.-]/g, '') // Keep periods and hyphens in addition to word characters
      .replace(/\s+/g, '-')

    return {
      title: text,
      depth: level, // Changed from "level" to "depth" to match TTableOfContentsItem
      slug // Changed from "url" to "slug" to match TTableOfContentsItem
    }
  })
}

export async function getMdxBySlug(slug: string, folder = 'work'): Promise<MdxValue> {
  try {
    const filePath = path.join(process.cwd(), `src/contents/${folder}/${slug}.mdx`)
    const content = fs.readFileSync(filePath, 'utf8')
    const tableOfContents = extractTableOfContents(content)

    const mod = await import(`@/contents/${folder}/${slug}.mdx`)
    return {
      frontMatter: mod.frontMatter,
      tableOfContents
    }
  } catch {
    return {
      frontMatter: {
        title: 'Not Found',
        description: 'This page does not exist.'
      },
      tableOfContents: []
    }
  }
}

export const getSlug = (children: React.ReactNode): string => {
  if (typeof children === 'string') {
    return slugify(children, { lower: true })
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
  const rawClass = props.className
  const langMatch = rawClass.split(' ').find((c: string) => c.startsWith('language-'))
  return langMatch?.replace('language-', '') ?? ''
}
