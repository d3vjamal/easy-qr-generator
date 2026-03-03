# QR Code Generator — Project Memory

## Tech Stack
- React 19 + TypeScript + Vite 5
- Tailwind CSS **v4** (using `@tailwindcss/vite` plugin — NOT postcss tailwindcss)
- shadcn/ui (Radix UI primitives) + lucide-react
- qr-code-styling (QR generation), react-color (SketchPicker), next-themes

## Key Config Fixes Applied
- `vite.config.ts`: Added `@tailwindcss/vite` plugin + `resolve.alias` for `@/` → `./src/`
- `tsconfig.app.json`: Added `baseUrl` + `paths` for `@/*` → `./src/*` alias
- `globals.css`: Uses `@import "tailwindcss"` (v4 syntax, not `@tailwind base/components/utilities`)
- `postcss.config.js`: Removed `tailwindcss` plugin (handled by Vite plugin instead)

## Design System (Post-Redesign)
- **Primary color**: Violet (oklch ~0.495 0.247 290 in light / 0.635 0.24 290 in dark)
- **Background**: Subtle violet-tinted slate in light, deep navy (#0c0c16) in dark
- **Cards**: White/bg-card with `rounded-2xl border border-border/60 shadow-sm`
- **Animations**: `animate-fade-in-up`, `animate-float`, `animate-pulse-glow`, `animate-gradient-shift`
- **Tabs**: `grid grid-cols-3 sm:grid-cols-6` pill style with `data-[state=active]:bg-white`

## Layout (App.tsx)
- Sticky glassmorphism header (`sticky top-0 z-50 backdrop-blur-xl`)
- Hero section with badge + gradient title (violet→indigo gradient on "FREE")
- Desktop: `lg:col-span-7` form left | `lg:col-span-5 lg:sticky lg:top-[4.5rem]` QR right
- Mobile: form → QR preview → mobile color picker (stacked)
- Each section in its own `bg-card rounded-2xl` card

## Component Architecture
- `Header.tsx` — Sticky glassmorphism nav
- `App.tsx` — Main state + layout orchestration
- `QrCodeDisplay.tsx` — QR with gradient glow ring + Download/Copy buttons
- `ColorPicker.tsx` — Collapsible swatch buttons that toggle SketchPicker
- `AppearanceSettings.tsx` — Slider for size + segmented buttons for error level (L/M/Q/H)
- `IconPicker.tsx` — Icon grid + upload dialog (no Button import needed)
- `AboutMe.tsx` — Modern profile card with gradient banner
- Form components: all use `space-y-3` with icon-in-input pattern (`pl-9`)

## Known Files
- `src/QRCodeTabs.tsx` — Deprecated stub (was using @mui/material, now just `export {}`)
- `src/TRANSLATIONS.ts` — en-US + bn-BD translations (~85 keys each)
- `src/useQrCode.ts` — Legacy hook, not used
- `src/AboutDeveloper.tsx` — Empty stub

## Build
- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build` (clean build confirmed ✓)
