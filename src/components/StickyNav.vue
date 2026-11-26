<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n'

const { t, lang, setLang } = useI18n()

const visible = ref(false)
const activeSection = ref('about')
const scrollProgress = ref(0)

const sections = [
  { id: 'about', key: 'story', num: '01' },
  { id: 'experience', key: 'experience', num: '02' },
  { id: 'projects', key: 'work', num: '03' },
  { id: 'skills', key: 'skills', num: '04' },
  { id: 'contact', key: 'message', num: '06' },
]

let rafId = null

function updateScroll() {
  const scrollY = window.scrollY
  const threshold = window.innerHeight * 0.82
  visible.value = scrollY > threshold

  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0

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
    class="fixed inset-x-0 top-0 z-30 border-b border-cream/15 bg-[#0a0a0a]/92 backdrop-blur-md transition-all duration-500"
    :class="visible ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'"
  >
    <div class="editorial-shell flex items-center justify-between py-4">
      <a
        href="#hero"
        @click.prevent="scrollToSection('hero')"
        class="font-hn text-base tracking-wide text-cream transition-opacity duration-300 hover:opacity-60"
      >
        {{ t.brand }}
      </a>

      <nav aria-label="Section navigation" class="hidden md:flex items-center gap-7 lg:gap-10 text-xs tracking-[0.14em] uppercase">
        <a
          v-for="item in sections"
          :key="item.id"
          :href="`#${item.id}`"
          @click.prevent="scrollToSection(item.id)"
          class="relative py-1 transition-colors duration-300 inline-flex items-baseline gap-2"
          :class="activeSection === item.id ? 'text-cream' : 'text-cream/45 hover:text-cream/85'"
        >
          <span class="hidden lg:inline font-mono text-[10px] text-cream/35">{{ item.num }}</span>
          <span>{{ t.nav[item.key] }}</span>
          <span
            class="absolute inset-x-0 -bottom-[17px] h-[1.5px] bg-cream transition-transform duration-300 origin-left"
            :class="activeSection === item.id ? 'scale-x-100' : 'scale-x-0'"
          />
        </a>
      </nav>

      <div class="flex items-center gap-6 text-xs">
        <button
          type="button"
          @click="toggleLanguage"
          class="cursor-pointer font-mono uppercase tracking-[0.16em] text-cream/65 transition-colors duration-300 hover:text-cream"
        >
          {{ lang === 'en' ? 'EN / TH' : 'TH / EN' }}
        </button>
        <a
          href="#github-commits"
          @click.prevent="scrollToSection('github-commits')"
          class="hidden lg:inline font-mono text-[11px] uppercase tracking-[0.16em] text-cream/55 transition-colors duration-300 hover:text-cream"
        >
          Commits
        </a>
        <a
          href="#contact"
          @click.prevent="scrollToSection('contact')"
          class="hidden sm:inline border border-cream/30 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.16em] text-cream transition-colors duration-300 hover:bg-cream hover:text-[#0a0a0a]"
        >
          {{ t.nav.message }}
        </a>
      </div>
    </div>

    <!-- Hairline reading progress bar -->
    <div class="absolute inset-x-0 bottom-0 h-px bg-transparent pointer-events-none">
      <div
        class="h-full bg-cream/40 transition-[width] duration-150 ease-out"
        :style="{ width: `${scrollProgress}%` }"
      />
    </div>
  </header>
</template>
