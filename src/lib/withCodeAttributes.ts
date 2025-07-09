import { visit } from 'unist-util-visit'

const VALID_PROPS = ['title', 'selected', 'copy', 'footer']

export default function rehypeCustomCodeProps() {
  return (tree: any) => {
    visit(tree, 'element', node => {
      if (node.tagName !== 'pre') return
      const codeNode = node.children?.[0]
      if (!codeNode || codeNode.tagName !== 'code') return

      const meta = codeNode.data?.meta
      if (typeof meta !== 'string') return

      const matches = [...meta.matchAll(/\{(\w+)(?::([^}]+))?\}/g)]

      for (const match of matches) {
        const key = match[1]
        let val = match[2] ?? 'true'

        // remove quote if wrapped in "" or ''
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1)
        }

        if (VALID_PROPS.includes(key)) {
          node.properties ??= {}
          node.properties[`data-${key}`] = val
        }
      }
    })
  }
}
