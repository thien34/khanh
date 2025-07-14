import type { HTMLAttributes, DetailedHTMLProps, ReactNode, ReactElement } from 'react'
import Code from '../Code'
import { extractLanguage, formatLang } from '@/lib/mdx-utils'

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
  'data-title'?: string
  'data-selected'?: string
  'data-copy'?: string
  'data-footer'?: string
}

export function Pre({ children, ...props }: PreProps) {
  const dataTitle = props['data-title']
  const dataSelected = props['data-selected']
  const dataCopy = props['data-copy']
  const dataFooter = props['data-footer']

  const lines = countCodeLines(children)
  const language = extractLanguage(children)

  const { lang } = formatLang(language, dataTitle)
  const withCopy = parseBoolean(dataCopy ?? 'true')
  const withFooter = parseBoolean(dataFooter ?? 'true') ? lines > 0 : false

  return (
    <Code
      title={dataTitle}
      withFooter={withFooter}
      withCopyButton={withCopy}
      lines={lines}
      selected={dataSelected}
      language={lang}
    >
      {children}
    </Code>
  )
}
