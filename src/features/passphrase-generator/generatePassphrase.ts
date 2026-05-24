import { ALL_WORDS } from './wordList.js'

function randomWord(): string {
  return ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)]
}

export function generatePassphrase(minChars: number, includeNumbers: boolean): string {
  const num = includeNumbers ? String(Math.floor(Math.random() * 90) + 10) : null
  // Subtract the number's contribution (its length + 1 dash) so the words loop
  // targets a length that leaves exactly the right gap for the number.
  const effectiveMin = num ? minChars - num.length - 1 : minChars

  const segments: string[] = []
  const used = new Set<string>(num ? [num] : [])
  let totalLen = 0

  while (totalLen < effectiveMin) {
    let word = randomWord()
    while (used.has(word)) word = randomWord()
    used.add(word)
    if (segments.length > 0) totalLen++ // dash
    totalLen += word.length
    segments.push(word)
  }

  if (num) {
    const pos = Math.floor(Math.random() * (segments.length + 1))
    segments.splice(pos, 0, num)
  }

  return segments.join('-')
}
