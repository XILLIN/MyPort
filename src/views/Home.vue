<script setup>
import { ArrowUp } from 'lucide-vue-next'
import StickyNav from '../components/StickyNav.vue'
import Hero from '../components/sections/Hero.vue'
import About from '../components/sections/About.vue'
import Experience from '../components/sections/Experience.vue'
import Projects from '../components/sections/Projects.vue'
import Skills from '../components/sections/Skills.vue'
import Certifications from '../components/sections/Certifications.vue'
import Contact from '../components/sections/Contact.vue'
import { useI18n } from '../composables/useI18n'

const { t, lang, setLang } = useI18n()

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function toggleLanguage() {
  setLang(lang.value === 'en' ? 'th' : 'en')
}
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0a] text-cream font-hn">
    <!-- Minimal sticky bar appears only after scrolling past the 100dvh hero -->
    <StickyNav />

    <main>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Certifications />
      <Contact />
    </main>

    <!-- Editorial Site Footer -->
    <footer class="pb-12 pt-4 font-hn text-cream">
      <div class="editorial-shell">
        <div class="h-0.5 w-full bg-cream mb-8" />

        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 text-xs sm:text-sm">
          <div class="space-y-1">
            <p>{{ t.footer.left }}</p>
            <p class="font-mono text-xs text-cream/45">&copy; {{ new Date().getFullYear() }} {{ t.brand }}</p>
          </div>

          <div class="flex items-center gap-8">
            <button
              type="button"
              @click="toggleLanguage"
              class="cursor-pointer font-mono text-xs uppercase tracking-[0.18em] text-cream/60 transition-colors duration-300 hover:text-cream"
            >
              {{ lang === 'en' ? 'EN / TH' : 'TH / EN' }}
            </button>

            <button
              type="button"
              @click="scrollToTop"
              class="inline-flex items-center gap-1.5 cursor-pointer text-cream transition-opacity duration-300 hover:opacity-60"
            >
              <span>{{ t.footer.backToTop }}</span>
              <ArrowUp :size="15" :stroke-width="1.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
