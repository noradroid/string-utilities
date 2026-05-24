import { useState } from 'react'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AppLayout, type UtilityId } from '@/components/AppLayout'
import { PassphraseGenerator } from '@/features/passphrase-generator/PassphraseGenerator'
import { TextCounter } from '@/features/text-counter/TextCounter'

function ActiveFeature({ id }: { id: UtilityId }) {
  if (id === 'passphrase-generator') return <PassphraseGenerator />
  if (id === 'text-counter') return <TextCounter />
  return null
}

export default function App() {
  const [active, setActive] = useState<UtilityId>('passphrase-generator')

  return (
    <ThemeProvider>
      <AppLayout active={active} onSelect={setActive}>
        <ActiveFeature id={active} />
      </AppLayout>
    </ThemeProvider>
  )
}
