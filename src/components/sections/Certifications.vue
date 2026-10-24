
<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from '../../composables/useI18n'

const { t } = useI18n()

const visible = ref(false)
const selectedCert = ref(null)

let observer

watch(selectedCert, (cert) => {
  document.body.style.overflow = cert ? 'hidden' : ''
})

onMounted(() => {
  const el = document.getElementById('certifications')

  if (el) {
    observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) visible.value = true
    }, { threshold: 0.1 })

    observer.observe(el)
  }

  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  observer?.disconnect()
  window.removeEventListener('keydown', handleKeydown)
})

function handleKeydown(e) {
  if (e.key === 'Escape') selectedCert.value = null
}

function openCert(cert) {
  if (!cert.file) return
  selectedCert.value = cert
}

function isImage(file) {
  return /\.(jpg|jpeg|png|webp|svg|gif|avif)$/i.test(file || '')
}

const certs = [
  {
    title: 'Cyber Boot Camp',
    issuer: 'RMUTL ARIT NCSAสกมช BDE',
    date: '21 Aug 2026',
    icon: '🔐',
    color: '#00F5A0',
    file: '/certificates/cyber_cert.jpg',
  },
]
</script>

<template>
  <section id="certifications" class="px-6 lg:px-16 py-20">
    <div :class="['reveal', visible && 'visible']" class="mb-12">
      <p class="font-pixel text-[9px] text-secondary tracking-widest mb-3">{{ t.certifications.cmd }}</p>
      <h2 class="font-pixel text-xl sm:text-2xl text-text mb-1">{{ t.certifications.title }}</h2>
      <div class="h-px w-24 bg-gradient-to-r from-primary to-transparent mt-3" />
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <button
          v-for="(c, i) in certs"
          :key="c.title"
          type="button"
          :class="[
            'reveal group w-full text-left',
            visible && 'visible'
          ]"
          :style="`transition-delay:${i * 0.07}s`"
          :aria-label="`View certificate: ${c.title}`"
          :disabled="!c.file"
          @click="openCert(c)"
        >
        <div
          class="glass-card p-5 h-full flex flex-col rounded-sm border transition-all duration-300 cursor-default"
          :style="`border-color:${c.color}15`"
          @mouseenter="e => e.currentTarget.style.borderColor = c.color + '50'"
          @mouseleave="e => e.currentTarget.style.borderColor = c.color + '15'"
        >
          <!-- Icon -->
          <div
            class="w-12 h-12 flex items-center justify-center text-2xl mb-4 border"
            :style="`border-color:${c.color}30;background:${c.color}08;box-shadow:0 0 12px ${c.color}20`"
          >
            {{ c.icon }}
          </div>

          <h3 class="font-pixel text-[9px] leading-relaxed mb-2" :style="`color:${c.color}`">
            {{ c.title }}
          </h3>
          <p class="font-mono text-[11px] text-muted flex-1">{{ c.issuer }}</p>

          <div class="mt-4 pt-3 border-t flex items-center justify-between" :style="`border-color:${c.color}15`">
            <span class="font-pixel text-[8px] text-muted">{{ c.date }}</span>
            <span
              class="font-pixel text-[7px] px-1.5 py-0.5 border"
              :style="`color:${c.color};border-color:${c.color}30;background:${c.color}08`"
            >{{ t.certifications.verified }}</span>
          </div>
        </div>
      </button>
    </div>
    
    <Teleport to="body">
      <Transition name="cert-modal">
        <div
          v-if="selectedCert"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          :aria-label="selectedCert.title"
          @click.self="selectedCert = null"
        >
          <!-- Backdrop -->
          <div
            class="absolute inset-0 bg-black/85 backdrop-blur-sm"
            @click="selectedCert = null"
          />

          <!-- Modal -->
          <div
            class="modal-window relative z-10 flex flex-col max-h-[90vh] border rounded-sm overflow-hidden"
            :class="isImage(selectedCert.file) ? 'w-auto max-w-[92vw] md:max-w-4xl' : 'w-full max-w-5xl'"
            :style="{
              borderColor: `${selectedCert.color}60`,
              background: '#0b0f0e',
              boxShadow: `0 0 30px ${selectedCert.color}15`,
            }"
          >
            <!-- Header -->
            <div
              class="flex items-center gap-3 p-4 border-b"
              :style="{ borderColor: `${selectedCert.color}30` }"
            >
              <div class="flex-1 min-w-0">
                <p
                  class="font-pixel text-[8px] mb-2"
                  :style="{ color: selectedCert.color }"
                >
                  {{ t.certifications.viewerExe }}
                </p>

                <h3 class="font-mono text-sm text-text truncate">
                  {{ selectedCert.title }}
                </h3>

                <p class="font-mono text-[10px] text-muted mt-1">
                  {{ selectedCert.issuer }} / {{ selectedCert.date }}
                </p>
              </div>

              <button
                type="button"
                class="font-mono text-xl px-3 py-1 border hover:bg-white/10"
                :style="{
                  color: selectedCert.color,
                  borderColor: `${selectedCert.color}40`,
                }"
                aria-label="Close certificate"
                @click="selectedCert = null"
              >
                ×
              </button>
            </div>

            <!-- Certificate preview -->
            <div class="flex-1 min-h-0 overflow-auto bg-black/40 p-2 sm:p-4 flex items-center justify-center">
              <img
                v-if="isImage(selectedCert.file)"
                :src="selectedCert.file"
                :alt="`${selectedCert.title} certificate`"
                class="max-h-[70vh] w-auto max-w-full object-contain rounded-xs select-none"
              />
              <iframe
                v-else
                :key="selectedCert.file"
                :src="selectedCert.file"
                :title="`${selectedCert.title} certificate`"
                class="w-full h-[60vh] border-0"
              />
            </div>

            <!-- Footer -->
            <div
              class="flex flex-wrap items-center justify-between gap-3 p-4 border-t"
              :style="{ borderColor: `${selectedCert.color}30` }"
            >
              <span class="font-mono text-[10px] text-muted">
                {{ selectedCert.file.split('/').pop() }}
              </span>

              <a
                :href="selectedCert.file"
                target="_blank"
                rel="noopener noreferrer"
                class="neon-btn font-mono text-xs px-4 py-2"
                :style="{
                  color: selectedCert.color,
                  borderColor: `${selectedCert.color}60`,
                }"
              >
                {{ t.certifications.openOriginal }}
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.cert-modal-enter-active,
.cert-modal-leave-active {
  transition: opacity 0.25s ease;
}

.cert-modal-enter-active .modal-window,
.cert-modal-leave-active .modal-window {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
}

.cert-modal-enter-from,
.cert-modal-leave-to {
  opacity: 0;
}

.cert-modal-enter-from .modal-window,
.cert-modal-leave-to .modal-window {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>
