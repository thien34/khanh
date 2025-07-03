import { postService } from '@/services/PostService'
import { notFound } from 'next/navigation'

export const revalidate = 60
export const dynamicParams = true

// todo: lên chỉ lấy các slug cần ưu tiên vào nhanh, như các bài đầu, bài hot, bài mới nhất
export async function generateStaticParams() {
  const { data: slugs } = await postService.getAllPublishedSlugs()

  return slugs.map(({ slug }) => ({
    slug
  }))
}

export default async function Page({ params }: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params

  const { data: post, error } = await postService.getPostBySlug(slug)

  if (error || !post) {
    notFound()
  }

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <p>{post.content}</p>
    </main>
  )
}
