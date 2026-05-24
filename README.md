# String Utilities

A collection of small browser-based utilities. Built with React, TypeScript, Vite, and shadcn/ui.

## Features

### String Generator
Generates a dash-separated string of valid words that meets a minimum character length.

- Set a minimum character count (default 32)
- Optionally include a number segment placed at a random position
- All words are unique within a single generated string
- Word pool is organised into categories (`nouns`, `adjectives`, `verbs`, `tech`, `loanWords`) for easy extension

### Text Counter
Live character, word, and line counts as you type or paste text.

## Stack

- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) (base-nova style, Base UI primitives)
- [lucide-react](https://lucide.dev)

## Getting started

```bash
npm install
npm run dev
```

## Adding a feature

1. Create `src/features/<kebab-name>/` with:
   - `<camelCaseFunctionName>.ts` — pure logic
   - `<PascalCaseName>.tsx` — React component using `<FeatureCard>`
2. Add the feature id to `UtilityId` and `NAV_ITEMS` in `src/components/AppLayout.tsx`
3. Add a case to `ActiveFeature` in `src/App.tsx`
