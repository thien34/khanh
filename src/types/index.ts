export interface Navigation {
  id: number
  label: string
  href: string
  type: number
}

export type TBaseFrontMatter = {
  title: string
  description: string
}

export type TPageFrontMatter = TBaseFrontMatter

export type TPageOgImage = Partial<Pick<TPageFrontMatter, 'title' | 'description'>>

export type TPostFrontMatter = TBaseFrontMatter & {
  date: string
  lang: 'id' | 'en'
  tags: Array<string>
  category: string
}

export type TContentMeta = {
  meta: {
    views: number
    shares: number
  }
}
