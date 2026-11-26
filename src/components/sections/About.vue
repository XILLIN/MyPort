<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../../composables/useI18n'

const { t, isTh } = useI18n()
const baseUrl = import.meta.env.BASE_URL

const visible = ref(false)
let observer

onMounted(() => {
  const el = document.getElementById('about')
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

const timeline = computed(() => [
  {
    year: isTh.value ? 'อายุ 5–6 ขวบ' : 'Age 5–6',
    event: isTh.value
      ? 'เริ่มรู้จักคอมพิวเตอร์และวิดีโอเกม จากความสนุกสนานในวัยเด็กกลายมาเป็นความอยากรู้อยากเห็นในการทำงานของระบบ'
      : 'Discovered computers and video games. What started as entertainment gradually became curiosity.',
  },
  {
    year: isTh.value ? 'ช่วงวัยรุ่นตอนต้น' : 'Early Teens',
    event: isTh.value
      ? 'หลงใหลในคอมพิวเตอร์และเริ่มต้นศึกษาการเขียนโปรแกรม ทั้งเว็บ, IoT, PHP, Python และ C#'
      : 'Became fascinated by computers and started exploring programming, including web development, IoT, PHP, Python, and C#.',
  },
  {
    year: isTh.value ? 'ราวปี 2018' : 'Around 2018',
    event: isTh.value
      ? 'เริ่มศึกษาการพัฒนาเซิร์ฟเวอร์ FiveM และลองสร้างเซิร์ฟเวอร์ของตัวเอง ประสบการณ์ที่ยังจำกัดด้าน scripting และ security ทำให้ต้องหยุดพักโปรเจกต์ไป'
      : 'Started exploring FiveM server development and attempted to build my own server. Limited experience with scripting and security eventually brought the project to a halt.',
  },
  {
    year: isTh.value ? 'ช่วงเวลาแห่งการเรียนรู้' : 'The Learning Years',
    event: isTh.value
      ? 'ศึกษาค้นคว้าด้วยตนเองอย่างต่อเนื่อง ทดลองทำ FiveM resources, การดูแลระบบเซิร์ฟเวอร์, scripting และระบบเบื้องหลังของตัวเกม'
      : 'Continued learning independently, experimenting with FiveM resources, server administration, scripting, and the systems behind the game.',
  },
  {
    year: '2025',
    event: isTh.value
      ? 'ก่อตั้ง SynOrigin เป็นแบรนด์ส่วนตัวสำหรับโปรเจกต์และผลงานสร้างสรรค์ต่างๆ'
      : 'Established SynOrigin as a personal brand for my projects and creative work.',
  },
  {
    year: '2026',
    event: isTh.value
      ? 'เริ่มต้นสร้าง RERUN Community นำประสบการณ์และการเรียนรู้หลายปีมาพัฒนาเซิร์ฟเวอร์ใหม่'
      : 'Started building RERUN Community, bringing years of learning and experimentation into a new server project.',
  },
])

const education = computed(() => [
  {
    period: isTh.value ? 'ปัจจุบัน · ปี 3' : 'Current · Year 3',
    level: isTh.value ? 'ปริญญาตรี' : "Bachelor's Degree",
    school: isTh.value
      ? 'มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา ตาก'
      : 'Rajamangala University of Technology Lanna (RMUTL), Tak',
    major: isTh.value ? 'วิศวกรรมซอฟต์แวร์' : 'Software Engineering',
    description: isTh.value
      ? 'กำลังศึกษาเพื่อพัฒนาความรู้ด้านวิศวกรรมซอฟต์แวร์ เน้นการพัฒนา Backend, การออกแบบระบบ และการสร้างซอฟต์แวร์ที่มีความเสถียร'
      : 'Developing software engineering foundations with focus on backend architecture, system design, and reliable software.',
    current: true,
  },
  {
    period: isTh.value ? '2 ปี' : '2 Years',
    level: isTh.value ? 'ประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)' : 'Higher Vocational Certificate',
    school: isTh.value ? 'วิทยาลัยเทคนิคกำแพงเพชร' : 'Kamphaeng Phet Technical College',
    major: isTh.value ? 'เทคโนโลยีสารสนเทศ' : 'Information Technology',
    description: isTh.value
      ? 'ต่อยอดความรู้ด้านเทคโนโลยีสารสนเทศ ควบคู่กับการศึกษาการเขียนโปรแกรมและพัฒนาซอฟต์แวร์'
      : 'Expanded information technology expertise while diving deeper into programming and software development.',
    current: false,
  },
  {
    period: isTh.value ? '3 ปี' : '3 Years',
    level: isTh.value ? 'ประกาศนียบัตรวิชาชีพ (ปวช.)' : 'Vocational Certificate',
    school: isTh.value ? 'วิทยาลัยเทคนิคพิษณุโลก' : 'Phitsanulok Technical College',
    major: isTh.value ? 'ช่างอิเล็กทรอนิกส์' : 'Electronics',
    description: isTh.value
      ? 'ก้าวแรกในการศึกษาด้านสายอาชีพ สร้างพื้นฐานด้านอิเล็กทรอนิกส์และเทคโนโลยี'
      : 'First formal step into technical education, building a strong foundation in electronics and hardware.',
    current: false,
  },
])
</script>

<template>
  <section id="about" class="py-20 sm:py-28 lg:py-28 font-hn text-cream">
    <div class="editorial-shell">
      <!-- Top Section Hairline -->
      <div :class="['editorial-rule h-0.5 w-full bg-cream mb-12 lg:mb-14', visible && 'is-visible']" />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12">
        <!-- Left Index Column -->
        <div class="lg:col-span-3 2xl:col-span-2">
          <div class="sticky top-24 space-y-6">
            <p class="text-xs uppercase tracking-[0.2em] text-cream/55">
              {{ t.about.index }}
            </p>
            <div class="hidden lg:block pt-5 border-t border-cream/15 space-y-2 text-xs text-cream/40 font-mono">
              <p>{{ isTh ? 'ประวัติ · โฟกัสปัจจุบัน' : 'Profile · Current Focus' }}</p>
              <p>{{ isTh ? 'เส้นทาง · การศึกษา' : 'Timeline · Education' }}</p>
            </div>
          </div>
        </div>

        <!-- Right Content Column -->
        <div class="lg:col-span-9 2xl:col-span-10 space-y-16 lg:space-y-20">
          <!-- Editorial Statement -->
          <div :class="['editorial-reveal', visible && 'is-visible']">
            <h2 class="text-3xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-normal leading-[1.08] tracking-[-0.02em] text-cream max-w-5xl">
              {{ t.about.headline }}
            </h2>
          </div>

          <!-- Bio + Monochrome Editorial Portrait + Current Focus -->
          <div
            :class="['editorial-reveal grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-10 lg:gap-x-14 pt-10 border-t border-cream/15', visible && 'is-visible']"
            style="transition-delay: 120ms"
          >
            <div class="md:col-span-7 space-y-5 text-sm sm:text-[15px] lg:text-base leading-[1.75] text-cream/75">
              <p>{{ t.about.bioP1 }}</p>
              <p>{{ t.about.bioP2 }}</p>
              <p>{{ t.about.bioP3 }}</p>
              <p>{{ t.about.bioP4 }}</p>
            </div>

            <div class="md:col-span-5 flex flex-col justify-between gap-8">
              <!-- Monochrome editorial portrait -->
              <figure class="overflow-hidden bg-[#141414] border border-cream/10">
                <img
                  :src="`${baseUrl}profile.jpg`"
                  alt="SynOrigin portrait"
                  class="w-full aspect-[4/4.6] object-cover grayscale contrast-125 brightness-90 transition-transform duration-700 hover:scale-[1.02]"
                />
              </figure>

              <!-- Current Focus -->
              <div class="border-t border-cream/15 pt-5">
                <p class="text-xs uppercase tracking-[0.2em] text-cream/50 mb-4">
                  {{ t.about.focusHeading }}
                </p>
                <ul class="space-y-2 text-sm text-cream/85">
                  <li
                    v-for="item in t.about.focusItems"
                    :key="item"
                    class="flex items-baseline gap-3"
                  >
                    <span class="text-cream/40 select-none">&mdash;</span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
                <p class="mt-5 font-mono text-[11px] text-cream/45 tracking-wide">
                  {{ t.about.focusNote }}
                </p>
              </div>
            </div>
          </div>

          <!-- Desktop 2-Column Editorial Spread: Timeline & Education -->
          <div
            :class="['editorial-reveal grid grid-cols-1 xl:grid-cols-12 gap-y-16 xl:gap-x-12 pt-10 border-t border-cream/15', visible && 'is-visible']"
            style="transition-delay: 180ms"
          >
            <!-- Timeline Index -->
            <div class="xl:col-span-6">
              <p class="text-xs uppercase tracking-[0.2em] text-cream/50 mb-6">
                {{ t.about.timelineHeading }}
              </p>

              <ol class="border-t border-cream/15">
                <li
                  v-for="item in timeline"
                  :key="item.year"
                  class="grid grid-cols-1 sm:grid-cols-12 gap-y-1.5 sm:gap-x-5 py-4 border-b border-cream/15 transition-colors duration-200 hover:bg-cream/[0.02]"
                >
                  <span class="sm:col-span-4 font-mono text-[11px] uppercase tracking-[0.14em] text-cream/50 pt-0.5">
                    {{ item.year }}
                  </span>
                  <p class="sm:col-span-8 text-sm leading-relaxed text-cream/85">
                    {{ item.event }}
                  </p>
                </li>
              </ol>
            </div>

            <!-- Education Index -->
            <div class="xl:col-span-6">
              <p class="text-xs uppercase tracking-[0.2em] text-cream/50 mb-6">
                {{ t.about.educationHeading }}
              </p>

              <div class="border-t border-cream/15">
                <article
                  v-for="edu in education"
                  :key="edu.school"
                  class="py-5 border-b border-cream/15 space-y-2 transition-colors duration-200 hover:bg-cream/[0.02]"
                >
                  <div class="flex flex-wrap items-baseline justify-between gap-2">
                    <span class="font-mono text-[11px] uppercase tracking-[0.14em] text-cream/50">
                      {{ edu.period }} · {{ edu.level }}
                    </span>
                    <span
                      v-if="edu.current"
                      class="font-mono text-[10px] uppercase tracking-[0.16em] text-cream border border-cream/30 px-2 py-0.5"
                    >
                      {{ t.about.studyingLabel }}
                    </span>
                  </div>

                  <h3 class="text-lg font-normal text-cream leading-snug">
                    {{ edu.school }}
                  </h3>
                  <p class="text-sm text-cream/80">
                    {{ edu.major }}
                  </p>
                  <p class="text-sm leading-relaxed text-cream/60">
                    {{ edu.description }}
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
