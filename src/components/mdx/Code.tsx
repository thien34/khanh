'use client'

import { PropsWithChildren, useRef, useState } from 'react'
import { ClipboardIcon } from '@/components/Icons'
import { cn } from '@/lib/utils'

interface CodeFooterProps {
  lines?: number
  language?: string
  selected?: string
}

function CodeFooter({ lines, language, selected }: Readonly<CodeFooterProps>) {
  return (
    <div className={cn('mdx-code__footer')}>
      {selected && <div className={cn('mdx-code__footer-item')}>Selected: {selected}</div>}
      {language && <div className={cn('mdx-code__footer-item')}>{language}</div>}
      {lines && lines > 0 && <div className={cn('mdx-code__footer-item hidden', 'sm:flex')}>Lines: {lines}</div>}
      <div className={cn('mdx-code__footer-item')}>UTF-8</div>
    </div>
  )
}

export type CodeProps = CodeFooterProps & {
  title?: string
  withCopyButton?: boolean
  withFooter?: boolean
}

function Code({
  title,
  lines,
  language,
  selected,
  withCopyButton = true,
  withFooter = true,
  children
}: PropsWithChildren<CodeProps>) {
  const codeRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState<boolean>(false)

  const copyToClipboard = async () => {
    try {
      const content = codeRef.current?.textContent ?? ''
      await navigator.clipboard.writeText(content)

      if (!copied) {
        setCopied(true)
        setTimeout(() => setCopied(false), 1000)
      }
    } catch {
      setCopied(false)
    }
  }

  return (
    <div
      className={cn('mdx-code')}
      title={title}
    >
      {withCopyButton && (
        <button
          type='button'
          className={cn('mdx-code__copy-button')}
          onClick={copyToClipboard}
          title='Copy to Clipboard'
          aria-label='Copy to Clipboard'
        >
          <div className={cn('mdx-code__copy-button-message', copied ? 'mdx-code__copy-button-message-copied' : '')}>
            Copied!
          </div>
          <ClipboardIcon />
        </button>
      )}
      <div className={cn('mdx-code__content')}>
        <pre ref={codeRef}>{children}</pre>
      </div>
      {withFooter && (
        <CodeFooter
          lines={lines}
          selected={selected}
          language={language}
        />
      )}
    </div>
  )
}

export default Code
