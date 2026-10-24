
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Terminal from '../Terminal.vue'
import { useI18n } from '../../composables/useI18n'

const { t, isTh } = useI18n()

const visible = ref(false)
let observer

onMounted(() => {
  const el = document.getElementById('about')
  if (!el) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true
        observer?.unobserve(el)
      }
    },
    { threshold: 0.15 }
  )

  observer.observe(el)
})

onUnmounted(() => {
  observer?.disconnect()
})

const timeline = computed(() => [
  {
    year: isTh.value ? 'อายุ 5–6 ขวบ' : 'AGE 5–6',
    event: isTh.value
      ? 'เริ่มรู้จักคอมพิวเตอร์และวิดีโอเกม จากความสนุกสนานในวัยเด็กกลายมาเป็นความอยากรู้อยากเห็นในการทำงานของระบบ'
      : 'Discovered computers and video games. What started as entertainment gradually became curiosity.'
  },
  {
    year: isTh.value ? 'ช่วงวัยรุ่นตอนต้น' : 'EARLY TEENS',
    event: isTh.value
      ? 'หลงใหลในคอมพิวเตอร์และเริ่มต้นศึกษาการเขียนโปรแกรม ทั้งเว็บ, IoT, PHP, Python และ C#'
      : 'Became fascinated by computers and started exploring programming, including web development, IoT, PHP, Python, and C#.'
  },
  {
    year: isTh.value ? 'ราวปี 2018' : 'AROUND 2018',
    event: isTh.value
      ? 'เริ่มศึกษาการพัฒนาเซิร์ฟเวอร์ FiveM และลองสร้างเซิร์ฟเวอร์ของตัวเอง ประสบการณ์ที่ยังจำกัดด้าน scripting และ security ทำให้ต้องหยุดพักโปรเจกต์ไป'
      : 'Started exploring FiveM server development and attempted to build my own server. Limited experience with scripting and security eventually brought the project to a halt.'
  },
  {
    year: isTh.value ? 'ช่วงเวลาแห่งการเรียนรู้' : 'THE LEARNING YEARS',
    event: isTh.value
      ? 'ศึกษาค้นคว้าด้วยตนเองอย่างต่อเนื่อง ทดลองทำ FiveM resources, การดูแลระบบเซิร์ฟเวอร์, scripting และระบบเบื้องหลังของตัวเกม'
      : 'Continued learning independently, experimenting with FiveM resources, server administration, scripting, and the systems behind the game.'
  },
  {
    year: '2025',
    event: isTh.value
      ? 'ก่อตั้ง SynOrigin เป็นแบรนด์ส่วนตัวสำหรับโปรเจกต์และผลงานสร้างสรรค์ต่างๆ'
      : 'Established SynOrigin as a personal brand for my projects and creative work.'
  },
  {
    year: '2026',
    event: isTh.value
      ? 'เริ่มต้นสร้าง RERUN Community นำประสบการณ์และการเรียนรู้หลายปีมาพัฒนาเซิร์ฟเวอร์ใหม่'
      : 'Started building RERUN Community, bringing years of learning and experimentation into a new server project.'
  }
])

const education = computed(() => [
  {
    period: isTh.value ? '3 ปี' : '3 YEARS',
    level: isTh.value ? 'ประกาศนียบัตรวิชาชีพ (ปวช.)' : 'Vocational Certificate',
    school: isTh.value ? 'วิทยาลัยเทคนิคพิษณุโลก' : 'Phitsanulok Technical College',
    major: isTh.value ? 'ช่างอิเล็กทรอนิกส์' : 'Electronics',
    description: isTh.value
      ? 'ก้าวแรกในการศึกษาด้านสายอาชีพ สร้างพื้นฐานด้านอิเล็กทรอนิกส์และเทคโนโลยี'
      : 'My first formal step into technical education, building a foundation in electronics and technology.'
  },
  {
    period: isTh.value ? '2 ปี' : '2 YEARS',
    level: isTh.value ? 'ประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)' : 'Higher Vocational Certificate',
    school: isTh.value ? 'วิทยาลัยเทคนิคกำแพงเพชร' : 'Kamphaeng Phet Technical College',
    major: isTh.value ? 'เทคโนโลยีสารสนเทศ' : 'Information Technology',
    description: isTh.value
      ? 'ต่อยอดความรู้ด้านเทคโนโลยีสารสนเทศ ควบคู่กับการศึกษาการเขียนโปรแกรมและพัฒนาซอฟต์แวร์'
      : 'Expanded my knowledge of information technology while continuing to explore programming and software development.'
  },
  {
    period: isTh.value ? 'ปัจจุบัน · ปี 3' : 'CURRENT · YEAR 3',
    level: isTh.value ? 'ปริญญาตรี' : "Bachelor's Degree",
    school: isTh.value ? 'มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา ตาก' : 'Rajamangala University of Technology Lanna (RMUTL), Tak',
    major: isTh.value ? 'วิศวกรรมซอฟต์แวร์' : 'Software Engineering',
    description: isTh.value
      ? 'กำลังศึกษาเพื่อพัฒนาความรู้ด้านวิศวกรรมซอฟต์แวร์ เน้นการพัฒนา Backend, การออกแบบระบบ และการสร้างซอฟต์แวร์ที่มีความเสถียร'
      : 'Currently developing my software engineering knowledge, with a focus on backend development, system design, and building reliable software.'
  }
])

const currentFocus = computed(() => t.value.about.focusItems)
</script>

<template>
  <section id="about" class="px-6 lg:px-16 py-20">
    <!-- Section Header -->
    <div
      :class="['reveal', visible && 'visible']"
      class="mb-12"
    >
      <p class="font-pixel text-[9px] text-secondary tracking-widest mb-3">
        {{ t.about.cmd }}
      </p>

      <h2 class="font-pixel text-xl sm:text-2xl text-text mb-1">
        {{ t.about.title }}
      </h2>

      <div class="h-px w-24 bg-gradient-to-r from-primary to-transparent mt-3" />
    </div>

    <!-- Introduction + Journey -->
    <div class="grid lg:grid-cols-2 gap-10">
      <!-- Bio -->
      <div
        :class="['reveal', visible && 'visible']"
        style="transition-delay: 0.1s"
      >
        <Terminal title="whoami.sh">
          <div class="space-y-4 font-mono text-sm leading-relaxed text-muted">
            <p class="font-pixel text-[9px] text-primary">
              {{ t.about.introTitle }}
            </p>

            <p>
              <span class="text-primary">$</span>
              {{ t.about.bioP1 }}
            </p>

            <p>
              <span class="text-primary">$</span>
              {{ t.about.bioP2 }}
            </p>

            <p>
              <span class="text-primary">$</span>
              {{ t.about.bioP3 }}
            </p>

            <p>
              <span class="text-primary">$</span>
              {{ t.about.bioP4 }}
            </p>

            <p class="text-primary font-pixel text-[9px] mt-6">
              [EOF] — Still learning. Still building.
              <span class="blink">_</span>
            </p>
          </div>
        </Terminal>
      </div>

      <!-- Journey -->
      <div
        :class="['reveal', visible && 'visible']"
        style="transition-delay: 0.2s"
      >
        <Terminal title="journey.log">
          <ol class="relative border-l border-primary/20 ml-2 space-y-6">
            <li
              v-for="t in timeline"
              :key="t.year"
              class="relative ml-5"
            >
              <span
                class="absolute -left-[1.65rem] top-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-bg border border-primary/60 ring-2 ring-bg"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-primary" />
              </span>

              <span class="font-pixel text-[8px] text-secondary block mb-2">
                {{ t.year }}
              </span>

              <p class="font-mono text-xs text-muted leading-relaxed">
                {{ t.event }}
              </p>
            </li>
          </ol>
        </Terminal>
      </div>
    </div>

    <!-- Education -->
    <div
      :class="['reveal', visible && 'visible']"
      class="mt-16"
      style="transition-delay: 0.25s"
    >
      <div class="mb-8">
        <p class="font-pixel text-[9px] text-secondary tracking-widest mb-3">
          &gt; cat education.log
        </p>

        <h3 class="font-pixel text-base sm:text-lg text-text">
          {{ isTh ? 'ประวัติการศึกษา' : 'Education' }}
        </h3>

        <div class="h-px w-16 bg-gradient-to-r from-primary to-transparent mt-3" />
      </div>

      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        <Terminal
          v-for="(item, index) in education"
          :key="item.school"
          :title="`education_${String(index + 1).padStart(2, '0')}.log`"
        >
          <div class="space-y-3 font-mono">
            <p class="text-[9px] text-primary font-pixel">
              {{ item.period }}
            </p>

            <h4 class="text-sm text-text leading-relaxed font-semibold">
              {{ item.school }}
            </h4>

            <p class="text-xs text-secondary">
              {{ item.level }}
            </p>

            <div class="border-l border-primary/40 pl-3">
              <p class="text-xs text-primary">
                {{ item.major }}
              </p>
            </div>

            <p class="text-xs text-muted leading-relaxed">
              {{ item.description }}
            </p>

            <p
              v-if="index === 2"
              class="text-[9px] text-primary pt-2"
            >
              <span class="blink">●</span> {{ isTh ? 'กำลังศึกษาอยู่' : 'CURRENTLY STUDYING' }}
            </p>
          </div>
        </Terminal>
      </div>
    </div>

    <!-- Current Focus -->
    <div
      :class="['reveal', visible && 'visible']"
      class="mt-16"
      style="transition-delay: 0.3s"
    >
      <div class="mb-8">
        <p class="font-pixel text-[9px] text-secondary tracking-widest mb-3">
          &gt; cat current_focus.log
        </p>

        <h3 class="font-pixel text-base sm:text-lg text-text">
          {{ isTh ? 'สิ่งที่กำลังมุ่งเน้น' : "What I'm Working Toward" }}
        </h3>

        <div class="h-px w-16 bg-gradient-to-r from-primary to-transparent mt-3" />
      </div>

      <Terminal title="current_focus.sh">
        <div class="space-y-4 font-mono">
          <p class="text-xs text-muted leading-relaxed">
            {{ isTh
              ? 'ผมยังคงเรียนรู้ ทดลอง และพัฒนาวิธีการพัฒนาซอฟต์แวร์อย่างต่อเนื่อง นี่คือทักษะและด้านที่ผมให้ความสำคัญในปัจจุบัน'
              : "I'm continuously learning, experimenting, and improving my approach to software development. These are the areas I'm currently interested in developing further."
            }}
          </p>

          <ul class="grid sm:grid-cols-2 gap-3">
            <li
              v-for="focus in currentFocus"
              :key="focus"
              class="flex items-start gap-2 text-xs text-muted"
            >
              <span class="text-primary">&gt;</span>
              <span>{{ focus }}</span>
            </li>
          </ul>

          <div class="border-t border-primary/20 pt-4 mt-5">
            <p class="text-[9px] text-primary font-pixel mb-2">
              CURRENT_STATUS
            </p>

            <p class="text-xs text-muted leading-relaxed">
              Software Engineering Student · Developer ·
              Lifelong Learner
            </p>

            <p class="text-xs text-primary mt-3">
              <span class="blink">●</span> SYSTEM ACTIVE
            </p>
          </div>
        </div>
      </Terminal>
    </div>
  </section>
</template>
