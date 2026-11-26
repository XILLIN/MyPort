<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { X, ArrowUpRight } from 'lucide-vue-next'
import { useI18n } from '../../composables/useI18n'

const { t } = useI18n()

const visible = ref(false)
const selectedCert = ref(null)
let observer

watch(selectedCert, (cert) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = cert ? 'hidden' : ''
  }
})

function handleKeydown(e) {
  if (e.key === 'Escape') {
    selectedCert.value = null
  }
}

onMounted(() => {
  const el = document.getElementById('certifications')
  if (el) {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible.value = true
          observer?.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
  }
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
  observer?.disconnect()
  window.removeEventListener('keydown', handleKeydown)
})

function isImage(file) {
  return /\.(jpg|jpeg|png|webp|svg|gif|avif)$/i.test(file || '')
}

const baseUrl = import.meta.env.BASE_URL
const certs = [
  {
    index: '01',
    title: 'Cyber Boot Camp',
    issuer: 'RMUTL ARIT · NCSA สกมช · BDE',
    date: '21 Aug 2026',
    file: `${baseUrl}certificates/cyber_cert.jpg`,
  },
]
</script>

<template>
  <section id="certifications" class="px-6 sm:px-10 py-24 sm:py-36 font-hn text-cream">
    <div :class="['editorial-rule h-0.5 w-full bg-cream mb-12 sm:mb-16', visible && 'is-visible']" />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-10">
      <!-- Left Index Column -->
      <div class="lg:col-span-3">
        <p class="text-xs uppercase tracking-[0.2em] text-cream/50 sticky top-24">
          {{ t.certifications.index }}
        </p>
      </div>

      <!-- Right Content Column -->
      <div class="lg:col-span-9 space-y-14">
        <div :class="['editorial-reveal', visible && 'is-visible']">
          <h2 class="text-3xl sm:text-5xl font-normal leading-[1.1] tracking-[-0.02em] text-cream max-w-3xl">
            {{ t.certifications.headline }}
          </h2>
        </div>

        <div class="border-t border-cream/15">
          <button
            v-for="cert in certs"
            :key="cert.title"
            type="button"
            @click="selectedCert = cert"
            class="group w-full text-left cursor-pointer grid grid-cols-1 sm:grid-cols-12 gap-y-3 sm:gap-x-8 items-baseline py-8 border-b border-cream/15 transition-opacity duration-300 hover:opacity-70"
          >
            <div class="sm:col-span-5 flex items-baseline gap-4">
              <span class="font-mono text-xs text-cream/40">{{ cert.index }}</span>
              <span class="text-xl sm:text-2xl font-normal text-cream">
                {{ cert.title }}
              </span>
            </div>

            <span class="sm:col-span-4 text-sm text-cream/65">
              {{ cert.issuer }}
            </span>

            <div class="sm:col-span-3 flex items-center justify-between sm:justify-end gap-5 text-xs uppercase tracking-[0.16em]">
              <span class="text-cream/50">{{ cert.date }}</span>
              <span class="inline-flex items-center gap-1 text-cream">
                {{ t.certifications.inspect }}
                <ArrowUpRight :size="14" :stroke-width="1.5" />
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Editorial Lightbox Modal -->
    <Teleport to="body">
      <Transition name="cert-fade">
        <div
          v-if="selectedCert"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10 font-hn text-cream"
          role="dialog"
          aria-modal="true"
          :aria-label="selectedCert.title"
          @click.self="selectedCert = null"
        >
          <div
            class="absolute inset-0 bg-black/80 backdrop-blur-sm"
            @click="selectedCert = null"
          />

          <div class="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col bg-[#141414] border border-cream/20">
            <!-- Header -->
            <div class="flex items-start justify-between gap-6 px-6 py-5 border-b border-cream/15">
              <div>
                <p class="text-[11px] uppercase tracking-[0.2em] text-cream/50 mb-1">
                  {{ t.certifications.verified }} · {{ selectedCert.date }}
                </p>
                <h3 class="text-lg sm:text-xl font-normal text-cream">
                  {{ selectedCert.title }}
                </h3>
                <p class="text-xs text-cream/60 mt-0.5">
                  {{ selectedCert.issuer }}
                </p>
              </div>

              <button
                type="button"
                @click="selectedCert = null"
                :aria-label="t.certifications.close"
                class="cursor-pointer p-1 text-cream transition-opacity duration-300 hover:opacity-60"
              >
                <X :size="24" :stroke-width="1.5" />
              </button>
            </div>

            <!-- Content -->
            <div class="flex-1 min-h-0 overflow-auto bg-[#0a0a0a] p-4 sm:p-6 flex items-center justify-center">
              <img
                v-if="isImage(selectedCert.file)"
                :src="selectedCert.file"
                :alt="`${selectedCert.title} certificate`"
                class="max-h-[68vh] w-auto max-w-full object-contain select-none"
              />
              <iframe
                v-else
                :src="selectedCert.file"
                :title="`${selectedCert.title} certificate`"
                class="w-full h-[65vh] border-0"
              />
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between gap-4 px-6 py-4 border-t border-cream/15 text-xs">
              <span class="font-mono text-cream/45">
                {{ selectedCert.file.split('/').pop() }}
              </span>

              <a
                :href="selectedCert.file"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 uppercase tracking-[0.16em] text-cream transition-opacity duration-300 hover:opacity-60"
              >
                <span>{{ t.certifications.openOriginal }}</span>
                <ArrowUpRight :size="14" :stroke-width="1.5" />
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.cert-fade-enter-active,
.cert-fade-leave-active {
  transition: opacity 0.3s ease;
}
.cert-fade-enter-from,
.cert-fade-leave-to {
  opacity: 0;
}
</style>
