import type { HTMLAttributes, DetailedHTMLProps, ReactNode, ReactElement } from 'react'
import Code from '../Code'
import { extractLanguage, formatLang } from '@/helpers/mdx'

const parseBoolean = (value: string) => value === 'true'

// Helper function to count code lines from children
const countCodeLines = (children: ReactNode): number => {
  const element = children as ReactElement
  if (element.type === 'code') {
    const props = element.props as { children: ReactNode[] }
    return props.children.length
  }
  return 0
}

export type PreProps = DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> & {
  title?: string
  selected?: string
  copy?: string
  footer?: string
}

export function Pre({ children, title = '', selected = '', copy = 'true', footer = 'true' }: PreProps) {
  const lines = countCodeLines(children)
  const language = extractLanguage(children)

  const { lang } = formatLang(language, title)
  const withCopy = parseBoolean(copy)
  const withFooter = parseBoolean(footer) ? lines > 0 : false

  return (
    <Code
      title={title}
      withFooter={withFooter}
      withCopyButton={withCopy}
      lines={lines}
      selected={selected}
      language={lang}
    >
      {children}
    </Code>
  )
}
