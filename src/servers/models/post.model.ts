import { BaseModel } from './base.model'

export interface PostModel extends BaseModel {
  type: string
  title: string
  slug: string
  published: boolean
  content: string
  lang: string
  description: string
  thumbnail: string
  author_id: string
}

export interface PostSummaryModel {
  title: string
  slug: string
  lang: string
  created_at: Date
  description: string
  author_id: string
  thumbnail: string
  read_time: number
  content_user: {
    name: string
    avatar_url: string
    is_verified: boolean
  }
  tags: {
    name: string
    slug: string
  }[]
}
