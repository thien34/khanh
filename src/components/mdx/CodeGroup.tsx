'use client'

import { Children, useState } from 'react'
import { extractLanguage, formatLang } from '@/helpers/mdx'
import { type PreProps } from './custom-components/Pre'
import type { PropsWithChildren, ReactElement } from 'react'
import { cn } from '@/lib/utils'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

function CodeGroupFile({
  children = null,
  isSelected = false
}: Readonly<PropsWithChildren & { isSelected?: boolean }>) {
  return (
    <div className={cn('mdx-code-group__file')}>
      <div className={cn('mdx-code-group__file-content')}>
        {isSelected && (
          <>
            <div className={cn('mdx-code-group__file-bl')} />
            <div className={cn('mdx-code-group__file-br')} />
          </>
        )}
        {children}
      </div>
    </div>
  )
}

interface CodeGroupProps {
  children: ReactElement<PreProps> | ReactElement<PreProps>[]
  variant?: 'tab' | 'files'
}

function CodeGroup({ variant = 'tab', children }: Readonly<CodeGroupProps>) {
  const tabs: Array<{
    id: string
    icon: ReactElement
    title: string
    panel: ReactElement<PreProps>
  }> = []

  Children.forEach(children, (child, index) => {
    const title = child.props.title ?? ''
    const language = extractLanguage(child.props?.children)
    const { icon } = formatLang(language, title)

    tabs.push({
      id: `tab-${index}`,
      icon,
      title,
      panel: child
    })
  })

  const [activeTab, setActiveTab] = useState(tabs[0]?.id)

  return (
    <div className={cn('mdx-code-group', [variant === 'tab' ? 'mdx-code-group--tab' : 'mdx-code-group--files'])}>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className='w-full'
      >
        <div className={cn('mdx-code-group__header-wrapper')}>
          <TabsList className={cn('mdx-code-group__header')}>
            {tabs.map(({ id, title, icon }) =>
              variant === 'tab' ? (
                <TabsTrigger
                  key={id}
                  value={id}
                  className={cn('mdx-code-group__tab')}
                >
                  {icon}
                  {title}
                </TabsTrigger>
              ) : (
                <TabsTrigger
                  key={id}
                  value={id}
                  className={cn('mdx-code-group__file')}
                  asChild
                >
                  <div>
                    <CodeGroupFile isSelected={activeTab === id}>
                      {icon}
                      {title}
                    </CodeGroupFile>
                  </div>
                </TabsTrigger>
              )
            )}
          </TabsList>
        </div>
        <div className={cn('mdx-code-group__content')}>
          {tabs.map(({ id, panel }) => (
            <TabsContent
              key={id}
              value={id}
            >
              {panel}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  )
}

export default CodeGroup
