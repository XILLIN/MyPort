# ⚡ DEV_PORTFOLIO — Retro Cyberpunk Terminal

> A retro-cyberpunk terminal developer portfolio built with **Vue 3**, **Vite**, and **Tailwind CSS v4**. Features interactive terminal components, CRT scanlines, custom cursor mechanics, bilingual support (TH/EN), and certificate viewer modal.

---

## 📸 Key Features

- **💻 Retro Terminal Aesthetics**: CRT flicker, scanline overlays, pixel typography, and glowing neon accents.
- **🌐 Full Bilingual Support (TH/EN)**: Instant client-side language switching powered by a reactive composable with `localStorage` persistence.
- **🎯 Dynamic Thai Typography**: Intelligent font switching to **Chakra Petch** and **IBM Plex Sans Thai** for pixel-crisp and legible Thai rendering.
- **🧭 High-Precision Scroll Spy**: 60 FPS smooth scroll tracking using `requestAnimationFrame` and viewport bounding calculations.
- **📜 Certificate Viewer Modal**: Automatic media format detection (`<img>` fit-content for images, `<iframe>` for PDFs) with body scroll locking and `<Teleport>` rendering.
- **🖱️ Interactive Custom Cursor**: Multi-layer cursor with expansion, screen blend modes, and hover states.
- **📱 Responsive & Accessible**: Custom desktop sidebar and mobile drawer navigation.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Framework** | [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom Vanilla CSS Utilities |
| **Typography** | `Press Start 2P`, `JetBrains Mono`, `Chakra Petch`, `IBM Plex Sans Thai` |
| **Animations & Effects** | CSS CRT Scanlines, Keyframe Glitch, GSAP / Typed.js |
| **Icons** | Modern emoji sets + Lucide Icons |

---

## 📂 Project Structure

```text
MyPort/
├── public/
│   ├── certificates/          # Place your certificate files (.pdf, .jpg, .png)
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/                # Static assets & styles
│   ├── components/
│   │   ├── sections/          # Page sections
│   │   │   ├── Hero.vue           # Boot sequence, typewriter, intro
│   │   │   ├── About.vue          # Bio terminal, timeline, education, focus
│   │   │   ├── Experience.vue     # Development & collaborative projects
│   │   │   ├── Projects.vue       # Project cards & highlights
│   │   │   ├── Skills.vue         # Grouped domain skills & legend
│   │   │   ├── Certifications.vue # Verification cards & modal viewer
│   │   │   └── Contact.vue        # Direct links & message terminal
│   │   ├── BackgroundEffects.vue  # CRT overlay & ambient lights
│   │   ├── LanguageSwitcher.vue   # Cyberpunk TH/EN switch button
│   │   ├── Sidebar.vue            # Navigation & system status bar
│   │   ├── Terminal.vue           # Reusable retro terminal container
│   │   └── TypingText.vue         # Animated typewriter heading
│   ├── composables/
│   │   └── useI18n.js             # Reactive language state & locale helpers
│   ├── data/
│   │   └── translations.js        # Content dictionary for TH and EN
│   ├── views/
│   │   └── Home.vue               # Main page layout & section composition
│   ├── App.vue                    # Root container & cursor tracker
│   ├── main.js                    # Application entry point
│   └── style.css                  # Tailwind v4 theme tokens & custom animations
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (version `18.x` or higher recommended)
- **npm**, **pnpm**, or **yarn**

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/XILLIN/MyPort.git
cd MyPort
npm install
```

### 3. Development Server
Start the local Vite development server:

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### 4. Production Build
Compile and bundle the project for production:

```bash
npm run build
```

The production assets will be generated inside the `dist/` folder. You can preview it with:

```bash
npm run preview
```

---

## ⚙️ Customization Guide

### Adding Certificates
Place your certificate images or PDF files in `public/certificates/`. Then, update the `certs` array in [Certifications.vue](file:///src/components/sections/Certifications.vue):

```javascript
const certs = [
  {
    title: 'Cyber Boot Camp',
    issuer: 'RMUTL ARIT NCSAสกมช BDE',
    date: '21 Aug 2026',
    icon: '🔐',
    color: '#00F5A0',
    file: '/certificates/cyber_cert.jpg', // Auto-detected as image
  },
]
```

### Editing Translations & Text
All bilingual strings are centralized in [translations.js](file:///src/data/translations.js). Simply edit the corresponding keys under `en` or `th` to change text site-wide.

---

## 👤 Author

- **GitHub**: [@XILLIN](https://github.com/XILLIN)
- **Facebook**: [profileinter](https://www.facebook.com/profileinter)
- **Discord**: `lixxert`

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
