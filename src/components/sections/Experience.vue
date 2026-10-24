<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Terminal from '../Terminal.vue'
import { useI18n } from '../../composables/useI18n'

const { t, isTh } = useI18n()

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
    { threshold: 0.1 },
  )

  observer.observe(el)
})

onUnmounted(() => {
  observer?.disconnect()
})


const experiences = [
  {
    company: 'FiveM & ESX Development',
    role: 'Backend & Gameplay Systems Developer',
    period: 'Collaborative Development',
    desc:
      'Collaborate with other developers on FiveM server projects, primarily focusing on Lua backend development, gameplay systems, and ESX framework modifications. My main responsibility is implementing and refining server-side and client-side logic while working with teammates responsible for UI/UX and other resource components.',
    highlights: [
      'Develop and modify Lua scripts for server and client gameplay systems.',
      'Customize and extend ESX-based resources to meet project requirements.',
      'Implement gameplay logic, event handling, and client-server communication.',
      'Review and refine existing scripts to improve maintainability and runtime behavior.',
      'Investigate performance bottlenecks and reduce unnecessary client-side processing where appropriate.',
    ],
    tags: [
      'Lua',
      'FiveM',
      'ESX',
      'Gameplay Systems',
      'Backend Logic',
      'Performance',
    ],
    color: '#FF7A18',
  },
  {
    company: 'Web & Backend Development',
    role: 'Personal Projects & Technical Practice',
    period: 'Ongoing Learning',
    desc:
      'Explore web application development and backend technologies through personal projects and technical practice, with an interest in application logic, APIs, and database integration.',
    highlights: [
      'Practice frontend development using Vue.js and React.',
      'Explore backend development with Node.js.',
      'Work with SQL databases and application data.',
      'Learn to structure application logic and connect system components.',
    ],
    tags: [
      'Vue.js',
      'React',
      'Node.js',
      'REST APIs',
      'SQL',
    ],
    color: '#00D9FF',
  },
  {
    company: 'Linux & Server Administration',
    role: 'Server Configuration & Troubleshooting',
    period: 'Hands-on Practice',
    desc:
      'Build practical experience configuring server environments and troubleshooting issues related to game-server operations and development infrastructure.',
    highlights: [
      'Configure and troubleshoot Linux-based environments.',
      'Manage development resources and server configurations.',
      'Explore networking, deployment, and operational security.',
    ],
    tags: [
      'Linux',
      'Server Administration',
      'Networking',
      'Troubleshooting',
    ],
    color: '#94A3B8',
  },
]

const communities = [
  {
    company: 'SynOrigin',
    role: 'Personal Technical Brand',
    period: '2025',
    desc:
      'Established a personal brand to represent my technical interests and development work. SynOrigin provides a foundation for organizing and presenting personal projects.',
    tags: [
      'Personal Brand',
      'Technology',
      'Development',
    ],
    color: '#C084FC',
  },
  {
    company: 'RERUN Community',
    role: 'FiveM Community & Server Project',
    period: '2026 — Present',
    status: 'In Development',
    desc:
      'Developing a FiveM community project with a focus on server systems, gameplay experiences, and a welcoming community environment. The project is currently under development.',
    highlights: [
      'Working on the technical foundation of the server.',
      'Planning gameplay systems and resource architecture.',
      'Applying lessons from previous FiveM development experience.',
    ],
    tags: [
      'FiveM',
      'Gameplay Systems',
      'Server Development',
      'Community Building',
    ],
    color: '#FB7185',
  },
]
</script>

<template>
  <section id="experience" class="px-6 lg:px-16 py-20">
    <!-- Section Header -->
    <div :class="['reveal', visible && 'visible']" class="mb-14">
      <p class="font-pixel text-[9px] text-secondary tracking-widest mb-3">
        {{ t.experience.cmd }}
      </p>

      <h2 class="font-pixel text-xl sm:text-2xl text-text mb-2">
        {{ t.experience.title }}
      </h2>

      <p class="font-mono text-xs text-muted leading-relaxed max-w-2xl">
        {{ isTh ? 'ประสบการณ์การพัฒนาในระบบ Backend, Gameplay Logic, เว็บเทคโนโลยี และโปรเจกต์การทำงานร่วมกัน' : 'My development experience across backend systems, gameplay logic, web technologies, and collaborative projects.' }}
      </p>

      <div
        class="h-px w-24 bg-gradient-to-r from-primary to-transparent mt-4"
      />
    </div>

    <!-- Development Experience -->
    <div class="mb-16">
      <div :class="['reveal', visible && 'visible']" class="mb-7">
        <p class="font-pixel text-[9px] text-primary tracking-widest mb-2">
          &gt; cat development_experience.log
        </p>

        <h3 class="font-pixel text-sm sm:text-base text-text">
          Development Experience
        </h3>

        <p class="font-mono text-xs text-muted mt-2">
          Technical contributions and collaborative development
        </p>
      </div>

      <div class="relative">
        <div
          class="absolute left-4 top-0 bottom-0 w-px
          bg-gradient-to-b from-primary/60 via-accent/40 to-transparent
          hidden sm:block"
        />

        <div class="space-y-8">
          <div
            v-for="(item, i) in experiences"
            :key="item.company"
            :class="[
              'reveal',
              visible && 'visible',
              'sm:pl-12 relative',
            ]"
            :style="`transition-delay:${i * 0.12}s`"
          >
            <!-- Timeline Marker -->
            <div
              class="absolute left-1 top-5 w-6 h-6 rounded-full
              border-2 items-center justify-center bg-bg hidden sm:flex"
              :style="`border-color:${item.color};
                box-shadow:0 0 8px ${item.color}40`"
            >
              <span
                class="w-2 h-2 rounded-full"
                :style="`background:${item.color}`"
              />
            </div>

            <Terminal
              :title="`${item.company.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.log`"
            >
              <div
                class="flex flex-col sm:flex-row sm:items-start
                sm:justify-between gap-3 mb-4"
              >
                <div>
                  <h4
                    class="font-pixel text-[10px] sm:text-[11px] mb-2"
                    :style="`color:${item.color}`"
                  >
                    {{ item.company }}
                  </h4>

                  <p class="font-mono text-sm text-text">
                    {{ item.role }}
                  </p>
                </div>

                <span
                  class="font-pixel text-[8px] text-muted border
                  border-muted/20 px-2 py-1 h-fit whitespace-nowrap"
                >
                  {{ item.period }}
                </span>
              </div>

              <p class="font-mono text-xs text-muted leading-relaxed mb-4">
                {{ item.desc }}
              </p>

              <ul class="space-y-2 mb-4">
                <li
                  v-for="highlight in item.highlights"
                  :key="highlight"
                  class="font-mono text-xs text-muted leading-relaxed
                  flex items-start gap-2"
                >
                  <span class="text-primary shrink-0">&gt;</span>
                  <span>{{ highlight }}</span>
                </li>
              </ul>

              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in item.tags"
                  :key="tag"
                  class="font-mono text-[10px] px-2 py-0.5 border"
                  :style="`border-color:${item.color}30;
                    color:${item.color};
                    background:${item.color}08`"
                >
                  {{ tag }}
                </span>
              </div>
            </Terminal>
          </div>
        </div>
      </div>
    </div>

    <!-- Selected Projects 
    <div class="mb-16">
      <div :class="['reveal', visible && 'visible']" class="mb-7">
        <p class="font-pixel text-[9px] text-secondary tracking-widest mb-2">
          &gt; ls ./projects
        </p>

        <h3 class="font-pixel text-sm sm:text-base text-text">
          Selected Projects
        </h3>

        <p class="font-mono text-xs text-muted mt-2">
          Selected systems and technical work
        </p>
      </div>

      <div class="space-y-8">
        <div
          v-for="(project, i) in projects"
          :key="project.company"
          :class="[
            'reveal',
            visible && 'visible',
            'sm:pl-12 relative',
          ]"
          :style="`transition-delay:${i * 0.12}s`"
        >
          <Terminal
            :title="`${project.company.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.project`"
          >
            <div
              class="flex flex-col sm:flex-row sm:items-start
              sm:justify-between gap-3 mb-4"
            >
              <div>
                <h4
                  class="font-pixel text-[10px] sm:text-[11px] mb-2"
                  :style="`color:${project.color}`"
                >
                  {{ project.company }}
                </h4>

                <p class="font-mono text-sm text-text">
                  {{ project.role }}
                </p>
              </div>

              <span
                class="font-pixel text-[8px] px-2 py-1 border
                h-fit whitespace-nowrap"
                :style="`color:${project.color};
                  border-color:${project.color}40`"
              >
                {{ project.status }}
              </span>
            </div>

            <p class="font-mono text-xs text-muted leading-relaxed mb-4">
              {{ project.desc }}
            </p>

            <ul class="space-y-2 mb-4">
              <li
                v-for="highlight in project.highlights"
                :key="highlight"
                class="font-mono text-xs text-muted leading-relaxed
                flex items-start gap-2"
              >
                <span
                  class="shrink-0"
                  :style="`color:${project.color}`"
                >
                  &gt;
                </span>

                <span>{{ highlight }}</span>
              </li>
            </ul>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="font-mono text-[10px] px-2 py-0.5 border"
                :style="`border-color:${project.color}30;
                  color:${project.color};
                  background:${project.color}08`"
              >
                {{ tag }}
              </span>
            </div>
          </Terminal>
        </div>
      </div>
    </div> -->

    <!-- Community Experience -->
    <div>
      <div :class="['reveal', visible && 'visible']" class="mb-7">
        <p class="font-pixel text-[9px] text-accent tracking-widest mb-2">
          &gt; cat community.log
        </p>

        <h3 class="font-pixel text-sm sm:text-base text-text">
          Community Experience
        </h3>

        <p class="font-mono text-xs text-muted mt-2">
          Personal initiatives and community development
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          v-for="(community, i) in communities"
          :key="community.company"
          :class="['reveal', visible && 'visible']"
          :style="`transition-delay:${i * 0.12}s`"
        >
          <Terminal
            :title="`${community.company.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.community`"
          >
            <div class="flex items-start justify-between gap-3 mb-3">
              <div>
                <h4
                  class="font-pixel text-[10px] mb-2"
                  :style="`color:${community.color}`"
                >
                  {{ community.company }}
                </h4>

                <p class="font-mono text-xs text-text leading-relaxed">
                  {{ community.role }}
                </p>
              </div>

              <span
                class="font-pixel text-[8px] text-muted border
                border-muted/20 px-2 py-1 whitespace-nowrap"
              >
                {{ community.period }}
              </span>
            </div>

            <p class="font-mono text-xs text-muted leading-relaxed mb-4">
              {{ community.desc }}
            </p>

            <ul
              v-if="community.highlights"
              class="space-y-2 mb-4"
            >
              <li
                v-for="highlight in community.highlights"
                :key="highlight"
                class="font-mono text-xs text-muted leading-relaxed
                flex items-start gap-2"
              >
                <span class="text-primary shrink-0">&gt;</span>
                <span>{{ highlight }}</span>
              </li>
            </ul>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in community.tags"
                :key="tag"
                class="font-mono text-[10px] px-2 py-0.5 border"
                :style="`border-color:${community.color}30;
                  color:${community.color};
                  background:${community.color}08`"
              >
                {{ tag }}
              </span>
            </div>

            <div
              v-if="community.status"
              class="mt-4 pt-3 border-t border-muted/20
              flex items-center gap-2"
            >
              <span
                class="w-2 h-2 rounded-full bg-primary animate-pulse"
              />

              <span class="font-mono text-[10px] text-primary">
                STATUS: {{ community.status.toUpperCase() }}
              </span>
            </div>
          </Terminal>
        </div>
      </div>
    </div>
  </section>
</template>