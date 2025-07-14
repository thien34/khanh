import { notFound } from 'next/navigation'

export default async function DocsPage() {
  try {
    const { default: Post } = await import(`@/contents/other/docs.mdx`)
    return <Post />
  } catch {
    notFound()
  }
}
