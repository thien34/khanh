import { GenerateMetadata } from '@/components/client/meta/Metadata'
import { getBaseUrl } from '@/lib/url'
import { Metadata } from 'next'
import { postService } from '@/services/PostService'

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const { data: post } = await postService.getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  return GenerateMetadata({
    title: post.title,
    description: post.description,
    keywords: post.title,
    ogImage: '',
    currentUrl: `${getBaseUrl()}/blog/${slug}`
  })
}

export default async function Layout({ children }: Readonly<LayoutProps>) {
  return children
}
