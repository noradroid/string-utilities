# String Utilities App — Plan

## Stack
- React + TypeScript + Vite
- shadcn/ui + Tailwind CSS
- lucide-react (icons, bundled with shadcn)

## Navigation
- Sidebar on desktop, hamburger drawer on mobile
- Dark mode: user toggle button

## File / Folder Conventions
- Folders: kebab-case
- React component files: PascalCase (.tsx)
- Function/data files: camelCase (.ts)

## Phases

### Phase 1 — Setup [ ]
- Configure vite.config.ts with @tailwindcss/vite
- Run `npx shadcn@latest init -y -d`
- Add shadcn components: button, input, label, card, checkbox, separator, sheet

### Phase 2 — Theme Provider [ ]
- src/components/ThemeProvider.tsx — context + localStorage for light/dark

### Phase 3 — App Shell [ ]
- src/App.tsx — routes active feature into content area
- src/components/AppLayout.tsx — fixed sidebar (desktop) + sheet drawer (mobile) + theme toggle

### Phase 4 — Word List [ ]
- src/features/string-generator/wordList.ts
- Structure: Record<string, string[]> keyed by category (nouns, adjectives, verbs, tech, loanWords)
- ~600 words total

### Phase 5 — Generation Function [ ]
- src/features/string-generator/wordsDashSeparatedWithMinLength.ts
- Flattens all word pools, picks randomly until total length (with dashes) >= minChars
- If includeNumbers: splices a random 2-digit number at a random segment position

### Phase 6 — String Generator Component [ ]
- src/features/string-generator/StringGenerator.tsx
- Inputs: min chars (number, default 32, min 8), include numbers (checkbox)
- Output: result display (monospace, break-all), char count, copy button with "Copied!" flash

### Phase 7 — Type-check [x]
- `npx tsc --noEmit` — fix any errors

### Phase 8 — Text Counter [x]
- src/features/text-counter/countTextStats.ts — pure function returning chars, charsNoSpaces, words, lines
- src/features/text-counter/TextCounter.tsx — textarea + live stat grid
- AppLayout: added text-counter to UtilityId and NAV_ITEMS
- App.tsx: wired TextCounter into ActiveFeature
