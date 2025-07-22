import { GenerateMetadata } from '@/components/client/meta/Metadata'
import { getBaseUrl } from '@/lib/url'
import { Metadata } from 'next'
import { postService } from '@/servers/services/post-service'

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = await params
  const post = await postService.getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  return GenerateMetadata({
    title: post.title,
    description: post.description,
    ogImage: '',
    currentUrl: `${getBaseUrl()}/blog/${slug}`
  })
}

export default async function Layout({ children }: LayoutProps) {
  return children
}
