<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
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
    { threshold: 0.06 }
  )
  observer.observe(el)
})

onUnmounted(() => {
  observer?.disconnect()
})

const experiences = computed(() => [
  {
    index: '01',
    company: isTh.value ? 'การพัฒนา FiveM และ ESX' : 'FiveM & ESX Development',
    role: isTh.value
      ? 'นักพัฒนาระบบ Backend และ Gameplay Systems'
      : 'Backend & Gameplay Systems Developer',
    period: isTh.value ? 'พัฒนาร่วมกับทีม' : 'Collaborative Development',
    desc: isTh.value
      ? 'ร่วมพัฒนากับนักพัฒนาคนอื่นในโปรเจกต์เซิร์ฟเวอร์ FiveM โดยโฟกัสหลักที่การเขียน Backend ด้วย Lua, ระบบเกมเพลย์ และการปรับแต่งเฟรมเวิร์ก ESX รับผิดชอบการวางตรรกะฝั่งเซิร์ฟเวอร์และไคลเอนต์ควบคู่กับทีมที่ดูแลด้าน UI/UX'
      : 'Collaborate with other developers on FiveM server projects, primarily focusing on Lua backend development, gameplay systems, and ESX framework modifications. Responsible for implementing and refining server-side and client-side logic alongside teammates handling UI/UX.',
    highlights: isTh.value
      ? [
          'พัฒนาและปรับแต่งสคริปต์ Lua สำหรับระบบเกมเพลย์ทั้งฝั่งเซิร์ฟเวอร์และไคลเอนต์',
          'ดัดแปลงและต่อยอด Resource บนฐาน ESX ให้ตรงตามความต้องการของโปรเจกต์',
          'ออกแบบตรรกะเกมเพลย์ การจัดการ Event และการสื่อสารระหว่าง Client–Server',
          'ตรวจสอบและปรับปรุงโค้ดที่มีอยู่เดิมให้ดูแลรักษาง่ายและทำงานเสถียรขึ้น',
          'วิเคราะห์จุดคอขวดด้านประสิทธิภาพและลดการประมวลผลที่ไม่จำเป็นฝั่งไคลเอนต์',
        ]
      : [
          'Develop and modify Lua scripts for server and client gameplay systems.',
          'Customize and extend ESX-based resources to meet project requirements.',
          'Implement gameplay logic, event handling, and client-server communication.',
          'Review and refine existing scripts to improve maintainability and runtime behavior.',
          'Investigate performance bottlenecks and reduce unnecessary client-side processing.',
        ],
    stack: ['Lua', 'FiveM', 'ESX', 'Gameplay Systems', 'Backend Logic', 'Performance'],
  },
  {
    index: '02',
    company: isTh.value ? 'การพัฒนาเว็บและ Backend' : 'Web & Backend Development',
    role: isTh.value
      ? 'เว็บแอปพลิเคชัน Full-Stack และ Interactive UI'
      : 'Full-Stack Applications & Interactive UI',
    period: isTh.value ? 'โปรเจกต์ต่อเนื่อง' : 'Ongoing Projects',
    desc: isTh.value
      ? 'พัฒนาเว็บแอปพลิเคชันแบบ Full-Stack, หน้าต่าง NUI สมัยใหม่ และโปรแกรมยูทิลิตี้บนเดสก์ท็อป ตั้งแต่แพลตฟอร์มจองโต๊ะร้านอาหาร 2 ภาษาด้วย Next.js, Better Auth และ MongoDB ไปจนถึงสมาร์ทโฟน Svelte 5 และเครื่องมือ Python'
      : 'Build full-stack web applications, modern NUI frontends, and desktop utilities — from bilingual Next.js reservation platforms with Better Auth and MongoDB to Svelte 5 smartphones and Python tools.',
    highlights: isTh.value
      ? [
          'สร้างแอปพลิเคชัน Full-Stack ด้วย Next.js App Router, TypeScript, Vue.js และ Svelte 5',
          'พัฒนาระบบยืนยันตัวตนด้วย Session, การตรวจสิทธิ์ตามบทบาท และแดชบอร์ดวิเคราะห์ข้อมูลด้วย Better Auth และ MongoDB',
          'สร้างมินิเกมบน HTML5 Canvas / Web Audio API ที่ลื่นไหลระดับ 60+ FPS และอินเทอร์เฟซ FiveM NUI ที่ตอบสนองไว',
          'พัฒนาโปรแกรมยูทิลิตี้บน Windows ด้วย Python (CustomTkinter, ระบบอัตโนมัติ MIDI)',
        ]
      : [
          'Build full-stack applications using Next.js App Router, TypeScript, Vue.js, and Svelte 5.',
          'Implement session authentication, role guards, and analytics dashboards with Better Auth & MongoDB.',
          'Engineer 60+ FPS HTML5 Canvas / Web Audio API minigames and responsive FiveM NUI interfaces.',
          'Develop Windows desktop utilities in Python (CustomTkinter, MIDI automation).',
        ],
    stack: ['Next.js', 'TypeScript', 'Svelte 5', 'Vue.js', 'Node.js', 'MongoDB', 'SQL', 'Python'],
  },
  {
    index: '03',
    company: isTh.value ? 'การดูแลระบบ Linux และเซิร์ฟเวอร์' : 'Linux & Server Administration',
    role: isTh.value
      ? 'การตั้งค่าเซิร์ฟเวอร์และการแก้ไขปัญหา'
      : 'Server Configuration & Troubleshooting',
    period: isTh.value ? 'ปฏิบัติงานจริง' : 'Hands-on Practice',
    desc: isTh.value
      ? 'สะสมประสบการณ์ภาคปฏิบัติในการตั้งค่าสภาพแวดล้อมเซิร์ฟเวอร์ Linux รวมถึงการไล่ตรวจสอบและแก้ไขปัญหาทั้งฝั่งเซิร์ฟเวอร์เกมและโครงสร้างพื้นฐานสำหรับการพัฒนา'
      : 'Build practical experience configuring Linux server environments and troubleshooting issues across game-server operations and development infrastructure.',
    highlights: isTh.value
      ? [
          'ตั้งค่าและดูแลสภาพแวดล้อมโฮสติ้งบนระบบปฏิบัติการ Linux',
          'จัดการ Resource, Service และการตั้งค่าต่างๆ ของเซิร์ฟเวอร์สำหรับงานพัฒนา',
          'ศึกษาด้านระบบเครือข่าย ขั้นตอนการ Deploy และความปลอดภัยในการปฏิบัติการ',
        ]
      : [
          'Configure and maintain Linux-based hosting environments.',
          'Manage development resources, services, and server configurations.',
          'Explore networking, deployment workflows, and operational security.',
        ],
    stack: ['Linux', 'Server Administration', 'Networking', 'Troubleshooting'],
  },
])

const communities = computed(() => [
  {
    company: 'RERUN Community',
    role: isTh.value
      ? 'โปรเจกต์คอมมูนิตี้และเซิร์ฟเวอร์ FiveM'
      : 'FiveM Community & Server Project',
    period: isTh.value ? '2026 — ปัจจุบัน' : '2026 — Present',
    status: isTh.value ? 'กำลังพัฒนา' : 'In Development',
    desc: isTh.value
      ? 'พัฒนาโปรเจกต์คอมมูนิตี้ FiveM ที่เน้นโครงสร้างระบบเซิร์ฟเวอร์ที่ทำงานสอดประสานกัน ประสบการณ์เกมเพลย์ที่ตอบสนองดี และบรรยากาศที่เป็นมิตรต่อผู้เล่น'
      : 'Developing a FiveM community project focused on cohesive server systems, responsive gameplay experiences, and a welcoming environment.',
    highlights: isTh.value
      ? [
          'วางสถาปัตยกรรมพื้นฐานด้านเทคนิคของเซิร์ฟเวอร์ทั้งหมด',
          'ออกแบบระบบเกมเพลย์และโครงสร้าง Resource แบบโมดูลาร์',
          'นำบทเรียนจากประสบการณ์การพัฒนา FiveM ตลอดหลายปีมาประยุกต์ใช้จริง',
        ]
      : [
          'Architecting the technical foundation of the server.',
          'Designing gameplay systems and modular resource architecture.',
          'Applying lessons from years of FiveM development experience.',
        ],
    stack: ['FiveM', 'Gameplay Systems', 'Server Development', 'Community Building'],
  },
  {
    company: 'SynOrigin',
    role: isTh.value ? 'แบรนด์เทคนิคส่วนตัว' : 'Personal Technical Brand',
    period: isTh.value ? '2025 — ปัจจุบัน' : '2025 — Present',
    status: null,
    desc: isTh.value
      ? 'ก่อตั้งแบรนด์ส่วนตัวเพื่อสะท้อนความสนใจด้านเทคนิคและงานพัฒนาอิสระ ใช้เป็นพื้นที่หลักสำหรับจัดระเบียบและนำเสนอผลงานซอฟต์แวร์ต่างๆ'
      : 'Established a personal brand representing my technical interests and independent development work — a foundation for organizing and presenting software projects.',
    highlights: [],
    stack: ['Personal Brand', 'Software Engineering', 'Systems'],
  },
])
</script>

<template>
  <section id="experience" class="py-20 sm:py-28 lg:py-28 font-hn text-cream">
    <div class="editorial-shell">
      <div :class="['editorial-rule h-0.5 w-full bg-cream mb-12 lg:mb-14', visible && 'is-visible']" />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12">
        <!-- Left Index Column -->
        <div class="lg:col-span-3 2xl:col-span-2">
          <div class="sticky top-24 space-y-6">
            <p class="text-xs uppercase tracking-[0.2em] text-cream/55">
              {{ t.experience.index }}
            </p>
            <div class="hidden lg:block pt-5 border-t border-cream/15 space-y-1.5 font-mono text-xs text-cream/40">
              <p>{{ experiences.length }} {{ isTh ? 'สายงานพัฒนา' : 'Core Practices' }}</p>
              <p>{{ communities.length }} {{ isTh ? 'โปรเจกต์และแบรนด์' : 'Initiatives' }}</p>
            </div>
          </div>
        </div>

        <!-- Right Content Column -->
        <div class="lg:col-span-9 2xl:col-span-10 space-y-16 lg:space-y-20">
          <div :class="['editorial-reveal', visible && 'is-visible']">
            <h2 class="text-3xl sm:text-5xl xl:text-[3.4rem] font-normal leading-[1.1] tracking-[-0.02em] text-cream max-w-5xl">
              {{ t.experience.headline }}
            </h2>
          </div>

          <!-- Development Practice -->
          <div :class="['editorial-reveal', visible && 'is-visible']" style="transition-delay: 100ms">
            <p class="text-xs uppercase tracking-[0.2em] text-cream/50 mb-6">
              {{ t.experience.devHeading }}
            </p>

            <div class="border-t border-cream/15">
              <article
                v-for="item in experiences"
                :key="item.company"
                class="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8 py-8 lg:py-9 border-b border-cream/15 transition-colors duration-200 hover:bg-cream/[0.02] lg:px-4 lg:-mx-4"
              >
                <div class="md:col-span-4 space-y-2">
                  <span class="font-mono text-xs text-cream/40">{{ item.index }}</span>
                  <h3 class="text-xl sm:text-2xl font-normal text-cream leading-snug">
                    {{ item.company }}
                  </h3>
                  <p class="text-sm text-cream/70">{{ item.role }}</p>
                  <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-cream/45 pt-1">
                    {{ item.period }}
                  </p>
                </div>

                <div class="md:col-span-8 space-y-5">
                  <p class="text-sm sm:text-[15px] leading-relaxed text-cream/75">
                    {{ item.desc }}
                  </p>

                  <ul class="space-y-1.5 text-sm leading-relaxed text-cream/65">
                    <li
                      v-for="highlight in item.highlights"
                      :key="highlight"
                      class="flex items-baseline gap-3"
                    >
                      <span class="text-cream/35 select-none">&mdash;</span>
                      <span>{{ highlight }}</span>
                    </li>
                  </ul>

                  <div class="pt-1 flex flex-wrap gap-1.5">
                    <span
                      v-for="tech in item.stack"
                      :key="tech"
                      class="font-mono text-[11px] text-cream/65 border border-cream/15 px-2 py-0.5"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <!-- Initiatives & Community — Side-by-Side 2-Col Editorial Grid on Desktop -->
          <div :class="['editorial-reveal', visible && 'is-visible']" style="transition-delay: 180ms">
            <p class="text-xs uppercase tracking-[0.2em] text-cream/50 mb-6">
              {{ t.experience.communityHeading }}
            </p>

            <div class="grid grid-cols-1 lg:grid-cols-2 border-t border-b border-cream/15 divide-y lg:divide-y-0 lg:divide-x divide-cream/15">
              <article
                v-for="item in communities"
                :key="item.company"
                class="py-8 lg:p-8 flex flex-col justify-between gap-6 transition-colors duration-200 hover:bg-cream/[0.02]"
              >
                <div class="space-y-4">
                  <div class="flex items-baseline justify-between gap-3">
                    <span class="font-mono text-[11px] uppercase tracking-[0.16em] text-cream/45">
                      {{ item.period }}
                    </span>
                    <span
                      v-if="item.status"
                      class="font-mono text-[10px] uppercase tracking-[0.16em] text-cream border border-cream/30 px-2 py-0.5"
                    >
                      {{ item.status }}
                    </span>
                  </div>

                  <div>
                    <h3 class="text-2xl font-normal text-cream">
                      {{ item.company }}
                    </h3>
                    <p class="text-sm text-cream/65 mt-1">{{ item.role }}</p>
                  </div>

                  <p class="text-sm leading-relaxed text-cream/75">
                    {{ item.desc }}
                  </p>

                  <ul v-if="item.highlights.length" class="space-y-1.5 text-sm leading-relaxed text-cream/65">
                    <li
                      v-for="h in item.highlights"
                      :key="h"
                      class="flex items-baseline gap-3"
                    >
                      <span class="text-cream/35 select-none">&mdash;</span>
                      <span>{{ h }}</span>
                    </li>
                  </ul>
                </div>

                <div class="pt-4 border-t border-cream/10 flex flex-wrap gap-1.5">
                  <span
                    v-for="tech in item.stack"
                    :key="tech"
                    class="font-mono text-[11px] text-cream/60 border border-cream/15 px-2 py-0.5"
                  >
                    {{ tech }}
                  </span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
