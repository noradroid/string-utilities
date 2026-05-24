import { useState } from 'react'
import { Check, Copy, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { FeatureCard } from '@/components/FeatureCard'
import { wordsDashSeparatedWithMinLength } from './wordsDashSeparatedWithMinLength'

export function StringGenerator() {
  const [minChars, setMinChars] = useState(32)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)

  function generate() {
    setResult(wordsDashSeparatedWithMinLength(minChars, includeNumbers))
    setCopied(false)
  }

  async function copy() {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard access denied or unavailable
    }
  }

  return (
    <FeatureCard
      icon={<Wand2 className="size-5" />}
      title="String Generator"
      description="Generate a dash-separated string of valid words meeting a minimum character length."
    >
<div className="flex flex-col gap-1.5">
            <Label htmlFor="min-chars">Minimum characters</Label>
            <Input
              id="min-chars"
              type="number"
              min={8}
              max={500}
              value={minChars}
              onChange={e => setMinChars(Math.max(8, Number(e.target.value)))}
              className="w-32"
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="include-numbers"
              checked={includeNumbers}
              onCheckedChange={v => setIncludeNumbers(v === true)}
            />
            <Label htmlFor="include-numbers" className="cursor-pointer">
              Include numbers
            </Label>
          </div>

          <Button onClick={generate} className="self-start">
            Generate
          </Button>

          {result && (
            <div className="rounded-lg border border-border bg-muted/40 p-4">
              <p className="font-mono text-sm break-all leading-relaxed">{result}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-muted-foreground">{result.length} characters</span>
                <Button variant="outline" size="sm" onClick={copy} className="gap-1.5">
                  {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              </div>
            </div>
          )}
    </FeatureCard>
  )
}
