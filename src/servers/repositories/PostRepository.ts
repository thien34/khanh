import { createClient } from '@/lib/supabase/client'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { Post, Posts } from '@/servers/interfaces/post'

interface FindAllPostsOptions {
  limit?: number
  offset?: number
  // Add other options like category filtering if needed
}

export class PostRepository {
  async findPostsPublished(options: FindAllPostsOptions = {}): Promise<Posts[]> {
    const supabase = createClient()
    let query = supabase
      .from('content_meta')
      .select('id, type, title, slug, created_at, updated_at, lang, description')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (options.limit) {
      query = query.limit(options.limit)
    }
    if (options.offset) {
      const from = options.offset
      const to = from + (options.limit ? options.limit - 1 : Infinity)
      query = query.range(from, to)
    }

    const { data, error } = await query
    if (error) throw new Error(error.message)

    // Transform snake_case to camelCase
    const transformedData: Posts[] = data
      ? data.map(item => ({
          ...item,
          createdAt: new Date(item.created_at),
          updatedAt: new Date(item.updated_at)
        }))
      : []

    return transformedData
  }

  async findBySlug(slug: string): Promise<Post> {
    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from('content_meta')
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
      .from('content_meta')
      .select('slug') // Select the slug
      .eq('published', true) // Only generate paths for published posts

    if (error) throw new Error(error.message)

    return data
  }
}

export const postRepository = new PostRepository()
