import type { MDXComponents } from 'mdx/types'
import mdxCustomComponents from './components/mdx/custom-components'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...mdxCustomComponents,

    p: ({ children }) => <p className='mdx-p'>{children}</p>,

    strong: ({ children }) => <strong className='mdx-strong'>{children}</strong>,

    hr: () => <hr className='mdx-hr' />,

    ul: ({ children }) => <ul className='mdx-ul'>{children}</ul>,

    ol: ({ children }) => <ol className='mdx-ol'>{children}</ol>,

    li: ({ children }) => (
      <li className='relative mt-2 leading-relaxed first:mt-0'>
        <span className='absolute top-[7px] -left-7 size-3 rounded-sm bg-slate-500 md:-left-9 dark:bg-slate-400' />
        <span className='ml-2'>{children}</span>
      </li>
    ),

    blockquote: ({ children }) => (
      <blockquote className='relative my-6 py-1 pl-6 text-slate-600 dark:text-slate-400'>
        <span className='absolute top-0 bottom-0 left-0 w-1 rounded-full bg-slate-200 dark:bg-slate-800' />
        {children}
      </blockquote>
    )
  }
}
