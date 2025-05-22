import fs from 'fs'
import path from 'path'

export function getAllSlugs(folder: string): string[] {
  const dir = path.join(process.cwd(), `src/contents/${folder}`)
  return fs
    .readdirSync(dir)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''))
}

type MdxCacheValue = {
  frontMatter: any
  Content: React.FC
}

const mdxCache = new Map<string, MdxCacheValue>()

// Helper function to extract table of contents from MDX content
function extractTableOfContents(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8')

  // Extract headings with regex
  const headingRegex = /^(#{2,3})\s+(.+?)$/gm
  const matches = [...content.matchAll(headingRegex)]

  const toc = matches.map(match => {
    const level = match[1].length - 1 // Adjust level (h2 -> level 1, h3 -> level 2)
    const text = match[2]
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s.-]/g, '') // Keep periods and hyphens in addition to word characters
      .replace(/\s+/g, '-')

    return {
      title: text,
      depth: level, // Changed from "level" to "depth" to match TTableOfContentsItem
      slug: slug // Changed from "url" to "slug" to match TTableOfContentsItem
    }
  })

  return toc
}

export async function getMdxBySlug(slug: string, folder = 'work'): Promise<MdxCacheValue> {
  const key = `${folder}/${slug}`
  if (mdxCache.has(key)) return mdxCache.get(key)!

  try {
    const filePath = path.join(process.cwd(), `src/contents/${folder}/${slug}.mdx`)
    const tableOfContents = extractTableOfContents(filePath)

    const mod = await import(`@/contents/${folder}/${slug}.mdx`)
    const value = {
      frontMatter: {
        ...mod.frontMatter,
        tableOfContents
      },
      Content: mod.default
    }
    mdxCache.set(key, value)
    return value
  } catch {
    const fallback = {
      frontMatter: {
        title: 'Not Found',
        description: 'This page does not exist.',
        tableOfContents: []
      },
      Content: () => null
    }
    mdxCache.set(key, fallback)
    return fallback
  }
}
