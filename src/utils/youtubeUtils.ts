export function parseYouTubeEmbed(url: string) {
  const [beforeQ, paramString = ''] = url.split('?')
  const parts = beforeQ.split('/embed/')
  const videoKey = parts[1]
  return { videoKey, paramString }
}
