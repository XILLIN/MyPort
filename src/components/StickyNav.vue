<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n'

const { t, lang, setLang } = useI18n()

const visible = ref(false)
const activeSection = ref('about')

const sections = [
  { id: 'about', key: 'story' },
  { id: 'experience', key: 'experience' },
  { id: 'projects', key: 'work' },
  { id: 'skills', key: 'skills' },
  { id: 'contact', key: 'message' },
]

let rafId = null

function updateScroll() {
  const scrollY = window.scrollY
  const threshold = window.innerHeight * 0.82
  visible.value = scrollY > threshold

  const trigger = window.innerHeight * 0.35
  let current = 'about'
  for (const s of sections) {
    const el = document.getElementById(s.id)
    if (el && el.getBoundingClientRect().top <= trigger) {
      current = s.id
    }
  }
  activeSection.value = current
}

function onScroll() {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(updateScroll)
}

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function toggleLanguage() {
  setLang(lang.value === 'en' ? 'th' : 'en')
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  updateScroll()
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-30 border-b border-cream/15 bg-[#0a0a0a]/90 backdrop-blur-md transition-all duration-500"
    :class="visible ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'"
  >
    <div class="flex items-center justify-between px-6 py-4 sm:px-10">
      <a
        href="#hero"
        @click.prevent="scrollToSection('hero')"
        class="font-hn text-base tracking-wide text-cream transition-opacity duration-300 hover:opacity-60"
      >
        {{ t.brand }}
      </a>

      <nav aria-label="Section navigation" class="hidden md:flex items-center gap-8 text-xs tracking-[0.12em] uppercase">
        <a
          v-for="item in sections"
          :key="item.id"
          :href="`#${item.id}`"
          @click.prevent="scrollToSection(item.id)"
          class="transition-opacity duration-300"
          :class="activeSection === item.id ? 'text-cream opacity-100' : 'text-cream/50 hover:opacity-80'"
        >
          {{ t.nav[item.key] }}
        </a>
      </nav>

      <div class="flex items-center gap-6 text-xs">
        <button
          type="button"
          @click="toggleLanguage"
          class="cursor-pointer uppercase tracking-[0.16em] text-cream/70 transition-opacity duration-300 hover:opacity-100 hover:text-cream"
        >
          {{ lang === 'en' ? 'EN / TH' : 'TH / EN' }}
        </button>
        <a
          href="#contact"
          @click.prevent="scrollToSection('contact')"
          class="hidden sm:inline text-cream transition-opacity duration-300 hover:opacity-60"
        >
          {{ t.nav.message }}
        </a>
      </div>
    </div>
  </header>
</template>
