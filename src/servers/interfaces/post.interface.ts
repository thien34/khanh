import { User } from './user.interface'

export interface Post {
  id: string
  type: string
  title: string
  slug: string
  published: boolean
  createdAt: Date
  updatedAt: Date
  content: string
  lang: string
  description: string
  thumbnail: string
}

export interface Posts {
  title: string
  slug: string
  createdAt: Date
  lang: string
  description: string
  thumbnail: string
  readTime: number
  author: User
  tags: {
    name: string
    slug: string
  }[]
}
