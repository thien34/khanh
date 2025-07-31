import { PostRepository } from '@/servers/repositories/post-repository'
import { Post, Posts } from '@/servers/interfaces/post.interface'

export class PostService {
  private readonly repository = new PostRepository()

  async getPublishedPosts(): Promise<Posts[]> {
    const data = await this.repository.findPostsPublished()

    return data.map(item => ({
      title: item.title,
      slug: item.slug,
      createdAt: new Date(item.created_at),
      description: item.description,
      lang: item.lang,
      readTime: item.read_time,
      author: {
        name: item.content_user.name,
        avatarUrl: item.content_user.avatar_url,
        isVerified: item.content_user.is_verified
      },
      thumbnail: item.thumbnail,
      tags: item.tags
    }))
  }

  async getPostBySlug(slug: string): Promise<Post> {
    if (!slug) throw new Error('Slug is required')
    return this.repository.findBySlug(slug)
  }

  async getAllPublishedSlugs(): Promise<{ slug: string }[]> {
    return this.repository.findAllSlugs()
  }

  async getAllSlugsWithUpdatedDate(): Promise<{ slug: string; updatedAt: Date }[]> {
    return this.repository.findAllSlugsWithUpdatedDate()
  }
}

export const postService = new PostService()
