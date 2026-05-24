import { useState } from 'react'
import { Type } from 'lucide-react'
import { FeatureCard } from '@/components/FeatureCard'
import { countTextStats } from './countTextStats'

const STATS = [
  { key: 'chars',         label: 'Characters'           },
  { key: 'charsNoSpaces', label: 'Characters (no spaces)'},
  { key: 'words',         label: 'Words'                },
  { key: 'lines',         label: 'Lines'                },
] as const

export function TextCounter() {
  const [text, setText] = useState('')
  const stats = countTextStats(text)

  return (
    <FeatureCard
      icon={<Type className="size-5" />}
      title="Text Counter"
      description="Paste or type text to count characters, words, and lines."
    >
<textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste or type your text here…"
            rows={8}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm resize-y placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />

          <div className="grid grid-cols-2 gap-3">
            {STATS.map(({ key, label }) => (
              <div key={key} className="rounded-lg border border-border bg-muted/40 px-4 py-3">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-2xl font-semibold tabular-nums mt-0.5">{stats[key].toLocaleString()}</p>
              </div>
            ))}
          </div>
    </FeatureCard>
  )
}
