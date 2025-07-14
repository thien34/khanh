import { TPageFrontMatter, TTableOfContents } from '@/types'
import fs from 'fs'
import path from 'path'
import slugify from 'slugify'

export function getAllSlugs(folder: string): string[] {
  const dir = path.join(process.cwd(), `src/contents/${folder}`)
  return fs
    .readdirSync(dir)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''))
}

type MdxValue = {
  frontMatter: TPageFrontMatter
  tableOfContents: TTableOfContents
}

// Helper function to extract table of contents from MDX content
export function extractTableOfContents(content: string): TTableOfContents {
  // Extract headings with regex
  const headingRegex = /^(#{2,3})\s+(.+?)$/gm
  const matches = [...content.matchAll(headingRegex)]

  return matches.map(match => {
    const level = match[1].length - 1 // Adjust level (h2 -> level 1, h3 -> level 2)
    const text = match[2]
    const slug = slugify(text, {
      lower: true,
      strict: true, // Keep periods and hyphens in addition to word characters
      locale: 'vi'
    })

    return {
      title: text,
      depth: level, // Changed from "level" to "depth" to match TTableOfContentsItem
      slug // Changed from "url" to "slug" to match TTableOfContentsItem
    }
  })
}

export async function getMdxBySlug(slug: string, folder = 'work'): Promise<MdxValue> {
  try {
    const filePath = path.join(process.cwd(), `src/contents/${folder}/${slug}.mdx`)
    const content = fs.readFileSync(filePath, 'utf8')
    const tableOfContents = extractTableOfContents(content)

    const mod = await import(`@/contents/${folder}/${slug}.mdx`)
    return {
      frontMatter: mod.frontMatter,
      tableOfContents
    }
  } catch {
    return {
      frontMatter: {
        title: 'Not Found',
        description: 'This page does not exist.'
      },
      tableOfContents: []
    }
  }
}
