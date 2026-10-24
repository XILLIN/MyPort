<script setup>
import { ref, onMounted } from 'vue'
import Terminal from '../Terminal.vue'
import { useI18n } from '../../composables/useI18n'

const { t, isTh } = useI18n()

const visible = ref(false)
onMounted(() => {
  const el = document.getElementById('projects')
  const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) visible.value = true }, { threshold: 0.05 })
  if (el) obs.observe(el)
})


const projects = [
  {
    title: 'Syntax Queue',
    subtitle: 'Queue & Connection Management System',
    desc: 'An event-driven queue and connection management system for FiveM servers. Designed around session-based tracking, adaptive player release, dynamic priority scoring, reconnect recovery, and operational monitoring.',
    image: '⌘',
    featured: true,
    status: 'In Development',
    tags: [
      'Lua',
      'FiveM',
      'oxmysql',
    ],
    highlights: [
      'Session-based connection tracking',
      'Adaptive staged player release',
      'Dynamic priority scoring',
      'Reconnect recovery and abuse limits',
      'FXServer hitch and pressure response',
      'Queue metrics and monitoring dashboard',
      'Optional Discord role integration',
      'Cached storage with oxmysql support',
    ],
    color: '#00F5A0',
    github: '',
    live: '',
  },
  {
    title : 'Rerun Community',
    desc : 'Rerun Community is a roleplaying PvPvE server for FiveM. Developed by PZ & SynOrigin.',
    image: '⌘',
    status : 'In Development',
    tags : [
      'Lua',
      'FiveM',
      'MySQL',
      'ESX-Custom by ME',
    ],
    highlights: [
      'Developed by PZ & SynOrigin',
    ],
    color: '#00F5A0',
    github: '',
    live: '',
  },
]


</script>

<template>
  <section id="projects" class="px-6 lg:px-16 py-20">
    <div :class="['reveal', visible && 'visible']" class="mb-12">
      <p class="font-pixel text-[9px] text-secondary tracking-widest mb-3">{{ t.projects.cmd }}</p>
      <h2 class="font-pixel text-xl sm:text-2xl text-text mb-1">{{ t.projects.title }}</h2>
      <div class="h-px w-24 bg-gradient-to-r from-primary to-transparent mt-3" />
    </div>

    <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        v-for="(p, i) in projects" :key="p.title"
        :class="['reveal group', visible && 'visible']"
        :style="`transition-delay:${i * 0.08}s`"
      >
        <div
          class="glass-card h-full flex flex-col rounded-sm overflow-hidden transition-all duration-300 group-hover:scale-[1.02]"
          :style="`--pc:${p.color}`"
          style="--tw-shadow:none"
        >
          <!-- Project image / emoji preview -->
          <div
            class="relative h-36 flex items-center justify-center border-b overflow-hidden"
            :style="`border-color:${p.color}20;background:${p.color}06`"
          >
            <span class="text-6xl select-none z-10">{{ p.image }}</span>
            <!-- Scan lines on hover -->
            <div
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style="background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.1) 2px,rgba(0,0,0,0.1) 4px)"
            />
            <!-- Glow corner -->
            <div
              class="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 transition-all duration-300"
              :style="`border-color:${p.color}60`"
            />
            <div
              class="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 transition-all duration-300"
              :style="`border-color:${p.color}60`"
            />
          </div>

          <!-- Content -->
          <div class="flex flex-col flex-1 p-5">
            <div class="flex items-start justify-between mb-2">
              <h3 class="font-pixel text-[11px] leading-relaxed" :style="`color:${p.color}`">
                {{ p.title }}
              </h3>
            </div>
            <p class="font-mono text-xs text-muted leading-relaxed flex-1 mb-4">{{ p.desc }}</p>

            <!-- Tech tags -->
            <div class="flex flex-wrap gap-1.5 mb-5">
              <span
                v-for="tag in p.tags" :key="tag"
                class="font-mono text-[9px] px-1.5 py-0.5 border"
                :style="`border-color:${p.color}25;color:${p.color}cc;background:${p.color}08`"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Action buttons -->
            <div class="flex gap-3 mt-auto">
              <a
                :href="p.github"
                class="flex-1 text-center neon-btn text-xs py-2 transition-all"
                :style="`color:${p.color};border-color:${p.color}60`"
              >
                GitHub ↗
              </a>
              <a
                :href="p.live"
                class="flex-1 text-center neon-btn text-xs py-2 transition-all"
                :style="`color:#FF7A18;border-color:#FF7A1860`"
              >
                Live ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
