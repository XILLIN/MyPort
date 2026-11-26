<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { X } from 'lucide-vue-next'
import { useI18n } from '../../composables/useI18n'

const { t, lang, setLang } = useI18n()

const menuOpen = ref(false)

const navItems = [
  { id: 'about', key: 'story' },
  { id: 'experience', key: 'experience' },
  { id: 'projects', key: 'work' },
  { id: 'skills', key: 'skills' },
  { id: 'contact', key: 'message' },
]

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/XILLIN' },
  { label: 'Discord', href: 'https://discord.gg/hweauyFCYN' },
  { label: 'Facebook', href: 'https://www.facebook.com/profileinter' },
]

const baseUrl = import.meta.env.BASE_URL
const PORTRAIT_IMAGE = `${baseUrl}Removal-963_20261126_113519_0000.png`

const ORBIT_TEXT = 'SYN — ORIGIN · SYN — ORIGIN · '
const orbitChars = Array.from(ORBIT_TEXT).map((char, index, arr) => ({
  char: char === ' ' ? '\u00A0' : char,
  angle: (360 / arr.length) * index,
}))

watch(menuOpen, (isOpen) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }
})

function handleKeydown(e) {
  if (e.key === 'Escape' && menuOpen.value) {
    menuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
  window.removeEventListener('keydown', handleKeydown)
})

function navigateTo(id) {
  menuOpen.value = false
  setTimeout(() => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 120)
}

function toggleLanguage() {
  setLang(lang.value === 'en' ? 'th' : 'en')
}
</script>

<template>
  <section id="hero" class="relative h-[100dvh] w-full overflow-hidden bg-[#0a0a0a] text-cream font-hn">
    <!-- Layer 0: Subtle dark editorial studio tonal backdrop -->
    <div
      aria-hidden="true"
      class="anim-fade-in pointer-events-none absolute inset-0 select-none"
      style="background: radial-gradient(ellipse 68% 72% at 50% 42%, #1d1c1a 0%, #10100f 52%, #0a0a0a 100%)"
    />

    <!-- Layer 10: 3D Orbiting Text — BACK HALF (passes behind portrait cutout) -->
    <div
      class="anim-fade-in orbit-scene pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden select-none"
      style="animation-delay: 500ms; --orbit-r: clamp(165px, 34vw, 360px)"
      aria-hidden="true"
    >
      <div class="orbit-tilt relative -translate-y-[4vh] sm:-translate-y-[3vh]">
        <div class="orbit-spinner relative h-0 w-0">
          <span
            v-for="(item, idx) in orbitChars"
            :key="`back-${idx}`"
            class="orbit-char font-hn font-normal text-[clamp(1.9rem,5.2vw,4.6rem)] leading-none tracking-tight text-cream/35"
            :style="{
              transform: `translate(-50%, -50%) rotateY(${item.angle}deg) translateZ(var(--orbit-r)) rotateY(180deg)`,
            }"
          >
            <span class="inline-block -scale-x-100">{{ item.char }}</span>
          </span>
        </div>
      </div>
    </div>

    <!-- Layer 20: Foreground portrait cutout (full color) -->
    <div class="pointer-events-none absolute inset-0 z-20 flex items-end justify-center overflow-hidden select-none">
      <img
        :src="PORTRAIT_IMAGE"
        alt="Portrait"
        class="anim-rise-in h-[86dvh] sm:h-[96dvh] w-auto max-w-none object-contain object-bottom"
        style="animation-delay: 300ms"
      />
    </div>

    <!-- Layer 25: 3D Orbiting Text — FRONT HALF (sweeps in front of portrait cutout) -->
    <div
      class="anim-fade-in orbit-scene pointer-events-none absolute inset-0 z-[25] flex items-center justify-center overflow-hidden select-none"
      style="animation-delay: 500ms; --orbit-r: clamp(165px, 34vw, 360px)"
      aria-label="Syn — Origin"
    >
      <div class="orbit-tilt relative -translate-y-[4vh] sm:-translate-y-[3vh]">
        <div class="orbit-spinner relative h-0 w-0">
          <span
            v-for="(item, idx) in orbitChars"
            :key="`front-${idx}`"
            class="orbit-char font-hn font-normal text-[clamp(1.9rem,5.2vw,4.6rem)] leading-none tracking-tight text-cream drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)]"
            :style="{
              transform: `translate(-50%, -50%) rotateY(${item.angle}deg) translateZ(var(--orbit-r))`,
            }"
          >
            {{ item.char }}
          </span>
        </div>
      </div>
    </div>

    <!-- Subtle bottom fade so cream rule & footer copy stay razor-sharp -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 bottom-0 z-[28] h-40 sm:h-44 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/75 to-transparent"
    />

    <!-- Layer 30: Horizontal cream rule above footer -->
    <div
      class="anim-line absolute inset-x-6 sm:inset-x-10 bottom-[5.5rem] sm:bottom-28 z-30 h-0.5 bg-cream"
      style="animation-delay: 1200ms"
    />

    <!-- Layer 30: Header chrome -->
    <header class="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8">
      <!-- Top-left Brand -->
      <a
        href="#hero"
        @click.prevent="navigateTo('hero')"
        class="anim-fade-up font-hn text-lg tracking-wide text-cream transition-opacity duration-300 hover:opacity-60"
        style="animation-delay: 800ms"
      >
        {{ t.brand }}
      </a>

      <!-- Desktop Right Cluster -->
      <div class="hidden sm:flex items-start gap-14 lg:gap-20 xl:gap-24">
        <!-- Year & subtle language toggle -->
        <div
          class="anim-fade-up flex flex-col items-start gap-1 text-sm text-cream"
          style="animation-delay: 900ms"
        >
          <span>{{ t.year }}</span>
          <button
            type="button"
            @click="toggleLanguage"
            class="cursor-pointer text-xs tracking-[0.14em] uppercase text-cream/60 transition-opacity duration-300 hover:opacity-100 hover:text-cream"
            :aria-label="lang === 'en' ? 'Switch to Thai' : 'Switch to English'"
          >
            {{ lang === 'en' ? 'EN / TH' : 'TH / EN' }}
          </button>
        </div>

        <!-- Nav Column -->
        <nav aria-label="Primary" class="flex flex-col gap-0.5 text-sm">
          <a
            v-for="(item, i) in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            @click.prevent="navigateTo(item.id)"
            class="anim-fade-up text-cream transition-opacity duration-300 hover:opacity-60"
            :style="{ animationDelay: `${1000 + i * 80}ms` }"
          >
            {{ t.nav[item.key] }}
          </a>
        </nav>

        <!-- Social Column -->
        <div class="flex flex-col gap-0.5 text-sm">
          <a
            v-for="(social, i) in socialLinks"
            :key="social.label"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            class="anim-fade-up text-cream transition-opacity duration-300 hover:opacity-60"
            :style="{ animationDelay: `${1150 + i * 80}ms` }"
          >
            {{ social.label }}
          </a>
        </div>
      </div>

      <!-- Mobile-only Hamburger -->
      <button
        type="button"
        @click="menuOpen = !menuOpen"
        class="anim-fade-up sm:hidden relative z-50 flex h-10 w-10 items-center justify-center cursor-pointer"
        style="animation-delay: 900ms"
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation menu"
      >
        <span class="relative block h-4 w-6">
          <span
            class="absolute left-0 block h-[1.5px] w-full bg-cream transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
            :class="menuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'"
          />
          <span
            class="absolute left-0 top-1/2 block h-[1.5px] w-full -translate-y-1/2 bg-cream transition-opacity duration-300"
            :class="menuOpen ? 'opacity-0' : 'opacity-100'"
          />
          <span
            class="absolute left-0 block h-[1.5px] w-full bg-cream transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
            :class="menuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'"
          />
        </span>
      </button>
    </header>

    <!-- Layer 30: Footer copy -->
    <footer
      class="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between px-6 pb-5 sm:px-10 sm:pb-8 text-xs sm:text-sm leading-relaxed font-hn text-cream"
    >
      <div class="anim-fade-up" style="animation-delay: 1400ms">
        <p v-for="line in t.hero.footerLeft" :key="line">{{ line }}</p>
      </div>

      <div class="anim-fade-up text-right" style="animation-delay: 1550ms">
        <p v-for="line in t.hero.footerRight" :key="line">{{ line }}</p>
      </div>
    </footer>

    <!-- Mobile Drawer Backdrop (z-40) -->
    <div
      class="sm:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500"
      :class="menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
      @click="menuOpen = false"
    />

    <!-- Mobile Drawer Panel (z-40) -->
    <aside
      class="sm:hidden fixed inset-y-0 right-0 z-40 flex w-[80%] max-w-sm flex-col justify-between bg-[#141414] px-8 py-10 text-cream transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
      :class="menuOpen ? 'translate-x-0' : 'translate-x-full'"
      aria-label="Mobile navigation"
    >
      <!-- Close button (z-50) -->
      <button
        type="button"
        @click="menuOpen = false"
        aria-label="Close navigation menu"
        class="absolute right-6 top-6 z-50 flex h-10 w-10 items-center justify-center text-cream cursor-pointer transition-all duration-300 hover:opacity-60"
        :class="menuOpen ? 'rotate-0 opacity-100 delay-300' : 'rotate-90 opacity-0 delay-0'"
      >
        <X :size="26" :stroke-width="1.5" />
      </button>

      <!-- Site Index -->
      <div class="mt-14">
        <p
          class="mb-6 text-xs uppercase tracking-[0.2em] text-cream/50 transition-all duration-500"
          :class="menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
          :style="{ transitionDelay: menuOpen ? '250ms' : '0ms' }"
        >
          {{ t.drawer.siteIndex }}
        </p>

        <nav class="flex flex-col gap-3">
          <a
            v-for="(item, i) in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            @click.prevent="navigateTo(item.id)"
            class="font-hn text-4xl leading-tight text-cream transition-all duration-500 hover:opacity-60"
            :class="menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
            :style="{ transitionDelay: menuOpen ? `${300 + i * 80}ms` : '0ms' }"
          >
            {{ t.nav[item.key] }}
          </a>
        </nav>
      </div>

      <!-- Find Me + Language -->
      <div class="space-y-6">
        <div>
          <p
            class="mb-3 text-xs uppercase tracking-[0.2em] text-cream/50 transition-all duration-500"
            :class="menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
            :style="{ transitionDelay: menuOpen ? '500ms' : '0ms' }"
          >
            {{ t.drawer.findMe }}
          </p>

          <div class="flex flex-wrap gap-x-5 gap-y-2">
            <a
              v-for="(social, i) in socialLinks"
              :key="social.label"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-cream transition-all duration-500 hover:opacity-60"
              :class="menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
              :style="{ transitionDelay: menuOpen ? `${550 + i * 60}ms` : '0ms' }"
            >
              {{ social.label }}
            </a>
          </div>
        </div>

        <div
          class="border-t border-cream/15 pt-5 flex items-center justify-between transition-all duration-500"
          :class="menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
          :style="{ transitionDelay: menuOpen ? '700ms' : '0ms' }"
        >
          <span class="text-xs uppercase tracking-[0.2em] text-cream/50">{{ t.drawer.language }}</span>
          <button
            type="button"
            @click="toggleLanguage"
            class="cursor-pointer text-sm tracking-[0.14em] text-cream transition-opacity duration-300 hover:opacity-60"
          >
            {{ lang === 'en' ? 'EN / TH' : 'TH / EN' }}
          </button>
        </div>
      </div>
    </aside>
  </section>
</template>
