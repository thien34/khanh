import BlogContents from '@/components/client/blog'
import HeaderImage from '@/components/client/blog/HeaderImage'
import Page from '@/components/client/layouts/content-layout/Page'
import { postService } from '@/servers/services/post-service'

export const revalidate = 60

export default async function Blog() {
  const posts = await postService.getPublishedPosts()

  return (
    <Page
      frontMatter={{
        title: 'Personal Blog',
        description: 'Web development thoughts and stories.'
      }}
      headerImage={<HeaderImage />}
    >
      <BlogContents posts={posts || []} />
    </Page>
  )
}
