import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'
import { Children, isValidElement } from 'react'

type TableSectionProps = HTMLAttributes<HTMLTableSectionElement>
type TableRowProps = HTMLAttributes<HTMLTableRowElement>
type TableProps = HTMLAttributes<HTMLTableElement>

const filterValidChildren = (children: ReactNode) => {
  return Children.toArray(children).filter(child => {
    if (isValidElement(child)) return true
    if (typeof child === 'string') return child.trim().length > 0
    return true
  })
}

export function Tr({ children, ...props }: Readonly<TableRowProps>) {
  return <tr {...props}>{filterValidChildren(children)}</tr>
}

function TableSection({ children, as: Component, ...props }: TableSectionProps & { as: 'thead' | 'tbody' }) {
  const processedChildren = Children.map(children, child => {
    if (isValidElement(child) && child.type === 'tr') {
      return <Tr {...(child.props as TableRowProps)} />
    }
    return child
  })

  return <Component {...props}>{filterValidChildren(processedChildren)}</Component>
}

export function THead(props: Readonly<TableSectionProps>) {
  return (
    <TableSection
      as='thead'
      {...props}
    />
  )
}

export function TBody(props: Readonly<TableSectionProps>) {
  return (
    <TableSection
      as='tbody'
      {...props}
    />
  )
}

export function Table({ children, ...props }: Readonly<TableProps>) {
  const processedChildren = Children.map(children, child => {
    if (isValidElement(child)) {
      if (child.type === 'thead') return <THead {...(child.props as TableSectionProps)} />
      if (child.type === 'tbody') return <TBody {...(child.props as TableSectionProps)} />
    }
    return child
  })

  return (
    <div className={cn('mdx-table')}>
      <table {...props}>{filterValidChildren(processedChildren)}</table>
    </div>
  )
}
