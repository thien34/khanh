import { PropsWithChildren } from 'react'
// import WithReactions from '@/components/layouts/WithReactions'
import type { TPostFrontMatter, TTableOfContents } from '@/types'
import WithTableOfContents from '../../WithTableOfContents'
import PageHeader from '../../PageHeader'
import PostMeta from './PostMeta'
import PostFooter from './PostFooter'

interface PostProps {
  frontMatter: TPostFrontMatter
  tableOfContents: TTableOfContents
}

function Post({
  frontMatter: { title, description, caption, category, date, lang, tags },
  tableOfContents,
  children = null
}: PropsWithChildren<PostProps>) {
  // get og image urls
  // const postOgImages = getPostOgImageUrl({
  //   category: caption ?? category,
  //   title,
  //   date,
  //   lang,
  //   tags
  // })

  // get structured data
  // const structuredData = getPostStructuredData({
  //   title,
  //   dateModified: date,
  //   datePublished: date,
  //   images: [postOgImages['1/1'], postOgImages['4/3'], postOgImages['16/9']]
  // })

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        caption={caption}
      />
      <PostMeta
        date={date}
        lang={lang}
      />
      <WithTableOfContents tableOfContents={tableOfContents}>
        {children}
        <PostFooter
          tags={tags}
          category={category}
        />
      </WithTableOfContents>
      {/* <WithReactions
        contentTitle={title}
        contentType='POST'
      /> */}
    </>
  )
}

export default Post
