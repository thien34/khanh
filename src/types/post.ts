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
}

export interface Posts {
  id: string
  type: string
  title: string
  slug: string
  createdAt: Date
  updatedAt: Date
  lang: string
  description: string
}
