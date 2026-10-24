<script setup>
import { ref, onMounted } from 'vue'
import Terminal from '../Terminal.vue'
import { useI18n } from '../../composables/useI18n'

const { t, isTh } = useI18n()

const visible = ref(false)
const sent    = ref(false)
const form    = ref({ name: '', email: '', msg: '' })

onMounted(() => {
  const el = document.getElementById('contact')
  const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) visible.value = true }, { threshold: 0.2 })
  if (el) obs.observe(el)
})

function submit() {
  sent.value = true
  form.value = { name: '', email: '', msg: '' }
  setTimeout(() => { sent.value = false }, 5000)
}

const links = [
  { icon: '📧', label: 'Email',    value: 'inter2546@gmail.com',       href: 'mailto:inter2546@gmail.com', color: '#00F5A0' },
  { icon: '🐙', label: 'GitHub',   value: 'github.com/XILLIN', href: 'https://github.com/XILLIN', color: '#FF7A18' },
  { icon: '🎮', label: 'Discord',  value: 'lixxert',       href: 'https://discord.gg/hweauyFCYN', color: '#7C3AED' },
  { icon: '📘', label: 'Facebook', value: 'fb.com/profileinter',     href: 'https://www.facebook.com/profileinter', color: '#00F5A0' },
]
</script>

<template>
  <section id="contact" class="px-6 lg:px-16 py-20 pb-32">
    <div :class="['reveal', visible && 'visible']" class="mb-12">
      <p class="font-pixel text-[9px] text-secondary tracking-widest mb-3">{{ t.contact.cmd }}</p>
      <h2 class="font-pixel text-xl sm:text-2xl text-text mb-1">{{ t.contact.title }}</h2>
      <div class="h-px w-24 bg-gradient-to-r from-primary to-transparent mt-3" />
    </div>

    <div class="grid lg:grid-cols-2 gap-10 max-w-4xl">
      <!-- Contact links -->
      <div :class="['reveal', visible && 'visible']">
        <Terminal title="contact.sh">
          <div class="space-y-4">
            <p class="font-mono text-xs text-muted mb-6">
              <span class="text-secondary">$</span> {{ isTh ? 'พร้อมร่วมงานหรือพูดคุย ติดต่อได้ทางช่องทางเหล่านี้ครับ' : 'Ready to collaborate? Hit me up on any of these channels.' }}
            </p>
            <a
              v-for="link in links" :key="link.label"
              :href="link.href"
              class="flex items-center gap-4 p-3 border transition-all duration-200 group block"
              :style="`border-color:${link.color}15`"
              @mouseenter="e => e.currentTarget.style.borderColor = link.color + '40'"
              @mouseleave="e => e.currentTarget.style.borderColor = link.color + '15'"
            >
              <div
                class="w-10 h-10 flex items-center justify-center text-xl border flex-shrink-0"
                :style="`border-color:${link.color}30;background:${link.color}08`"
              >
                {{ link.icon }}
              </div>
              <div class="min-w-0">
                <div class="font-pixel text-[9px] mb-0.5" :style="`color:${link.color}`">{{ link.label }}</div>
                <div class="font-mono text-xs text-muted truncate">{{ link.value }}</div>
              </div>
              <span class="ml-auto font-pixel text-[9px] text-muted group-hover:text-primary transition-colors">↗</span>
            </a>
          </div>
        </Terminal>
      </div>

      <!-- Message form -->
      <div :class="['reveal', visible && 'visible']" style="transition-delay:0.15s">
        <Terminal title="send_message.sh">
          <transition name="fade" mode="out-in">
            <div v-if="sent" key="sent" class="py-8 text-center">
              <div class="text-4xl mb-4">✅</div>
              <p class="font-pixel text-[10px] text-primary text-glow-green mb-2">{{ isTh ? 'ส่งข้อความเรียบร้อย' : 'MESSAGE_SENT' }}</p>
              <p class="font-mono text-xs text-muted">{{ isTh ? 'ผมจะติดต่อกลับโดยเร็วที่สุด' : "I'll get back to you soon." }}<span class="blink text-primary">_</span></p>
            </div>

            <form v-else key="form" @submit.prevent="submit" class="space-y-4">
              <div>
                <label class="font-pixel text-[8px] text-muted block mb-2">{{ isTh ? 'ชื่อ *' : 'NAME *' }}</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  :placeholder="isTh ? 'ชื่อของคุณ' : 'your_name'"
                  class="w-full bg-white/3 border border-primary/15 px-4 py-2.5 font-mono text-sm text-text placeholder-muted/40 focus:outline-none focus:border-primary/50 focus:bg-primary/3 transition-all"
                />
              </div>
              <div>
                <label class="font-pixel text-[8px] text-muted block mb-2">{{ isTh ? 'อีเมล *' : 'EMAIL *' }}</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="you@domain.com"
                  class="w-full bg-white/3 border border-primary/15 px-4 py-2.5 font-mono text-sm text-text placeholder-muted/40 focus:outline-none focus:border-primary/50 focus:bg-primary/3 transition-all"
                />
              </div>
              <div>
                <label class="font-pixel text-[8px] text-muted block mb-2">{{ isTh ? 'ข้อความ *' : 'MESSAGE *' }}</label>
                <textarea
                  v-model="form.msg"
                  required
                  rows="4"
                  :placeholder="isTh ? 'บอกเล่าเกี่ยวกับโปรเจกต์ของคุณ...' : 'Tell me about your project...'"
                  class="w-full bg-white/3 border border-primary/15 px-4 py-2.5 font-mono text-sm text-text placeholder-muted/40 focus:outline-none focus:border-primary/50 focus:bg-primary/3 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                class="neon-btn w-full text-primary border-primary hover:bg-primary hover:text-bg transition-all cursor-pointer"
              >
                {{ isTh ? '> ส่งข้อความ' : '&gt; SEND_MESSAGE' }}
              </button>
            </form>
          </transition>
        </Terminal>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
input, textarea { outline: none; }
input:-webkit-autofill,
textarea:-webkit-autofill {
  box-shadow: 0 0 0 1000px #12121A inset !important;
  -webkit-text-fill-color: #E5E7EB !important;
}
</style>
