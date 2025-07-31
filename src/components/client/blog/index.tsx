'use client'

import { cn } from '@/lib/utils'
import PostPreview, { PostPreviewProps } from './PostPreview'
import BlogSidebar from './BlogSidebar'
import BlogFilter from './BlogFilter'
import { Posts } from '@/servers/interfaces/post.interface'
import { motion } from 'framer-motion'
import { useState } from 'react'

type BlogContentsProps = {
  posts: Posts[]
}

function BlogContents({ posts }: Readonly<BlogContentsProps>) {
  const [sortBy, setSortBy] = useState('newest')
  const [filterBy, setFilterBy] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const postsPreview: Array<PostPreviewProps> = []

  posts.forEach(({ slug, title, createdAt, lang, description, author, thumbnail, tags, readTime }) => {
    const preview: PostPreviewProps = {
      slug,
      title,
      date: createdAt.toISOString(),
      lang,
      description,
      thumbnail,
      author: {
        name: author.name,
        avatar: author.avatarUrl,
        verified: author.isVerified
      },
      readTime,
      views: Math.floor(Math.random() * 7950) + 50,
      upvotes: Math.floor(Math.random() * 500) + 10,
      tags: tags.map(tag => tag.name)
    }

    postsPreview.push(preview)
  })

  // Sort posts based on selected option
  const sortedPosts = [...postsPreview].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.views || 0) - (a.views || 0)
      case 'trending':
        return (b.views || 0) - (a.views || 0)
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      default: // newest
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
  })

  return (
    <div className={cn('content-wrapper')}>
      <div className={cn('flex flex-col gap-8', 'lg:flex-row lg:gap-12')}>
        {/* Sidebar */}
        <div className={cn('order-2 lg:order-1 lg:w-80')}>
          <BlogSidebar />
        </div>

        {/* Main Content */}
        <div className={cn('order-1 flex-1 lg:order-2')}>
          {/* Filter Component */}
          <BlogFilter
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            sortBy={sortBy}
            setSortBy={setSortBy}
            postsCount={sortedPosts.length}
          />

          {/* Posts Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={cn('grid gap-6', 'md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2')}
          >
            {sortedPosts
              .filter(post => filterBy === 'all' || post.tags?.includes(filterBy))
              .map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <PostPreview
                    slug={post.slug}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                    lang={post.lang}
                    views={post.views}
                    thumbnail={post.thumbnail}
                    author={post.author}
                    readTime={post.readTime}
                    tags={post.tags}
                    upvotes={post.upvotes}
                  />
                </motion.div>
              ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default BlogContents
