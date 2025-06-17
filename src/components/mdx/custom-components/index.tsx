import { H2, H3 } from './Heading'
import type { MDXComponents } from 'mdx/types'
import { Table } from './Table'
import { Pre } from './Pre'
import { Link } from './Link'

const mdxCustomComponents: MDXComponents = {
  a: Link,
  h2: H2,
  h3: H3,
  table: Table,
  pre: Pre
}

export default mdxCustomComponents
