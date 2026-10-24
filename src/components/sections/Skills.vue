
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Terminal from '../Terminal.vue'
import { useI18n } from '../../composables/useI18n'

const { t, isTh } = useI18n()

const visible = ref(false)
let observer

onMounted(() => {
  const el = document.getElementById('skills')
  if (!el) return

  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      visible.value = true
      observer?.disconnect()
    }
  }, { threshold: 0.1 })

  observer.observe(el)
})

onUnmounted(() => {
  observer?.disconnect()
})

const categories = [
  {
    id: '01',
    label: 'FiveM Development',
    filename: 'fivem.skills',
    color: '#00F5A0',
    description: 'Primary focus / Game server systems',
    featured: true,
    skills: [
      { name: 'Lua', type: 'CORE' },
      { name: 'FiveM', type: 'CORE' },
      { name: 'ESX Framework', type: 'CORE' },
      { name: 'Client / Server Logic', type: 'CORE' },
      { name: 'Gameplay Systems', type: 'CORE' },
      { name: 'Resource Development', type: 'CORE' },
      { name: 'Event-driven Logic', type: 'PRACTICE' },
      { name: 'Performance Refinement', type: 'PRACTICE' },
    ],
  },
  {
    id: '02',
    label: 'Backend & Database',
    filename: 'backend.skills',
    color: '#FF7A18',
    description: 'Server logic / Data management',
    featured: false,
    skills: [
      { name: 'Node.js', type: 'PRACTICE' },
      { name: 'REST APIs', type: 'PRACTICE' },
      { name: 'SQL', type: 'PRACTICE' },
      { name: 'MySQL / MariaDB', type: 'PRACTICE' },
      { name: 'MongoDB', type: 'PRACTICE' },
      { name: 'oxmysql', type: 'PROJECT' },
      { name: 'Python', type: 'FAMILIAR' },
    ],
  },
  {
    id: '03',
    label: 'Frontend Development',
    filename: 'frontend.skills',
    color: '#7C3AED',
    description: 'Web interfaces / System integration',
    featured: false,
    skills: [
      { name: 'JavaScript', type: 'PRACTICE' },
      { name: 'Vue.js', type: 'PRACTICE' },
      { name: 'React', type: 'FAMILIAR' },
      { name: 'HTML / CSS', type: 'PRACTICE' },
      { name: 'Tailwind CSS', type: 'PRACTICE' },
      { name: 'FiveM NUI', type: 'PROJECT' },
    ],
  },
  {
    id: '04',
    label: 'Tools & Infrastructure',
    filename: 'environment.skills',
    color: '#94A3B8',
    description: 'Development environment / Operations',
    featured: false,
    skills: [
      { name: 'Git / GitHub', type: 'PRACTICE' },
      { name: 'Linux / CLI', type: 'PRACTICE' },
      { name: 'Server Configuration', type: 'PRACTICE' },
      { name: 'Networking', type: 'PRACTICE' },
      { name: 'Vite', type: 'FAMILIAR' },
    ],
  },
]

const legend = computed(() => [
  { label: 'CORE', description: t.value.skills.legend.coreDesc, color: '#00F5A0' },
  { label: 'PRACTICE', description: t.value.skills.legend.practiceDesc, color: '#FF7A18' },
  { label: 'PROJECT', description: t.value.skills.legend.projectDesc, color: '#7C3AED' },
  { label: 'FAMILIAR', description: t.value.skills.legend.familiarDesc, color: '#94A3B8' },
])
</script>

<template>
  <section id="skills" class="px-6 lg:px-16 py-20">
    <!-- Section heading -->
    <div :class="['reveal', visible && 'visible']" class="mb-12">
      <p class="font-pixel text-[9px] text-secondary tracking-widest mb-3">
        {{ t.skills.cmd }}
      </p>

      <h2 class="font-pixel text-xl sm:text-2xl text-text mb-1">
        {{ t.skills.title }}
      </h2>

      <p class="font-mono text-xs text-muted mt-4 max-w-xl leading-relaxed">
        {{ t.skills.subtitle }}
      </p>

      <div class="h-px w-24 bg-gradient-to-r from-primary to-transparent mt-4" />
    </div>

    <!-- Primary focus -->
    <div
      :class="['reveal mb-8', visible && 'visible']"
      style="transition-delay: 0.05s"
    >
      <div
        class="relative overflow-hidden border p-5 sm:p-6"
        style="border-color:#00F5A030;background:linear-gradient(110deg,#00F5A00a,transparent 70%)"
      >
        <div class="absolute top-0 left-0 w-1 h-full" style="background:#00F5A0" />

        <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div
            class="w-12 h-12 shrink-0 flex items-center justify-center border font-mono text-xl"
            style="color:#00F5A0;border-color:#00F5A040;background:#00F5A008"
          >
            &gt;_
          </div>

          <div class="flex-1">
            <p class="font-pixel text-[8px] tracking-widest mb-2" style="color:#00F5A0">
              {{ t.skills.specTag }}
            </p>

            <h3 class="font-pixel text-xs sm:text-sm text-text mb-2">
              {{ t.skills.specTitle }}
            </h3>

            <p class="font-mono text-xs text-muted leading-relaxed">
              {{ t.skills.specDesc }}
            </p>
          </div>

          <div class="font-mono text-[10px] shrink-0" style="color:#00F5A0">
            {{ t.skills.activeFocus }}
          </div>
        </div>
      </div>
    </div>

    <!-- Skill categories -->
    <div class="grid sm:grid-cols-2 gap-5 lg:gap-6">
      <div
        v-for="(cat, index) in categories"
        :key="cat.id"
        :class="['reveal min-w-0', visible && 'visible']"
        :style="`transition-delay:${(index + 1) * 0.08}s`"
      >
        <Terminal :title="cat.filename">
          <div class="flex items-start gap-3 mb-5">
            <div
              class="w-9 h-9 shrink-0 flex items-center justify-center border font-mono text-xs"
              :style="{
                color: cat.color,
                borderColor: `${cat.color}35`,
                background: `${cat.color}08`,
              }"
            >
              {{ cat.id }}
            </div>

            <div class="flex-1 min-w-0">
              <h3
                class="font-pixel text-[9px] sm:text-[10px] leading-relaxed mb-2"
                :style="{ color: cat.color }"
              >
                {{ cat.label }}
              </h3>

              <p class="font-mono text-[10px] text-muted">
                {{ cat.description }}
              </p>
            </div>

            <span
              v-if="cat.featured"
              class="font-pixel text-[7px] px-2 py-1 border shrink-0"
              :style="{
                color: cat.color,
                borderColor: `${cat.color}40`,
              }"
            >
              CORE
            </span>
          </div>

          <div class="font-mono text-[10px] text-muted mb-3">
            <span :style="{ color: cat.color }">$</span>
            ls ./{{ cat.filename.replace('.skills', '') }}
          </div>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in cat.skills"
              :key="skill.name"
              class="group/tag inline-flex items-center gap-2 px-2.5 py-2 border transition-all duration-200 hover:-translate-y-0.5"
              :style="{
                borderColor: `${cat.color}25`,
                background: `${cat.color}05`,
              }"
            >
              <span
                class="w-1.5 h-1.5 rounded-full shrink-0"
                :style="{
                  background:
                    skill.type === 'CORE' ? '#00F5A0' :
                    skill.type === 'PRACTICE' ? '#FF7A18' :
                    skill.type === 'PROJECT' ? '#7C3AED' :
                    '#94A3B8',
                }"
              />

              <span class="font-mono text-[10px] text-text">
                {{ skill.name }}
              </span>
            </span>
          </div>

          <div
            class="mt-5 pt-3 border-t flex items-center justify-between gap-3"
            :style="{ borderColor: `${cat.color}15` }"
          >
            <span class="font-mono text-[9px] text-muted">
              {{ String(cat.skills.length).padStart(2, '0') }} entries
            </span>

            <span class="font-mono text-[9px]" :style="{ color: cat.color }">
              STATUS: LOADED
            </span>
          </div>
        </Terminal>
      </div>
    </div>

    <!-- Legend -->
    <div
      :class="['reveal mt-8', visible && 'visible']"
      style="transition-delay:0.4s"
    >
      <div class="border border-white/10 p-4 sm:p-5">
        <p class="font-pixel text-[8px] text-secondary tracking-widest mb-4">
          &gt; cat ./skill-legend.txt
        </p>

        <div class="flex flex-wrap gap-x-6 gap-y-3">
          <div
            v-for="item in legend"
            :key="item.label"
            class="flex items-start gap-2"
          >
            <span
              class="w-2 h-2 rounded-full mt-1 shrink-0"
              :style="{ background: item.color }"
            />

            <div>
              <p class="font-pixel text-[7px] mb-1" :style="{ color: item.color }">
                {{ item.label }}
              </p>

              <p class="font-mono text-[10px] text-muted">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>