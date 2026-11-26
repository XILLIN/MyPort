<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../../composables/useI18n'

const { t } = useI18n()

const visible = ref(false)
const activeFilter = ref('ALL')
let observer

onMounted(() => {
  const el = document.getElementById('skills')
  if (!el) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.08 }
  )
  observer.observe(el)
})

onUnmounted(() => {
  observer?.disconnect()
})

const categories = [
  {
    id: '01',
    label: 'FiveM Development',
    description: 'Primary focus · Game server systems',
    skills: [
      { name: 'Lua 5.4', type: 'CORE' },
      { name: 'FiveM / OneSync', type: 'CORE' },
      { name: 'ESX Legacy', type: 'CORE' },
      { name: 'ox_lib / oxmysql', type: 'CORE' },
      { name: 'Anti-Cheat & Security', type: 'CORE' },
      { name: 'Routing Buckets', type: 'CORE' },
      { name: 'Gameplay Systems', type: 'CORE' },
      { name: 'Performance Refinement', type: 'PRACTICE' },
    ],
  },
  {
    id: '02',
    label: 'Backend & Database',
    description: 'Server logic · Auth · Data management',
    skills: [
      { name: 'Node.js', type: 'PRACTICE' },
      { name: 'REST APIs', type: 'PRACTICE' },
      { name: 'SQL / MySQL / MariaDB', type: 'PRACTICE' },
      { name: 'MongoDB / Mongoose', type: 'PROJECT' },
      { name: 'Better Auth', type: 'PROJECT' },
      { name: 'Python', type: 'PROJECT' },
    ],
  },
  {
    id: '03',
    label: 'Frontend & Interactive UI',
    description: 'Web apps · FiveM NUI · Canvas',
    skills: [
      { name: 'JavaScript', type: 'PRACTICE' },
      { name: 'TypeScript', type: 'PROJECT' },
      { name: 'Svelte 5', type: 'CORE' },
      { name: 'Vue.js', type: 'PRACTICE' },
      { name: 'Next.js / React', type: 'PROJECT' },
      { name: 'HTML5 Canvas & Web Audio', type: 'PROJECT' },
      { name: 'Tailwind CSS', type: 'PRACTICE' },
      { name: 'FiveM NUI', type: 'CORE' },
      { name: 'CustomTkinter', type: 'PROJECT' },
    ],
  },
  {
    id: '04',
    label: 'Tools & Infrastructure',
    description: 'Development environment · Testing · Ops',
    skills: [
      { name: 'Git / GitHub', type: 'PRACTICE' },
      { name: 'Linux / CLI', type: 'PRACTICE' },
      { name: 'Server Configuration', type: 'PRACTICE' },
      { name: 'Networking', type: 'PRACTICE' },
      { name: 'Vite', type: 'PRACTICE' },
      { name: 'Vitest / Playwright', type: 'FAMILIAR' },
    ],
  },
]

const filters = computed(() => [
  { key: 'ALL', label: t.value.skills.filterAll, desc: '' },
  { key: 'CORE', label: 'Core', desc: t.value.skills.legend.core },
  { key: 'PRACTICE', label: 'Practice', desc: t.value.skills.legend.practice },
  { key: 'PROJECT', label: 'Project', desc: t.value.skills.legend.project },
  { key: 'FAMILIAR', label: 'Familiar', desc: t.value.skills.legend.familiar },
])

const activeFilterDescription = computed(() => {
  const found = filters.value.find((f) => f.key === activeFilter.value)
  return found?.desc || ''
})

function isHighlighted(skill) {
  return activeFilter.value === 'ALL' || skill.type === activeFilter.value
}
</script>

<template>
  <section id="skills" class="px-6 sm:px-10 py-24 sm:py-36 font-hn text-cream">
    <div :class="['editorial-rule h-0.5 w-full bg-cream mb-12 sm:mb-16', visible && 'is-visible']" />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-10">
      <!-- Left Index Column -->
      <div class="lg:col-span-3">
        <p class="text-xs uppercase tracking-[0.2em] text-cream/50 sticky top-24">
          {{ t.skills.index }}
        </p>
      </div>

      <!-- Right Content Column -->
      <div class="lg:col-span-9 space-y-16 sm:space-y-20">
        <div :class="['editorial-reveal', visible && 'is-visible']">
          <h2 class="text-3xl sm:text-5xl font-normal leading-[1.1] tracking-[-0.02em] text-cream max-w-3xl">
            {{ t.skills.headline }}
          </h2>
        </div>

        <!-- Primary Specialization Band (no card, hairline bounded) -->
        <div
          :class="['editorial-reveal border-y border-cream/35 py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8', visible && 'is-visible']"
          style="transition-delay: 80ms"
        >
          <div class="md:col-span-4 space-y-1">
            <p class="text-xs uppercase tracking-[0.2em] text-cream/50">
              {{ t.skills.specLabel }}
            </p>
            <p class="text-xs uppercase tracking-[0.16em] text-cream pt-1">
              &mdash; {{ t.skills.activeFocus }}
            </p>
          </div>
          <div class="md:col-span-8 space-y-3">
            <h3 class="text-2xl sm:text-3xl font-normal text-cream">
              {{ t.skills.specTitle }}
            </h3>
            <p class="text-sm sm:text-base leading-relaxed text-cream/70">
              {{ t.skills.specDesc }}
            </p>
          </div>
        </div>

        <!-- Minimal Text Filter Bar -->
        <div
          :class="['editorial-reveal flex flex-col sm:flex-row sm:items-baseline justify-between gap-4', visible && 'is-visible']"
          style="transition-delay: 140ms"
        >
          <div class="flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.18em]">
            <button
              v-for="f in filters"
              :key="f.key"
              type="button"
              @click="activeFilter = f.key"
              class="cursor-pointer pb-1 transition-all duration-300 border-b"
              :class="
                activeFilter === f.key
                  ? 'text-cream border-cream'
                  : 'text-cream/45 border-transparent hover:text-cream/80'
              "
            >
              {{ f.label }}
            </button>
          </div>

          <p v-if="activeFilterDescription" class="text-xs text-cream/55">
            {{ activeFilterDescription }}
          </p>
        </div>

        <!-- 4-Row Editorial Matrix -->
        <div class="border-t border-cream/15">
          <article
            v-for="(cat, idx) in categories"
            :key="cat.id"
            :class="['editorial-reveal grid grid-cols-1 md:grid-cols-12 gap-y-5 md:gap-x-8 py-9 border-b border-cream/15', visible && 'is-visible']"
            :style="{ transitionDelay: `${160 + idx * 70}ms` }"
          >
            <div class="md:col-span-4 space-y-1.5">
              <div class="flex items-baseline gap-3">
                <span class="font-mono text-xs text-cream/40">{{ cat.id }}</span>
                <h3 class="text-lg sm:text-xl font-normal text-cream">
                  {{ cat.label }}
                </h3>
              </div>
              <p class="text-xs text-cream/50 pl-7">
                {{ cat.description }}
              </p>
            </div>

            <div class="md:col-span-8">
              <ul class="flex flex-wrap gap-x-6 gap-y-3 text-base sm:text-lg leading-snug">
                <li
                  v-for="(skill, sIdx) in cat.skills"
                  :key="skill.name"
                  class="transition-opacity duration-300"
                  :class="isHighlighted(skill) ? 'opacity-100 text-cream' : 'opacity-20 text-cream'"
                >
                  <span>{{ skill.name }}</span>
                  <span
                    v-if="sIdx < cat.skills.length - 1"
                    class="ml-6 text-cream/25 select-none"
                    aria-hidden="true"
                  >/</span>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
