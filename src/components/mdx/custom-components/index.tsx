import { H2, H3 } from './Heading'
import type { MDXComponents } from 'mdx/types'
import { Table } from './Table'

const mdxCustomComponents: MDXComponents = {
  h2: H2,
  h3: H3,
  table: Table
}

export default mdxCustomComponents
