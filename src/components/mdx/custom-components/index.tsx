import { H2, H3 } from './Heading'
import type { MDXComponents } from 'mdx/types'
import { Table } from './Table'
import { Pre } from './Pre'
import { Link } from './Link'
import CodeGroup from '../CodeGroup'
import Kbd from '@/components/mdx/Kbd'
import { Label } from '../Labels'
import Callout from '../Callout'
import { HStack, VStack } from '../Stack'
import Image from '../Image'
import ImageSensitive from '../ImageSensitive'
import InlineHighlight from '../InlineHighlight'
import { QuickView } from '../Link'
import { Dont } from '../TIL'
import { Do } from '../TIL'

const mdxCustomComponents: MDXComponents = {
  a: Link,
  h2: H2,
  h3: H3,
  table: Table,
  pre: Pre,
  Callout: Callout,
  CodeGroup: CodeGroup,
  Kbd: Kbd,
  Label: Label,
  VStack: VStack,
  HStack: HStack,
  Image: Image,
  ImageSensitive: ImageSensitive,
  InlineHighlight: InlineHighlight,
  QuickView: QuickView,
  Dont: Dont,
  Do: Do
}

export default mdxCustomComponents
