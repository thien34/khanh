import { postService } from '@/servers/services/PostService'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'
import withCodeAttributes from '@/lib/withCodeAttributes'
import { useMDXComponents } from '@/mdx-components'
import Post from '@/components/client/layouts/content-layout/Post'
import { TPostFrontMatter } from '@/types'
import { extractTableOfContents } from '@/lib/mdx'

export const revalidate = 60
export const dynamicParams = true

// todo: nên chỉ lấy các slug cần ưu tiên vào nhanh, như các bài đầu, bài hot, bài mới nhất
export async function generateStaticParams() {
  const slugs = await postService.getAllPublishedSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function Page({ params }: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params

  const post = await postService.getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const frontMatter: TPostFrontMatter = {
    title: post.title,
    description: post.description,
    caption: '',
    date: post.createdAt.toString(),
    lang: post.lang,
    tags: [],
    category: ''
  }

  return (
    <Post
      frontMatter={frontMatter}
      tableOfContents={extractTableOfContents(post.content)}
    >
      <MDXRemote
        source={post.content}
        components={useMDXComponents({})}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypePrism, withCodeAttributes]
          }
        }}
      />
    </Post>
  )
}
