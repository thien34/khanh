import Page from '@/components/client/layouts/content-layout/Page'
import IPAChart from '@/components/client/ipa'

export default function IPAPage() {
  return (
    <Page
      frontMatter={{
        title: 'International Phonetic Alphabet (IPA) Chart',
        description: 'Interactive IPA chart for learning phonetic symbols and pronunciation',
        caption: 'Service'
      }}
    >
      <IPAChart />
    </Page>
  )
}
