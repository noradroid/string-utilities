import { useState } from 'react'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AppLayout, type UtilityId } from '@/components/AppLayout'
import { StringGenerator } from '@/features/string-generator/StringGenerator'
import { TextCounter } from '@/features/text-counter/TextCounter'

function ActiveFeature({ id }: { id: UtilityId }) {
  if (id === 'string-generator') return <StringGenerator />
  if (id === 'text-counter') return <TextCounter />
  return null
}

export default function App() {
  const [active, setActive] = useState<UtilityId>('string-generator')

  return (
    <ThemeProvider>
      <AppLayout active={active} onSelect={setActive}>
        <ActiveFeature id={active} />
      </AppLayout>
    </ThemeProvider>
  )
}
