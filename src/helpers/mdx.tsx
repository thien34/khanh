import slugify from 'slugify'

export const getSlug = (children: React.ReactNode): string => {
  if (typeof children === 'string') {
    return slugify(children, { lower: true })
  }

  return ''
}
