export interface TextStats {
  chars: number
  charsNoSpaces: number
  words: number
  lines: number
}

export function countTextStats(text: string): TextStats {
  return {
    chars: text.length,
    charsNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
    lines: text === '' ? 0 : text.split('\n').length,
  }
}
