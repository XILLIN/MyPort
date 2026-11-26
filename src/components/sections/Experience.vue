<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../../composables/useI18n'

const { t } = useI18n()

const visible = ref(false)
let observer

onMounted(() => {
  const el = document.getElementById('experience')
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

const experiences = [
  {
    index: '01',
    company: 'FiveM & ESX Development',
    role: 'Backend & Gameplay Systems Developer',
    period: 'Collaborative Development',
    desc: 'Collaborate with other developers on FiveM server projects, primarily focusing on Lua backend development, gameplay systems, and ESX framework modifications. Responsible for implementing and refining server-side and client-side logic alongside teammates handling UI/UX.',
    highlights: [
      'Develop and modify Lua scripts for server and client gameplay systems.',
      'Customize and extend ESX-based resources to meet project requirements.',
      'Implement gameplay logic, event handling, and client-server communication.',
      'Review and refine existing scripts to improve maintainability and runtime behavior.',
      'Investigate performance bottlenecks and reduce unnecessary client-side processing.',
    ],
    stack: 'Lua · FiveM · ESX · Gameplay Systems · Backend Logic · Performance',
  },
  {
    index: '02',
    company: 'Web & Backend Development',
    role: 'Full-Stack Applications & Interactive UI',
    period: 'Ongoing Projects',
    desc: 'Build full-stack web applications, modern NUI frontends, and desktop utilities — from bilingual Next.js reservation platforms with Better Auth and MongoDB to Svelte 5 smartphones and Python tools.',
    highlights: [
      'Build full-stack applications using Next.js App Router, TypeScript, Vue.js, and Svelte 5.',
      'Implement session authentication, role guards, and analytics dashboards with Better Auth & MongoDB.',
      'Engineer 60+ FPS HTML5 Canvas / Web Audio API minigames and responsive FiveM NUI interfaces.',
      'Develop Windows desktop utilities in Python (CustomTkinter, MIDI automation).',
    ],
    stack: 'Next.js · TypeScript · Svelte 5 · Vue.js · Node.js · MongoDB · SQL · Python',
  },
  {
    index: '03',
    company: 'Linux & Server Administration',
    role: 'Server Configuration & Troubleshooting',
    period: 'Hands-on Practice',
    desc: 'Build practical experience configuring Linux server environments and troubleshooting issues across game-server operations and development infrastructure.',
    highlights: [
      'Configure and maintain Linux-based hosting environments.',
      'Manage development resources, services, and server configurations.',
      'Explore networking, deployment workflows, and operational security.',
    ],
    stack: 'Linux · Server Administration · Networking · Troubleshooting',
  },
]

const communities = [
  {
    company: 'RERUN Community',
    role: 'FiveM Community & Server Project',
    period: '2026 — Present',
    status: 'In Development',
    desc: 'Developing a FiveM community project focused on cohesive server systems, responsive gameplay experiences, and a welcoming environment.',
    highlights: [
      'Architecting the technical foundation of the server.',
      'Designing gameplay systems and modular resource architecture.',
      'Applying lessons from years of FiveM development experience.',
    ],
    stack: 'FiveM · Gameplay Systems · Server Development · Community Building',
  },
  {
    company: 'SynOrigin',
    role: 'Personal Technical Brand',
    period: '2025 — Present',
    status: null,
    desc: 'Established a personal brand representing my technical interests and independent development work — a foundation for organizing and presenting software projects.',
    highlights: [],
    stack: 'Personal Brand · Software Engineering · Systems',
  },
]
</script>

<template>
  <section id="experience" class="px-6 sm:px-10 py-24 sm:py-36 font-hn text-cream">
    <div :class="['editorial-rule h-0.5 w-full bg-cream mb-12 sm:mb-16', visible && 'is-visible']" />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-10">
      <!-- Left Index Column -->
      <div class="lg:col-span-3">
        <p class="text-xs uppercase tracking-[0.2em] text-cream/50 sticky top-24">
          {{ t.experience.index }}
        </p>
      </div>

      <!-- Right Content Column -->
      <div class="lg:col-span-9 space-y-20 sm:space-y-28">
        <div :class="['editorial-reveal', visible && 'is-visible']">
          <h2 class="text-3xl sm:text-5xl font-normal leading-[1.1] tracking-[-0.02em] text-cream max-w-3xl">
            {{ t.experience.headline }}
          </h2>
        </div>

        <!-- Development Practice -->
        <div :class="['editorial-reveal', visible && 'is-visible']" style="transition-delay: 100ms">
          <p class="text-xs uppercase tracking-[0.2em] text-cream/50 mb-8">
            {{ t.experience.devHeading }}
          </p>

          <div class="border-t border-cream/15">
            <article
              v-for="item in experiences"
              :key="item.company"
              class="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8 py-10 border-b border-cream/15"
            >
              <div class="md:col-span-4 space-y-2">
                <span class="font-mono text-xs text-cream/40">{{ item.index }}</span>
                <h3 class="text-xl sm:text-2xl font-normal text-cream leading-snug">
                  {{ item.company }}
                </h3>
                <p class="text-sm text-cream/70">{{ item.role }}</p>
                <p class="text-xs uppercase tracking-[0.16em] text-cream/45 pt-1">
                  {{ item.period }}
                </p>
              </div>

              <div class="md:col-span-8 space-y-6">
                <p class="text-sm sm:text-base leading-relaxed text-cream/75">
                  {{ item.desc }}
                </p>

                <ul class="space-y-2 text-sm leading-relaxed text-cream/65">
                  <li
                    v-for="highlight in item.highlights"
                    :key="highlight"
                    class="flex items-baseline gap-3"
                  >
                    <span class="text-cream/35 select-none">&mdash;</span>
                    <span>{{ highlight }}</span>
                  </li>
                </ul>

                <p class="pt-2 text-xs tracking-wide text-cream/45">
                  {{ item.stack }}
                </p>
              </div>
            </article>
          </div>
        </div>

        <!-- Initiatives & Community -->
        <div :class="['editorial-reveal', visible && 'is-visible']" style="transition-delay: 180ms">
          <p class="text-xs uppercase tracking-[0.2em] text-cream/50 mb-8">
            {{ t.experience.communityHeading }}
          </p>

          <div class="border-t border-cream/15">
            <article
              v-for="item in communities"
              :key="item.company"
              class="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8 py-10 border-b border-cream/15"
            >
              <div class="md:col-span-4 space-y-2">
                <h3 class="text-xl sm:text-2xl font-normal text-cream">
                  {{ item.company }}
                </h3>
                <p class="text-sm text-cream/70">{{ item.role }}</p>
                <p class="text-xs uppercase tracking-[0.16em] text-cream/45 pt-1">
                  {{ item.period }}
                </p>
                <p v-if="item.status" class="text-[11px] uppercase tracking-[0.16em] text-cream pt-1">
                  &mdash; {{ item.status }}
                </p>
              </div>

              <div class="md:col-span-8 space-y-5">
                <p class="text-sm sm:text-base leading-relaxed text-cream/75">
                  {{ item.desc }}
                </p>

                <ul v-if="item.highlights.length" class="space-y-2 text-sm leading-relaxed text-cream/65">
                  <li
                    v-for="h in item.highlights"
                    :key="h"
                    class="flex items-baseline gap-3"
                  >
                    <span class="text-cream/35 select-none">&mdash;</span>
                    <span>{{ h }}</span>
                  </li>
                </ul>

                <p class="pt-2 text-xs tracking-wide text-cream/45">
                  {{ item.stack }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
