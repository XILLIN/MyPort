<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from '../composables/useI18n'
import LanguageSwitcher from './LanguageSwitcher.vue'

const baseUrl    = import.meta.env.BASE_URL
const { t } = useI18n()
const route      = useRoute()
const mobileOpen = ref(false)
const activeId   = ref('hero')

const navItems = [
  { id: 'hero',           label: 'Home',          icon: '>' },
  { id: 'about',          label: 'About',          icon: '>' },
  { id: 'experience',     label: 'Experience',     icon: '>' },
  { id: 'projects',       label: 'Projects',       icon: '>' },
  { id: 'skills',         label: 'Skills',         icon: '>' },
  { id: 'certifications', label: 'Certifications', icon: '>' },
  { id: 'contact',        label: 'Contact',        icon: '>' },
]

let isScrollingTo = false
let scrollTimeout = null
let rafId = null

function updateActiveSection() {
  if (isScrollingTo) return

  const scrollY = window.scrollY
  const windowHeight = window.innerHeight
  const docHeight = document.documentElement.scrollHeight

  // If scrolled near bottom of page, highlight the last section (Contact)
  if (windowHeight + scrollY >= docHeight - 80) {
    activeId.value = navItems[navItems.length - 1].id
    return
  }

  // Trigger point: 35% from the top of the viewport
  const triggerPoint = windowHeight * 0.35
  let currentId = navItems[0].id

  for (const item of navItems) {
    const el = document.getElementById(item.id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= triggerPoint) {
        currentId = item.id
      }
    }
  }

  activeId.value = currentId
}

function handleScroll() {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(updateActiveSection)
}

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    activeId.value = id
    isScrollingTo = true
    clearTimeout(scrollTimeout)

    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    mobileOpen.value = false

    scrollTimeout = setTimeout(() => {
      isScrollingTo = false
      updateActiveSection()
    }, 800)
  }
}

watch(() => route.fullPath, () => {
  setTimeout(updateActiveSection, 200)
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleScroll, { passive: true })

  updateActiveSection()
  setTimeout(updateActiveSection, 150)
  setTimeout(updateActiveSection, 500)
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  clearTimeout(scrollTimeout)
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
})
</script>

<template>
  <!-- Mobile top controls -->
  <div class="fixed top-4 left-4 right-4 z-50 lg:hidden flex items-center justify-between pointer-events-none">
    <button
      class="pointer-events-auto p-2 border border-primary/30 bg-card/80 backdrop-blur-sm text-primary cursor-pointer hover:border-primary/60 transition-colors"
      @click="mobileOpen = !mobileOpen"
      aria-label="Toggle menu"
    >
      <span class="font-pixel text-xs">{{ mobileOpen ? 'X' : '≡' }}</span>
    </button>

    <div class="pointer-events-auto">
      <LanguageSwitcher />
    </div>
  </div>

  <!-- Sidebar backdrop (mobile) -->
  <div
    v-if="mobileOpen"
    class="fixed inset-0 z-40 bg-black/60 lg:hidden"
    @click="mobileOpen = false"
  />

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed top-0 left-0 h-screen w-72 z-40 flex flex-col',
      'bg-card/95 backdrop-blur-md border-r border-primary/10',
      'transition-transform duration-300',
      mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <!-- Top glow line -->
    <div class="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

    <!-- Profile area -->
    <div class="px-6 py-6 flex flex-col items-center border-b border-primary/10">
      <!-- Avatar with animated neon glow -->
      <div class="relative mb-3">
        <div class="w-20 h-20 rounded-full border-2 border-primary/50 flex items-center justify-center bg-bg overflow-hidden glow-green">
          <img :src="`${baseUrl}profile.jpg`" class="w-full h-full object-cover" alt="Profile avatar">
        </div>
        <!-- Orbiting dot -->
        <span class="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
        <span class="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-primary" />
      </div>

      <h1 class="font-pixel text-[10px] text-primary text-glow-green text-center leading-relaxed mb-1">
        {{ t.sidebar.title }}
      </h1>
      <p class="text-muted text-xs text-center font-mono mb-3">
        {{ t.sidebar.role }}
      </p>

      <!-- Status pill -->
      <div class="flex items-center gap-2 px-3 py-1 border border-primary/20 bg-primary/5 text-[9px] font-mono text-primary mb-3">
        <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        {{ t.sidebar.status }}
      </div>

      <!-- Desktop Language switcher -->
      <div class="hidden lg:block mt-1">
        <LanguageSwitcher />
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-4 py-4 overflow-y-auto">
      <div class="text-[9px] font-pixel text-muted mb-3 px-2 tracking-widest">{{ t.sidebar.navTitle }}</div>
      <ul class="space-y-1">
        <li v-for="item in navItems" :key="item.id">
          <button
            @click="scrollTo(item.id)"
            :class="[
              'w-full text-left px-3 py-2.5 font-mono text-sm flex items-center gap-3',
              'transition-all duration-200 group border-l-2 cursor-pointer',
              activeId === item.id
                ? 'border-primary text-primary bg-primary/10 text-glow-green'
                : 'border-transparent text-muted hover:text-primary hover:border-primary/50 hover:bg-primary/5'
            ]"
          >
            <span class="font-pixel text-[8px] text-secondary group-hover:text-secondary transition-colors">
              {{ activeId === item.id ? '▶' : item.icon }}
            </span>
            <span class="uppercase tracking-wider text-xs">{{ t.nav[item.id] || item.label }}</span>
            <span v-if="activeId === item.id" class="ml-auto text-[8px] font-pixel text-primary blink">_</span>
          </button>
        </li>
      </ul>
    </nav>

    <!-- Footer info -->
    <div class="px-6 py-3 border-t border-primary/10">
      <div class="text-[9px] font-mono text-muted space-y-1">
        <div class="flex justify-between">
          <span>{{ t.sidebar.sys }}</span><span class="text-primary">{{ t.sidebar.sysVal }}</span>
        </div>
        <div class="flex justify-between">
          <span>{{ t.sidebar.ver }}</span><span class="text-secondary">2.0.1</span>
        </div>
        <div class="flex justify-between">
          <span>{{ t.sidebar.uptime }}</span><span class="text-primary">∞</span>
        </div>
      </div>
    </div>

    <!-- Bottom glow line -->
    <div class="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
  </aside>
</template>
