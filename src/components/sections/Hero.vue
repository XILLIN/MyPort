<script setup>
import { ref, onMounted } from 'vue'
import TypingText from '../TypingText.vue'
import Terminal from '../Terminal.vue'
import { useI18n } from '../../composables/useI18n'

const { t } = useI18n()

const bootDone = ref(false)
const bootLines = ref([])

const lines = [
  'BIOS v2.0.1 — Initializing...',
  'Memory check: OK [32768 MB]',
  'Loading kernel modules...',
  'Mounting file systems: /dev/portfolio',
  'Starting developer environment...',
  'Checking dependencies... ✓',
  '> System ready. Welcome, visitor.',
]

onMounted(() => {
  let i = 0
  const iv = setInterval(() => {
    if (i < lines.length) {
      bootLines.value.push(lines[i++])
    } else {
      clearInterval(iv)
      setTimeout(() => { bootDone.value = true }, 600)
    }
  }, 280)
})
</script>

<template>
  <section id="hero" class="min-h-screen flex flex-col justify-center px-6 lg:px-16 py-20 relative">

    <!-- Boot sequence overlay -->
    <transition name="fade">
      <div v-if="!bootDone" class="absolute inset-0 z-20 bg-bg flex items-center justify-center p-8">
        <Terminal title="boot_sequence.sh" class="w-full max-w-lg">
          <div class="space-y-2">
            <p v-for="(l, i) in bootLines" :key="i"
               class="font-mono text-xs text-primary leading-relaxed"
               :class="i === bootLines.length - 1 ? 'text-glow-green' : 'text-muted'"
            >
              <span class="text-secondary mr-2">$</span>{{ l }}
            </p>
            <span v-if="!bootDone" class="blink text-primary font-mono text-xs">_</span>
          </div>
        </Terminal>
      </div>
    </transition>

    <!-- ASCII Art -->
    <pre class="font-pixel text-primary text-glow-green text-[6px] sm:text-[8px] leading-tight mb-10 select-none hidden sm:block">
 ██████╗ ███████╗██╗   ██╗
 ██╔══██╗██╔════╝██║   ██║
 ██║  ██║█████╗  ██║   ██║
 ██║  ██║██╔══╝  ╚██╗ ██╔╝
 ██████╔╝███████╗ ╚████╔╝
 ╚═════╝ ╚══════╝  ╚═══╝  PORTFOLIO v2.0</pre>

    <!-- Greeting -->
    <div class="mb-4">
      <span class="font-pixel text-[9px] text-secondary tracking-widest">
        &gt; Synprofile.exe
      </span>
    </div>

    <h2 class="font-pixel text-lg sm:text-2xl lg:text-3xl text-text mb-4 leading-relaxed">
      {{ t.hero.imA }}
    </h2>

    <!-- Typing animation -->
    <div class="mb-6 h-10 sm:h-12">
      <TypingText
        :key="t.hero.imA"
        :strings="t.hero.roles"
        :speed="90"
        :delete-speed="50"
        :pause="2000"
        color="#00F5A0"
        class="font-pixel text-xl sm:text-3xl lg:text-4xl"
      />
    </div>

    <p class="font-mono text-muted text-sm sm:text-base max-w-xl mb-10 leading-relaxed">
      {{ t.hero.bio }}
    </p>

    <!-- CTA Buttons -->
    <div class="flex flex-wrap gap-4 mb-16">
      <button
        @click="document.getElementById('projects').scrollIntoView({behavior:'smooth'})"
        class="neon-btn text-primary border-primary hover:text-bg hover:bg-primary transition-all cursor-pointer"
      >
        {{ t.hero.viewProjects }}
      </button>
      <button
        @click="document.getElementById('contact').scrollIntoView({behavior:'smooth'})"
        class="neon-btn text-secondary border-secondary hover:text-bg hover:bg-secondary transition-all cursor-pointer"
      >
        {{ t.hero.contactMe }}
      </button>
    </div>

    <!-- Quick stats row -->
    <div class="flex flex-wrap gap-6">
      <div v-for="s in [
        { val: '4+',  lbl: t.hero.stats.exp },
        { val: '10+', lbl: t.hero.stats.projects },
        { val: '∞',   lbl: t.hero.stats.clients },
        { val: '∞',   lbl: t.hero.stats.commits },
      ]" :key="s.lbl" class="text-center">
        <div class="font-pixel text-lg text-primary text-glow-green">{{ s.val }}</div>
        <div class="font-mono text-[10px] text-muted mt-1">{{ s.lbl }}</div>
      </div>
    </div>

    <!-- Scroll hint -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
      <span class="font-pixel text-[8px] text-muted">{{ t.hero.scroll }}</span>
      <span class="text-primary text-sm">▼</span>
    </div>
  </section>
</template>

<style scoped>
.fade-leave-active { transition: opacity 0.8s ease; }
.fade-leave-to     { opacity: 0; }
</style>
