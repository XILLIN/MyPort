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
    { threshold: 0.06 }
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

const totalEntries = categories.reduce((acc, c) => acc + c.skills.length, 0)

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
  <section id="skills" class="py-20 sm:py-28 lg:py-28 font-hn text-cream">
    <div class="editorial-shell">
      <div :class="['editorial-rule h-0.5 w-full bg-cream mb-12 lg:mb-14', visible && 'is-visible']" />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12">
        <!-- Left Index Column -->
        <div class="lg:col-span-3 2xl:col-span-2">
          <div class="sticky top-24 space-y-6">
            <p class="text-xs uppercase tracking-[0.2em] text-cream/55">
              {{ t.skills.index }}
            </p>
            <div class="hidden lg:block pt-5 border-t border-cream/15 space-y-2 font-mono text-[11px] text-cream/40">
              <p>{{ categories.length }} Domains · {{ totalEntries }} {{ t.skills.entries }}</p>
              <p class="text-cream/30">CORE / PRACTICE / PROJECT</p>
            </div>
          </div>
        </div>

        <!-- Right Content Column -->
        <div class="lg:col-span-9 2xl:col-span-10 space-y-14 lg:space-y-16">
          <div :class="['editorial-reveal', visible && 'is-visible']">
            <h2 class="text-3xl sm:text-5xl xl:text-[3.4rem] font-normal leading-[1.1] tracking-[-0.02em] text-cream max-w-5xl">
              {{ t.skills.headline }}
            </h2>
          </div>

          <!-- Primary Specialization Band (hairline bounded) -->
          <div
            :class="['editorial-reveal border-y border-cream/35 py-7 lg:py-9 grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8', visible && 'is-visible']"
            style="transition-delay: 80ms"
          >
            <div class="md:col-span-4 space-y-1.5">
              <p class="text-xs uppercase tracking-[0.2em] text-cream/50">
                {{ t.skills.specLabel }}
              </p>
              <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-cream pt-1">
                &mdash; {{ t.skills.activeFocus }}
              </p>
            </div>
            <div class="md:col-span-8 space-y-2.5">
              <h3 class="text-2xl sm:text-3xl font-normal text-cream">
                {{ t.skills.specTitle }}
              </h3>
              <p class="text-sm sm:text-[15px] leading-relaxed text-cream/70">
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
                class="cursor-pointer pb-1.5 transition-all duration-300 border-b"
                :class="
                  activeFilter === f.key
                    ? 'text-cream border-cream'
                    : 'text-cream/45 border-transparent hover:text-cream/80'
                "
              >
                {{ f.label }}
              </button>
            </div>

            <p v-if="activeFilterDescription" class="font-mono text-xs text-cream/55">
              {{ activeFilterDescription }}
            </p>
          </div>

          <!-- 2x2 Desktop Editorial Matrix -->
          <div class="grid grid-cols-1 lg:grid-cols-2 border-t border-l border-cream/15">
            <article
              v-for="(cat, idx) in categories"
              :key="cat.id"
              :class="[
                'editorial-reveal p-6 sm:p-8 border-r border-b border-cream/15 flex flex-col justify-between gap-6 transition-colors duration-200 hover:bg-cream/[0.02]',
                visible && 'is-visible',
              ]"
              :style="{ transitionDelay: `${160 + idx * 70}ms` }"
            >
              <div class="space-y-1.5">
                <div class="flex items-baseline justify-between gap-3">
                  <div class="flex items-baseline gap-3">
                    <span class="font-mono text-xs text-cream/40">{{ cat.id }}</span>
                    <h3 class="text-xl font-normal text-cream">
                      {{ cat.label }}
                    </h3>
                  </div>
                  <span class="font-mono text-[11px] text-cream/35">{{ cat.skills.length }}</span>
                </div>
                <p class="text-xs text-cream/50 pl-7">
                  {{ cat.description }}
                </p>
              </div>

              <ul class="flex flex-wrap gap-2 pt-2 border-t border-cream/10">
                <li
                  v-for="skill in cat.skills"
                  :key="skill.name"
                  class="inline-flex items-baseline gap-2 border px-2.5 py-1 text-sm transition-all duration-300"
                  :class="
                    isHighlighted(skill)
                      ? 'opacity-100 border-cream/25 text-cream bg-cream/[0.03]'
                      : 'opacity-20 border-cream/10 text-cream'
                  "
                >
                  <span>{{ skill.name }}</span>
                  <span class="font-mono text-[9px] uppercase tracking-[0.14em] text-cream/40">
                    {{ skill.type }}
                  </span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
