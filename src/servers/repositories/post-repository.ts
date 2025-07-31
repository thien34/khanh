import { createClient } from '@/lib/supabase/client'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { PostSummaryModel } from '../models/post.model'
import { Post } from '../interfaces/post.interface'

export class PostRepository {
  async findPostsPublished(): Promise<PostSummaryModel[]> {
    const supabase = createClient()
    const query = supabase
      .from('content_blog')
      .select(
        `
        title, slug, created_at, lang, description, author_id, thumbnail, read_time,
        content_user:author_id (
          name, avatar_url, is_verified
        ),
        content_blog_tag (  
          content_tag:tag_id (
            name, slug
          )
        )
      `
      )
      .eq('published', true)
      .eq('type', 'blog')
      .order('created_at', { ascending: false })

    const { data, error } = await query
    if (error) throw new Error(error.message)

    return data.map(item => {
      const { content_blog_tag, ...rest } = item
      return {
        ...rest,
        content_user: Array.isArray(item.content_user) ? item.content_user[0] : item.content_user,
        tags: Array.isArray(content_blog_tag)
          ? content_blog_tag
              .flatMap(tagRelation =>
                Array.isArray(tagRelation.content_tag) ? tagRelation.content_tag : [tagRelation.content_tag]
              )
              .filter(Boolean)
          : []
      }
    })
  }

  async findBySlug(slug: string): Promise<Post> {
    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from('content_blog')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle() // Returns one row or null, doesn't error if not found

    if (error) throw new Error(error.message)

    // Transform snake_case to camelCase
    const transformedData = {
      ...data,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    }

    return transformedData
  }

  async findAllSlugs(): Promise<{ slug: string }[]> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('content_blog')
      .select('slug') // Select the slug
      .eq('published', true) // Only generate paths for published posts

    if (error) throw new Error(error.message)

    return data
  }

  async findAllSlugsWithUpdatedDate(): Promise<{ slug: string; updatedAt: Date }[]> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('content_blog')
      .select('slug, updated_at') // Select the slug
      .eq('published', true)

    if (error) throw new Error(error.message)

    return data.map(item => ({
      slug: item.slug,
      updatedAt: new Date(item.updated_at)
    }))
  }
}

export const postRepository = new PostRepository()
