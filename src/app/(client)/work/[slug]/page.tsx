import { notFound } from 'next/navigation'
import { getAllSlugs } from '@/lib/mdx'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs('work').map(slug => ({ slug }))
}

export const dynamicParams = false

export default async function BlogPage({ params }: Readonly<PageProps>) {
  try {
    const { slug } = await params
    const { default: Post } = await import(`@/contents/work/${slug}.mdx`)
    return <Post />
  } catch {
    notFound()
  }
}
