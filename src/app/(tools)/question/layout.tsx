import { GenerateMetadata } from '@/components/client/meta/Metadata'
import { Metadata } from 'next'
import ogImage from '@public/images/og.png'
import { getBaseUrl } from '@/lib/url'

export const metadata: Metadata = GenerateMetadata({
  title: 'Con có muốn làm con zai của ta không?',
  description:
    'Một trang web tương tác vui nhộn với câu hỏi bất ngờ. Hãy chọn câu trả lời của bạn và xem điều gì sẽ xảy ra!',
  ogImage: ogImage.src,
  currentUrl: `${getBaseUrl()}/question`
})

export default function QuestionLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>
}
