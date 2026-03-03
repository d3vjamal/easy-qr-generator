# Easy QR Generator

> Generate custom QR codes instantly — free, no login, no data stored.

A fast and fully client-side QR code generator that supports multiple QR types, real-time preview, custom colors, center icons, and PNG download.

---

## Features

### QR Code Types
| Type | What it encodes |
|------|----------------|
| **URL** | Any website link (auto-prepends `https://`) |
| **Text** | Plain text or any string |
| **Contact** | vCard 3.0 — name, phone, email, org, URL |
| **UPI Pay** | `upi://pay` deep-link for Indian payment apps |
| **WiFi** | WPA/WEP/open network credentials |
| **WhatsApp** | `wa.me` link with optional pre-filled message |

### Customisation
- **Foreground & background colors** — full color picker
- **Size** — adjustable via slider
- **Error correction level** — L / M / Q / H
- **Center icon** — pick from built-in icons (WiFi, WhatsApp, Phone, Email, Link) or upload your own image

### General
- Live QR preview that updates as you type
- Download as PNG
- Copy encoded data to clipboard
- Bilingual UI — English 🇺🇸 and Bengali 🇧🇩
- Fully client-side — nothing is sent to any server
- Responsive — works on mobile, tablet, and desktop

---

## Tech Stack

| Layer | Library / Tool |
|-------|---------------|
| Framework | [React 19](https://react.dev) + TypeScript |
| Build | [Vite 5](https://vitejs.dev) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite` |
| UI Primitives | [Radix UI](https://www.radix-ui.com) |
| QR Engine | [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) |
| Icons | [Lucide React](https://lucide.dev) |

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build
```

---

## Project Structure

```
src/
├── App.tsx                  # Root state, QR generation logic, layout
├── Header.tsx               # Top navigation bar
├── QrCodeDisplay.tsx        # Live QR preview + download / copy actions
├── QrUrlForm.tsx            # URL tab form
├── QrTextForm.tsx           # Text tab form
├── QrContactForm.tsx        # Contact / vCard form
├── QrUpiForm.tsx            # UPI payment form
├── QrWifiForm.tsx           # WiFi credentials form
├── QrWhatsappForm.tsx       # WhatsApp link form
├── ColorPicker.tsx          # Foreground + background color pickers
├── AppearanceSettings.tsx   # Size and error-correction controls
├── IconPicker.tsx           # Center icon selector + file upload
├── AboutMe.tsx / AboutMePage.tsx
├── TRANSLATIONS.ts          # i18n strings (en-US, bn-BD)
└── globals.css              # Tailwind base + custom animations

public/
├── logo.svg                 # App logo (also used as favicon)
└── icons/                   # Built-in center-icon options
    ├── wifi.svg
    ├── whatsapp.svg
    ├── phone.svg
    ├── email.svg
    └── link.svg
```

---

## Developer

Built with ❤️ by **Jamaluddin Mondal** — [@d3vjamal](https://www.linkedin.com/in/d3vjamal)
