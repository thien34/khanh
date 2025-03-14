import Header from '@/components/client/layouts/navbar/Header'
import { GoogleAnalytics } from '@next/third-parties/google'

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <div>
      <Header />
      {children}
      {/* <Footer /> */}
      <GoogleAnalytics gaId='G-8SGSZPWCCR' />
    </div>
  )
}
