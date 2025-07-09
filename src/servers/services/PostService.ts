import { PostRepository } from '@/servers/repositories/PostRepository'
import { Post, Posts } from '@/servers/interfaces/post'

interface FindAllPostsOptions {
  limit?: number
  offset?: number
}

export class PostService {
  private readonly repository = new PostRepository()

  async getPublishedPosts(options: FindAllPostsOptions = {}): Promise<Posts[]> {
    return this.repository.findPostsPublished(options)
  }

  async getPostBySlug(slug: string): Promise<Post> {
    if (!slug) throw new Error('Slug is required')
    return this.repository.findBySlug(slug)
  }

  async getAllPublishedSlugs(): Promise<{ slug: string }[]> {
    return this.repository.findAllSlugs()
  }
}

export const postService = new PostService()
