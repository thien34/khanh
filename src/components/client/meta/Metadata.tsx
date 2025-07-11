import { FB_LINK, GH_LINK } from '@/constants'
import { Metadata } from 'next'
import ogImg from '@public/images/og.png'

interface MetadataProps {
  title: string
  description: string
  ogImage: string
  currentUrl: string
  structuredData?: Record<string, unknown>
}

export function GenerateMetadata({
  title,
  description,
  ogImage = ogImg.src,
  currentUrl,
  structuredData
}: MetadataProps): Metadata {
  return {
    title: {
      template: '%s | Khanh · Fullstack Developer',
      default: 'Luoi Dev'
    },
    description,
    authors: [{ name: 'Khanh', url: FB_LINK }],
    alternates: {
      canonical: currentUrl,
      types: {
        'application/rss+xml': '/rss'
      }
    },
    applicationName: 'Luoi Dev',
    referrer: 'origin-when-cross-origin',
    creator: 'Khanh',
    publisher: 'Khanh',
    formatDetection: {
      email: false,
      address: false,
      telephone: false
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/favicon.ico'
    },
    metadataBase: new URL('https://luoi.dev'),
    manifest: '/manifest.webmanifest',
    openGraph: {
      title,
      description,
      url: currentUrl,
      type: 'website',
      locale: 'vi_VN',
      siteName: 'luoi dev',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Image for ${title}`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      site: '@luoi_dev',
      creator: '@luoi_dev',
      title,
      description,
      images: [
        {
          url: ogImage,
          alt: `Image for ${title}`
        }
      ]
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        'index': true,
        'follow': true,
        'noimageindex': false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    verification: {
      google: 'google',
      yandex: 'yandex',
      yahoo: 'yahoo',
      other: {
        me: [GH_LINK, FB_LINK]
      }
    },
    ...(structuredData && {
      other: {
        'application/ld+json': JSON.stringify(structuredData)
      }
    })
  }
}
