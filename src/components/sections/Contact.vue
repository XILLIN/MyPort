<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowUpRight, Check, Copy } from 'lucide-vue-next'
import { useI18n } from '../../composables/useI18n'

const { t } = useI18n()

const visible = ref(false)
const sent = ref(false)
const copied = ref(false)
const form = ref({ name: '', email: '', message: '' })

let observer
let copyTimer

onMounted(() => {
  const el = document.getElementById('contact')
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
  clearTimeout(copyTimer)
})

const channels = [
  { label: 'Email', value: 'inter2546@gmail.com', href: 'mailto:inter2546@gmail.com' },
  { label: 'GitHub', value: 'github.com/XILLIN', href: 'https://github.com/XILLIN' },
  { label: 'Discord', value: 'lixxert', href: 'https://discord.gg/hweauyFCYN' },
  { label: 'Facebook', value: 'fb.com/profileinter', href: 'https://www.facebook.com/profileinter' },
]

async function copyEmail() {
  try {
    await navigator.clipboard.writeText('inter2546@gmail.com')
    copied.value = true
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => {
      copied.value = false
    }, 2500)
  } catch {
    // Fallback ignored cleanly
  }
}

function submitForm() {
  sent.value = true
  form.value = { name: '', email: '', message: '' }
}

function resetForm() {
  sent.value = false
}
</script>

<template>
  <section id="contact" class="px-6 sm:px-10 py-24 sm:py-36 font-hn text-cream">
    <div :class="['editorial-rule h-0.5 w-full bg-cream mb-12 sm:mb-16', visible && 'is-visible']" />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-10">
      <!-- Left Index Column -->
      <div class="lg:col-span-3">
        <p class="text-xs uppercase tracking-[0.2em] text-cream/50 sticky top-24">
          {{ t.contact.index }}
        </p>
      </div>

      <!-- Right Content Column -->
      <div class="lg:col-span-9 space-y-16 sm:space-y-24">
        <div :class="['editorial-reveal space-y-8', visible && 'is-visible']">
          <h2 class="text-3xl sm:text-5xl font-normal leading-[1.1] tracking-[-0.02em] text-cream max-w-3xl">
            {{ t.contact.headline }}
          </h2>

          <div class="flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <a
              href="mailto:inter2546@gmail.com"
              class="text-2xl sm:text-4xl font-normal tracking-[-0.01em] text-cream border-b border-cream/35 pb-1 transition-opacity duration-300 hover:opacity-60"
            >
              inter2546@gmail.com
            </a>

            <button
              type="button"
              @click="copyEmail"
              class="inline-flex items-center gap-2 cursor-pointer text-xs uppercase tracking-[0.18em] text-cream/60 transition-opacity duration-300 hover:text-cream"
            >
              <Check v-if="copied" :size="14" :stroke-width="1.5" />
              <Copy v-else :size="14" :stroke-width="1.5" />
              <span>{{ copied ? t.contact.copied : t.contact.copyEmail }}</span>
            </button>
          </div>
        </div>

        <!-- Two-Column Channels & Editorial Form -->
        <div
          :class="['editorial-reveal grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-12 pt-10 border-t border-cream/15', visible && 'is-visible']"
          style="transition-delay: 120ms"
        >
          <!-- Direct Channels -->
          <div class="md:col-span-5 space-y-6">
            <p class="text-xs uppercase tracking-[0.2em] text-cream/50">
              {{ t.contact.directLabel }}
            </p>

            <ul class="border-t border-cream/15">
              <li
                v-for="ch in channels"
                :key="ch.label"
                class="border-b border-cream/15"
              >
                <a
                  :href="ch.href"
                  :target="ch.href.startsWith('http') ? '_blank' : undefined"
                  :rel="ch.href.startsWith('http') ? 'noopener noreferrer' : undefined"
                  class="flex items-center justify-between py-4 transition-opacity duration-300 hover:opacity-60"
                >
                  <div>
                    <p class="text-xs uppercase tracking-[0.16em] text-cream/50">
                      {{ ch.label }}
                    </p>
                    <p class="text-base text-cream mt-0.5">
                      {{ ch.value }}
                    </p>
                  </div>
                  <ArrowUpRight :size="18" :stroke-width="1.5" class="text-cream/70" />
                </a>
              </li>
            </ul>
          </div>

          <!-- Editorial Message Form -->
          <div class="md:col-span-7 space-y-6">
            <p class="text-xs uppercase tracking-[0.2em] text-cream/50">
              {{ t.contact.formLabel }}
            </p>

            <div v-if="sent" class="py-10 border-t border-cream/15 space-y-4">
              <p class="text-2xl font-normal text-cream">
                {{ t.contact.sentTitle }}
              </p>
              <p class="text-sm text-cream/65 leading-relaxed">
                {{ t.contact.sentBody }}
              </p>
              <button
                type="button"
                @click="resetForm"
                class="mt-2 cursor-pointer text-xs uppercase tracking-[0.18em] text-cream border-b border-cream/40 pb-0.5 transition-opacity duration-300 hover:opacity-60"
              >
                {{ t.contact.sendAnother }}
              </button>
            </div>

            <form v-else @submit.prevent="submitForm" class="space-y-8">
              <div>
                <label for="contact-name" class="block text-xs uppercase tracking-[0.18em] text-cream/50 mb-2">
                  {{ t.contact.nameLabel }}
                </label>
                <input
                  id="contact-name"
                  v-model="form.name"
                  type="text"
                  required
                  :placeholder="t.contact.namePlaceholder"
                  class="w-full bg-transparent border-b border-cream/25 py-3 text-base text-cream placeholder-cream/30 focus:outline-none focus:border-cream transition-colors duration-300"
                />
              </div>

              <div>
                <label for="contact-email" class="block text-xs uppercase tracking-[0.18em] text-cream/50 mb-2">
                  {{ t.contact.emailLabel }}
                </label>
                <input
                  id="contact-email"
                  v-model="form.email"
                  type="email"
                  required
                  :placeholder="t.contact.emailPlaceholder"
                  class="w-full bg-transparent border-b border-cream/25 py-3 text-base text-cream placeholder-cream/30 focus:outline-none focus:border-cream transition-colors duration-300"
                />
              </div>

              <div>
                <label for="contact-message" class="block text-xs uppercase tracking-[0.18em] text-cream/50 mb-2">
                  {{ t.contact.messageLabel }}
                </label>
                <textarea
                  id="contact-message"
                  v-model="form.message"
                  required
                  rows="4"
                  :placeholder="t.contact.messagePlaceholder"
                  class="w-full bg-transparent border-b border-cream/25 py-3 text-base text-cream placeholder-cream/30 focus:outline-none focus:border-cream transition-colors duration-300 resize-none"
                />
              </div>

              <div class="pt-2">
                <button
                  type="submit"
                  class="cursor-pointer border border-cream px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-cream transition-colors duration-300 hover:bg-cream hover:text-[#0a0a0a]"
                >
                  {{ t.contact.submit }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
input:-webkit-autofill,
textarea:-webkit-autofill {
  box-shadow: 0 0 0 1000px #0a0a0a inset !important;
  -webkit-text-fill-color: #efeee9 !important;
}
</style>
